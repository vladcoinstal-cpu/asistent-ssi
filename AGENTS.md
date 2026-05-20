# AGENTS.md — asistent-ssi mandatory workflow

These rules are BLOCKING for all tasks in this repository.

1. Never stop at CI failure.
   - Required loop: fix -> commit -> push -> GitHub Actions -> read full log -> fix again, until Actions are SUCCESS or a real blocker is proven.
2. Never report `in_progress` runs as final.
3. Never report only `exit code 1`.
   - Extract and use full failing evidence (test name/assertion and relevant output).
4. Do not move to another SSI subpoint while the current subpoint is red.
5. Any bug fix must become a reusable rule + regression test.
6. SSI renderer must use structured semantic model, not contaminated raw mixed text.
7. Mandatory verification for SSI tasks:
   - empty skeleton checks (Anexa 4 / Anexa 5),
   - v58/v85 reference comparison (where available),
   - value checks on the 3 memorii fixtures,
   - reset/new-project/no-leakage,
   - anti-contamination between fields.
8. For point 1.4 specifically, preserve complete units and values:
   - regim (`D+P+Sp+M` etc.),
   - inaltime with `m`,
   - arii with `m²`/`m2`/`mp` normalized,
   - volum with `m³`/`m3`/`mc` normalized.
