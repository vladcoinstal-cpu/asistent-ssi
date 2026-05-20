const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const CASES = [
  { name: 'Sprenghi', file: 'memoriu-sprenghi-1.1-1.4-curat.txt' },
  { name: 'Comercial Parcaj', file: 'memoriu-arhitectura-comercial-parcare-subsol.txt' },
  { name: 'Industrial Depozitare', file: 'memoriu-arhitectura-industrial-depozitare.txt' },
  { name: 'Restaurant Sala', file: 'memoriu-arhitectura-restaurant-sala-aglomerata.txt' }
];

function section(text, start, end) {
  const re = new RegExp(`(?:^|\\n)\\s*${start}\\.?[\\s\\S]*?(?=(?:\\n\\s*${end}\\.?)|$)`, 'i');
  return (text.match(re) || [''])[0].trim();
}

function pushIssue(issues, cat, subpoint, expected, actual, status, cause, rule, testRef) {
  issues.push({ cat, subpoint, expected, actual: (actual || '').slice(0, 220), status, cause, rule, test: testRef });
}

test('full SSI audit report (Anexa4/5 + references + fixtures) collects all differences', async ({ page }) => {
  const issues = [];
  await page.goto('/');
  await expect.poll(async () => page.evaluate(() => Boolean(window.__ssiTemplateStatus?.ready))).toBeTruthy();

  for (const c of CASES) {
    await page.evaluate((n) => window.__ssiCommands?.newProject?.(`AUDIT-${n}`), c.name);
    const src = fs.readFileSync(path.join(__dirname, '..', 'test-fixtures', c.file), 'utf8');
    await page.evaluate((t) => window.__ssiCommands?.addManualText?.(t, 'audit-src'), src);
    await page.evaluate(async () => window.__ssiCommands?.extractData?.());

    const normal = await page.locator('#normalReportOutput').inputValue();
    const prelim = await page.locator('#preliminaryReportOutput').inputValue();
    const both = `${normal}\n${prelim}`;

    const b11 = `${section(normal,'1\\.1','1\\.2')}\n${section(prelim,'1\\.1','1\\.2')}`;
    const b12 = `${section(normal,'1\\.2','1\\.3')}\n${section(prelim,'1\\.2','1\\.3')}`;
    const b13 = `${section(normal,'1\\.3','1\\.4')}\n${section(prelim,'1\\.3','1\\.4')}`;
    const b14 = `${section(normal,'1\\.4','2')}\n${section(prelim,'1\\.4','2')}`;

    if (!b11) pushIssue(issues,'identificare','1.1','bloc 1.1 prezent',b11,'lipsă','section parser','robust section extraction','tests/ssi-full-audit.spec.js');
    if (!b12) pushIssue(issues,'funcțiuni','1.2','bloc 1.2 prezent',b12,'lipsă','section parser','robust section extraction','tests/ssi-full-audit.spec.js');
    if (!b13) pushIssue(issues,'categorie','1.3','bloc 1.3 prezent',b13,'lipsă','section parser','robust section extraction','tests/ssi-full-audit.spec.js');
    if (!b14) pushIssue(issues,'dimensiuni/utilizatori/depozitare','1.4','bloc 1.4 prezent',b14,'lipsă','section parser','robust section extraction','tests/ssi-full-audit.spec.js');

    if (!/beneficiar|proprietar/i.test(b11)) pushIssue(issues,'identificare','1.1','beneficiar prezent',b11,'greșit','semantic mapping 1.1','buildSemantic123Model mapping','tests/ssi-point123-values.spec.js');
    if (!/adres[ăa]/i.test(b11)) pushIssue(issues,'identificare','1.1','adresa prezentă',b11,'lipsă','semantic mapping 1.1','buildSemantic123Model mapping','tests/ssi-point123-values.spec.js');
    if (/beneficiar[^\n]*(str\.|municipiul)|proprietar[^\n]*(str\.|municipiul)/i.test(b11)) pushIssue(issues,'identificare','1.1','beneficiar separat de adresă',b11,'contaminat','field contamination','sanitize beneficiary/address','tests/ssi-point123-values.spec.js');

    if (c.name === 'Sprenghi') {
      if (!/\bcult\b/i.test(b12)) pushIssue(issues,'funcțiuni','1.2','cult',b12,'greșit','destination tags','deriveFunctionTags context','tests/ssi-sprenghi-output-audit.spec.js');
      if (/parcaj|industrial|birouri|depozitare/i.test(b12)) pushIssue(issues,'funcțiuni','1.2','fără parcaj/industrial/birouri/depozitare',b12,'contaminat','cross-context tags','source scoping 1.1-1.4','tests/ssi-sprenghi-output-audit.spec.js');
      if (!/categoria\s*C/i.test(b13)) pushIssue(issues,'categorie','1.3','categoria C',b13,'lipsă','category parsing','semantic category mapping','tests/ssi-sprenghi-output-audit.spec.js');
      if (!/D\+P\+Sp\+M/i.test(b14)) pushIssue(issues,'dimensiuni','1.4.c','D+P+Sp+M',b14,'greșit','dimension parse','parseDimensionParts','tests/ssi-point14-reference.spec.js');
      if (!/350,75\s*m(?:2|²)/i.test(b14)) pushIssue(issues,'dimensiuni','1.4.d','350,75 m²',b14,'trunchiat','dimension parse','extractMeasurement+unit normalization','tests/ssi-point14-reference.spec.js');
      if (!/693,08\s*m(?:2|²)/i.test(b14)) pushIssue(issues,'dimensiuni','1.4.d','693,08 m²',b14,'trunchiat','dimension parse','extractMeasurement+unit normalization','tests/ssi-point14-reference.spec.js');
      if (!/2900\s*m(?:3|³)/i.test(b14)) pushIssue(issues,'dimensiuni','1.4.c','2900 m³',b14,'trunchiat','dimension parse','extractMeasurement+unit normalization','tests/ssi-point14-reference.spec.js');
    }

    if (/capacit[ăa]ți[^\n]*(bucătărie|gaze|linie caldă)/i.test(b14)) pushIssue(issues,'depozitare','1.4.h','fără text bucătărie/gaze',b14,'contaminat','storage model','deriveStorageModel context filtering','tests/ssi-point14-semantic-storage.test.js');
    if (!/utilizatori|persoane/i.test(b14)) pushIssue(issues,'utilizatori','1.4.g','utilizatori/persoane prezente',b14,'lipsă','users mapping','buildSemanticStructuredData users','tests/ssi-point14-values.spec.js');

    await page.locator('[data-tab-target="sourcesTab"]').click();
    await page.locator('#resetBtn').click();
    await expect(page.locator('#sourceCount')).toHaveText('0');
  }

  const reportLines = issues.map((i, idx) => `${idx + 1}. [${i.cat}] ${i.subpoint} | ${i.status}\n   expected: ${i.expected}\n   actual: ${i.actual}\n   cause: ${i.cause}\n   rule: ${i.rule}\n   test: ${i.test}`);
  const report = `# SSI Full Audit Report\n\nCases: ${CASES.map(c => c.name).join(', ')}\n\n${reportLines.join('\n\n') || 'No differences found.'}\n`;
  fs.writeFileSync(path.join(__dirname, '..', 'audit-full-ssi-output.md'), report);

  if (issues.length) {
    throw new Error(`SSI full audit found ${issues.length} issue(s).\n\n${reportLines.join('\n\n')}`);
  }
});
