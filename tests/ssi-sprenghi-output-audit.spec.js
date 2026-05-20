const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

function extractSection(text, sectionNumber, nextSectionNumber) {
  const patterns = [
    new RegExp(`(?:^|\\n)\\s*${sectionNumber}\\.?\\s*[\\s\\S]*?(?=(?:\\n\\s*${nextSectionNumber}\\.?\\s)|$)`, 'i'),
    new RegExp(`(?:^|\\n)\\s*${sectionNumber}\\s*\\.\\s*[\\s\\S]*?(?=(?:\\n\\s*${nextSectionNumber}\\s*\\.)|$)`, 'i'),
    new RegExp(`(?:^|\\n)\\s*${sectionNumber}\\b[\\s\\S]*?(?=(?:\\n\\s*${nextSectionNumber}\\b)|$)`, 'i')
  ];
  for (const re of patterns) {
    const m = text.match(re);
    if (m && m[0].trim()) return m[0].trim();
  }
  return '';
}

function failWithBlocks(message, blocks, normal, prelim) {
  throw new Error(`${message}
--- 1.1 normal ---
${blocks.b11n}
--- 1.1 preliminar ---
${blocks.b11p}
--- 1.2 normal ---
${blocks.b12n}
--- 1.2 preliminar ---
${blocks.b12p}
--- 1.3 normal ---
${blocks.b13n}
--- 1.3 preliminar ---
${blocks.b13p}
--- 1.4 normal ---
${blocks.b14n}
--- 1.4 preliminar ---
${blocks.b14p}
--- NORMAL full ---
${normal}
--- PRELIMINAR full ---
${prelim}`);
}

test('Sprenghi 1.1-1.4 output quality vs references', async ({ page }) => {
  const src = fs.readFileSync(path.join(__dirname,'..','test-fixtures','memoriu-sprenghi-1.1-1.4-curat.txt'),'utf8');
  await page.goto('/');
  await expect.poll(async()=> page.evaluate(()=>Boolean(window.__ssiTemplateStatus?.ready))).toBeTruthy();
  await page.evaluate(()=>window.__ssiCommands?.newProject?.('Sprenghi-Full-Audit'));
  await page.evaluate((t)=>window.__ssiCommands?.addManualText?.(t,'sprenghi-full'), src);
  await page.evaluate(async()=>window.__ssiCommands?.extractData?.());
  const normal = await page.locator('#normalReportOutput').inputValue();
  const prelim = await page.locator('#preliminaryReportOutput').inputValue();
  const blocks = {
    b11n: extractSection(normal, '1\\.1', '1\\.2'),
    b12n: extractSection(normal, '1\\.2', '1\\.3'),
    b13n: extractSection(normal, '1\\.3', '1\\.4'),
    b14n: extractSection(normal, '1\\.4', '2'),
    b11p: extractSection(prelim, '1\\.1', '1\\.2'),
    b12p: extractSection(prelim, '1\\.2', '1\\.3'),
    b13p: extractSection(prelim, '1\\.3', '1\\.4'),
    b14p: extractSection(prelim, '1\\.4', '2')
  };
  if (!blocks.b11n || !blocks.b11p || !blocks.b12n || !blocks.b12p || !blocks.b13n || !blocks.b13p || !blocks.b14n || !blocks.b14p) {
    failWithBlocks('Failed to extract one or more 1.1-1.4 blocks', blocks, normal, prelim);
  }

  for (const txt of [blocks.b11n, blocks.b11p]) {
    expect(txt).toMatch(/l[ăa]ca[șs]\s+de\s+cult|obiectiv\s+sprenghi/i);
    expect(txt).toMatch(/Parohia Ortodox[ăa]\s+[ÎI]nvierea Domnului/i);
    expect(txt).toMatch(/Bra[șs]ov/i);
    expect(txt).toMatch(/M[ăa]r[ăa][șs]e[șs]ti/i);
    expect(txt).toMatch(/47/i);
  }
  for (const txt of [blocks.b12n, blocks.b12p]) {
    expect(txt).toMatch(/\bcult\b/i);
    expect(txt).not.toMatch(/parcaj|industrial|birouri|depozitare/i);
  }
  for (const txt of [blocks.b13n, blocks.b13p]) {
    expect(txt).toMatch(/categoria\s*C/i);
    expect(txt).toMatch(/clasa\s+III(?:-a)?/i);
  }
  for (const txt of [blocks.b14n, blocks.b14p]) {
    expect(txt).toMatch(/D\+P\+Sp\+M/i);
    expect(txt).toMatch(/20,98\s*m/i);
    expect(txt).toMatch(/350,75\s*m(?:2|²)/i);
    expect(txt).toMatch(/693,08\s*m(?:2|²)/i);
    expect(txt).toMatch(/2900\s*m(?:3|³)/i);
    expect(txt).not.toMatch(/capacit[ăa]ți[^\n]*(bucătărie|gaze|linie caldă)/i);
  }
  const combined14 = `${blocks.b14n}\n${blocks.b14p}`;
  expect(combined14).toMatch(/depozitare[^.\n]*36\s*m(?:2|²)|materiale\s+metalice/i);
  expect(combined14).toMatch(/demisol:\s*120/i);
  expect(combined14).toMatch(/parter:\s*(?:130|180)/i);
  expect(combined14).toMatch(/supant[ăa]:\s*20/i);
  expect(combined14).toMatch(/mansard[ăa]:\s*2/i);
});
