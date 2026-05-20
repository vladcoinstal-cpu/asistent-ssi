const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

function block(text, re){return (text.match(re)||[''])[0].trim();}

test('Sprenghi 1.1-1.4 output quality vs references', async ({ page }) => {
  const src = fs.readFileSync(path.join(__dirname,'..','test-fixtures','memoriu-sprenghi-complete-derived.txt'),'utf8');
  await page.goto('/');
  await expect.poll(async()=> page.evaluate(()=>Boolean(window.__ssiTemplateStatus?.ready))).toBeTruthy();
  await page.evaluate(()=>window.__ssiCommands?.newProject?.('Sprenghi-Full-Audit'));
  await page.evaluate((t)=>window.__ssiCommands?.addManualText?.(t,'sprenghi-full'), src);
  await page.evaluate(async()=>window.__ssiCommands?.extractData?.());
  const normal = await page.locator('#normalReportOutput').inputValue();
  const prelim = await page.locator('#preliminaryReportOutput').inputValue();
  const both = `${normal}\n${prelim}`;

  expect(both).toMatch(/denumire|denumirea obiectivului/i);
  expect(both).toMatch(/beneficiar|proprietar/i);
  expect(both).toMatch(/adres[ăa]/i);
  expect(both).toMatch(/funcțiuni|destina/i);
  expect(both).toMatch(/categoria/i);

  expect(both).toMatch(/D\+P\+Sp\+M/i);
  expect(both).toMatch(/20,98\s*m/i);
  expect(both).toMatch(/350,75\s*m(?:2|²)/i);
  expect(both).toMatch(/693,08\s*m(?:2|²)/i);
  expect(both).toMatch(/2900\s*m(?:3|³)/i);

  const b11 = block(normal,/1\.1[\s\S]*?1\.2\./i) + '\n' + block(prelim,/1\.1[\s\S]*?1\.2\./i);
  expect(b11).not.toMatch(/beneficiar[^\n]*str\.|proprietar[^\n]*str\./i);
  const b14 = block(normal,/1\.4[\s\S]*?2\./i) + '\n' + block(prelim,/1\.4[\s\S]*?2\./i);
  expect(b14).not.toMatch(/capacit[ăa]ți[^\n]*(bucătărie|gaze|linie caldă)/i);
});
