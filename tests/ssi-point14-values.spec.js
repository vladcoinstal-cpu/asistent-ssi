const { test, expect } = require('@playwright/test');

const MEM = `Denumirea obiectivului: Proiect A\nBeneficiar: Beneficiar A\nAdresa: Str. A nr. 1\nDestinatia: comert\nCategoria de importanta: C\nTipul cladirii: civila\nTipul parcajului: parcaj subteran\nRegim de inaltime: P+1; aria construita 500 mp; aria desfasurata 900 mp; volum 3200 mc\nNumar maxim de utilizatori: 120 persoane\nCapacitati de depozitare: rafturi marfuri 20 mc\nCai de evacuare: doua cai.`;

async function createProject(page, name) {
  await expect.poll(async () => page.evaluate(() => Boolean(window.__ssiTemplateStatus?.ready)), { timeout: 15000 }).toBeTruthy();
  const id = await page.evaluate((n) => window.__ssiCommands?.newProject?.(n), name);
  expect(id).toBeTruthy();
}

async function extractWithManual(page, text) {
  await page.evaluate((t) => window.__ssiCommands?.addManualText?.(t, 'Audit 1.4 source'), text);
  await expect(page.locator('#sourceCount')).not.toHaveText(/^0$/);
  await page.evaluate(async () => window.__ssiCommands?.extractData?.());
}

test('point 1.4 values mapped in normal/preliminar and no spill in 2-6', async ({ page }) => {
  await page.goto('/');
  await createProject(page, 'Audit 1.4');
  await extractWithManual(page, MEM);

  await page.locator('[data-tab-target="normalTab"]').click();
  const normal = await page.locator('#normalReportOutput').inputValue();
  expect(normal).toMatch(/1\.4\.a[\s\S]*civila/i);
  expect(normal).toMatch(/1\.4\.b[\s\S]*parcaj subteran/i);
  expect(normal).toMatch(/1\.4\.c[\s\S]*P\+1/i);
  expect(normal).toMatch(/1\.4\.d[\s\S]*120 persoane/i);
  expect(normal).toMatch(/1\.4\.f[\s\S]*rafturi marfuri/i);
  expect(normal).toMatch(/1\.4\.g[\s\S]*doua cai/i);
  expect(normal).toMatch(/\n2\./);
  const after2n = normal.split(/\n2\./i)[1] || '';
  expect(after2n).not.toMatch(/Proiect A|Beneficiar A|120 persoane|rafturi marfuri|doua cai/i);

  await page.locator('[data-tab-target="preliminaryTab"]').click();
  const prelim = await page.locator('#preliminaryReportOutput').inputValue();
  expect(prelim).toMatch(/1\.4[\s\S]*tipul clădirii[\s\S]*civila/i);
  expect(prelim).toMatch(/1\.4[\s\S]*tipul parcajului[\s\S]*parcaj subteran/i);
  expect(prelim).toMatch(/1\.4[\s\S]*regimul de înălțime[\s\S]*P\+1/i);
  expect(prelim).toMatch(/1\.4[\s\S]*numărul maxim de utilizatori[\s\S]*120 persoane/i);
  expect(prelim).toMatch(/1\.4[\s\S]*capacități de depozitare[\s\S]*rafturi marfuri/i);
  expect(prelim).toMatch(/\n2\./);
  const after2p = prelim.split(/\n2\./i)[1] || '';
  expect(after2p).not.toMatch(/Proiect A|Beneficiar A|120 persoane|rafturi marfuri|doua cai/i);
});
