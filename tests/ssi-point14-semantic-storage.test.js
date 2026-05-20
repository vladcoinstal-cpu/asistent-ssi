const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { buildSemantic14Model } = require('../ssi-semantic');

test('restaurant fixture does not map kitchen/gas text into storage', () => {
  const text = fs.readFileSync(path.join(__dirname, '..', 'test-fixtures', 'memoriu-arhitectura-restaurant-sala-aglomerata.txt'), 'utf8');
  const model = buildSemantic14Model({ data: {}, sources: [{ name: 'r', text }] });
  assert.ok(!/buc[ăa]t[ăa]rie|gaze|linie\s+cald[ăa]/i.test(model.storage.raw || ''));
});
