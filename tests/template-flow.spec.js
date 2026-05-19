const { test, expect } = require('@playwright/test');

const MEM_A = `Denumirea obiectivului: Proiect A\nBeneficiar: Beneficiar A\nAdresa: Str. A nr. 1\nDestinatia: comert\nCategoria de importanta: C\nTipul cladirii: civila\nTipul parcajului: parcaj subteran\nRegim de inaltime: P+1; aria construita 500 mp; aria desfasurata 900 mp; volum 3200 mc\nNumar maxim de utilizatori: 120 persoane\nCapacitati de depozitare: rafturi marfuri 20 mc\nCai de evacuare: doua cai.`;
const MEM_B = `Denumirea obiectivului: Proiect B\nBeneficiar: Beneficiar B\nAdresa: Str. B nr. 2\nDestinatia: birouri\nCategoria de importanta: D\nTipul cladirii: mixta\nTipul parcajului: nu este cazul\nRegim de inaltime: P; aria construita 300 mp; aria desfasurata 300 mp; volum 1200 mc\nNumar maxim de utilizatori: 35 persoane\nCapacitati de depozitare: nu este cazul\nCai de evacuare: o cale.`;

async function newProject(page, name) { page.once('dialog', async d => d.accept(name)); await page.locator('#projectAddBtn').click(); }
async function addManualAndExtract(page, text) { await page.locator('#manualText').fill(text); await page.locator('#addTextBtn').click(); page.once('dialog', async d => d.accept()); await page.locator('#extractBtn').click(); }

function expectPoint1Only(text) {
  expect(text).toMatch(/Proiect|Beneficiar|Destinat|Categoria|tipul cladirii|parcaj|utilizatori|depozitare/i);
  expect(text).not.toMatch(/2\.A\.a|3\.1|4\.1|5\.A|6\./i);
}

test('template flow strict normal+preliminar with reset and no leakage', async ({ page }) => {
  await page.goto('/');
  // Template assets must be loaded (HTTP 200) and parsed before creating project
  const templateStatus = await page.evaluate(async () => {
    const [normalRes, prelimRes] = await Promise.all([
      fetch('ssi-normal-template-anexa4.json', { cache: 'no-store' }),
      fetch('ssi-preliminar-template-anexa5.json', { cache: 'no-store' })
    ]);
    return {
      normalHttp: normalRes.status,
      prelimHttp: prelimRes.status,
      stateStatus: window.__ssiTemplateLoadStatus || null
    };
  });
  expect(templateStatus.normalHttp).toBe(200);
  expect(templateStatus.prelimHttp).toBe(200);
  expect(templateStatus.stateStatus?.normalLoaded).toBeTruthy();
  expect(templateStatus.stateStatus?.preliminaryLoaded).toBeTruthy();
  expect(templateStatus.stateStatus?.normalSections).toBeGreaterThan(0);
  expect(templateStatus.stateStatus?.preliminarySections).toBeGreaterThan(0);

  await newProject(page, 'Template Flow');

  const normal = page.locator('#normalReportOutput');
  const prelim = page.locator('#preliminaryReportOutput');

  await page.locator('[data-tab-target="normalTab"]').click();
  await expect(normal).toHaveValue(/SSI normal - schelet gol \(Anexa 4\)/);
  await expect(normal).toHaveValue(/1\.4\.a tipul cladirii/);
  await expect(normal).toHaveValue(/1\.4\.g numarul cailor de evacuare/);
  await expect(normal).toHaveValue(/- denumirea obiectivului:/);

  await page.locator('[data-tab-target="preliminaryTab"]').click();
  await expect(prelim).toHaveValue(/SSI preliminar - schelet gol \(Anexa 5\)/);
  await expect(prelim).toHaveValue(/Particularități specifice construcției\/amenajării/);
  await expect(prelim).toHaveValue(/civilă \(obișnuită, înaltă, foarte înaltă/); // child field rendering

  await page.locator('[data-tab-target="sourcesTab"]').click();
  await addManualAndExtract(page, MEM_A);

  await page.locator('[data-tab-target="normalTab"]').click();
  const normalA = await normal.inputValue();
  expectPoint1Only(normalA);
  expect(normalA).toMatch(/Proiect A|Beneficiar A/);
  expect(normalA).not.toMatch(/2\.A\.a|3\.1|4\.1|5\.A|6\./i);

  await page.locator('[data-tab-target="preliminaryTab"]').click();
  const prelimA = await prelim.inputValue();
  expectPoint1Only(prelimA);
  expect(prelimA).toMatch(/Proiect A|Beneficiar A/);

  // separation users vs storage
  expect(normalA).not.toMatch(/numar maxim de utilizatori[^\n]*rafturi marfuri/i);
  expect(normalA).not.toMatch(/capacitati de depozitare[^\n]*120 persoane/i);

  await page.locator('[data-tab-target="sourcesTab"]').click();
  await page.locator('#resetBtn').click();
  await page.locator('[data-tab-target="normalTab"]').click();
  await expect(normal).toHaveValue(/SSI normal - schelet gol \(Anexa 4\)/);
  await expect(normal).not.toHaveValue(/Proiect A|Beneficiar A/);
  await page.locator('[data-tab-target="preliminaryTab"]').click();
  await expect(prelim).toHaveValue(/SSI preliminar - schelet gol \(Anexa 5\)/);
  await expect(prelim).not.toHaveValue(/Proiect A|Beneficiar A/);

  await page.locator('[data-tab-target="sourcesTab"]').click();
  await addManualAndExtract(page, MEM_B);

  await page.locator('[data-tab-target="normalTab"]').click();
  const normalB = await normal.inputValue();
  expect(normalB).toMatch(/Proiect B|Beneficiar B/);
  expect(normalB).not.toMatch(/Proiect A|Beneficiar A/);
  expect(normalB).not.toMatch(/Surse analizate|Legislație relevantă detectată|Verificare normativă automată|Acoperire reguli/i);

  await page.locator('[data-tab-target="preliminaryTab"]').click();
  const prelimB = await prelim.inputValue();
  expect(prelimB).toMatch(/Proiect B|Beneficiar B/);
  expect(prelimB).not.toMatch(/Proiect A|Beneficiar A/);
  expect(prelimB).not.toMatch(/2\.A\.a|3\.1|4\.1|5\.A|6\./i);
});
