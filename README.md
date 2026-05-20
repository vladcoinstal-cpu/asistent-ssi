# Generator SSI - prototip local

Acest folder contine un prototip local, fara instalare, pentru pregatirea unui draft de
`scenariu de securitate la incendiu` pe structura din `Anexa nr. 4` a normelor aprobate prin
`OMAI 180/2022`, respectiv a unui `scenariu de securitate la incendiu preliminar` pe structura din
`Anexa nr. 5` a aceluiasi act normativ.

## Ce face acum

- incarca documente `Word .docx`;
- accepta si fisiere text (`.txt`, `.md`, `.csv`, `.json`, `.html`, `.rtf`) si text lipit manual;
- extrage informatii utile din memorii de arhitectura si instalatii;
- foloseste o baza de reguli in `JSON` pentru a detecta legislatia aplicabila;
- verifica si introduce automat, la inceputul fiecarui `SSI normal` si `SSI preliminar`, incadrarea obiectivului in categoriile de constructii pentru care este obligatorie obtinerea avizului de securitate la incendiu, cu temeiul legal aplicabil sau cu marcaj `de verificat`;
- genereaza automat structura de la `pct. 2.1` privind evaluarea riscului de incendiu si completeaza calculul sarcinii termice, incadrarea si concluzia acolo unde exista date suficiente in documentatie;
- genereaza un draft SSI;
- exporta rezultatul in `Word editabil (.doc)`;
- exporta si datele structurate in `JSON`.

## Cum se foloseste

1. Deschide `index.html` in browser.
2. Incarca memorii tehnice, preferabil `docx`.
3. Completeaza sau verifica `Profil proiect`.
4. Apasa `Extrage informatii`.
5. Apasa `Evalueaza legislatia`.
6. Revizuieste campurile.
7. Apasa `Genereaza draft SSI`.
8. Descarca rezultatul in `Word editabil`.

## Limitari curente

- `docx` este citit local in browser;
- formatul vechi `doc` nu este inca pars-at automat;
- `pdf`, imagini si OCR sunt amanate pentru etapa urmatoare;
- exportul Word este un document editabil simplu `.doc`, nu un `.docx` nativ;
- extragerea este bazata pe reguli simple, nu pe analiza semantica avansata;
- rezultatul este `draft de lucru`, nu document final avizat.

## Fisiere principale

- `index.html` - interfata aplicatiei
- `styles.css` - stiluri
- `app.js` - logica de incarcare, extractie, reguli si export
- `legislation-rules.json` - baza de reguli legislative pentru aplicabilitate
- `inventar-legislatie-ssi.md` - inventarul explicativ al actelor verificate
- `ssi-normal-rules-matrix.json` - matricea de reguli pe subpuncte pentru `SSI normal`, construita pe baza Anexei nr. 4
- `fire-resistance-deduction-rules.json` - reguli generale pentru deducerea reactiei la foc si a rezistentei la foc pe tipuri de elemente constructive, pe baza datelor din memorii si a bazei normative
- pentru incaperile cu aparate consumatoare de combustibili gazosi, programul trateaza separat verificarea suprafetei vitrate minime in raport cu volumul net al incaperii si cu existenta detectorilor automati de gaze naturale
- `app.js` foloseste deja matricea pentru evaluarea acoperirii pe subpuncte si pentru generarea asistata a unor blocuri precum `1.1-1.4`, `2.1`, `3.1-3.4`, `4.1-4.11`, `5` si `6`
- extragerea a fost extinsa cu extractoare dedicate pentru subpuncte importante, nu doar cu cautari simple pe linii
- blocurile pentru `4.8 - 4.11` si partea de evacuare sunt rafinate cu subdetalii, nu doar cu verdict general pe o singura linie
- pentru `pct. 3.1`, programul trateaza separat `reactia la foc` si `rezistenta la foc`: reactia la foc se poate deduce din material si din clasificarea aplicabila, iar rezistenta la foc se deduce numai prin corelarea tipului de element, a alcatuirii, a rolului structural si a cerintei/performantei rezultate din normativ sau din documentatia tehnica
- la randarea `SSI normal` si `SSI preliminar`, programul evidentiaza cu bold doar denumirile detaliilor si lasa textul explicativ din dreapta in stil normal
- la generarea textelor pentru `SSI normal` si `SSI preliminar`, programul aplica normalizarea cu diacritice romanesti (`ș, ț, â, ă, î`) pentru redactarea finala

## Baza legala folosita la structurare

- `Ordinul MAI nr. 180/2022`, publicat in Monitorul Oficial nr. `1253` din `27.12.2022`
- `Anexa nr. 4` - structura-cadru a scenariului de securitate la incendiu
- `P 118/1-2025`, `P118/2-2013`, `P118/3-2015` si actele lor de modificare, incluse in baza de reguli

## Pasii urmatori recomandati

- import `pdf`;
- OCR pentru documente scanate;
- export `docx` nativ;
- trasabilitate pe paragraf si sursa;
- verificari de praguri automate pe functiuni si instalatii;
- matrice de reguli pe destinatii speciale: spitale, scoli, parcaje, cladiri inalte, depozite.

## Troubleshooting test execution in restricted environments

- Testele semantice (`npm run test:semantic`) ruleaza fara browser si sunt recomandate pentru validari rapide in medii fara acces la CDN extern.
- Testele Playwright (`npm run test:e2e`, inclusiv `tests/ssi-full-audit.spec.js`) necesita binarele de browser instalate local.
- Daca instalarea Playwright esueaza cu mesaj de tip `Domain forbidden` la descarcare, cauza este de regula o restrictie de retea pe domeniul CDN Playwright, nu o eroare functionala a codului.
- In acest caz, rulati aceleasi comenzi intr-un mediu CI/local cu acces la `cdn.playwright.dev` sau cu browsere Playwright deja preinstalate.
