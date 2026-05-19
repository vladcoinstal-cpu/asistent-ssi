const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const FIXTURES = [
  {
    file: "memoriu-arhitectura-comercial-parcare-subsol.txt",
    projectName: "Retail Park Orion",
    objective: "Centru comercial Retail Park Orion",
    summaryNeedle: "parcaj subteran"
  },
  {
    file: "memoriu-arhitectura-industrial-depozitare.txt",
    projectName: "Hala Industriala Vector",
    objective: "Hala industriala Fabricatie si Depozitare MetalPack",
    summaryNeedle: "depozitare"
  },
  {
    file: "memoriu-arhitectura-restaurant-sala-aglomerata.txt",
    projectName: "Restaurant Atrium",
    objective: "Restaurant Evenimente Magnolia Ballroom",
    summaryNeedle: "sala aglomerata"
  }
];

function readFixture(fileName) {
  return fs.readFileSync(path.join(__dirname, "..", "test-fixtures", fileName), "utf8");
}

async function createProject(page, name) {
  await expect.poll(async () => {
    return await page.evaluate(() => Boolean(window.__ssiTemplateStatus?.ready));
  }, { timeout: 15000 }).toBeTruthy();

  const newProjectId = await page.evaluate((projectName) => {
    return window.__ssiCommands?.newProject?.(projectName) || null;
  }, name);
  expect(newProjectId).toBeTruthy();
  await expect(page.locator("#projectSelector")).not.toBeDisabled();
  await expect.poll(async () => page.locator("#projectSelector").inputValue(), { timeout: 10000 }).toBe(String(newProjectId));
  await expect(page.locator("#projectSelector")).toContainText(name);
}

async function clickAndAcceptOptionalDialog(page, locator, timeout = 1000) {
  const dialogPromise = page.waitForEvent("dialog", { timeout }).catch(() => null);
  await page.locator(locator).click();
  const dialog = await dialogPromise;
  if (dialog) {
    await dialog.accept().catch(() => {});
  }
}

async function injectManualSource(page, fixtureText) {
  await page.locator('[data-tab-target="sourcesTab"]').click();
  await page.locator("#manualText").fill(fixtureText);
  await expect(page.locator("#manualText")).toHaveValue(fixtureText);
  await clickAndAcceptOptionalDialog(page, "#addTextBtn");
  await expect(page.locator("#sourceCount")).not.toHaveText(/^0$/);
}

async function runExtraction(page, expectedObjective) {
  await expect(page.locator("#sourceCount")).not.toHaveText(/^0$/);
  await expect(page.locator("#projectSelector")).not.toBeDisabled();
  await expect(page.locator("#extractBtn")).toBeEnabled();
  await page.evaluate(async () => {
    return await window.__ssiCommands?.extractData?.();
  });
  await expect(page.locator("#projectFactsSummary")).toContainText(expectedObjective, { timeout: 60_000 });
  await expect(page.locator("#normalReportPreview")).toContainText(/SCENARIU DE SECURITATE LA INCENDIU/i, { timeout: 60_000 });
  await expect(page.locator("#preliminaryReportPreview")).toContainText(/SCENARIU DE SECURITATE LA INCENDIU PRELIMINAR/i, { timeout: 60_000 });
}


async function verifyAnnexFrameIntegrity(page) {
  await page.locator('[data-tab-target="normalTab"]').click();
  const normalText = await page.locator("#normalReportOutput").inputValue();
  expect(normalText).toMatch(/SSI normal - schelet gol \(Anexa 4\)|Proiect|Beneficiar/i);
  expect(normalText).toMatch(/\n2\./i);
  expect(normalText).toMatch(/\n3\./i);
  expect(normalText).toMatch(/\n4\./i);
  expect(normalText).toMatch(/\n5\./i);
  expect(normalText).toMatch(/\n6\./i);

  await page.locator('[data-tab-target="preliminaryTab"]').click();
  const prelimText = await page.locator("#preliminaryReportOutput").inputValue();
  expect(prelimText).toMatch(/SSI preliminar - schelet gol \(Anexa 5\)|Proiect|Beneficiar/i);
  expect(prelimText).toMatch(/\n2\./i);
  expect(prelimText).toMatch(/\n3\./i);
  expect(prelimText).toMatch(/\n4\./i);
  expect(prelimText).toMatch(/\n5\./i);
}

async function verifyLawReaderFromPreview(page) {
  await page.locator('[data-tab-target="normalTab"]').click();
  const firstLawLink = page.locator("#normalReportPreview [data-law-ref]").first();
  await expect(firstLawLink).toBeVisible({ timeout: 30_000 });
  const lawRef = await firstLawLink.getAttribute("data-law-ref");
  expect(lawRef).toBeTruthy();
  await page.evaluate((ref) => window.__ssiCommands?.openLawRef?.(ref), lawRef);
  await expect(page.locator("#lawTabContent")).not.toBeEmpty({ timeout: 30_000 });
  await expect(page.locator("#lawTabContent")).toContainText(/art|anexa|pct|cap|sectiune|Text integral act/i, { timeout: 30_000 });
}

async function verifyLegislationMovedOutOfProblems(page) {
  await page.locator('[data-tab-target="legislationTab"]').click();
  await expect(page.locator("#rulesOutput")).toContainText(/Acte legislative detectate de Extrage|P 118|OMAI|Legea|HG/i, { timeout: 30_000 });

  await page.locator('[data-tab-target="issuesTab"]').click();
  await expect(page.locator("#issuesOutput")).not.toContainText(/Acte legislative detectate de Extrage|Acte legislative noi descoperite automat/i);
}

async function verifyReset(page) {
  await page.locator('[data-tab-target="sourcesTab"]').click();
  await page.locator("#resetBtn").click();
  await expect(page.locator("#sourceCount")).toHaveText("0");
}

test.describe("smoke cloud app", () => {
  test("aplicatia porneste cu controalele principale vizibile", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=Asistent SSI")).toBeVisible();
    await expect(page.locator("#projectSelector")).toBeVisible();
    await expect(page.locator("#projectAddBtn")).toBeVisible();
    await expect(page.locator("#workspaceTabs")).toBeVisible();
    await expect(page.locator('[data-tab-target="sourcesTab"]')).toBeVisible();
    await expect(page.locator('[data-tab-target="normalTab"]')).toBeVisible();
  });

  for (const fixture of FIXTURES) {
    test(`extrage si genereaza corect fluxul complet pentru ${fixture.file}`, async ({ page }) => {
      await page.goto("/");
      await createProject(page, fixture.projectName);
      await injectManualSource(page, readFixture(fixture.file));
      await runExtraction(page, fixture.objective);

      await expect(page.locator("#projectFactsSummary")).toContainText(new RegExp(fixture.summaryNeedle, "i"));

      await verifyAnnexFrameIntegrity(page);

      await verifyLawReaderFromPreview(page);
      await verifyLegislationMovedOutOfProblems(page);
      await verifyReset(page);
    });
  }

  test("detecteaza neconcordante si numere cu punct de mii", async ({ page }) => {
    await page.goto("/");
    await createProject(page, "Neconcordante memorii");

    const sourceA = `Denumirea obiectivului: Obiectiv verificare neconcordante\nBeneficiar: SC Alfa Test SRL\nAdresa: Str. Exemplu nr. 1\nRegim de inaltime: P+1\nAria construita: 1.120 mp\nAria desfasurata: 1.980 mp\nVolumul constructiei: 4.250 mc\nNumar maxim de utilizatori: 120 persoane\nDestinatia: comert\nP 118/1-2025; OMAI nr. 180/2022`;
    const sourceB = `Denumirea obiectivului: Obiectiv verificare neconcordante\nBeneficiar: SC Beta Test SRL\nAdresa: Str. Exemplu nr. 2\nRegim de inaltime: P+2\nAria construita: 1.250 mp\nAria desfasurata: 2.100 mp\nVolumul constructiei: 4.900 mc\nNumar maxim de utilizatori: 140 persoane\nDestinatia: comert\nP 118/1-2025; OMAI nr. 180/2022`;

    await injectManualSource(page, sourceA);
    await injectManualSource(page, sourceB);
    await runExtraction(page, "Obiectiv verificare neconcordante");

    await page.locator('[data-tab-target="issuesTab"]').click();
    await expect(page.locator("#issuesOutput")).toContainText(/Neconcordante intre memorii/i, { timeout: 30_000 });
    await expect(page.locator("#issuesOutput")).toContainText(/SC Alfa Test SRL|SC Beta Test SRL/i);
    await expect(page.locator("#issuesOutput")).toContainText(/1\.120|1\.250|1120|1250/i);
    await expect(page.locator("#issuesOutput")).not.toContainText(/Acte legislative detectate de Extrage|Acte legislative noi descoperite automat/i);

    await page.locator('[data-tab-target="legislationTab"]').click();
    await expect(page.locator("#rulesOutput")).toContainText(/Acte legislative detectate de Extrage/i, { timeout: 30_000 });

    await verifyReset(page);
  });

});
