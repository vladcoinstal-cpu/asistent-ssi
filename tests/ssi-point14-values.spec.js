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

test('1.4 value checks across 3 memorii + reset/no leakage', async ({ page }) => {
  await page.goto('/');

  let previousProjectMarker = null;
  for (const fx of FIXTURES) {
    await newProject(page, fx.project);
    const text = fs.readFileSync(path.join(__dirname, '..', 'test-fixtures', fx.file), 'utf8');
    await addAndExtract(page, text);

    await page.locator('[data-tab-target="normalTab"]').click();
    const normal = await page.locator('#normalReportOutput').inputValue();
    expect(normal).toMatch(/1\.4\./);
    expect(normal).toMatch(/1\.4\.a[\s\S]*:/i);
    expect(normal).toMatch(/1\.4\.b[\s\S]*:/i);
    expect(normal).toMatch(/1\.4\.c[\s\S]*:/i);
    expect(normal).toMatch(/1\.4\.d[\s\S]*:/i);
    expect(normal).toMatch(/1\.4\.e[\s\S]*:/i);
    expect(normal).toMatch(/1\.4\.f[\s\S]*:/i);
    expect(normal).toMatch(/1\.4\.g[\s\S]*:/i);
    expect(normal).toMatch(/\n2\./);

    await page.locator('[data-tab-target="preliminaryTab"]').click();
    const prelim = await page.locator('#preliminaryReportOutput').inputValue();
    expect(prelim).toMatch(/1\.4\./);
    expect(prelim).toMatch(/tipul clădirii|tipul parcajului|regimul de înălțime|numărul maxim de utilizatori/i);
    expect(prelim).toMatch(/\n2\./);

    for (const re of fx.expect) {
      expect((normal + '\n' + prelim)).toMatch(re);
    }

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
