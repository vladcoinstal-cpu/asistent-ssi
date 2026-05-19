const { test, expect } = require('@playwright/test');

const MEM_A = `Denumirea obiectivului: Proiect A\nBeneficiar: Beneficiar A\nAdresa: Str. A nr. 1\nDestinatia: comert\nCategoria de importanta: C\nTipul cladirii: civila\nTipul parcajului: parcaj subteran\nRegim de inaltime: P+1; aria construita 500 mp; aria desfasurata 900 mp; volum 3200 mc\nNumar maxim de utilizatori: 120 persoane\nCapacitati de depozitare: rafturi marfuri 20 mc\nCai de evacuare: doua cai.`;
const MEM_B = `Denumirea obiectivului: Proiect B\nBeneficiar: Beneficiar B\nAdresa: Str. B nr. 2\nDestinatia: birouri\nCategoria de importanta: D\nTipul cladirii: mixta\nTipul parcajului: nu este cazul\nRegim de inaltime: P; aria construita 300 mp; aria desfasurata 300 mp; volum 1200 mc\nNumar maxim de utilizatori: 35 persoane\nCapacitati de depozitare: nu este cazul\nCai de evacuare: o cale.`;

async function newProject(page, name) {
  await page.evaluate((projectName) => {
    window.__ssiCommands?.newProject?.(projectName);
  }, name);
  await expect(page.locator('#projectSelector')).toContainText(name);
}

async function clickAndAcceptOptionalDialog(page, locator, timeout = 1000) {
  const dialogPromise = page.waitForEvent('dialog', { timeout }).catch(() => null);
  await page.locator(locator).click();
  const dialog = await dialogPromise;
  if (dialog) {
    await dialog.accept().catch(() => {});
  }
}

async function addManualAndExtract(page, text) {
  await page.locator('#manualText').fill(text);
  await expect(page.locator('#manualText')).toHaveValue(text);
  await clickAndAcceptOptionalDialog(page, '#addTextBtn');
  await expect(page.locator('#sourceCount')).not.toHaveText(/^0$/);
  await expect(page.locator('#projectSelector')).not.toBeDisabled();
  await expect(page.locator('#extractBtn')).toBeEnabled();
  await page.evaluate(async () => {
    return await window.__ssiCommands?.extractData?.();
  });
  await expect(page.locator('#projectFactsSummary')).toContainText(/Proiect|Beneficiar|Denumirea obiectivului/i, { timeout: 60000 });
}

function expectNoProjectDataInLaterPoints(text, projectMarkers = []) {
  const fromPoint2 = text.split(/\n2\./i)[1] || '';
  expect(fromPoint2.length).toBeGreaterThan(0);
  for (const marker of projectMarkers) {
    expect(fromPoint2).not.toMatch(new RegExp(marker, 'i'));
  }
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
      stateStatus: window.__ssiTemplateStatus || null
    };
  });
  expect(templateStatus.normalHttp).toBe(200);
  expect(templateStatus.prelimHttp).toBe(200);
  await expect.poll(async () => {
    return await page.evaluate(() => window.__ssiTemplateStatus || null);
  }, { timeout: 15000 }).toMatchObject({ normalLoaded: true, preliminaryLoaded: true, ready: true });
  const statusAfter = await page.evaluate(() => window.__ssiTemplateStatus);
  expect(statusAfter?.normalSections).toBeGreaterThan(0);
  expect(statusAfter?.preliminarySections).toBeGreaterThan(0);

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
  expect(normalA).toMatch(/\n2\./);
  expect(normalA).toMatch(/\n3\./);
  expect(normalA).toMatch(/\n4\./);
  expect(normalA).toMatch(/\n5\./);
  expect(normalA).toMatch(/\n6\./);
  expectNoProjectDataInLaterPoints(normalA, ['Proiect A', 'Beneficiar A', 'Str\. A nr\. 1', '120 persoane', 'rafturi marfuri']);
  expect(normalA).toMatch(/Proiect A|Beneficiar A/);

  await page.locator('[data-tab-target="preliminaryTab"]').click();
  const prelimA = await prelim.inputValue();
  expect(prelimA).toMatch(/\n2\./);
  expect(prelimA).toMatch(/\n3\./);
  expect(prelimA).toMatch(/\n4\./);
  expect(prelimA).toMatch(/\n5\./);
  expectNoProjectDataInLaterPoints(prelimA, ['Proiect A', 'Beneficiar A', 'Str\. A nr\. 1', '120 persoane', 'rafturi marfuri']);
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
  expect(prelimB).toMatch(/\n2\./);
  expect(prelimB).toMatch(/\n3\./);
  expect(prelimB).toMatch(/\n4\./);
  expect(prelimB).toMatch(/\n5\./);
  expectNoProjectDataInLaterPoints(prelimB, ['Proiect B', 'Beneficiar B', 'Str\. B nr\. 2', '35 persoane']);
});
