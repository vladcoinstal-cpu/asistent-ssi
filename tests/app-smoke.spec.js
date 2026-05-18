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
    file: "memoriu-arhitectura-biserica-sprenghi.txt",
    projectName: "Biserica Sprenghi",
    objective: "Biserica Invierea Domnului Sprenghi",
    summaryNeedle: "lacas de cult"
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
  page.once("dialog", async (dialog) => {
    await dialog.accept(name);
  });
  await page.locator("#projectAddBtn").click();
  await expect(page.locator("#projectSelector")).toContainText(name);
}

async function injectManualSource(page, fixtureText) {
  await page.locator('[data-tab-target="sourcesTab"]').click();
  await page.locator("#manualText").fill(fixtureText);
  await page.locator("#addTextBtn").click();
  await expect(page.locator("#sourceCount")).not.toHaveText(/^0$/);
}

async function runExtraction(page, expectedObjective) {
  await page.locator("#extractBtn").click();
  await expect(page.locator("#projectFactsSummary")).toContainText(expectedObjective, { timeout: 60_000 });
  await expect(page.locator("#normalReportPreview")).toContainText(/SCENARIU DE SECURITATE LA INCENDIU/i, { timeout: 60_000 });
  await expect(page.locator("#preliminaryReportPreview")).toContainText(/SCENARIU DE SECURITATE LA INCENDIU PRELIMINAR/i, { timeout: 60_000 });
}


async function verifyAnnexFrameIntegrity(page) {
  const requiredSubpoints = ["1.1", "1.2", "1.3", "1.4", "3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "4.1", "4.2", "4.3"];

  await page.locator('[data-tab-target="normalTab"]').click();
  const normalOutput = page.locator("#normalReportOutput");
  await expect(normalOutput).toHaveValue(/Scenariu de securitate la incendiu - draft de lucru/i, { timeout: 60_000 });
  const normalText = await normalOutput.inputValue();

  expect(normalText).toMatch(/Scenariu de securitate la incendiu - draft de lucru/i);
  expect(normalText).toMatch(/Anexa nr\.\s*4 la Ordinul MAI nr\.\s*180\/2022/i);
  expect(normalText).toMatch(/## 1\.[\s\S]*## 2\.[\s\S]*## 3\.[\s\S]*## 4\.[\s\S]*## 5\./i);
  for (const subpoint of requiredSubpoints) {
    const escaped = subpoint.replace(/\./g, "\\.");
    expect(normalText).toMatch(new RegExp(`(^|\\n)\\s*#{1,6}\\s*${escaped}\\.`, "m"));
  }
  expect(normalText).not.toMatch(/Surse analizate|Legislatie relevanta detectata|Verificare normativa automata|Acoperire reguli pe subpuncte|Cadru generat curat|ssi-frame-readonly/i);
  expect(normalText).toMatch(/## Nota\n[\s\S]*?\n## 1\. Caracteristicile construcției sau amenajării/i);

  await page.locator('[data-tab-target="preliminaryTab"]').click();
  const prelimOutput = page.locator("#preliminaryReportOutput");
  await expect(prelimOutput).toHaveValue(/SCENARIU DE SECURITATE LA INCENDIU PRELIMINAR/i, { timeout: 60_000 });
  const prelimText = await prelimOutput.inputValue();
  for (const subpoint of requiredSubpoints) {
    const escaped = subpoint.replace(/\./g, "\\.");
    expect(prelimText).toMatch(new RegExp(`(^|\\n)\\s*#{1,6}\\s*${escaped}\\.`, "m"));
  }
  expect(prelimText).not.toMatch(/Surse analizate|Legislatie relevanta detectata|Verificare normativa automata|Acoperire reguli pe subpuncte|Cadru generat curat|ssi-frame-readonly/i);
  expect(prelimText).toMatch(/# SCENARIU DE SECURITATE LA INCENDIU PRELIMINAR[\s\S]*?## 1\. Caracteristicile construcției sau amenajării/i);
  expect(prelimText).toMatch(/## 1\.[\s\S]*## 2\.[\s\S]*## 3\.[\s\S]*## 4\.[\s\S]*## 5\./i);
  expect(prelimText).not.toMatch(/1\.4\.g[\s\S]{0,220}(depozit|stoc|evacuar|procese)/i);
  expect(prelimText).not.toMatch(/1\.4\.h[\s\S]{0,220}(evacuar|flux|număr.*utilizatori|procese)/i);
  expect(prelimText).not.toMatch(/3\.4\.[cd][\s\S]{0,220}(depozit|stoc|procese)/i);
  expect(prelimText).not.toMatch(/4\.8[\s\S]{0,260}(iluminat|DDR|AFDD)/i);
  expect(prelimText).not.toMatch(/4\.10\.[cd][\s\S]{0,260}(iluminat de siguranță|IDSAI|detectare.*incendiu)/i);
}

async function verifyNormalV58Shape(page) {
  await page.locator('[data-tab-target="normalTab"]').click();
  const normalText = await page.locator("#normalReportOutput").inputValue();
  expect(normalText).toMatch(/# Scenariu de securitate la incendiu - draft de lucru/i);
  expect(normalText).toMatch(/## Nota\n[\s\S]*?## 1\. Caracteristicile constructiei sau amenajarii/i);
  expect(normalText).toMatch(/## 1\.[\s\S]*### 1\.1\.[\s\S]*### 1\.2\.[\s\S]*### 1\.3\.[\s\S]*### 1\.4\./i);
  expect(normalText).toMatch(/## 2\.[\s\S]*### 2\.A\.[\s\S]*### 2\.B\./i);
  expect(normalText).toMatch(/## 3\.[\s\S]*### 3\.1\.[\s\S]*### 3\.2\.[\s\S]*### 3\.3\.[\s\S]*### 3\.4\./i);
  expect(normalText).toMatch(/## 4\.[\s\S]*4\.8[\s\S]*4\.10/i);
  expect(normalText).not.toMatch(/Surse analizate|Legislatie relevanta detectata|Verificare normativa automata|Acoperire reguli pe subpuncte|Cadru generat curat|ssi-frame-readonly/i);
}

async function verifyPreliminaryV85Shape(page) {
  await page.locator('[data-tab-target="preliminaryTab"]').click();
  const prelimText = await page.locator("#preliminaryReportOutput").inputValue();
  expect(prelimText).toMatch(/# SCENARIU DE SECURITATE LA INCENDIU PRELIMINAR/i);
  expect(prelimText).toMatch(/## 1\. Caracteristicile construcției sau amenajării[\s\S]*### 1\.1\.[\s\S]*### 1\.2\.[\s\S]*### 1\.3\.[\s\S]*### 1\.4\./i);
  expect(prelimText).toMatch(/## 2\.[\s\S]*## 3\.[\s\S]*### 3\.1\.[\s\S]*### 3\.6\./i);
  expect(prelimText).toMatch(/## 4\.[\s\S]*### 4\.1\.[\s\S]*### 4\.11\./i);
  expect(prelimText).not.toMatch(/Surse analizate|Legislatie relevanta detectata|Verificare normativa automata|Acoperire reguli pe subpuncte|Cadru generat curat|ssi-frame-readonly/i);
}

async function verifyWordExportGenerators(page) {
  const exported = await page.evaluate(() => {
    const normal = window.buildNormalScenarioWordHtml?.(window.state?.data || {}, window.state?.sources || [], window.state?.applicableActs || [], window.state?.complianceChecks || []) || "";
    const preliminary = window.buildPreliminaryScenarioWordHtml?.(window.state?.data || {}, window.state?.sources || [], window.state?.applicableActs || [], window.state?.projectProfile || {}, window.state?.complianceChecks || []) || "";
    return { normal, preliminary };
  });
  expect(exported.normal).toMatch(/1\. Caracteristicile construcției sau amenajării/i);
  expect(exported.preliminary).toMatch(/1\. Caracteristicile construcției sau amenajării/i);
  expect(exported.normal).not.toMatch(/Surse analizate|Legislatie relevanta detectata|Verificare normativa automata|Acoperire reguli pe subpuncte|Cadru generat curat|ssi-frame-readonly/i);
  expect(exported.preliminary).not.toMatch(/Surse analizate|Legislatie relevanta detectata|Verificare normativa automata|Acoperire reguli pe subpuncte|Cadru generat curat|ssi-frame-readonly/i);
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
      await verifyNormalV58Shape(page);
      await verifyPreliminaryV85Shape(page);
      await verifyWordExportGenerators(page);

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
