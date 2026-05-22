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


const FIELD_ALIASES = [
  [/beneficiar\s*\/\s*proprietar/i, ['proprietar/beneficiar','beneficiar / proprietar']],
  [/proprietar\s*\/\s*beneficiar/i, ['beneficiar / proprietar','proprietar/beneficiar']],
  [/adresa|adresă/i, ['adresa','adresă']],
  [/func[țt]iuni\s+principale/i, ['functiuni principale','funcțiuni principale']],
  [/func[țt]iuni\s+secundare/i, ['functiuni secundare','funcțiuni secundare']],
  [/func[țt]iuni\s+conexe/i, ['functiuni conexe','funcțiuni conexe']],
  [/categoria\s+de\s+importan/i, ['categoria de importanta','categoria de importanță']],
  [/clasa\s+de\s+importan/i, ['clasa de importanta','clasa de importanță']]
];

function labelCandidates(label){
  const base=String(label||'').toLowerCase().trim();
  const out=new Set([base]);
  for(const [re,alts] of FIELD_ALIASES){ if(re.test(base)) alts.forEach(a=>out.add(String(a).toLowerCase())); }
  return [...out];
}


function normToken(v){
  return String(v||'').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g,'')
    .replace(/[^a-z0-9]+/g,' ')
    .replace(/\s+/g,' ')
    .trim();
}

function findFieldLine(block, label) {
  const keys = labelCandidates(label);
  const normKeys = keys.map(normToken).filter(Boolean);
  const lines = String(block || '').split('\n').map((x) => x.trim()).filter(Boolean);
  return lines.find((ln) => {
    const low = ln.toLowerCase();
    if (keys.some((k)=>low.includes(k))) return true;
    const nln = normToken(ln);
    return normKeys.some((nk)=> nk && (nln.includes(nk) || nk.split(' ').every(part=>nln.includes(part))));
  }) || '';
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



function ruleMeta(subpointCode, fieldLabel, fixtureName) {
  const field = String(fieldLabel || '').toLowerCase();
  const sp = String(subpointCode || '');
  const requirement = `${sp} / ${fieldLabel}`;
  let referenceRule = (fixtureName === 'Sprenghi' && /^1\./.test(sp)) ? 'v58/v85 point-1 reference available' : 'no strict v58/v85 reference';
  let testRef = 'tests/ssi-full-audit.spec.js';
  if (/^2\.A/.test(sp)) referenceRule = 'v58/v85: secțiune risc incendiu + densitate/prop. materiale';
  if (/^2\.B/.test(sp)) referenceRule = 'v58/v85: procese tehnologice/substanțe periculoase (Legea 59/2016)';
  if (/^3\.1/.test(sp)) referenceRule = 'v58/v85: rezistență + reacție la foc, separat';
  if (/^3\.2/.test(sp)) referenceRule = 'v58/v85: limitare propagare la vecinătăți';
  if (/^3\.3/.test(sp)) referenceRule = 'v58/v85: evacuare utilizatori + fluxuri';
  if (/^3\.4/.test(sp)) referenceRule = 'v58/v85: acces intervenție';
  if (/adres/.test(field)) testRef = 'tests/ssi-point123-values.spec.js';
  else if (/regimul|înălțimea|volumul|aria/.test(field)) testRef = 'tests/ssi-point14-reference.spec.js';
  else if (/depozitare/.test(field)) testRef = 'tests/ssi-point14-semantic-storage.test.js';
  return { requirement, referenceRule, testRef };
}


function isLabelOnlyLine(line, fieldLabel) {
  const l = String(line || '').toLowerCase().trim();
  const fld = String(fieldLabel || '').toLowerCase().trim();
  if (!l || !fld) return false;
  const norm = (v) => v.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  const stripPrefix = (v) => v
    .replace(/^[-–—]+\s*/, '')
    .replace(/^(?:\d+\s+){1,5}[a-z]?\s+/i, '')
    .replace(/^\d+(?:\.\d+)*(?:\.[a-z])?\s+/i, '')
    .replace(/^\d+\.[a-z]\s+/i, '')
    .replace(/^[ivxlcdm]+\.\s+/i, '')
    .replace(/^\d+\s+/i, '')
    .replace(/[:]+\s*$/, '')
    .trim();

  const nl = stripPrefix(norm(l));
  const nf = stripPrefix(norm(fld));
  if (!nl || !nf) return false;

  if (nl === nf) return true;
  if (nl === `${nf} de completat`) return true;
  if (nl === `${nf} de completat.`) return true;
  if (nl === `${nf} -`) return true;

  const remainder = nl.startsWith(`${nf} `) ? nl.slice(nf.length).trim() : '';
  if (!remainder) return true;
  if (/^[:\-–—]+$/.test(remainder)) return true;

  const afterColon = remainder.includes(':') ? remainder.split(':').slice(1).join(':').trim() : '';
  if (afterColon && /[a-z0-9]/i.test(afterColon) && afterColon.length >= 2) return false;

  const cleanRem = remainder.replace(/^[:\-–—]+\s*/, '').trim();
  if (!cleanRem) return true;
  if (/[a-z0-9]/i.test(cleanRem) && cleanRem.length >= 2) return false;
  return true;
}


function findBestFieldLine(block, label) {
  const lines = String(block || '').split('\n').map((x) => x.trim()).filter(Boolean);
  const keys = labelCandidates(label);
  let first = '';
  for (const ln of lines) {
    const low = ln.toLowerCase();
    if (!keys.some((k) => low.includes(k))) continue;
    if (!first) first = ln;
    if (!isLabelOnlyLine(ln, label)) return ln;
  }
  return first;
}

function analyzeField({ fixture, subpointCode, fieldLabel, fieldLine, block, rawSource }) {
  const line = String(fieldLine || '');
  const low = line.toLowerCase();
  const expectedSourceData = hasSourceDataForField(rawSource, fieldLabel);
  const isPoint1 = /^1(\.|$)/.test(String(subpointCode || ''));

  if (!block) return { status: expectedSourceData && fixture.kind !== 'empty' ? 'field-line-not-detected' : 'de-completat-or-empty', cause: isPoint1 ? 'subpoint block absent' : 'subpoint not rendered in current flow', missingRule: 'render-template-population', recommendedFix: 'Ensure section/subpoint rendering and/or global field lookup.' };
  if (!line) {
    return { status: expectedSourceData && fixture.kind !== 'empty' ? 'field-line-not-detected' : 'de-completat-or-empty', cause: 'field line absent for this label', missingRule: 'field-mapping-line', recommendedFix: 'Map template field label aliases to semantic/source value.' };
  }

  if (/de completat/.test(low)) {
    if (expectedSourceData && fixture.kind !== 'empty') return { status: 'unexpected-de-completat', cause: 'source has data but output kept placeholder', missingRule: 'data-availability-override', recommendedFix: 'Populate from semantic/extracted value when source data exists.' };
    return { status: 'de-completat-or-empty', cause: 'placeholder allowed (no source data)', missingRule: '-', recommendedFix: '-' };
  }

  if (/^[-–—: ]*$/.test(line.replace(/[\s\u00a0]/g, ''))) {
    return { status: expectedSourceData ? 'unexpected-empty' : 'de-completat-or-empty', cause: expectedSourceData ? 'empty despite source data' : 'empty allowed', missingRule: expectedSourceData ? 'non-empty-when-source-exists' : '-', recommendedFix: expectedSourceData ? 'Populate value from semantic/source.' : '-' };
  }

  if (isLabelOnlyLine(line, fieldLabel)) {
    return { status: expectedSourceData && fixture.kind !== 'empty' ? 'unexpected-empty' : 'de-completat-or-empty', cause: 'line contains heading/label without effective value', missingRule: 'value-required-not-heading-only', recommendedFix: 'Populate concrete value after field label.' };
  }

  if (/beneficiar|proprietar/i.test(fieldLabel) && /(str\.|municipiul|jude[țt]ul)/i.test(line)) return { status: 'contaminated', cause: 'beneficiary line includes address tokens', missingRule: 'beneficiary-address-separation', recommendedFix: 'Sanitize beneficiary against address phrases.' };

  if (/adres/i.test(fieldLabel)) {
    if (/profilul de activitate|date de contact beneficiar/i.test(line)) return { status: 'contaminated', cause: 'address line includes data from other subfields', missingRule: 'address-field-isolation', recommendedFix: 'Strip trailing sections from address text.' };
    if (/municipiul\s+bra[șs]ov,\s*str\s*$/i.test(line)) return { status: 'truncated', cause: 'address truncated at street token', missingRule: 'full-address-preservation', recommendedFix: 'Preserve complete str./nr./județ values.' };
    if (fixture.name === 'Sprenghi' && !/m[ăa]r[ăa][șs]e[șs]ti\s*nr\.?\s*47,\s*jude[țt]ul\s+bra[șs]ov/i.test(line)) return { status: 'wrong-value', cause: 'does not match Sprenghi reference address', missingRule: 'reference-v58-v85-address', recommendedFix: 'Use semantic reference-compatible address for Sprenghi.' };
  }

  if (/regimul de înălțime|volumul construcției|aria construită|aria desfășurată|înălțimea maximă/i.test(fieldLabel) && /\d/.test(line) && !/(m²|m³|\bm\b|m2|m3|mp|mc)/i.test(line)) return { status: 'wrong-unit', cause: 'dimension value without expected unit marker', missingRule: 'dimension-unit-normalization', recommendedFix: 'Normalize to m / m² / m³ units.' };

  if (/capacități de depozitare|capacitati de depozitare/i.test(fieldLabel) && /bucătărie|gaze naturale|linie caldă/i.test(line)) return { status: 'wrong-source', cause: 'storage line includes kitchen/gas process text', missingRule: 'storage-context-filtering', recommendedFix: 'Restrict storage extraction to storage context sentences only.' };

  return { status: 'ok', cause: 'passed rule checks', missingRule: '-', recommendedFix: '-' };
}

function buildRows({ fixture, annexName, outputText, templateRows, rawSource }) {
  const rows = [];
  for (const t of templateRows) {
    const block = blockForCode(outputText, t.subpointCode);
    const isPoint1 = /^1(\.|$)/.test(String(t.subpointCode || ''));
    const subpointStatus = block ? 'ok' : (isPoint1 ? 'missing' : 'de-completat-or-empty');
    rows.push({ fixture: fixture.name, annex: annexName, subpoint: t.subpointCode, field: '-', check: 'subpoint_exists', status: subpointStatus, expected: `Subpoint ${t.subpointCode} present in output`, actual: block ? 'present' : 'missing', cause: block ? 'rendered' : (isPoint1 ? 'template/render omission' : 'not implemented in current render flow'), missingRule: block ? '-' : (isPoint1 ? 'subpoint-render-presence' : 'global-render-coverage'), recommendedFix: block ? '-' : (isPoint1 ? 'Ensure template subpoint exists in output renderer.' : 'Implement this subpoint in renderer and keep global audit coverage enabled.'), evidence: block.slice(0, 220) });

    for (const f of t.fields) {
      const label = String(f.label || f.title || '').trim();
      if (!label) continue;
      let fieldLine = findBestFieldLine(block, label);
      if (!fieldLine) {
        fieldLine = findBestFieldLine(outputText, label) || findFieldLine(outputText, label);
      }
      const res = analyzeField({ fixture, subpointCode: t.subpointCode, fieldLabel: label, fieldLine, block, rawSource });
      const meta = ruleMeta(t.subpointCode, label, fixture.name);
      rows.push({ fixture: fixture.name, annex: annexName, subpoint: t.subpointCode, field: label, check: 'field_rule', status: res.status, expected: `${label}: expected value / expected De completat / forbidden patterns / source`, actual: fieldLine || '(missing)', cause: res.cause, missingRule: res.missingRule, recommendedFix: res.recommendedFix, evidence: block.slice(0, 260), requirement: meta.requirement, sourceData: hasSourceDataForField(rawSource, label) ? 'detected-in-memoriu' : 'not-detected-in-memoriu', referenceRule: meta.referenceRule, outputNormal: annexName.includes('normal') ? (fieldLine || '(missing)') : '-', outputPrelim: annexName.includes('preliminar') ? (fieldLine || '(missing)') : '-', difference: res.status === 'ok' ? 'none' : res.status, testRef: meta.testRef });
    }
  }
  return rows;
}

function reportMarkdown(rows) {
  const generated = new Date().toISOString();
  const statuses = ['ok', 'missing', 'truncated', 'contaminated', 'wrong-value', 'wrong-source', 'wrong-unit', 'unexpected-empty', 'unexpected-de-completat', 'de-completat-or-empty', 'coverage-gap-subpoint', 'field-line-not-detected'];
  const counts = Object.fromEntries(statuses.map((s) => [s, rows.filter((r) => r.status === s).length]));
  const criticalSet = new Set(['missing', 'truncated', 'contaminated', 'wrong-value', 'wrong-source', 'wrong-unit', 'unexpected-empty', 'unexpected-de-completat']);
  const critical = rows.filter((r) => criticalSet.has(r.status));
  const totalSubpoints = new Set(rows.filter((r) => r.check === 'subpoint_exists').map((r) => `${r.annex}|${r.subpoint}`)).size;
  const totalFields = rows.filter((r) => r.check === 'field_rule').length;
  const valueOk = rows.filter((r) => r.check === 'field_rule' && r.status === 'ok').length;
  const placeholderJustified = rows.filter((r) => r.check === 'field_rule' && r.status === 'de-completat-or-empty').length;
  const neimplementate = rows.filter((r) => ['coverage-gap-subpoint', 'field-line-not-detected'].includes(r.status)).length;
  const semanticMissing = rows.filter((r) => r.missingRule && r.missingRule !== '-').length;

  const matrix = ['| Fixture | Annexa | Subpoint | Field | Requirement | Source data | v58/v85 rule | Output normal | Output preliminar | Difference | Missing semantic rule | Proposed fix | Test | Status |', '|---|---|---|---|---|---|---|---|---|---|---|---|---|---|', ...rows.map((r) => `| ${r.fixture} | ${r.annex} | ${r.subpoint} | ${String(r.field).replace(/\|/g, '/')} | ${String(r.requirement || r.expected || '-').replace(/\|/g,'/')} | ${r.sourceData || '-'} | ${String(r.referenceRule || '-').replace(/\|/g,'/')} | ${String(r.outputNormal || (r.annex.includes('normal') ? r.actual : '-')).replace(/\|/g,'/')} | ${String(r.outputPrelim || (r.annex.includes('preliminar') ? r.actual : '-')).replace(/\|/g,'/')} | ${String(r.difference || r.status).replace(/\|/g,'/')} | ${String(r.missingRule).replace(/\|/g, '/')} | ${String(r.recommendedFix).replace(/\|/g, '/')} | ${r.testRef || 'tests/ssi-full-audit.spec.js'} | ${r.status} |`)].join('\n');

  const criticalList = critical.length ? critical.map((r, i) => `${i + 1}. [${r.fixture}] ${r.annex} ${r.subpoint} / ${r.field}\n   - status: ${r.status}\n   - cause: ${r.cause}\n   - missing rule: ${r.missingRule}\n   - recommended fix: ${r.recommendedFix}\n   - actual: ${r.actual}`).join('\n\n') : 'No critical issues.';

  return `# SSI Full Audit Report (Global – Anexa 4 + Anexa 5)\n\nGenerated: ${generated}\n\n## Coverage\n- All subpoints from templates: ${flattenTemplate(normalTemplate).length} (normal) + ${flattenTemplate(prelimTemplate).length} (preliminar)\n- Fixtures: ${CASES.map((c) => c.name).join(', ')}\n- Includes: Sprenghi v58/v85 where references exist, 3 memorii, empty skeleton, reset/no-leakage\n\n## Comparativ numeric (baseline → curent)\n- field-line-not-detected: 138 → ${counts['field-line-not-detected']}\n- coverage-gap-subpoint: 23 → ${counts['coverage-gap-subpoint']}\n\n## Global quality counters\n- total subpoints audited: ${totalSubpoints}\n- total field rules audited: ${totalFields}\n- fields correct value: ${valueOk}\n- placeholder justified: ${placeholderJustified}\n- neimplementate / coverage gap: ${neimplementate}\n- missing semantic rules flagged: ${semanticMissing}\n\n## Status summary\n${statuses.map((s) => `- ${s}: ${counts[s]}`).join('\n')}\n\n## Critical issues\n${criticalList}\n\n## Full matrix (all subpoints/fields)\n${matrix}\n`;
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
  const counts = ['field-line-not-detected','coverage-gap-subpoint','wrong-value','contaminated','unexpected-de-completat']
    .map((k)=>`${k}=${rows.filter((r)=>r.status===k).length}`).join(' | ');
  console.log(`[SSI-AUDIT-SUMMARY] ${counts}`);
  console.log('[SSI-AUDIT-MD-START]');
  console.log(md);
  console.log('[SSI-AUDIT-MD-END]');

  const criticalSet = new Set(['truncated', 'contaminated', 'wrong-value', 'wrong-source', 'wrong-unit', 'unexpected-empty', 'unexpected-de-completat']);
  const critical = rows.filter((r) => criticalSet.has(r.status));
  if (critical.length) {
    const compact = critical.slice(0, 60).map((r, i) => `${i + 1}. [${r.fixture}] ${r.annex} ${r.subpoint} ${r.field} => ${r.status}`).join('\n');
    throw new Error(`Global SSI audit found ${critical.length} critical issues.\n${compact}`);
  }
});
