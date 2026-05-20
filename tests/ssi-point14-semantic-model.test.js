const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { buildSemantic14Model, auditSemantic14Model } = require('../ssi-semantic');

test('semantic 1.4 model extracts Sprenghi values before rendering', () => {
  const text = fs.readFileSync(path.join(__dirname, '..', 'test-fixtures', 'memoriu-sprenghi-reference.txt'), 'utf8');
  const model = buildSemantic14Model({ data: {}, sources: [{ name: 'sprenghi-src', text }] });
  const expected = {
    regim: 'D+P+Sp+M',
    inaltimeMaxima: '20,98 m',
    ariaConstruita: '350,75 m²',
    ariaDesfasurata: '693,08 m²',
    volum: '2900 m³'
  };
  const audit = auditSemantic14Model(model, expected);
  assert.equal(audit.ok, true, JSON.stringify({ audit, model }, null, 2));
});
