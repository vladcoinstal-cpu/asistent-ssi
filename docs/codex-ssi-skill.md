# Codex SSI Working Skill (asistent-ssi)

Scop: metodă stabilă, repetabilă, pentru orice task SSI din repo-ul `vladcoinstal-cpu/asistent-ssi`.

## 0) Preflight obligatoriu (fără excepții)
1. Verifică remote:
   - `git remote -v` trebuie să conțină `origin https://github.com/vladcoinstal-cpu/asistent-ssi.git`.
2. Verifică branch/PR țintă:
   - checkout exact pe branch-ul PR-ului (ex: `codex/semantic-14`).
3. Verifică testele relevante:
   - fișierele de test cerute trebuie să existe (ex: `tests/ssi-point14-reference.spec.js`, `tests/ssi-point14-values.spec.js`).
4. Dacă unul dintre punctele 1-3 e invalid: **oprești codarea**, repari contextul, apoi continui.

## 1) Workflow standard pentru orice bug SSI
1. Verifică structura-cadru goală aferentă anexei aplicabile (Anexa 4 / Anexa 5).
2. Verifică fișierul de referință aprobat (v58/v85), dacă există.
3. Compară outputul aplicației cu referința, punctual pe subpunct.
4. Identifică diferențele reale (nu cosmetice).
5. Transformă diferențele în reguli reutilizabile.
6. Implementează regulile în:
   - matricea activă de reguli SSI;
   - stratul semantic de extragere;
   - renderer-ul bazat pe date structurate.
7. Adaugă test(e) de regresie pe valori (nu doar existență de cuvinte).
8. Rulează testele locale + GitHub Actions.
9. Dacă pică: citește log complet, repară, commit, push, repetă până verde.

## 2) Constrângeri de calitate (obligatorii)
- Nu lucra izolat pe simptom; convertește cauza în regulă generală reutilizabilă.
- Nu relaxa testele ca să treacă.
- Nu accepta valori trunchiate/contaminate în extrageri semantice.
- Renderer-ul trebuie să consume date structurate, nu texte amestecate.
- Orice regulă nouă => test de regresie nou.
- Verifică explicit reset/proiect nou/no-leakage.

## 3) Criterii de “gata”
Un task este finalizat doar dacă:
1. commitul există pe branch-ul PR-ului în GitHub;
2. există run GitHub Actions pentru commit;
3. run-ul are verdict final (nu `in_progress`);
4. dacă e roșu, eroarea exactă este extrasă din log complet și urmează un nou ciclu fix.

## 4) Interdicții explicite
- Nu continua în checkout fără `origin` corect.
- Nu continua dacă nu ești pe branch-ul/PR-ul corect.
- Nu considera commit local drept rezultat final.
- Nu te opri la push blocat, run `in_progress` sau annotation general.

## 5) Checklist minim per PR
- [ ] Context Git valid (origin + branch PR)
- [ ] Comparație cu referințe (v58/v85) unde există
- [ ] Reguli reutilizabile actualizate
- [ ] Strat semantic actualizat
- [ ] Renderer pe date structurate validat
- [ ] Teste de regresie pe valori adăugate/actualizate
- [ ] Reset/no-leakage validat
- [ ] Actions verde
