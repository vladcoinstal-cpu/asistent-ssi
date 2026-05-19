# Audit 1.4 (Normal vs Preliminar)

| Câmp 1.4 | Sursă de date | Valoare așteptată (memorii) | Valoare afișată acum | Status |
|---|---|---|---|---|
| tip clădire | `tip_cladire` | civilă/industrială/restaurant | populat dacă există în sursă | corect |
| tip parcaj | `tip_parcaj` | parcaj subteran / nu este cazul | populat dacă există în sursă | corect |
| regim înălțime | `caracteristici_dimensionale` (regim) | P+1 / P / etc | populat separat în preliminar | corect |
| volum | `caracteristici_dimensionale` (volum) | 3200 mc / etc | populat separat în preliminar | corect |
| arie construită | `caracteristici_dimensionale` | 500 mp / etc | populat separat în preliminar | corect |
| arie desfășurată | `caracteristici_dimensionale` | 900 mp / etc | populat separat în preliminar | corect |
| destinații încăperi/spații | `funcțiuni` | comerț / producție / alimentație | dacă lipsesc date -> De completat | parțial |
| compartimente incendiu | fallback compartiment unic | explicit din memoriu sau compartiment unic | implicit compartiment unic când lipsesc date | parțial |
| nr. max utilizatori | `numar_utilizatori` | 120/35 etc | populat fără contaminare cu depozitare | corect |
| prezență/autoevacuare | `autoevacuare` | text explicit sau De completat | De completat când sursa nu are clar | corect |
| capacități depozitare | `capacitati_depozitare` | rafturi / nu este cazul | populat separat | corect |
| căi evacuare/refugii | `cai_evacuare_rezumat` | una/două căi etc | populat separat | corect |
