const { test, expect } = require('@playwright/test');

const MEM_A = `Denumirea obiectivului: Proiect A\nBeneficiar: Beneficiar A\nAdresa: Str. A nr. 1\nDestinatia: comert\nCategoria de importanta: C\nTipul cladirii: civila\nTipul parcajului: parcaj subteran\nRegim de inaltime: P+1; aria construita 500 mp; aria desfasurata 900 mp; volum 3200 mc\nNumar maxim de utilizatori: 120 persoane\nCapacitati de depozitare: rafturi marfuri 20 mc\nCai de evacuare: doua cai.`;
const MEM_B = `Denumirea obiectivului: Proiect B\nBeneficiar: Beneficiar B\nAdresa: Str. B nr. 2\nDestinatia: birouri\nCategoria de importanta: D\nTipul cladirii: mixta\nTipul parcajului: nu este cazul\nRegim de inaltime: P; aria construita 300 mp; aria desfasurata 300 mp; volum 1200 mc\nNumar maxim de utilizatori: 35 persoane\nCapacitati de depozitare: nu este cazul\nCai de evacuare: o cale.`;

async function newProject(page, name) {
  page.once('dialog', async d => d.accept(name));
  await page.locator('#projectAddBtn').click();
}

async function addManualAndExtract(page, text) {
  await page.locator('#manualText').fill(text);
  await page.locator('#addTextBtn').click();
  page.once('dialog', async d => d.accept());
  await page.locator('#extractBtn').click();
}

test('template flow new/reset/extract point1 only', async ({ page }) => {
  await page.goto('/');
  await newProject(page, 'Template Flow');

  await page.locator('[data-tab-target="normalTab"]').click();
  await expect(page.locator('#normalReportOutput')).toHaveValue(/SSI normal - schelet gol \(Anexa 4\)/);
  await page.locator('[data-tab-target="preliminaryTab"]').click();
  await expect(page.locator('#preliminaryReportOutput')).toHaveValue(/SSI preliminar - schelet gol \(Anexa 5\)/);

  await page.locator('[data-tab-target="sourcesTab"]').click();
  await addManualAndExtract(page, MEM_A);
  const summaryA = page.locator('#projectFactsSummary');
  await expect(summaryA).toContainText('Proiect A');
  await expect(summaryA).toContainText('Beneficiar A');
  await expect(summaryA).toContainText(/parcaj/i);
  await expect(summaryA).toContainText(/120/);

  await page.locator('[data-tab-target="issuesTab"]').click();
  await expect(page.locator('#issuesOutput')).not.toContainText(/Surse analizate|Legislație relevantă detectată|Verificare normativă automată|Acoperire reguli/i);

  await page.locator('[data-tab-target="sourcesTab"]').click();
  await page.locator('#resetBtn').click();
  await expect(page.locator('#sourceCount')).toHaveText('0');
  await page.locator('[data-tab-target="normalTab"]').click();
  await expect(page.locator('#normalReportOutput')).toHaveValue(/SSI normal - schelet gol \(Anexa 4\)/);

  await page.locator('[data-tab-target="sourcesTab"]').click();
  await addManualAndExtract(page, MEM_B);
  const summaryB = page.locator('#projectFactsSummary');
  await expect(summaryB).toContainText('Proiect B');
  await expect(summaryB).toContainText('Beneficiar B');
  await expect(summaryB).not.toContainText('Proiect A');
  await expect(summaryB).not.toContainText('Beneficiar A');

  // point 2-6 should not be filled in this phase
  await expect(summaryB).not.toContainText(/densitatea sarcinii termice|desfumare|hidranti|sprinklere|masuri compensatorii/i);
});
