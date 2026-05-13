# Audit reguli program - 2026-05-01

## Concluzie

Nu, **nu toate** modificarile finale discutate s-au concretizat complet ca reguli generale in program.

Exista deja un nucleu bun de reguli in `app.js`, `ssi-normal-rules-matrix.json`, `legislation-rules.json` si `legislation-articles.json`, dar o parte dintre corectiile finale au ramas:

- doar in `scenariu-securitate-incendiu-normal-biserica-invierea-domnului-v33.html`;
- doar in exporturile `.doc` succesive;
- sau implementate partial / neuniform in `app.js`.

## Ce este deja prins ca regula in program

- structura de baza pentru `SSI normal` pe `Anexa nr. 4`;
- structura de baza pentru `SSI preliminar` pe `Anexa nr. 5`;
- matrice de reguli pe subpuncte pentru `SSI normal`;
- incarcare baza legislativa si referinte legislative;
- generare de hyperlinkuri pentru referinte legale structurate `[[LAWREF:...]]`;
- verificari pentru:
  - incadrarea la `HG nr. 571/2016`;
  - instalatii de stingere;
  - IDSAI;
  - desfumare;
  - iluminat de siguranta;
  - protectie impotriva trasnetului;
- reguli de deducere pentru reactia la foc / rezistenta la foc;
- randare cu etichete bold si continut normal;
- export `Word` si `JSON`.

## Ce NU este inca prins complet ca regula generala

### 1. Regula lingvistica pentru diacritice

Este doar **partial** implementata.

Probleme observate:

- functia `normalizeRomanianDiacritics()` din `app.js` exista, dar contine inca multe inlocuiri salvate in forma stricata de codare (`Ã`, `Ä`, `È`);
- regula nu este suficient de robusta gramatical;
- mai multe corecturi recente au fost aplicate prin inlocuiri directe in documente, nu printr-un strat lingvistic coerent in program.

Consecinta:

- documentul curent poate arata mai bine dupa corectii locale;
- dar regenerarea automata nu garanteaza inca aceeasi calitate pe toate proiectele.

### 2. Regula morfologica pentru `a` / `ă`

Nu este inca modelata corect ca regula lingvistica.

Exemple discutate:

- `aceasta masina` nu urmeaza aceeasi logica simpla ca `masina aceea`;
- nu putem transforma mecanic toate finalele `a` in `ă`.

Acum programul foloseste:

- liste de inlocuire punctuale;
- nu o regula morfologica explicita pe clase gramaticale.

### 3. Toate ajustarile de formulare din capitolele 3, 4, 5, 6

Nu toate sunt mutate complet in generator.

Exista corectii ramase locale in documentul curent pentru:

- formularea anumitor concluzii;
- unele diacritice contextuale;
- unele expresii tehnice finale validate de utilizator.

### 4. `README.md`

Nu reflecta curat starea finala.

Probleme:

- mai are mult text fara diacritice;
- are chiar si text cu codare stricata in descrierea normalizarii;
- nu descrie complet faptul ca multe corectii finale sunt inca locale, nu 100% generalizate.

## Fisiere verificate

- `app.js`
- `ssi-normal-rules-matrix.json`
- `README.md`
- `scenariu-securitate-incendiu-normal-biserica-invierea-domnului-v33.html`
- `scenariu-preliminar-biserica-invierea-domnului.md`

## Verdict pe scurt

Programul are:

- `reguli structurale`: da, in mare parte;
- `reguli legislative`: da, in mare parte;
- `reguli de verificare pe subpuncte`: da, partial-avansat;
- `reguli lingvistice finale pentru romana`: nu, inca incomplet;
- `uniformizare completa intre generator si documentul curent`: nu, inca incomplet.

## Pasul corect urmator

1. Refacerea completa a functiei `normalizeRomanianDiacritics()` in `app.js`, in UTF-8 curat.
2. Separarea regulilor lingvistice in:
   - diacritice lexicale;
   - reguli contextuale;
   - exceptii.
3. Reaplicarea generatorului pe:
   - `SSI normal`
   - `SSI preliminar`
4. Curatarea `README.md` ca documentatie reala a starii finale.
