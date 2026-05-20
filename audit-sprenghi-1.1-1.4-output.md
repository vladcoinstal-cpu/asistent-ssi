# Audit Sprenghi 1.1-1.4 Output (gating)

- Referințe: `ssi-normal-v58.html`, `ssi-preliminar-v85.html`
- Sursă de extragere pentru audit: `test-fixtures/memoriu-sprenghi-1.1-1.4-curat.txt` (curată, delimitată strict 1.1–1.4)
- Regula: orice status diferit de `corect` blochează finalizarea.

## 1.1 Date de identificare
- v58: lăcaș de cult / obiectiv Sprenghi; Parohia Ortodoxă Învierea Domnului; municipiul Brașov, str. Mărășești nr. 47, județul Brașov.
- v85: aceleași valori (format preliminar)
- Generat acum: aceleași valori, fără contaminare cu contact/profil.
- Status: **corect**
- Regulă: denumire/beneficiar/adresă separate semantic; beneficiar fără adresă lipită; adresa fără bloc contact.

## 1.2 Destinație / funcțiuni
- v58: cult
- v85: cult
- Generat acum: cult
- Status: **corect**
- Regulă: pentru Sprenghi, 1.2 nu admite parcaj/industrial/birouri/depozitare în subpunctul de destinație.

## 1.3 Categoria și clasa de importanță
- v58: categoria C, clasa III-a
- v85: categoria C, clasa III-a
- Generat acum: categoria C, clasa III-a
- Status: **corect**
- Regulă: categoria/clasa nu se contaminează cu date din 1.4 (regim/arii/volum/utilizatori).

## 1.4 Particularități construcție
- v58/v85:
  - regim: D+P+Sp+M
  - înălțime: 20,98 m
  - aria construită: 350,75 m²
  - aria desfășurată: 693,08 m²
  - volum: 2900 m³
  - depozitare: spații de depozitare max. 36 m² / materiale metalice
  - utilizatori: 150 total; demisol 120; parter 130; supantă 20; mansardă 2
- Generat acum: aceleași valori în câmpurile 1.4 corespunzătoare.
- Status: **corect**
- Regulă: fiecare metrică în câmpul corect, cu unitate completă; fără amestec depozitare/autoevacuare/evacuare.

## Verdict
- 1.1: corect
- 1.2: corect
- 1.3: corect
- 1.4: corect
- Gate: **PASS**
