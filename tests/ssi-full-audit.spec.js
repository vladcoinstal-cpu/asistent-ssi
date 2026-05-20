const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const CASES = [
  { name: 'Sprenghi', file: 'memoriu-sprenghi-1.1-1.4-curat.txt', kind: 'reference' },
  { name: 'Comercial Parcaj', file: 'memoriu-arhitectura-comercial-parcare-subsol.txt', kind: 'fixture' },
  { name: 'Industrial Depozitare', file: 'memoriu-arhitectura-industrial-depozitare.txt', kind: 'fixture' },
  { name: 'Restaurant Sala', file: 'memoriu-arhitectura-restaurant-sala-aglomerata.txt', kind: 'fixture' },
  { name: 'Empty Skeleton', file: null, kind: 'empty' }
];

const normalTemplate = require('../ssi-normal-template-anexa4.json');
const prelimTemplate = require('../ssi-preliminar-template-anexa5.json');

function flattenTemplate(template) {
  const rows = [];
  const walk = (subpoints = [], sectionCode = '', sectionTitle = '') => {
    for (const sp of subpoints) {
      rows.push({
        sectionCode: String(sectionCode || ''),
        sectionTitle: String(sectionTitle || ''),
        subpointCode: String(sp.code || '').trim(),
        subpointTitle: String(sp.title || '').trim(),
        fields: Array.isArray(sp.fields) ? sp.fields : []
      });
      walk(sp.subpoints || [], sectionCode, sectionTitle);
    }
  };
  for (const sec of template.sections || []) walk(sec.subpoints || [], sec.code, sec.title);
  return rows;
}

function normalize(v) {
  return String(v || '').replace(/\u00a0/g, ' ').replace(/[ \t]+/g, ' ').replace(/\s+\n/g, '\n').trim();
}

function blockForCode(text, code) {
  const escaped = code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(?:^|\\n)\\s*${escaped}\\b[\\s\\S]*?(?=(?:\\n\\s*\\d+(?:\\.\\d+)*\\b)|$)`, 'i');
  return (normalize(text).match(re) || [''])[0].trim();
}

function findFieldLine(block, label) {
  const key = String(label || '').toLowerCase().trim();
  const lines = String(block || '').split('\n').map((x) => x.trim()).filter(Boolean);
  return lines.find((ln) => ln.toLowerCase().includes(key)) || '';
}

function hasSourceDataForField(rawText, fieldLabel) {
  const label = String(fieldLabel || '').toLowerCase();
  const src = normalize(rawText).toLowerCase();
  if (/denumire/.test(label)) return /(denumirea\s+obiectivului|lăcaș|obiectiv)/i.test(src);
  if (/beneficiar|proprietar/.test(label)) return /(beneficiar|proprietar|parohia)/i.test(src);
  if (/adres/.test(label)) return /(adresa|str\.|strada|municipiul|județul|judetul)/i.test(src);
  if (/funcțiuni|functiuni|destina/.test(label)) return /(funcțiuni|funcţiuni|destinația|destinatia|cult|restaurant|depozitare|industrial|parcaj)/i.test(src);
  if (/categoria|clasa de importan/.test(label)) return /(categoria\s+de\s+importan|clasa\s+de\s+importan)/i.test(src);
  if (/regimul|înălțimea|volumul|aria/.test(label)) return /(regim|inaltime|înălțime|volum|aria)/i.test(src);
  if (/numărul maxim|utilizatori|persoane/.test(label)) return /(utilizatori|persoane)/i.test(src);
  if (/capacități de depozitare|capacitati de depozitare/.test(label)) return /(depozitare|depozit|spații de depozitare)/i.test(src);
  if (/căilor de evacuare|cailor de evacuare/.test(label)) return /(evacuare|căi|cai)/i.test(src);
  return false;
}

function analyzeField({ fixture, annex, subpointCode, fieldLabel, fieldLine, block, rawSource }) {
  const line = String(fieldLine || '');
  const low = line.toLowerCase();
  const expectedSourceData = hasSourceDataForField(rawSource, fieldLabel);

  if (!block) return { status: 'missing', cause: 'subpoint block absent', missingRule: 'render-template-population', recommendedFix: 'Ensure section/subpoint rendering for this annex.' };
  if (!line) return { status: 'missing', cause: 'field line absent in subpoint block', missingRule: 'field-mapping-line', recommendedFix: 'Map template field label to semantic/source value.' };

  if (/de completat/.test(low)) {
    if (expectedSourceData && fixture.kind !== 'empty') return { status: 'unexpected-de-completat', cause: 'source has data but output kept placeholder', missingRule: 'data-availability-override', recommendedFix: 'Populate from semantic/extracted value when source data exists.' };
    return { status: 'ok', cause: 'placeholder allowed (no source data)', missingRule: '-', recommendedFix: '-' };
  }

  if (/^[-–—: ]*$/.test(line.replace(/[\s\u00a0]/g, ''))) {
    return { status: expectedSourceData ? 'unexpected-empty' : 'ok', cause: expectedSourceData ? 'empty despite source data' : 'empty allowed', missingRule: expectedSourceData ? 'non-empty-when-source-exists' : '-', recommendedFix: expectedSourceData ? 'Populate value from semantic/source.' : '-' };
  }

  if (/beneficiar|proprietar/i.test(fieldLabel) && /(str\.|municipiul|jude[țt]ul)/i.test(line)) {
    return { status: 'contaminated', cause: 'beneficiary line includes address tokens', missingRule: 'beneficiary-address-separation', recommendedFix: 'Sanitize beneficiary against address phrases.' };
  }

  if (/adres/i.test(fieldLabel)) {
    if (/profilul de activitate|date de contact beneficiar/i.test(line)) {
      return { status: 'contaminated', cause: 'address line includes data from other subfields', missingRule: 'address-field-isolation', recommendedFix: 'Strip trailing sections from address text.' };
    }
    if (/municipiul\s+bra[șs]ov,\s*str\s*$/i.test(line)) {
      return { status: 'truncated', cause: 'address truncated at street token', missingRule: 'full-address-preservation', recommendedFix: 'Preserve complete str./nr./județ values.' };
    }
    if (fixture.name === 'Sprenghi' && !/m[ăa]r[ăa][șs]e[șs]ti\s*nr\.?\s*47,\s*jude[țt]ul\s+bra[șs]ov/i.test(line)) {
      return { status: 'wrong-value', cause: 'does not match Sprenghi reference address', missingRule: 'reference-v58-v85-address', recommendedFix: 'Use semantic reference-compatible address for Sprenghi.' };
    }
  }

  if (/regimul de înălțime|volumul construcției|aria construită|aria desfășurată|înălțimea maximă/i.test(fieldLabel)) {
    if (/\d/.test(line) && !/(m²|m³|\bm\b|m2|m3|mp|mc)/i.test(line)) {
      return { status: 'wrong-unit', cause: 'dimension value without expected unit marker', missingRule: 'dimension-unit-normalization', recommendedFix: 'Normalize to m / m² / m³ units.' };
    }
  }

  if (/capacități de depozitare|capacitati de depozitare/i.test(fieldLabel) && /bucătărie|gaze naturale|linie caldă/i.test(line)) {
    return { status: 'wrong-source', cause: 'storage line includes kitchen/gas process text', missingRule: 'storage-context-filtering', recommendedFix: 'Restrict storage extraction to storage context sentences only.' };
  }

  return { status: 'ok', cause: 'passed rule checks', missingRule: '-', recommendedFix: '-' };
}

function buildRows({ fixture, annexName, outputText, templateRows, rawSource }) {
  const rows = [];
  for (const t of templateRows) {
    const block = blockForCode(outputText, t.subpointCode);
    rows.push({
      fixture: fixture.name,
      annex: annexName,
      subpoint: t.subpointCode,
      field: '-',
      check: 'subpoint_exists',
      status: block ? 'ok' : 'missing',
      expected: `Subpoint ${t.subpointCode} present in output`,
      actual: block ? 'present' : 'missing',
      cause: block ? 'rendered' : 'template/render omission',
      missingRule: block ? '-' : 'subpoint-render-presence',
      recommendedFix: block ? '-' : 'Ensure template subpoint exists in output renderer.',
      evidence: block.slice(0, 220)
    });

    for (const f of t.fields) {
      const label = String(f.label || f.title || '').trim();
      if (!label) continue;
      const fieldLine = findFieldLine(block, label);
      const res = analyzeField({ fixture, annex: annexName, subpointCode: t.subpointCode, fieldLabel: label, fieldLine, block, rawSource });
      rows.push({
        fixture: fixture.name,
        annex: annexName,
        subpoint: t.subpointCode,
        field: label,
        check: 'field_rule',
        status: res.status,
        expected: `${label}: valid value / valid De completat according to source`,
        actual: fieldLine || '(missing)',
        cause: res.cause,
        missingRule: res.missingRule,
        recommendedFix: res.recommendedFix,
        evidence: block.slice(0, 260)
      });
    }
  }
  return rows;
}

function reportMarkdown(rows) {
  const generated = new Date().toISOString();
  const statuses = ['ok', 'missing', 'truncated', 'contaminated', 'wrong-value', 'wrong-source', 'wrong-unit', 'unexpected-empty', 'unexpected-de-completat', 'de-completat-or-empty'];
  const counts = Object.fromEntries(statuses.map((s) => [s, rows.filter((r) => r.status === s).length]));
  const criticalSet = new Set(['missing', 'truncated', 'contaminated', 'wrong-value', 'wrong-source', 'wrong-unit', 'unexpected-empty', 'unexpected-de-completat']);
  const critical = rows.filter((r) => criticalSet.has(r.status));

  const matrix = [
    '| Fixture | Annexa | Subpoint | Field | Check | Status | Cause | Missing semantic rule | Recommended fix |',
    '|---|---|---|---|---|---|---|---|---|',
    ...rows.map((r) => `| ${r.fixture} | ${r.annex} | ${r.subpoint} | ${String(r.field).replace(/\|/g, '/')} | ${r.check} | ${r.status} | ${String(r.cause).replace(/\|/g, '/')} | ${String(r.missingRule).replace(/\|/g, '/')} | ${String(r.recommendedFix).replace(/\|/g, '/')} |`)
  ].join('\n');

  const criticalList = critical.length
    ? critical.map((r, i) => `${i + 1}. [${r.fixture}] ${r.annex} ${r.subpoint} / ${r.field}\n   - status: ${r.status}\n   - cause: ${r.cause}\n   - missing rule: ${r.missingRule}\n   - recommended fix: ${r.recommendedFix}\n   - actual: ${r.actual}`).join('\n\n')
    : 'No critical issues.';

  return `# SSI Full Audit Report (Global – Anexa 4 + Anexa 5)\n\nGenerated: ${generated}\n\n## Coverage\n- All subpoints from templates: ` +
    `${flattenTemplate(normalTemplate).length} (normal) + ${flattenTemplate(prelimTemplate).length} (preliminar)\n- Fixtures: ${CASES.map((c) => c.name).join(', ')}\n- Includes: Sprenghi reference checks, 3 memorii, empty skeleton, reset/no-leakage\n\n## Status summary\n${statuses.map((s) => `- ${s}: ${counts[s]}`).join('\n')}\n\n## Critical issues\n${criticalList}\n\n## Full matrix (all subpoints/fields)\n${matrix}\n`;
}

test('global SSI audit matrix for all subpoints (Anexa 4 + Anexa 5), all differences collected, fail at end', async ({ page }) => {
  const normalRows = flattenTemplate(normalTemplate);
  const prelimRows = flattenTemplate(prelimTemplate);
  const rows = [];

  await page.goto('/');
  await expect.poll(async () => page.evaluate(() => Boolean(window.__ssiTemplateStatus?.ready)), { timeout: 20000 }).toBeTruthy();

  for (const fixture of CASES) {
    await page.evaluate((name) => window.__ssiCommands?.newProject?.(`AUDIT-GLOBAL-${name}`), fixture.name);
    let src = '';
    if (fixture.file) {
      src = fs.readFileSync(path.join(__dirname, '..', 'test-fixtures', fixture.file), 'utf8');
      await page.evaluate((t) => window.__ssiCommands?.addManualText?.(t, 'audit-src'), src);
      await page.evaluate(async () => window.__ssiCommands?.extractData?.());
    }

    const normal = await page.locator('#normalReportOutput').inputValue();
    const prelim = await page.locator('#preliminaryReportOutput').inputValue();

    rows.push(...buildRows({ fixture, annexName: 'Anexa 4 / SSI normal', outputText: normal, templateRows: normalRows, rawSource: src }));
    rows.push(...buildRows({ fixture, annexName: 'Anexa 5 / SSI preliminar', outputText: prelim, templateRows: prelimRows, rawSource: src }));

    await page.locator('[data-tab-target="sourcesTab"]').click();
    await page.locator('#resetBtn').click();
    await expect(page.locator('#sourceCount')).toHaveText('0');
  }

  const md = reportMarkdown(rows);
  fs.writeFileSync(path.join(__dirname, '..', 'audit-full-ssi-output.md'), md);

  const criticalSet = new Set(['missing', 'truncated', 'contaminated', 'wrong-value', 'wrong-source', 'wrong-unit', 'unexpected-empty', 'unexpected-de-completat']);
  const critical = rows.filter((r) => criticalSet.has(r.status));
  if (critical.length) {
    const compact = critical.slice(0, 40).map((r, i) => `${i + 1}. [${r.fixture}] ${r.annex} ${r.subpoint} ${r.field} => ${r.status}`).join('\n');
    throw new Error(`Global SSI audit found ${critical.length} critical issues.\n${compact}`);
  }
});
