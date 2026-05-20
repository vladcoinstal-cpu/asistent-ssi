# AGENTS.md — asistent-ssi mandatory workflow

These rules are BLOCKING for all tasks in this repository.

1. Never stop at CI failure.
   - Required loop: fix -> commit -> push -> GitHub Actions -> read full log -> fix again, until Actions are SUCCESS or a real blocker is proven.
2. Never report `in_progress` runs as final.
3. Never report only `exit code 1`.
   - Extract and use full failing evidence (test name/assertion and relevant output).
4. Mandatory SSI strategy is global audit, not one-subpoint-at-a-time.
   - First run a global audit for all subpoints from Anexa 4 + Anexa 5.
   - Collect all differences in a complete matrix.
   - Do not stop audit at first failing subpoint/field.
   - Repairs may be done in technical batches, but verification remains global at each run.
   - Do not declare done until global audit + Actions are green.
5. Any bug fix must become a reusable semantic rule + regression test.
6. `De completat` is allowed only when source memorii truly lacks data.
   - If source data exists and output still shows `De completat`, classify as critical (`unexpected-de-completat` / `unexpected-empty`).
7. SSI renderer must use structured semantic model, not contaminated raw mixed text.
8. Mandatory verification for SSI tasks:
   - empty skeleton checks (Anexa 4 / Anexa 5),
   - v58/v85 reference comparison (where available),
   - value checks on the 3 memorii fixtures,
   - reset/new-project/no-leakage,
   - anti-contamination between fields.
9. For point 1.4 specifically, preserve complete units and values:
   - regim (`D+P+Sp+M` etc.),
   - inaltime with `m`,
   - arii with `m²`/`m2`/`mp` normalized,
   - volum with `m³`/`m3`/`mc` normalized.

## Semantic Self-Audit Before Rendering

For every SSI extraction task, Codex must validate the deterministic semantic parser model before rendering the SSI text.

Required pipeline:
source text -> semantic model -> semantic audit -> renderer -> reference comparison -> browser tests -> GitHub Actions.

Rules:
- Never let renderer repair semantic extraction errors.
- Never render raw mixed text as a final SSI field.
- Each semantic field must have expected, actual, and audit status: `ok`, `missing`, `truncated`, `contaminated`, `wrong-source`, `wrong-unit`, `wrong-value`, `unexpected-empty`, `unexpected-de-completat`.
- If semantic audit fails, fix extraction first. Do not continue to renderer/browser comparison.
- Never scope verification to a single subpoint in isolation; enforce global matrix audit on all subpoints each run.
