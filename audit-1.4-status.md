# Audit 1.4 (Anexa 4/5 vs v58/v85)

| Formular | Cod/subpunct | Titlu | Copii/câmpuri | Sursă date (app) | Așteptat (memorii test) | Afișat acum | Status |
|---|---|---|---|---|---|---|---|
| Normal | 1.4.a | tipul cladirii | tipul cladirii | `tip_cladire` | civila/mixta etc. | Populat corect | corect |
| Normal | 1.4.b | tipul parcajului | tipul parcajului | `tip_parcaj` | parcaj subteran / nu este cazul | Populat corect | corect |
| Normal | 1.4.c | caracteristici dimensionale | caracteristici dimensionale | `caracteristici_dimensionale` | regim+arii+volum | Populat (string compus) | corect |
| Normal | 1.4.d | nr max utilizatori | nr max utilizatori | `numar_utilizatori` | 120 persoane / 35 persoane | Populat fără spill depozitare/evacuare | corect |
| Normal | 1.4.e | autoevacuare | prezență + autoevacuare | `autoevacuare` | text autoevacuare dacă există | Uneori gol (depinde sursă) | lipsă parțială |
| Normal | 1.4.f | capacități depozitare | capacități depozitare | `capacitati_depozitare` | rafturi marfuri / nu este cazul | Populat corect | corect |
| Normal | 1.4.g | căi evacuare/refugii | căi evacuare/refugii | `cai_evacuare_rezumat` | doua cai / o cale | Populat corect | corect |
| Preliminar | 1.4 | particularități specifice | a..h (plus copii) | mapare pe labeluri (subset) | aceleași date 1.4 | a,b,c,g,h populate; e/f rămân generice | greșit/lipsă |

Observație: în preliminar, câmpurile "destinații încăperi" și "compartimente incendiu" au structură mai bogată decât mapping-ul extras curent; necesită etapă dedicată de mapare pentru completare consistentă.
