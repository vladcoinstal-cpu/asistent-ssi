# Audit reguli - SSI preliminar - 2026-05-02

## 1. Reguli deja prinse in program

### Structura si surse
- Structura de baza pentru `SSI preliminar` este separata in `ssi-preliminar-structure.json` si este chemata din `app.js`.
- Generatorul pentru preliminar este separat de generatorul pentru `SSI normal`.
- Sunt refolosite reguli comune din nucleul programului: incarcare surse, extragere de date, profil de proiect, evaluare acte aplicabile.

### Reguli comune reutilizate
- Diacritice romanesti sunt tratate la nivel de generator comun, chiar daca mai trebuie rafinare pe unele expresii.
- Trimiterile legislative pot fi hyperlinkate.
- Verificarile legislative comune sunt reutilizate unde subiectul este comun cu `SSI normal`.
- Justificarile normative pot fi inserate in subpuncte unde exista date suficiente.

### Continut prins ca logica
- Tabelul cu incaperi si suprafete pentru preliminar este tratat separat fata de SSI normal.
- Sunt prinse completari de fond la:
  - `1.3`
  - `1.4 a)`
  - `2`
  - `3.4`
  - `4.3`
  - `4.10`
- Pentru punctele tehnice, programul poate folosi verificari deja create pentru:
  - sarcina termica
  - risc de incendiu
  - IDSAI
  - iluminat de siguranta
  - protectie la trasnet
  - unele fluxuri de evacuare

## 2. Reguli ramase inca doar in documentele generate

### Forma tabelara exacta din Anexa nr. 5
Acestea nu sunt inca mutate complet si sigur in generator, ci au fost corectate de mai multe ori direct in fisierele `.doc`:
- pozitia exacta a liniei dintre coloane pentru puncte/subpuncte;
- faptul ca punctul mare este centrat iar subpunctul ramane in stanga;
- faptul ca la unele puncte partea stanga trebuie goala;
- modul exact in care punctul `2` trebuie asezat in tabel;
- unele corectii de randuri adaugate / sterse prin reconstructie manuala a tabelului.

### Finisaje de redactare validate azi
Au ramas partial doar in fisierele generate, nu complet in regula de program:
- anumite formulari foarte stricte validate de utilizator la preliminar;
- ordinea si densitatea exacta a detaliilor in unele celule;
- impartirea finala a unor blocuri tehnice in exact numarul de litere din anexa;
- unele corectii punctuale la `3.6`, `4.3`, `4.10`.

## 3. Ce trebuie mutat explicit in reguli reutilizabile

### Prioritatea 1
- regula completa de randare tabelara pentru `Anexa nr. 5`;
- regula pentru punctul `2` astfel incat sa fie generat corect din prima, fara corectii manuale pe randuri;
- regula pentru pozitionarea liniilor si a celulelor la punct mare / subpunct / detalii.

### Prioritatea 2
- reguli finale pentru toate denumirile si detaliile din `3.6`, `4.3`, `4.10`;
- reguli de redactare fina validate azi, astfel incat sa nu mai fie nevoie de interventii manuale pe fiecare versiune Word.

### Prioritatea 3
- verificare automata punct cu punct fata de `Anexa nr. 5`, nu doar structura logica, ci si lista exacta de detalii;
- semnalare automata cand un subpunct are mai multe / mai putine litere decat anexa.

## 4. Concluzie
- Fondul tehnic al SSI preliminar este in buna parte prins in program.
- Forma tabelara exacta si unele ajustari finale de redactare nu sunt inca mutate complet ca reguli generale.
- Urmatorul pas corect este mutarea regulilor de forma din documentele reparate manual inapoi in generator.
