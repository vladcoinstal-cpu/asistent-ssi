const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { buildSemantic123Model, auditSemantic123Model } = require('../ssi-semantic');

test('semantic 1.1-1.3 model has identification/destination/category from Sprenghi fixture', () => {
  const text = fs.readFileSync(path.join(__dirname, '..', 'test-fixtures', 'memoriu-sprenghi-reference.txt'), 'utf8');
  const model = buildSemantic123Model({
    data: {
      denumire_obiectiv: 'Memoriu arhitectură – obiectiv Sprenghi',
      beneficiar: 'Parohia Ortodoxă Învierea Domnului',
      adresa: 'Municipiul Brașov, Str. Mărășești nr. 47',
      'funcțiuni': 'cult',
      categoria_importanta: 'C'
    },
    sources: [{ name: 'sprenghi', text }]
  });
  const audit = auditSemantic123Model(model);
  assert.equal(audit.ok, true, JSON.stringify({ model, audit }, null, 2));
  assert.ok(model.destination.tags.includes('cult'));
});
