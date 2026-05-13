const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const FIXTURES = [
  {
    file: "memoriu-arhitectura-comercial-parcare-subsol.txt",
    projectName: "Retail Park Orion",
    objective: "Centru comercial Retail Park Orion",
    summaryNeedle: "parcaj subteran",
    riskNeedle: "risc mare"
  },
  {
    file: "memoriu-arhitectura-industrial-depozitare.txt",
    projectName: "Hala Industriala Vector",
    objective: "Hala industriala Fabricatie si Depozitare MetalPack",
    summaryNeedle: "depozitare",
    riskNeedle: "risc mare"
  },
  {
    file: "memoriu-arhitectura-restaurant-sala-aglomerata.txt",
    projectName: "Restaurant Atrium",
    objective: "Restaurant Evenimente Magnolia Ballroom",
    summaryNeedle: "sala aglomerata",
    riskNeedle: "aglomerari de persoane"
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

async function verifyLawReaderFromPreview(page) {
  await page.locator('[data-tab-target="normalTab"]').click();
  const firstLawLink = page.locator("#normalReportPreview [data-law-ref]").first();
  await expect(firstLawLink).toBeVisible({ timeout: 30_000 });
  await firstLawLink.click();
  await expect(page.locator("#lawTabContent")).not.toBeEmpty({ timeout: 30_000 });
  await expect(page.locator("#lawTabContent")).toContainText(/art|anexa|pct|cap|sectiune/i, { timeout: 30_000 });
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
    await expect(page.locator("#openAutotestBtn")).toBeVisible();
  });

  for (const fixture of FIXTURES) {
    test(`extrage si genereaza corect fluxul de baza pentru ${fixture.file}`, async ({ page }) => {
      await page.goto("/");
      await createProject(page, fixture.projectName);
      await injectManualSource(page, readFixture(fixture.file));
      await runExtraction(page, fixture.objective);

      await expect(page.locator("#projectFactsSummary")).toContainText(new RegExp(fixture.summaryNeedle, "i"));
      await expect(page.locator("#projectFactsSummary")).toContainText(new RegExp(fixture.riskNeedle, "i"));

      await page.locator('[data-tab-target="issuesTab"]').click();
      await expect(page.locator("#issuesOutput")).not.toContainText(/nu are inca text local disponibil/i);

      await page.locator('[data-tab-target="preliminaryTab"]').click();
      await expect(page.locator("#preliminaryReportPreview")).toContainText(/Caracteristicile constructiei|Caracteristicile construcției/i);

      await verifyLawReaderFromPreview(page);
    });
  }

  test("butonul Auto-test deschide zona si ruleaza verificarile", async ({ page }) => {
    await page.goto("/");
    await page.locator("#openAutotestBtn").click();
    await expect(page.locator("#autotestOutput")).toContainText(/memoriu-arhitectura/i, { timeout: 60_000 });
    await expect(page.locator("#autotestOutput")).toContainText(/Acte identificate/i, { timeout: 60_000 });
    await expect(page.locator("#autotestOutput")).toContainText(/SSI normal generat/i, { timeout: 60_000 });
    await expect(page.locator("#autotestOutput")).toContainText(/SSI preliminar generat/i, { timeout: 60_000 });
  });
