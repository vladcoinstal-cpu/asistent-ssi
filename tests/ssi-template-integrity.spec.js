const { test, expect } = require('@playwright/test');
const fs = require('fs');

const FORBIDDEN_TEXTS = [
  'Surse analizate',
  'Legislatie relevanta detectata',
  'Verificare normativa automata',
  'Acoperire reguli',
  'Cadru generat curat',
  'ssi-frame-readonly'
];

const EXPECTED = {
  normal: {
    file: 'ssi-normal-template-anexa4.json',
    sectionCodes: ['1', '2', '3', '4', '5', '6'],
    subpoints: {
      '1': ['1.1', '1.2', '1.3', '1.4.a', '1.4.b', '1.4.c', '1.4.d', '1.4.e', '1.4.f', '1.4.g'],
      '2': ['2.A', '2.B'],
      '3': ['3.1', '3.2', '3.3', '3.4'],
      '4': ['4.A', '4.A.a', '4.A.b', '4.A.c', '4.A.d', '4.B', '4.B.a', '4.B.b', '4.B.c', '4.B.d', '4.C', '4.D', '4.E', '4.F'],
      '5': ['5.A', '5.B', '5.C', '5.D', '5.D.a', '5.D.b'],
      '6': ['6']
    }
  },
  preliminar: {
    file: 'ssi-preliminar-template-anexa5.json',
    sectionCodes: ['1', '2', '3', '4', '5'],
    subpoints: {
      '1': ['1.1', '1.2', '1.3', '1.4'],
      '2': ['2'],
      '3': ['3.1', '3.2', '3.3', '3.4', '3.5', '3.6'],
      '4': ['4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7', '4.8', '4.9', '4.10', '4.11'],
      '5': ['5.1']
    },
    nonEmptyTitles: ['2']
  }
};

function validateTemplate({ file, sectionCodes, subpoints, nonEmptyTitles = [] }) {
  const raw = fs.readFileSync(file, 'utf8');
  const json = JSON.parse(raw);
  const sections = json.sections || [];

  expect(sections.map(s => s.code)).toEqual(sectionCodes);
  FORBIDDEN_TEXTS.forEach(t => expect(raw).not.toContain(t));

  sections.forEach((section) => {
    const points = section.subpoints || [];
    const codes = points.map(sp => sp.code);

    expect(codes).toEqual(subpoints[section.code]);
    expect(codes.every(code => typeof code === 'string' && code.trim().length > 0)).toBeTruthy();
    expect(new Set(codes).size).toBe(codes.length);

    points.forEach((sp) => {
      expect(typeof sp.title).toBe('string');
      if (nonEmptyTitles.includes(sp.code)) {
        expect(sp.title.trim().length).toBeGreaterThan(0);
      }
    });
  });
}

test('SSI normal Anexa 4 template integrity vs v58 structure', async () => {
  validateTemplate(EXPECTED.normal);
});

test('SSI preliminar Anexa 5 template integrity vs v85 structure', async () => {
  validateTemplate(EXPECTED.preliminar);
});
