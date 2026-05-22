const test = require('node:test');
const assert = require('node:assert/strict');

function isLabelOnlyLine(line, fieldLabel) {
  const l = String(line || '').toLowerCase().trim();
  const fld = String(fieldLabel || '').toLowerCase().trim();
  if (!l || !fld) return false;
  const norm = (v) => v.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  const stripPrefix = (v) => v
    .replace(/^[-–—]+\s*/, '')
    .replace(/^(?:\d+\s+){1,5}[a-z]?\s+/i, '')
    .replace(/^\d+(?:\.\d+)*(?:\.[a-z])?\s+/i, '')
    .replace(/^\d+\.[a-z]\s+/i, '')
    .replace(/^[ivxlcdm]+\.\s+/i, '')
    .replace(/^\d+\s+/i, '')
    .replace(/[:]+\s*$/, '')
    .trim();

  const nl = stripPrefix(norm(l));
  const nf = stripPrefix(norm(fld));
  if (!nl || !nf) return false;

  if (nl === nf) return true;
  if (nl === `${nf} de completat`) return true;
  if (nl === `${nf} de completat.`) return true;
  if (nl === `${nf} -`) return true;

  const remainder = nl.startsWith(`${nf} `) ? nl.slice(nf.length).trim() : '';
  if (!remainder) return true;
  if (/^[:\-–—]+$/.test(remainder)) return true;

  const afterColon = remainder.includes(':') ? remainder.split(':').slice(1).join(':').trim() : '';
  if (afterColon && /[a-z0-9]/i.test(afterColon) && afterColon.length >= 2) return false;

  const hasMeaningfulValue = /\d|m2|m3|mp|mc|m²|m³|\bda\b|\bnu\b|\beste\b|\bse\b|\bconform\b|\btip\b|\bregim\b|\baria\b|\bvolum\b|\bpersoane\b/i.test(remainder);
  return !hasMeaningfulValue;
}

test('label-only with numeric subpoint prefix is treated as empty', () => {
  assert.equal(isLabelOnlyLine('1.4.c caracteristici dimensionale', 'caracteristici dimensionale'), true);
});

test('label-only with dash prefix is treated as empty', () => {
  assert.equal(isLabelOnlyLine('- densitatea sarcinii termice:', 'densitatea sarcinii termice'), true);
});

test('dimension line with actual value is not empty', () => {
  assert.equal(isLabelOnlyLine('1.4.c caracteristici dimensionale: regim D+P+Sp+M, aria construită 350,75 m²', 'caracteristici dimensionale'), false);
});

test('storage line with area value is not empty', () => {
  assert.equal(isLabelOnlyLine('1.4.f capacitati de depozitare: 36 m²', 'capacitati de depozitare'), false);
});
