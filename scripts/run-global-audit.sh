#!/usr/bin/env bash
set -euo pipefail

echo "[1/3] Running semantic model tests (Anexa 4 + 5 rules)..."
npm run test:semantic

echo "[2/3] Running SSI template integrity checks..."
npm run test:integrity

echo "[3/3] Running full e2e global audit matrix..."
npm run test:e2e
