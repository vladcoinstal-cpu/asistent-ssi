const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const CASES = [
  { name: 'Sprenghi', file: 'memoriu-sprenghi-1.1-1.4-curat.txt', refs: { hasReference: true } },
  { name: 'Comercial Parcaj', file: 'memoriu-arhitectura-comercial-parcare-subsol.txt', refs: { hasReference: false } },
  { name: 'Industrial Depozitare', file: 'memoriu-arhitectura-industrial-depozitare.txt', refs: { hasReference: false } },
  { name: 'Restaurant Sala', file: 'memoriu-arhitectura-restaurant-sala-aglomerata.txt', refs: { hasReference: false } }
];

const normalTemplate = require('../ssi-normal-template-anexa4.json');
const prelimTemplate = require('../ssi-preliminar-template-anexa5.json');

function flattenTemplate(template, annexName) {
  const rows = [];
  const walkSubpoints = (subpoints = [], sectionCode = '', sectionTitle = '') => {
    for (const sp of subpoints) {
      const code = String(sp.code || '').trim();
      const title = String(sp.title || '').trim();
      const fields = Array.isArray(sp.fields) ? sp.fields : [];
      rows.push({ annex: annexName, sectionCode, sectionTitle, subpointCode: code, subpointTitle: title, fields });
      walkSubpoints(sp.subpoints || [], sectionCode, sectionTitle);
    }
  };
  for (const sec of template.sections || []) {
    walkSubpoints(sec.subpoints || [], String(sec.code || '').trim(), String(sec.title || '').trim());
  }
  return rows;
}

function normalizeSpaces(v) {
  return String(v || '').replace(/\u00a0/g, ' ').replace(/[ \t]+/g, ' ').replace(/\s+\n/g, '\n').trim();
}

function findSubpointBlock(text, subpointCode) {
  const escaped = subpointCode.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(?:^|\\n)\\s*${escaped}\\b[\\s\\S]*?(?=(?:\\n\\s*\\d+(?:\\.\\d+)*\\b)|$)`, 'i');
  return (normalizeSpaces(text).match(re) || [''])[0].trim();
}

function lineForField(block, fieldLabel) {
  const key = String(fieldLabel || '').toLowerCase().trim();
  if (!key) return '';
  const lines = String(block || '').split('\n').map((x) => x.trim()).filter(Boolean);
  const found = lines.find((ln) => ln.toLowerCase().includes(key));
  return found || '';
}

function statusForField({ line, fixtureName, subpointCode, fieldLabel }) {
  if (!line) return 'field-line-not-detected';
  const lower = line.toLowerCase();
  if (/de completat|\s-\s*$|:\s*$/.test(lower)) return 'de-completat-or-empty';
  if (subpointCode === '1.1' && /adres/.test(fieldLabel.toLowerCase())) {
    if (/mărășești\s*nr\.?\s*47/i.test(line) && /jude[țt]ul\s+bra[șs]ov/i.test(line)) return 'ok';
    if (/municipiul\s+bra[șs]ov,\s*str\s*$/i.test(line)) return 'truncated';
  }
  if (subpointCode.startsWith('1.4') && /capacități|capacitati/i.test(fieldLabel)) {
    if (/bucătărie|linie caldă|gaze naturale/i.test(line)) return 'contaminated';
  }
  if (/beneficiar|proprietar/i.test(fieldLabel.toLowerCase()) && /str\.|municipiul|jude[țt]ul/i.test(line)) return 'contaminated';
  if (/adres/i.test(fieldLabel.toLowerCase()) && /profilul de activitate|date de contact beneficiar/i.test(line)) return 'contaminated';
  if (fixtureName === 'Sprenghi' && /^1\.(2|3|4)/.test(subpointCode)) {
    if (subpointCode === '1.2' && !/cult/i.test(lineForFieldCache.get(`${fixtureName}|${subpointCode}|funcțiuni principale, secundare și conexe ale construcției\/amenajării`) || line)) return 'wrong-value';
  }
  return 'ok';
}

const lineForFieldCache = new Map();

function collectCaseAudit({ fixtureName, normalOut, prelimOut, templates }) {
  const rows = [];
  const addRows = (annex, outputText, templateRows) => {
    for (const tp of templateRows) {
      const block = findSubpointBlock(outputText, tp.subpointCode);
      const blockExists = Boolean(block);
      rows.push({
        fixtureName,
        annex,
        subpointCode: tp.subpointCode,
        subpointTitle: tp.subpointTitle,
        check: 'subpoint_exists',
        expected: `Subpoint ${tp.subpointCode} present`,
        actual: blockExists ? 'present' : 'missing',
        status: blockExists ? 'ok' : 'missing',
        evidence: block.slice(0, 240)
      });
      for (const field of tp.fields) {
        const label = String(field.label || field.title || '').trim();
        if (!label) continue;
        const line = lineForField(block, label);
        lineForFieldCache.set(`${fixtureName}|${tp.subpointCode}|${label.toLowerCase()}`, line);
        const st = statusForField({ line, fixtureName, subpointCode: tp.subpointCode, fieldLabel: label });
        rows.push({
          fixtureName,
          annex,
          subpointCode: tp.subpointCode,
          subpointTitle: tp.subpointTitle,
          check: 'field_value',
          field: label,
          expected: `${label} line present and valid`,
          actual: line || '(missing)',
          status: st,
          evidence: block.slice(0, 260)
        });
      }
    }
  };

  addRows('Anexa 4 / SSI normal', normalOut, templates.normal);
  addRows('Anexa 5 / SSI preliminar', prelimOut, templates.prelim);

  return rows;
}

function renderReport(rows) {
  const now = new Date().toISOString();
  const byStatus = rows.reduce((acc, r) => { acc[r.status] = (acc[r.status] || 0) + 1; return acc; }, {});
  const criticalStatuses = new Set(['missing', 'truncated', 'contaminated', 'wrong-value']);
  const critical = rows.filter((r) => criticalStatuses.has(r.status));

  const matrixLines = [];
  matrixLines.push('| Fixture | Annexa | Subpoint | Check | Field | Status | Expected | Actual |');
  matrixLines.push('|---|---|---|---|---|---|---|---|');
  for (const r of rows) {
    matrixLines.push(`| ${r.fixtureName} | ${r.annex} | ${r.subpointCode} ${r.subpointTitle || ''} | ${r.check} | ${r.field || '-'} | ${r.status} | ${String(r.expected || '').replace(/\|/g, '/')} | ${String(r.actual || '').replace(/\|/g, '/')} |`);
  }

  const criticalLines = critical.map((r, idx) => `${idx + 1}. [${r.fixtureName}] ${r.annex} ${r.subpointCode} ${r.field || '-'} => ${r.status}\n   expected: ${r.expected}\n   actual: ${r.actual}\n   evidence: ${r.evidence || ''}`);

  return `# SSI Full Audit Report (Global Anexa 4 + Anexa 5)\n\nGenerated: ${now}\n\n## Scope\n- Fixtures: ${CASES.map((c) => c.name).join(', ')}\n- Outputs: SSI normal (Anexa 4) + SSI preliminar (Anexa 5)\n- Checks: presence, ordering-by-subpoint scan, field presence, value/de-completat contamination heuristics, reset/no-leakage\n\n## Status summary\n${Object.entries(byStatus).map(([k, v]) => `- ${k}: ${v}`).join('\n')}\n\n## Critical issues\n${criticalLines.join('\n\n') || 'No critical issues found.'}\n\n## Full subpoint matrix\n${matrixLines.join('\n')}\n`;
}

test('full SSI global audit (all subpoints from Anexa 4/5) collects all differences and fails only at end', async ({ page }) => {
  const templateRows = {
    normal: flattenTemplate(normalTemplate, 'Anexa 4'),
    prelim: flattenTemplate(prelimTemplate, 'Anexa 5')
  };

  const allRows = [];
  await page.goto('/');
  await expect.poll(async () => page.evaluate(() => Boolean(window.__ssiTemplateStatus?.ready)), { timeout: 20000 }).toBeTruthy();

  for (const c of CASES) {
    await page.evaluate((n) => window.__ssiCommands?.newProject?.(`AUDIT-GLOBAL-${n}`), c.name);
    const src = fs.readFileSync(path.join(__dirname, '..', 'test-fixtures', c.file), 'utf8');
    await page.evaluate((t) => window.__ssiCommands?.addManualText?.(t, 'audit-src'), src);
    await page.evaluate(async () => window.__ssiCommands?.extractData?.());

    const normal = await page.locator('#normalReportOutput').inputValue();
    const prelim = await page.locator('#preliminaryReportOutput').inputValue();

    allRows.push(...collectCaseAudit({ fixtureName: c.name, normalOut: normal, prelimOut: prelim, templates: templateRows }));

    await page.locator('[data-tab-target="sourcesTab"]').click();
    await page.locator('#resetBtn').click();
    await expect(page.locator('#sourceCount')).toHaveText('0');
  }

  const report = renderReport(allRows);
  fs.writeFileSync(path.join(__dirname, '..', 'audit-full-ssi-output.md'), report);

  const criticalStatuses = new Set(['missing', 'truncated', 'contaminated', 'wrong-value']);
  const critical = allRows.filter((r) => criticalStatuses.has(r.status));
  if (critical.length) {
    const details = critical.slice(0, 30).map((r, i) => `${i + 1}. [${r.fixtureName}] ${r.annex} ${r.subpointCode} ${r.field || '-'} => ${r.status} | actual: ${r.actual}`).join('\n');
    throw new Error(`SSI full global audit found ${critical.length} critical issue(s).\n${details}`);
  }
});
