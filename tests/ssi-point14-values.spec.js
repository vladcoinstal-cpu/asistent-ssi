const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const FIXTURES = [
  { file: 'memoriu-arhitectura-comercial-parcare-subsol.txt', project: 'P14 A', expect: [/parcaj/i, /utilizatori/i] },
  { file: 'memoriu-arhitectura-industrial-depozitare.txt', project: 'P14 B', expect: [/depozit/i, /utilizatori/i] },
  { file: 'memoriu-arhitectura-restaurant-sala-aglomerata.txt', project: 'P14 C', expect: [/sala/i, /utilizatori/i] }
];

async function newProject(page, name) {
  await expect.poll(async () => page.evaluate(() => Boolean(window.__ssiTemplateStatus?.ready)), { timeout: 15000 }).toBeTruthy();
  const id = await page.evaluate((n) => window.__ssiCommands?.newProject?.(n), name);
  expect(id).toBeTruthy();
}

async function addAndExtract(page, text) {
  await page.evaluate((t) => window.__ssiCommands?.addManualText?.(t, 'P14 source'), text);
  await expect(page.locator('#sourceCount')).not.toHaveText(/^0$/);
  await page.evaluate(async () => window.__ssiCommands?.extractData?.());
}

function hasNonTruncatedMetric(line, unitPattern) {
  const m = line.match(new RegExp(`([0-9]{2,}(?:[ .][0-9]{3})*(?:[.,][0-9]+)?\\s*${unitPattern})`, 'i'));
  return Boolean(m);
}

test('1.4 semantic value checks across 3 memorii + reset/no leakage', async ({ page }) => {
  await page.goto('/');
  let previousProjectMarker = null;

  for (const fx of FIXTURES) {
    await newProject(page, fx.project);
    const text = fs.readFileSync(path.join(__dirname, '..', 'test-fixtures', fx.file), 'utf8');
    await addAndExtract(page, text);

    await page.locator('[data-tab-target="normalTab"]').click();
    const normal = await page.locator('#normalReportOutput').inputValue();
    await page.locator('[data-tab-target="preliminaryTab"]').click();
    const prelim = await page.locator('#preliminaryReportOutput').inputValue();

    const both = `${normal}\n${prelim}`;

    expect(normal).toMatch(/1\.4\./i);
    expect(prelim).toMatch(/1\.4\b/i);
    expect(normal).toMatch(/\n2\./);
    expect(prelim).toMatch(/\n2\./);

    // semantic separation checks
    const regimValue = ((prelim.match(/regimul de înălțime[^:]*:\s*([^\n]+)/i) || [])[1] || '').trim();
    if (regimValue) {
      expect(regimValue).not.toMatch(/aria\s+construit|aria\s+desf|înălțimea\s+maximă/i);
    }

    const ariaConstruitaLine = (both.match(/aria\s+construit[ăa][^\n]*/i) || [''])[0];
    expect(ariaConstruitaLine).not.toMatch(/:\s*1\s*(?:$|\n)/i);
    expect(hasNonTruncatedMetric(ariaConstruitaLine, 'm(?:2|²)')).toBeTruthy();

    const ariaDesfasurataLine = (both.match(/aria\s+desf[ăa][șs]urat[ăa][^\n]*/i) || [''])[0];
    expect(hasNonTruncatedMetric(ariaDesfasurataLine, 'm(?:2|²)')).toBeTruthy();

    const volumLine = (both.match(/volum(?:ul)?[^\n]*/i) || [''])[0];
    expect(volumLine).not.toMatch(/:\s*8\s*(?:$|\n)/i);
    expect(hasNonTruncatedMetric(volumLine, 'm(?:3|³)')).toBeTruthy();

    const storageLine = (both.match(/capacit[ăa]ți?\s+de\s+depozitare[^\n]*/i) || [''])[0];
    if (!/depozit/i.test(storageLine)) {
      expect(storageLine).not.toMatch(/bucătărie|gaze/i);
    }

    for (const re of fx.expect) expect(both).toMatch(re);

    if (previousProjectMarker) {
      expect(normal).not.toMatch(previousProjectMarker);
      expect(prelim).not.toMatch(previousProjectMarker);
    }
    previousProjectMarker = new RegExp(fx.project.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

    await page.locator('[data-tab-target="sourcesTab"]').click();
    await page.locator('#resetBtn').click();
    await expect(page.locator('#sourceCount')).toHaveText('0');
    await page.locator('[data-tab-target="normalTab"]').click();
    await expect(page.locator('#normalReportOutput')).toHaveValue(/SSI normal - schelet gol \(Anexa 4\)/);
  }
});
