const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

test('index.html loads versioned app.js cache-buster for semantic engine updates', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.match(html, /<script\s+src="app\.js\?v=2026-05-20-ssi-semantic-14-1"><\/script>/);
  assert.match(html, /<script\s+src="ssi-semantic\.js\?v=2026-05-20-1"><\/script>/);
});
