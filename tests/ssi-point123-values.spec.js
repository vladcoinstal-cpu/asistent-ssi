const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const FIXTURES = [
  { file: 'memoriu-arhitectura-comercial-parcare-subsol.txt', project: 'P123 A', expectFn: /parcaj/i },
  { file: 'memoriu-arhitectura-industrial-depozitare.txt', project: 'P123 B', expectFn: /industrial|depozitare/i },
  { file: 'memoriu-arhitectura-restaurant-sala-aglomerata.txt', project: 'P123 C', expectFn: /restaurant|sal[ăa]/i }
];

test('1.1-1.3 semantic integration + anti-contamination + reset/no-leakage', async ({ page }) => {
  await page.goto('/');
  let previousMarker = null;

  for (const fx of FIXTURES) {
    await expect.poll(async () => page.evaluate(() => Boolean(window.__ssiTemplateStatus?.ready)), { timeout: 15000 }).toBeTruthy();
    await page.evaluate((n) => window.__ssiCommands?.newProject?.(n), fx.project);
    const text = fs.readFileSync(path.join(__dirname, '..', 'test-fixtures', fx.file), 'utf8');
    await page.evaluate((t) => window.__ssiCommands?.addManualText?.(t, 'src-123'), text);
    await page.evaluate(async () => window.__ssiCommands?.extractData?.());

    const normal = await page.locator('#normalReportOutput').inputValue();
    const prelim = await page.locator('#preliminaryReportOutput').inputValue();
    const both = `${normal}\n${prelim}`;

    expect(both).toMatch(/1\.1|Datele de identificare/i);
    expect(both).toMatch(/1\.2|Destina/i);
    expect(both).toMatch(/1\.3|Categoria/i);

    expect(both).toMatch(fx.expectFn);
    expect(both).toMatch(/beneficiar|proprietar/i);
    expect(both).toMatch(/adres[ăa]/i);

    const denLine = (both.match(/(?:denumire|denumirea obiectivului)[^\n]*/i) || [''])[0];
    expect(denLine).not.toMatch(/beneficiar|adresa/i);

    const benLine = (both.match(/(?:beneficiar|proprietar)[^\n]*/i) || [''])[0];
    expect(benLine).not.toMatch(/str\.|municipiul|orasul|jude/gi);

    const catLine = (both.match(/categoria[^\n]*/i) || [''])[0];
    expect(catLine).not.toMatch(/regim|aria|volum|utilizatori/i);

    if (previousMarker) {
      expect(normal).not.toMatch(previousMarker);
      expect(prelim).not.toMatch(previousMarker);
    }
    previousMarker = new RegExp(fx.project.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

    await page.locator('[data-tab-target="sourcesTab"]').click();
    await page.locator('#resetBtn').click();
    await expect(page.locator('#sourceCount')).toHaveText('0');
  }
});
