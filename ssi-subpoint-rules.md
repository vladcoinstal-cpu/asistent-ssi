# Reguli stabile SSI (model v58/v85)

Aceste reguli definesc mapping-ul și interdicțiile pentru subpuncte, astfel încât outputul să rămână stabil.

## Interdicții globale în corp SSI
Nu sunt permise în corpul SSI normal/preliminar:
- Surse analizate
- Legislatie relevanta detectata
- Verificare normativa automata
- Acoperire reguli pe subpuncte
- Cadru generat curat
- ssi-frame-readonly

## Subpuncte sensibile (anti-amestec)
- **1.4.g**: doar număr utilizatori/ocupanți (surse: `numar_utilizatori`, inventar ocupare). Nu acceptă depozitare/procese/evacuare.
- **1.4.h**: doar capacități depozitare (surse: `capacitati_depozitare`). Nu acceptă evacuare/fluxuri/număr utilizatori.
- **3.4.c / 3.4.d**: doar date evacuare (geometrie, fluxuri). Nu acceptă depozitare/procese.
- **4.8 a-d**: doar IDSAI (acoperire/zone/ECS/dispozitive). Nu acceptă iluminat, DDR, AFDD.
- **4.10.c / 4.10.d**: doar DDR/AFDD. Nu acceptă text de iluminat sau IDSAI.

## Fallback
Când datele lipsesc sau sunt filtrate de reguli: `De completat.`

## Ordine minimă obligatorie
- Titlu
- Nota introductivă
- `1. Caracteristicile construcției/amenajării`
- `2. ...`
- `3. ...`
- `4. ...`
- `5. ...`
(în funcție de tip document)
