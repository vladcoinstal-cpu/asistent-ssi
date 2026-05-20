# Audit 1.4 (Normal/Preliminar) – status după fix semantic

## Memorii test folosite
- `memoriu-arhitectura-comercial-parcare-subsol.txt`
- `memoriu-arhitectura-industrial-depozitare.txt`
- `memoriu-arhitectura-restaurant-sala-aglomerata.txt`

| Câmp 1.4 | Sursă/date semantice | Așteptat | Status curent |
|---|---|---|---|
| tip clădire | `tip_cladire` | tip explicit din memoriu | corect când există explicit |
| tip parcaj | `tip_parcaj` | parcaj subteran / nu este cazul | corect |
| regim înălțime | `deriveDimensionParts().regim` | separat de volum/arii | corect (fără concatenare cu arii) |
| înălțime maximă | `deriveDimensionParts().inaltime` | separat când există | `De completat` când lipsește |
| volum | `deriveDimensionParts().volum` | valoare numerică + unitate, netrunchiat | corect (evită volum trunchiat) |
| aria construită | `deriveDimensionParts().ariaConstruita` | valoare numerică + unitate | corect când există în text |
| aria desfășurată | `deriveDimensionParts().ariaDesfasurata` | valoare numerică + unitate | corect când există în text |
| destinații încăperi/spații | `funcțiuni` | completare din destinație/functiuni | parțial (depinde granularitatea memoriului) |
| compartimente incendiu | fallback compartiment unic + dimensiuni derivate | populare coerentă cu volum/arii | parțial (compartiment explicit rar în memorii) |
| nr. max utilizatori | `numar_utilizatori` | separat de depozitare/evacuare | corect |
| prezență/autoevacuare | `autoevacuare` | text explicit sau `De completat` | corect |
| capacități depozitare | `capacitati_depozitare` | separat de utilizatori/evacuare | corect |
| căi evacuare/refugii | `cai_evacuare_rezumat` | separat de depozitare/utilizatori | corect |
