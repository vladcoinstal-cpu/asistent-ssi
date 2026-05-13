# Stare reală bază acte locale

La data de `2026-05-08`, baza locală a programului este în starea următoare:

## Acte cu `originalText` local explicit

- `omai_180_2022`
- `p118_1_2025`
- `p118_99`
- `p118_2_2013`
- `p118_3_2015`
- `i7_2011`
- `i13_2015`
- `omai_130_2007`
- `omai_163_2007`
- `cr_0_2012`
- `reg_1272_2008_clp`
- `ordin_28_2009`
- `ordin_6025_2018`
- `ordin_6026_2018`
- `ordin_959_2023`
- `hg_571_2016`
- `hg_766_1997`
- `hg_1181_2022`
- `hg_971_2006`
- `legea_307_2006`
- `legea_10_1995`
- `legea_50_1991`
- `legea_59_2016`
- `ordin_1822_394_2004`
- `hg_925_1995`
- `omai_87_2010`
- `omai_112_2014`
- `omai_51_2024`
- `i5_2010`
- `np_127_2009`
- `ntpee_2018`

Total curent: `31` acte cu `originalText` local explicit.

## Regula folosită în program

La click pe lege/articol, aplicația deschide doar din baza locală, în ordinea:

1. `originalText`
2. `fullText`
3. text continuu compus din `sections`

La `Extrage`, pentru actele noi descoperite în sursele încărcate:

- programul le adaugă în baza locală;
- le creează automat o fișă locală minimă;
- le compune automat un draft local continuu pentru reader, folosind fragmentele găsite în sursele încărcate.

## Ce înseamnă această stare

- Dacă un act are `originalText`, reader-ul îl poate afișa ca text local explicit.
- Dacă un act nu are `originalText`, dar are `fullText` sau `sections`, aplicația poate construi totuși un reader continuu local.
- Reader-ul continuu din `fullText` sau `sections` este util pentru citire și scroll, dar nu înseamnă automat text integral oficial verificat cap-coadă.

## Stare actuală

Nu mai există acte din baza locală fără `originalText` explicit.

## Observație importantă

Faptul că un act are `originalText` local nu înseamnă automat că este deja verificat cap-coadă față de forma oficială completă. Verificarea integrală rămâne o etapă separată față de simpla arhivare locală pentru citire.
