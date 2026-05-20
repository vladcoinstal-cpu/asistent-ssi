# Audit Sprenghi 1.1-1.4 Output

- Reference files: ssi-normal-v58.html, ssi-preliminar-v85.html
- Source used for extraction audit: test-fixtures/memoriu-sprenghi-complete-derived.txt (derived full text from v58+v85 HTML)

## 1.1 Date identificare
- v58/v85: obiectiv cult Sprenghi / beneficiar parohie / adresa Brasov Mărășești nr.47
- Generated semantic now:
  - denumire: (missing)
  - beneficiar: Parohia Ortodoxă Învierea Domnului
  - adresa: municipiul Brașov, str. Mărășești nr. 47, județul Brașov. B. Datele de contact ale beneficiarului a) nr. de telefon: nu sunt detalii. b) fax: nu sunt detalii. c) e-mail: nu sunt detalii. C. Profilul de activitate și, dup
- Status: lipsa/partial

## 1.2 Destinatie
- v58/v85: cult
- Generated semantic tags: parcaj, depozitare, industrial, birouri, cult
- Status: corect

## 1.3 Categoria
- v58/v85: categorie + clasa importantei
- Generated semantic raw: categoria C - construcție de importanță normală, conform HG nr
- Status: corect/partial

## 1.4 Particularitati
- v58/v85 expected: D+P+Sp+M; 20,98 m; 350,75 m²; 693,08 m²; 2900 m³
- Generated semantic:
  - regim: D+P+Sp+M
  - inaltime: 20,98 m
  - aria construita: 693,08 m²
  - aria desfasurata: (missing)
  - volum: (missing)
- Status: diferenta

## Reguli semantice necesare / aplicate
- campurile 1.1 separate (denumire/beneficiar/adresa) fara contaminare
- destinatie din taguri semantice, nu fallback brut
- 1.4 metrici cu unitati obligatorii si regim compact
