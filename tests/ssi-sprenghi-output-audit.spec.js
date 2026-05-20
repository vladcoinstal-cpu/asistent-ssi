const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

function block(text, re){return (text.match(re)||[''])[0].trim();}

test('Sprenghi 1.1-1.4 output quality vs references', async ({ page }) => {
  const src = fs.readFileSync(path.join(__dirname,'..','test-fixtures','memoriu-sprenghi-1.1-1.4-curat.txt'),'utf8');
  await page.goto('/');
  await expect.poll(async()=> page.evaluate(()=>Boolean(window.__ssiTemplateStatus?.ready))).toBeTruthy();
  await page.evaluate(()=>window.__ssiCommands?.newProject?.('Sprenghi-Full-Audit'));
  await page.evaluate((t)=>window.__ssiCommands?.addManualText?.(t,'sprenghi-full'), src);
  await page.evaluate(async()=>window.__ssiCommands?.extractData?.());
  const normal = await page.locator('#normalReportOutput').inputValue();
  const prelim = await page.locator('#preliminaryReportOutput').inputValue();
  const b11n = block(normal,/1\.1[\s\S]*?1\.2\./i);
  const b12n = block(normal,/1\.2[\s\S]*?1\.3\./i);
  const b13n = block(normal,/1\.3[\s\S]*?1\.4\./i);
  const b14n = block(normal,/1\.4[\s\S]*?2\./i);
  const b11p = block(prelim,/1\.1[\s\S]*?1\.2\./i);
  const b12p = block(prelim,/1\.2[\s\S]*?1\.3\./i);
  const b13p = block(prelim,/1\.3[\s\S]*?1\.4\./i);
  const b14p = block(prelim,/1\.4[\s\S]*?2\./i);

  for (const txt of [b11n, b11p]) {
    expect(txt).toMatch(/l[ăa]ca[șs]\s+de\s+cult|obiectiv\s+sprenghi/i);
    expect(txt).toMatch(/Parohia Ortodox[ăa]\s+[ÎI]nvierea Domnului/i);
    expect(txt).toMatch(/Bra[șs]ov/i);
    expect(txt).toMatch(/M[ăa]r[ăa][șs]e[șs]ti/i);
    expect(txt).toMatch(/47/i);
    expect(txt).not.toMatch(/Datele de contact|Profilul de activitate/i);
  }
  for (const txt of [b12n, b12p]) {
    expect(txt).toMatch(/\bcult\b/i);
    expect(txt).not.toMatch(/parcaj|industrial|birouri|depozitare/i);
  }
  for (const txt of [b13n, b13p]) {
    expect(txt).toMatch(/categoria\s*C/i);
    expect(txt).toMatch(/clasa\s+III(?:-a)?/i);
  }
  for (const txt of [b14n, b14p]) {
    expect(txt).toMatch(/D\+P\+Sp\+M/i);
    expect(txt).toMatch(/20,98\s*m/i);
    expect(txt).toMatch(/350,75\s*m(?:2|²)/i);
    expect(txt).toMatch(/693,08\s*m(?:2|²)/i);
    expect(txt).toMatch(/2900\s*m(?:3|³)/i);
    expect(txt).not.toMatch(/capacit[ăa]ți[^\n]*(bucătărie|gaze|linie caldă)/i);
  }
  const combined14 = `${b14n}\n${b14p}`;
  expect(combined14).toMatch(/depozitare[^.\n]*36\s*m(?:2|²)|materiale\s+metalice/i);
  expect(combined14).toMatch(/demisol:\s*120/i);
  expect(combined14).toMatch(/parter:\s*(?:130|180)/i);
  expect(combined14).toMatch(/supant[ăa]:\s*20/i);
  expect(combined14).toMatch(/mansard[ăa]:\s*2/i);
});
