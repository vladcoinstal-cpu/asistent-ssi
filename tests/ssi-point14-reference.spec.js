const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

function stripTags(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}
function expectWithContext(value, regex, label, context) {
  if (!regex.test(value)) {
    throw new Error(`${label} mismatch.\n--- NORMAL 1.4 ---\n${context.normal14}\n--- PRELIM 1.4 ---\n${context.prelim14}\n--- SEMANTIC 1.4 ---\n${context.semantic}`);
  }
}

function collectReference14Values(file) {
  const html = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  const text = stripTags(html);
  return {
    regim: /D\+P\+Sp\+M/i.test(text),
    inaltime: /20,98\s*m/i.test(text),
    ariaConstruita: /350,75\s*m2/i.test(text),
    ariaDesfasurata: /693,08\s*m2/i.test(text),
    volum: /2900\s*m3/i.test(text),
    depozitare: /spații de depozitare[^.]*36\s*m2/i.test(text)
  };
}

async function runExtract(page, fixtureName) {
  await page.goto('/');
  await expect.poll(async () => page.evaluate(() => Boolean(window.__ssiTemplateStatus?.ready)), { timeout: 15000 }).toBeTruthy();
  await page.evaluate(() => window.__ssiCommands?.newProject?.('Sprenghi-Ref'));
  const src = fs.readFileSync(path.join(__dirname, '..', 'test-fixtures', fixtureName), 'utf8');
  const emptyNormal = await page.locator('#normalReportOutput').inputValue();
  const emptyPrelim = await page.locator('#preliminaryReportOutput').inputValue();
  expect(emptyNormal).toContain('SSI normal - schelet gol (Anexa 4)');
  expect(emptyPrelim).toContain('SSI preliminar - schelet gol (Anexa 5)');

  await page.evaluate((t) => window.__ssiCommands?.addManualText?.(t, 'sprenghi-src'), src);
  await page.evaluate(async () => window.__ssiCommands?.extractData?.());

  return {
    normal: await page.locator('#normalReportOutput').inputValue(),
    prelim: await page.locator('#preliminaryReportOutput').inputValue(),
    semantic14: await page.evaluate(() => window.__ssiCommands?.getSemantic14?.())
  };
}

test('1.4 values match v58/v85 semantic references for Sprenghi', async ({ page }) => {
  const referenceNormal = collectReference14Values('ssi-normal-v58.html');
  const referencePrelim = collectReference14Values('ssi-preliminar-v85.html');
  const out = await runExtract(page, 'memoriu-sprenghi-reference.txt');
  const both = `${out.normal}\n${out.prelim}`;
  const normal14 = ((out.normal.match(/1\.4\.[\s\S]*?(?:\n2\.|$)/i) || [])[0] || '').trim();
  const prelim14 = ((out.prelim.match(/1\.4[\s\S]*?(?:\n2\.|$)/i) || [])[0] || '').trim();
  const ctx = { normal14, prelim14, semantic: JSON.stringify(out.semantic14, null, 2) };

  expect(referenceNormal.regim && referencePrelim.regim).toBeTruthy();
  expect(referenceNormal.inaltime && referencePrelim.inaltime).toBeTruthy();
  expect(referenceNormal.ariaConstruita && referencePrelim.ariaConstruita).toBeTruthy();
  expect(referenceNormal.ariaDesfasurata && referencePrelim.ariaDesfasurata).toBeTruthy();
  expect(referenceNormal.volum && referencePrelim.volum).toBeTruthy();

  expectWithContext(both, /regim[^\n]*D\+P\+Sp\+M/i, 'regim', ctx);
  expectWithContext(both, /[îi]n[ăa]l[țt]ime[^\n]*20,98\s*m/i, 'inaltime', ctx);
  expectWithContext(both, /aria\s+construit[ăa][^\n]*350,75\s*m(?:2|²)/i, 'aria construita', ctx);
  expectWithContext(both, /aria\s+desf[ăa][șs]urat[ăa][^\n]*693,08\s*m(?:2|²)/i, 'aria desfasurata', ctx);
  expectWithContext(both, /volum[^\n]*2900\s*m(?:3|³)/i, 'volum', ctx);
  expectWithContext(both, /capacit[ăa]ți?\s+de\s+depozitare[^\n]*36\s*m(?:2|²)/i, 'depozitare', ctx);
  expect(both).not.toMatch(/capacit[ăa]ți?\s+de\s+depozitare[^\n]*(bucătărie|gaze|proces)/i);
});
