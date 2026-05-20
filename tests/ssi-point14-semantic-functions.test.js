const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { buildSemantic14Model } = require('../ssi-semantic');

const fixtures = [
  ['memoriu-arhitectura-comercial-parcare-subsol.txt', ['parcaj']],
  ['memoriu-arhitectura-industrial-depozitare.txt', ['industrial', 'depozitare']],
  ['memoriu-arhitectura-restaurant-sala-aglomerata.txt', ['sală aglomerată', 'restaurant / alimentație publică']]
];

for (const [file, expectedTags] of fixtures) {
  test(`semantic function tags for ${file}`, () => {
    const text = fs.readFileSync(path.join(__dirname, '..', 'test-fixtures', file), 'utf8');
    const model = buildSemantic14Model({ data: {}, sources: [{ name: file, text }] });
    for (const tag of expectedTags) {
      assert.ok(model.functions.tags.includes(tag), `${file} missing tag ${tag}: ${JSON.stringify(model.functions.tags)}`);
    }
  });
}
