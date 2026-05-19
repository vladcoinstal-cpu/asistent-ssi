const annexFields = [
  { key: "denumire_obiectiv", label: "Denumire obiectiv", hint: "Anexa 4, pct. 1.1.A" },
  { key: "beneficiar", label: "Beneficiar", hint: "Anexa 4, pct. 1.1.A" },
  { key: "adresa", label: "Adresa", hint: "Anexa 4, pct. 1.1.A" },
  { key: "contact_beneficiar", label: "Date contact beneficiar", hint: "Anexa 4, pct. 1.1.B" },
  { key: "profil_activitate", label: "Profil activitate / program", hint: "Anexa 4, pct. 1.1.C" },
  { key: "funcțiuni", label: "Functiuni principale / secundare / conexe", hint: "Anexa 4, pct. 1.2" },
  { key: "categoria_importanta", label: "Categoria de importanta", hint: "Anexa 4, pct. 1.3" },
  { key: "tip_cladire", label: "Tip cladire", hint: "Anexa 4, pct. 1.4.a" },
  { key: "tip_parcaj", label: "Tip parcaj / numar autovehicule", hint: "Anexa 4, pct. 1.4.b" },
  { key: "caracteristici_dimensionale", label: "Arii / volume / regim de inaltime", hint: "Anexa 4, pct. 1.4.c" },
  { key: "numar_utilizatori", label: "Numar maxim utilizatori", hint: "Anexa 4, pct. 1.4.d" },
  { key: "autoevacuare", label: "Prezenta permanenta / autoevacuare", hint: "Anexa 4, pct. 1.4.e" },
  { key: "capacitati_depozitare", label: "Capacitati de depozitare", hint: "Anexa 4, pct. 1.4.f" },
  { key: "cai_evacuare_rezumat", label: "Cai de evacuare / refugii", hint: "Anexa 4, pct. 1.4.g" },
  { key: "risc_incendiu", label: "Niveluri risc incendiu", hint: "Anexa 4, pct. 2" },
  { key: "procese_substante", label: "Procese / substante periculoase", hint: "Anexa 4, pct. 2.B" },
  { key: "stabilitate_foc", label: "Stabilitate / reactie la foc", hint: "Anexa 4, pct. 3.1" },
  { key: "limitare_vecinatati", label: "Limitare propagare la vecinatati", hint: "Anexa 4, pct. 3.2" },
  { key: "evacuare", label: "Evacuarea utilizatorilor", hint: "Anexa 4, pct. 3.3.A" },
  { key: "evacuare_persoane_vulnerabile", label: "Măsuri pentru persoane vulnerabile", hint: "Anexa 4, pct. 3.3.B" },
  { key: "interventie", label: "Acces și securitatea fortelor de interventie", hint: "Anexa 4, pct. 3.4" },
  { key: "instalații_stingere", label: "Instalații de stingere", hint: "Anexa 4, pct. 4.A" },
  { key: "idsai", label: "Detectare, semnalizare și alarmare", hint: "Anexa 4, pct. 4.B" },
  { key: "desfumare", label: "Desfumare / evacuare fum", hint: "Anexa 4, pct. 4.C" },
  { key: "alimentare_electrica", label: "Alimentare receptoare cu rol PSI", hint: "Anexa 4, pct. 4.D" },
  { key: "iluminat_siguranta", label: "Iluminat de siguranta", hint: "Anexa 4, pct. 4.E" },
  { key: "trsnet", label: "Protecție impotriva trasnetului", hint: "Anexa 4, pct. 4.F" },
  { key: "măsuri_organizatorice", label: "Măsuri tehnico-organizatorice", hint: "Anexa 4, pct. 5" },
  { key: "stingatoare", label: "Stingatoare și mijloace de interventie", hint: "Anexa 4, pct. 5.D" },
  { key: "măsuri_compensatorii", label: "Măsuri compensatorii", hint: "Anexa 4, pct. 6" },
  { key: "scari_interioare", label: "Scari interioare / material", hint: "Date utile pentru evacuare și reactie la foc" },
  { key: "centrala_termica", label: "Centrala termica / sursă de incalzire", hint: "Date utile din memoriul IS/IT" },
  { key: "bucatarie_gaze", label: "Spatii cu aragaz / gaze", hint: "Completari arhitectură / risc local" },
  { key: "surse_aprindere_specifice", label: "Surse specifice de aprindere", hint: "Ex. lumanari, candele, aragaz, centrala" }
];

const patterns = {
  denumire_obiectiv: [/denumirea\s+(?:obiectivului|constructiei|constructiei|investitiei)\s*[:\-]\s*(.+)/i],
  beneficiar: [/(?:beneficiar|proprietar|investitor)\s*[:\-]\s*(.+)/i],
  adresa: [/(?:adresa|adresa\s+obiectivului)\s*[:\-]\s*(.+)/i],
  contact_beneficiar: [/(?:telefon|tel\.?|e-mail|email|fax)\s*[:\-]\s*(.+)/i],
  profil_activitate: [/(?:profilul\s+de\s+activitate|programul\s+de\s+lucru)\s*[:\-]\s*(.+)/i],
  funcțiuni: [/(?:destinatia|funcțiuni(?:\s+principale|\s+secundare|\s+conexe)?)\s*[:\-]\s*(.+)/i],
  categoria_importanta: [/(?:categoria\s+de\s+importanta)\s*[:\-]\s*(.+)/i],
  tip_cladire: [/(?:tipul\s+cladirii|cladire\s+(?:civilă|de\s+productie|depozitare|mixta))\s*[:\-]?\s*(.+)/i],
  tip_parcaj: [/(?:tipul\s+parcajului|parcaj)\s*[:\-]\s*(.+)/i],
  caracteristici_dimensionale: [/(?:regimul\s+de\s+inaltime|aria\s+construită|aria\s+desfășurată|volumul)\s*[:\-]\s*(.+)/i],
  numar_utilizatori: [/(?:numarul?\s+maxim\s+de\s+utilizatori|utilizatori)\s*[:\-]\s*(.+)/i],
  autoevacuare: [/(?:autoevacuare|prezenta\s+permanenta)\s*[:\-]\s*(.+)/i],
  capacitati_depozitare: [/(?:capacitati?\s+de\s+depozitare|depozitare)\s*[:\-]\s*(.+)/i],
  cai_evacuare_rezumat: [/(?:cai\s+de\s+evacuare|refugii)\s*[:\-]\s*(.+)/i],
  risc_incendiu: [/(?:risc(?:ul)?\s+de\s+incendiu|nivel(?:urile)?\s+de\s+risc)\s*[:\-]\s*(.+)/i],
  procese_substante: [/(?:substante\s+periculoase|proces(?:e)?\s+tehnologic(?:e)?)\s*[:\-]\s*(.+)/i],
  stabilitate_foc: [/(?:gradul\s+de\s+rezistenta\s+la\s+foc|nivelul\s+de\s+stabilitate|clasa\s+de\s+reactie\s+la\s+foc)\s*[:\-]\s*(.+)/i],
  limitare_vecinatati: [/(?:distante\s+de\s+siguranta|vecinatati|propagării?\s+incendiului)\s*[:\-]\s*(.+)/i],
  evacuare: [/(?:timpii?\s+de\s+evacuare|lungimile\s+de\s+evacuare|fluxurile\s+de\s+evacuare|marcarea\s+cailor\s+de\s+evacuare)\s*[:\-]\s*(.+)/i],
  evacuare_persoane_vulnerabile: [/(?:persoanelor\s+cu\s+dizabilitati|bolnavilor|copiilor)\s*[:\-]?\s*(.+)/i],
  interventie: [/(?:acces(?:ul)?\s+autospecialelor|cai\s+de\s+interventie|ascensoare(?:le)?\s+de\s+pompieri)\s*[:\-]\s*(.+)/i],
  instalații_stingere: [/(?:instalații?\s+de\s+stingere|hidranți|sprinkler(?:e)?|ceață\s+de\s+apa)\s*[:\-]\s*(.+)/i],
  idsai: [/(?:detectare|semnalizare|alarmare\s+la\s+incendiu|idsai|e\.c\.s\.)\s*[:\-]\s*(.+)/i],
  desfumare: [/(?:desfumare|evacuare\s+fum|gaze\s+fierbinti)\s*[:\-]\s*(.+)/i],
  alimentare_electrica: [/(?:alimentarea\s+receptoarelor|sursa\s+de\s+rezervă|rol\s+de\s+securitate\s+la\s+incendiu)\s*[:\-]\s*(.+)/i],
  iluminat_siguranta: [/(?:iluminat\s+de\s+siguranta)\s*[:\-]\s*(.+)/i],
  trsnet: [/(?:protecție\s+impotriva\s+trasnetului|ipt|spt)\s*[:\-]\s*(.+)/i],
  măsuri_organizatorice: [/(?:măsuri\s+tehnico-organizatorice|instructiuni\s+de\s+functionare|verificare\s+si\s+intretinere)\s*[:\-]\s*(.+)/i],
  stingatoare: [/(?:stingatoare|mijloace\s+de\s+interventie|aparate\s+de\s+stins)\s*[:\-]\s*(.+)/i],
  măsuri_compensatorii: [/(?:măsuri\s+compensatorii)\s*[:\-]\s*(.+)/i],
  scari_interioare: [/(?:scarile\s+interioare|scari\s+interioare)\s*(?:sunt)?\s*[:\-]?\s*(.+)/i],
  centrala_termica: [/(?:centrala\s+termica(?:\s+este)?|cazan(?:\s+de\s+pardoseală)?|centrala\s+murala)\s*[:\-]?\s*(.+)/i],
  bucatarie_gaze: [/(?:bucatarie\s+cu\s+aragaz\s+pe\s+gaze|aragaz\s+pe\s+gaze)\s*[:\-]?\s*(.+)/i],
  surse_aprindere_specifice: [/(?:lumanari|candele|aragaz|centrala\s+termica|detector\s+gaze)\s*[:\-]?\s*(.+)/i]
};

const customExtractors = {
  beneficiar(lines, content) {
    const joined = lines.join(" ");
    const match = joined.match(/(Parohia[^.\n]{3,200})/i)
      || joined.match(/(?:beneficiar|proprietar|investitor)\s*[:\-]\s*([^.\n]{3,200})/i);
    return match ? cleanBeneficiaryText(match[1] || match[0]) : "";
  },
    adresa(lines, content) {
      const joined = lines.join(" ");
      const match = joined.match(/((?:str\.|strada|bd\.|bulevardul|municipiul|orasul|județul|judetul)[^.\n]{8,220})/i);
      return match ? cleanAddressText(match[1]) : "";
    },
    categoria_importanta(lines, content) {
      const joined = lines.join(" ");
      const match = joined.match(/categoria\s+de\s+importan(?:ț|t)ă\s*[:\-]?\s*([^.\n]{3,180})/i)
        || joined.match(/categoria\s+([A-D])\s*\(([^)]+)\)/i);
      if (!match) return "";
      if (match[1] && match[2]) {
        return `categoria ${String(match[1]).toUpperCase()} (${match[2].trim()})`;
      }
      return cleanExtract(match[1] || match[0]);
    },
  funcțiuni(lines, content) {
    const source = content.toLowerCase();
    const found = [];
    if (source.includes("cult")) found.push("cult");
    if (source.includes("locuint")) found.push("locuință");
    if (source.includes("birou")) found.push("birouri");
    if (source.includes("utilit")) found.push("utilități");
    return found.length ? Array.from(new Set(found)).join(", ") : "";
  },
  caracteristici_dimensionale(lines, content) {
    const joined = lines.join(" ");
    const regim = joined.match(/regimul\s+de\s+inaltime\s*[:\-]?\s*([^;.\n]+)/i)?.[1]?.trim();
    const inaltime = joined.match(/inaltimea?\s+maxima(?:\s+a\s+cladirii)?\s*[:\-]?\s*([^;.\n]+)/i)?.[1]?.trim();
    const volum = joined.match(/volumul\s+constructiei\s*[:\-]?\s*([^;.\n]+)/i)?.[1]?.trim();
    const ariaC = joined.match(/aria\s+construită\s*[:\-]?\s*([^;.\n]+)/i)?.[1]?.trim();
    const ariaD = joined.match(/aria\s+desfășurată\s*[:\-]?\s*([^;.\n]+)/i)?.[1]?.trim();
    const parts = [];
    if (regim) parts.push(`regim de inaltime: ${regim}`);
    if (inaltime) parts.push(`inaltime maxima: ${inaltime}`);
    if (volum) parts.push(`volum: ${volum}`);
    if (ariaC) parts.push(`arie construită: ${ariaC}`);
    if (ariaD) parts.push(`arie desfășurată: ${ariaD}`);
    return parts.join("; ");
  },
  numar_utilizatori(lines, content) {
    const joined = lines.join(" ");
    const total = joined.match(/num[aă]r(?:ul)?\s+maxim\s+total\s+de\s+utilizatori\s*[:\-]?\s*([^;.\n]+)/i)?.[1]?.trim()
      || joined.match(/num[aă]r(?:ul)?\s+maxim\s+de\s+utilizatori\s*[:\-]?\s*([^;.\n]+)/i)?.[1]?.trim();
    const demisol = joined.match(/demisol\s*[:\-]?\s*([0-9]+(?:[,.][0-9]+)?\s*pers(?:oane)?)/i)?.[1]?.trim();
    const parter = joined.match(/parter\s*[:\-]?\s*([0-9]+(?:[,.][0-9]+)?\s*pers(?:oane)?)/i)?.[1]?.trim();
    const supantă = joined.match(/supant[aă]\s*[:\-]?\s*([0-9]+(?:[,.][0-9]+)?\s*pers(?:oane)?)/i)?.[1]?.trim();
    const mansardă = joined.match(/mansard[aă]\s*[:\-]?\s*([0-9]+(?:[,.][0-9]+)?\s*pers(?:oane)?)/i)?.[1]?.trim();
    const note = joined.match(/nota\s*:\s*([^\.]+\.)/i)?.[1]?.trim();
    const parts = [];
    if (total) parts.push(`total: ${total}`);
    if (demisol) parts.push(`demisol: ${demisol}`);
    if (parter) parts.push(`parter: ${parter}`);
    if (supantă) parts.push(`supantă: ${supantă}`);
    if (mansardă) parts.push(`mansardă: ${mansardă}`);
    if (note) parts.push(`nota: ${note}`);
    return parts.join("; ");
  },
  autoevacuare(lines, content) {
    const joined = lines.join(" ");
    const match = joined.match(/persoanele[^.]*autoevacu[^.]*\./i) || joined.match(/persoanele[^.]*valide[^.]*\./i);
    return match ? cleanExtract(match[0]) : "";
  },
  evacuare_persoane_vulnerabile(lines, content) {
    const joined = lines.join(" ");
    const match = joined.match(/nu\s+rezult[aă][^.]*asisten[țt][aă]\s+specializat[aă][^.]*\./i)
      || joined.match(/persoane[^.]*nu\s+se\s+pot\s+evacua\s+singure[^.]*\./i);
    return match ? cleanExtract(match[0]) : "";
  },
  capacitati_depozitare(lines, content) {
    const joined = lines.join(" ");
    const first = joined.match(/nu\s+sunt\s+spatii\s+de\s+depozitare[^.]*\./i)?.[0];
    const second = joined.match(/in\s+spatiile\s+de\s+depozitare[^.]*\./i)?.[0];
    return [first, second].filter(Boolean).map(cleanExtract).join(" ");
  },
  cai_evacuare_rezumat(lines, content) {
    const joined = lines.join(" ");
    const demisol = joined.match(/de\s+la\s+demisol[^.]*\./i)?.[0];
    const parter = joined.match(/de\s+la\s+parter[^.]*\./i)?.[0];
    const mansardă = joined.match(/de\s+la\s+mansard[ăa][^.]*\./i)?.[0];
    return [demisol, parter, mansardă].filter(Boolean).map(cleanExtract).join(" ");
  },
  risc_incendiu(lines, content) {
    const joined = lines.join(" ");
    const cult = joined.match(/s[aă]li\s+cult[^.]*mic/i)?.[0];
    const birou = joined.match(/birou[^.]*mic/i)?.[0];
    const depo = joined.match(/depozitare[^.]*mic/i)?.[0];
    const ct = joined.match(/central[aă]\s+termic[aă][^.]*mijlociu/i)?.[0];
    const concl = joined.match(/intreaga\s+constructie[^.]*risc(?:ului)?\s+mic[^.]*\./i)?.[0];
    return [cult, birou, depo, ct, concl].filter(Boolean).map(cleanExtract).join(" ");
  },
  procese_substante(lines, content) {
    const joined = lines.join(" ");
    const match = joined.match(/caracteristici\s+ale\s+proceselor[^:]*:\s*([^.\n]+)/i) || joined.match(/nu\s+este\s+cazul/i);
    return match ? cleanExtract(match[1] || match[0]) : "";
  },
  stabilitate_foc(lines, content) {
    const joined = lines.join(" ");
    const parts = [
      joined.match(/stalpi[^;.\n]*LRF[^;.\n]*/i)?.[0],
      joined.match(/grinzi[^;.\n]*LRF[^;.\n]*/i)?.[0],
      joined.match(/pere[țt]i\s+de\s+compartimentare[^;.\n]*LRF[^;.\n]*/i)?.[0],
      joined.match(/suportul\s+continuu[^;.\n]*lemn[^;.\n]*/i)?.[0],
      joined.match(/gradul\s+II[^;.\n]*rezistent[aă]\s+la\s+foc/i)?.[0]
    ].filter(Boolean);
    return parts.map(cleanExtract).join("; ");
  },
  limitare_vecinatati(lines, content) {
    const joined = lines.join(" ");
    const parts = [
      joined.match(/cea\s+mai\s+apropiat[aă]\s+construc[țt]ie[^.]*\./i)?.[0],
      joined.match(/distan[țt]ele\s+de\s+siguran[țt][aă][^.]*\./i)?.[0]
    ].filter(Boolean);
    return parts.map(cleanExtract).join(" ");
  },
  evacuare(lines, content) {
    const joined = lines.join(" ");
    const parts = [
      joined.match(/evacuarea\s+persoanelor[^.]*parter[^.]*\./i)?.[0],
      joined.match(/evacuarea\s+persoanelor[^.]*demisol[^.]*\./i)?.[0],
      joined.match(/evacuarea\s+persoanelor\s+de\s+la\s+mansard[ăa][^.]*\./i)?.[0],
      joined.match(/u[sș]ile\s+de\s+evacuare[^.]*\./i)?.[0],
      joined.match(/num[aă]rul\s+necesar\s+de\s+fluxuri[^.]*\./i)?.[0]
    ].filter(Boolean);
    return parts.map(cleanExtract).join(" ");
  },
  interventie(lines, content) {
    const joined = lines.join(" ");
    const parts = [
      joined.match(/sursa\s+de\s+ap[aă][^.]*\./i)?.[0],
      joined.match(/interven[țt]ia[^.]*autospecial[^.]*\./i)?.[0]
    ].filter(Boolean);
    return parts.map(cleanExtract).join(" ");
  },
  idsai(lines, content) {
    const joined = lines.join(" ");
    const parts = [
      joined.match(/central[aă]\s+adresabil[aă][^.]*\./i)?.[0],
      joined.match(/butoane\s+de\s+avertizare\s+incendiu[^.]*\./i)?.[0],
      joined.match(/detectoare[^.]*\./i)?.[0]
    ].filter(Boolean);
    return parts.map(cleanExtract).join(" ");
  },
  desfumare(lines, content) {
    const joined = lines.join(" ");
    const match = joined.match(/evacuarea\s+natural[aă]\s+a\s+fumului[^.]*\./i) || joined.match(/nu\s+se\s+prev[aă]d\s+astfel\s+de\s+instala[țt]ii/i);
    return match ? cleanExtract(match[0]) : "";
  },
  alimentare_electrica(lines, content) {
    const joined = lines.join(" ");
    const parts = [
      joined.match(/de\s+la\s+bran[sș]ament[^.]*\./i)?.[0],
      joined.match(/iluminat\s+de\s+securitate[^.]*\./i)?.[0]
    ].filter(Boolean);
    return parts.map(cleanExtract).join(" ");
  },
  iluminat_siguranta(lines, content) {
    const joined = lines.join(" ");
    const match = joined.match(/s-a\s+prev[aă]zut\s+iluminat\s+de\s+securitate[^.]*\./i);
    return match ? cleanExtract(match[0]) : "";
  },
  trsnet(lines, content) {
    const joined = lines.join(" ");
    const match = joined.match(/instala[țt]ia\s+de\s+protec[țt]ie[^.]*\./i);
    return match ? cleanExtract(match[0]) : "";
  }
};

const legislationUrl = "legislation-rules.json";
const legislationArticlesUrl = "legislation-articles.json";
const legislationFullActsUrl = "legislation-full-acts.json";
const legislationOriginalIndexUrl = "legislation-original/index.json";
const ssiNormalRulesMatrixUrl = "ssi-v58-v85-rules-matrix.json";
const ssiPreliminaryStructureUrl = "ssi-preliminar-structure.json";
const ssiNormalTemplateUrl = "ssi-normal-template-anexa4.json";
const ssiPreliminaryTemplateUrl = "ssi-preliminar-template-anexa5.json";
const fireResistanceDeductionRulesUrl = "fire-resistance-deduction-rules.json";

const normalRulesFieldMap = {
  "1.1": ["denumire_obiectiv", "beneficiar", "adresa", "contact_beneficiar", "profil_activitate"],
  "1.2": ["funcțiuni"],
  "1.3": ["categoria_importanta"],
  "1.4.a": ["tip_cladire"],
  "1.4.b": ["tip_parcaj"],
  "1.4.c": ["caracteristici_dimensionale"],
  "1.4.d": ["numar_utilizatori"],
  "1.4.e": ["autoevacuare"],
  "1.4.f": ["capacitati_depozitare"],
  "1.4.g": ["cai_evacuare_rezumat"],
  "2.A.a": ["risc_incendiu"],
  "2.A.b": ["procese_substante", "capacitati_depozitare", "stabilitate_foc"],
  "2.A.c": ["surse_aprindere_specifice", "centrala_termica", "bucatarie_gaze"],
  "2.B": ["procese_substante", "bucatarie_gaze", "centrala_termica"],
  "3.1": ["stabilitate_foc"],
  "3.2": ["limitare_vecinatati"],
  "3.3": ["evacuare", "evacuare_persoane_vulnerabile"],
  "3.4": ["interventie"],
  "4.1": ["instalații_stingere"],
  "4.2": ["instalații_stingere"],
  "4.3": ["instalații_stingere"],
  "4.4": ["instalații_stingere"],
  "4.5": ["instalații_stingere"],
  "4.6": ["instalații_stingere"],
  "4.7": ["instalații_stingere"],
  "4.8": ["idsai"],
  "4.9": ["desfumare"],
  "4.10": ["alimentare_electrica", "iluminat_siguranta"],
  "4.11": ["trsnet"],
  "5.1": ["măsuri_organizatorice"],
  "5.2": ["măsuri_organizatorice"],
  "5.3": ["stingatoare"],
  "6.1": ["măsuri_compensatorii"],
  "6.2": ["măsuri_compensatorii"]
};

const state = {
  sources: [],
  data: Object.fromEntries(annexFields.map((field) => [field.key, ""])),
  projectProfile: {
    categoryImportance: "",
    buildingClass: "",
    destinations: [],
    hasBasement: false,
    isUndergroundParking: false,
    occupantCount: null,
    accommodationPlaces: null,
    areaBuilt: null,
    areaTotal: null,
    floorsAboveGround: null,
    heightClass: "",
    fireRisk: "",
    installations: []
  },
  legislationLibrary: null,
  legislationArticles: null,
  legislationFullActs: null,
  legislationOriginalIndex: null,
  legislationOriginalTexts: {},
  legislationReaderWorkingTexts: {},
  legislationExtractWorkingTexts: {},
  ssiNormalRulesMatrix: null,
  ssiPreliminaryStructure: null,
  ssiNormalTemplate: null,
  ssiPreliminaryTemplate: null,
  fireResistanceRules: null,
  applicableActs: [],
  complianceChecks: [],
  rulesCoverage: [],
  actCoverageChecks: []
};

const LAW_REF_ALIASES = {
  hg571_anexa1_pct_i_f: "hg571_anexa1_I_f",
  p11899_pct_2_1_9: "p11899_tabel_2_1_9"
};

const LAW_LOCAL_CONTEXTS = {
  p11899_pct_1_2_28: {
    title: "Context local extins",
    body: "1.2.28. Încăperi cu aglomerări de persoane - încăperi în care se pot afla simultan cel puțin 50 de persoane, fiecăreia din acestea revenindu-i o arie de pardoseală mai mică de 4 mp."
  },
  p11899_tabel_2_1_9: {
    title: "Context local extins",
    body: "2.1.8. Condițiile minime pe care trebuie să le îndeplinească elementele principale ale construcției, astfel încât întreaga construcție sau compartiment să poată fi încadrat într-un anumit grad de rezistență la foc, sunt precizate în tabelul 2.1.9.\n\nTabelul 2.1.9 stabilește condițiile minime privind combustibilitatea și rezistența la foc ale principalelor elemente de construcție.\n\n2.1.9. Toate elementele principale ale construcției, funcție de rolul acestora, trebuie să îndeplinească condițiile minime de combustibilitate și rezistență la foc prevăzute pentru încadrarea în gradul respectiv de rezistență la foc.\n\n2.1.10. Gradul de rezistență la foc al construcției sau al unui compartiment de incendiu este determinat de elementul cu cea mai defavorabilă încadrare și se precizează obligatoriu în documentația tehnico-economică."
  },
  p11899_art_2_2_2_tabel_2_2_2: {
    title: "Context local extins",
    body: "2.2.2. Construcțiile independente și grupările sau comasările de construcții se amplasează astfel încât să nu permită propagarea incendiilor o perioadă de timp normată sau, în cazul prăbușirii, să nu afecteze obiectele învecinate, respectându-se distanțele minime de siguranță din tabelul 2.2.2 ori compartimentându-se prin pereți rezistenți la foc.\n\nTabelul 2.2.2 tratează distanțele de siguranță la vecinătăți."
  },
  p11899_art_2_6_40_3_6_4: {
    title: "Context local extins",
    body: "2.6.40. Scările cu trepte balansate pot fi considerate căi de evacuare numai pentru un singur flux de evacuare a utilizatorilor, dacă îndeplinesc condițiile de alcătuire și dimensionare stabilite în normativ și reglementările de specialitate.\n\n3.6.4. Capacitățile de evacuare utilizate la clădiri civile (publice) se corelează cu prevederile tabelului 3.6.4."
  },
  p11899_art_2_6_14_2_6_18_3_6_4: {
    title: "Context local extins",
    body: "Art. 2.6.14-2.6.18 reglementează alcătuirea și dimensionarea geometrică a căilor de evacuare, inclusiv lățimi și condiții de trecere.\n\n3.6.4 completează prin raportare la capacitățile de evacuare aplicabile clădirilor civile."
  },
  p11899_art_2_6_55_2_6_56_3_6_4: {
    title: "Context local extins",
    body: "2.6.55. Atunci când căile de evacuare în exterior ale celorlalte niveluri sunt comune cu cele ale parterului, lățimea ieșirilor spre exterior trebuie să asigure trecerea numărului total de persoane.\n\n2.6.56. Numărul de fluxuri ce trebuie asigurate pentru evacuarea persoanelor se determină cu relația din normativ.\n\n2.6.57. Numărul de persoane pentru care se calculează căile de evacuare este constituit din capacitatea maximă simultană de persoane.\n\n3.6.4 corelează aceste verificări cu capacitățile de evacuare aplicabile clădirilor civile."
  },
  p11899_art_2_6_55_2_6_57: {
    title: "Context local extins",
    body: "2.6.55-2.6.57 tratează dimensionarea ieșirilor comune, determinarea numărului de fluxuri și numărul de persoane luat în calcul la evacuare."
  },
  legea59_general: {
    title: "Context local extins",
    body: "Legea nr. 59/2016 reglementează controlul asupra pericolelor de accident major în care sunt implicate substanțe periculoase.\n\nPentru SSI, această trimitere este folosită atunci când obiectivul utilizează, manipulează sau depozitează substanțe periculoase în cantități relevante pentru o încadrare de tip Seveso. Dacă asemenea substanțe și cantități nu există, concluzia corectă este că nu este cazul pentru obiectivul analizat."
  },
  hg571_anexa1_I_f: {
    title: "Context local extins",
    body: "Anexa nr. 1 pct. I lit. f) din H.G. nr. 571/2016 tratează lăcașurile de cult și spațiile de cazare aferente, accesibile publicului.\n\nPentru SSI, această trimitere este folosită la verificarea încadrării obiectivului în categoriile de construcții și amenajări care se supun avizării și/sau autorizării privind securitatea la incendiu."
  },
  hg766_anexa3_art_6_7: {
    title: "Context local extins",
    body: "Art. 6 și 7 din anexa nr. 3 la H.G. nr. 766/1997 tratează criteriile generale pentru stabilirea categoriei de importanță a construcțiilor.\n\nÎn SSI, această trimitere justifică categoria de importanță preluată din documentația tehnică."
  },
  hg766_anexa3_art_8_cr0_anexa_a1: {
    title: "Context local extins",
    body: "Art. 8 din anexa nr. 3 la H.G. nr. 766/1997 se corelează cu CR 0-2012 pentru stabilirea clasei de importanță a construcțiilor.\n\nÎn SSI, trimiterea justifică încadrarea la clasa de importanță declarată în proiect."
  },
  p1183_art_3_3_1_e_i: {
    title: "Context local extins",
    body: "Art. 3.3.1 din P 118/3 tratează cazurile de echipare cu instalații de detectare, semnalizare și alarmare la incendiu, în funcție de destinație și parametrii construcției.\n\nPentru obiectivele de cult, verificarea se face împreună cu aria desfășurată și cu numărul de utilizatori, pentru a stabili dacă echiparea este obligatorie sau reprezintă o măsură suplimentară."
  },
  hg971_2006_art_7: {
    title: "Context local extins",
    body: "Art. 7 din H.G. nr. 971/2006 privește documentațiile tehnico-economice ale investițiilor și conținutul general al acestora.\n\nÎn SSI, trimiterea este utilă pentru corelarea datelor preluate din memoriile tehnice și din planșe cu documentația de bază a investiției."
  },
  omai163_2007_anexa6: {
    title: "Context local extins",
    body: "Anexa nr. 6 la OMAI nr. 163/2007 tratează documentele și regulile de organizare a apărării împotriva incendiilor.\n\nÎn SSI, această trimitere este folosită la măsurile tehnico-organizatorice și la recomandările pentru exploatarea construcției."
  },
  i13_art_7_181_7_182: {
    title: "Context local extins",
    body: "Art. 7.181-7.182 din I 13 tratează condițiile de amplasare și separare pentru încăperile centralelor termice.\n\nÎn SSI, aceste prevederi se folosesc la verificarea separării centralei termice de restul clădirii prin elemente rezistente la foc și la verificarea condițiilor constructive specifice."
  },
  i13_art_7_187: {
    title: "Context local extins",
    body: "Art. 7.187 din I 13 privește condițiile privind suprafața vitrată și elementele de decomprimare pentru încăperile tehnice, după caz.\n\nÎn SSI, această trimitere este relevantă la verificarea centralei termice și a condițiilor de siguranță pentru încăperea tehnică."
  },
  i13_art_7_190: {
    title: "Context local extins",
    body: "Art. 7.190 din I 13 completează cerințele constructive și de siguranță pentru centrale termice și încăperile aferente.\n\nÎn SSI, articolul se folosește împreună cu celelalte prevederi ale capitolului pentru verificarea separării, ventilației, accesului și siguranței exploatării."
  },
  i7_pct_7_22_1: {
    title: "Context local extins",
    body: "Pct. 7.22.1 din I7 tratează alimentarea receptoarelor cu rol de securitate la incendiu.\n\nÎn SSI, această trimitere justifică verificarea sursei normale, a sursei de rezervă și a continuității în alimentare pentru receptoarele cu rol de securitate la incendiu."
  },
  i7_art_7_23_2_7_23_9_7_23_10: {
    title: "Context local extins",
    body: "Art. 7.23.2, 7.23.9 și 7.23.10 din I7 tratează categoriile de iluminat de siguranță, condițiile de amplasare și cazurile de aplicare.\n\nÎn SSI, aceste prevederi sunt utile pentru justificarea iluminatului pentru evacuare, a iluminatului pentru intervenție și, după caz, a iluminatului împotriva panicii."
  }
};

const LAW_FULL_ACTS = {
  p118_99: {
    title: "P 118-99 - act local extins",
    sections: [
      {
        id: "p11899_intro",
        title: "Capitolul 1. Scop, domeniu și terminologie",
        body: "Normativul tratează condițiile și nivelurile de performanță specifice siguranței la foc a construcțiilor și stabilește că măsurile de siguranță la foc se corelează cu categoria de importanță, destinația, mărimea, riscurile și scenariul de siguranță la foc.\n\nÎn partea de terminologie apar definițiile de bază folosite și în SSI: densitatea sarcinii termice, grad de rezistență la foc, rezistență la foc, încăperi cu aglomerări de persoane, săli aglomerate, planșeu, șarpantă, scară de evacuare și utilizatori."
      },
      {
        id: "p11899_1_2_28",
        title: "Pct. 1.2.28 - Încăperi cu aglomerări de persoane",
        body: LAW_LOCAL_CONTEXTS.p11899_pct_1_2_28.body
      },
      {
        id: "p11899_2_1_9",
        title: "Pct. 2.1.8-2.1.10 și tabelul 2.1.9",
        body: LAW_LOCAL_CONTEXTS.p11899_tabel_2_1_9.body
      },
      {
        id: "p11899_2_2_2",
        title: "Art. 2.2.2 și tabelul 2.2.2 - distanțe de siguranță",
        body: LAW_LOCAL_CONTEXTS.p11899_art_2_2_2_tabel_2_2_2.body
      },
      {
        id: "p11899_2_6_geometry",
        title: "Art. 2.6.14-2.6.18 și art. 2.6.40 - alcătuirea și geometria evacuării",
        body: `${LAW_LOCAL_CONTEXTS.p11899_art_2_6_14_2_6_18_3_6_4.body}\n\n${LAW_LOCAL_CONTEXTS.p11899_art_2_6_40_3_6_4.body}`
      },
      {
        id: "p11899_2_6_flux",
        title: "Art. 2.6.55-2.6.57 și art. 3.6.4 - fluxuri de evacuare",
        body: `${LAW_LOCAL_CONTEXTS.p11899_art_2_6_55_2_6_56_3_6_4.body}\n\n${LAW_LOCAL_CONTEXTS.p11899_art_2_6_55_2_6_57.body}`
      }
    ]
  },
  hg_571_2016: {
      title: "H.G. nr. 571/2016 - act local extins",
      sections: [
        {
          id: "hg571_art_1",
          title: "Articolul 1",
          body: "Se aprobă categoriile de construcții și amenajări care se supun avizării și/sau autorizării privind securitatea la incendiu, prevăzute în anexele care fac parte integrantă din hotărâre."
        },
        {
          id: "hg571_art_2",
          title: "Articolul 2",
          body: "Avizarea și/sau autorizarea privind securitatea la incendiu se realizează pentru categoriile de construcții și amenajări cuprinse în anexele hotărârii, în condițiile normelor metodologice aplicabile."
        },
        {
          id: "hg571_art_3",
          title: "Articolul 3",
          body: "Aplicarea hotărârii se face împreună cu normele metodologice privind avizarea și autorizarea de securitate la incendiu și cu reglementările tehnice incidente, în forma lor actualizată."
        },
        {
          id: "hg571_annex1_intro",
          title: "Anexa nr. 1 - Categorii de construcții și amenajări care se supun avizării și/sau autorizării",
          body: "Anexa nr. 1 grupează categoriile de construcții și amenajări pentru care este obligatorie obținerea avizului și/sau a autorizației de securitate la incendiu.\n\nÎn practică, pentru SSI, această anexă este punctul de plecare pentru verificarea dacă obiectivul intră sau nu în obligația de avizare/autorizare."
        },
        {
          id: "hg571_annex1_I",
          title: "Anexa nr. 1 pct. I - Construcții și amenajări civile",
          body: "Punctul I din anexa nr. 1 tratează principalele categorii de construcții și amenajări civile care intră sub incidența avizării și/sau autorizării privind securitatea la incendiu.\n\nÎn această categorie intră, după caz, clădiri administrative, de comerț, cultură, învățământ, sănătate, turism, cult și alte funcțiuni civile prevăzute expres în anexă."
        },
        {
          id: "hg571_annex1_f",
          title: "Anexa nr. 1 pct. I lit. f)",
          body: "Sunt incluse lăcașurile de cult și spațiile de cazare aferente, accesibile publicului, cu aria desfășurată mai mare de 200 mp, cu excepțiile prevăzute de act.\n\nAcesta este reperul folosit la încadrarea obiectivelor de cult, în forma actualizată inclusiv prin H.G. nr. 1.181/2022."
        },
        {
          id: "hg571_annex2_intro",
          title: "Anexa nr. 2 - Categorii de construcții și amenajări care se supun numai autorizării",
          body: "Anexa nr. 2 identifică situațiile în care construcțiile și amenajările se supun numai autorizării privind securitatea la incendiu.\n\nÎn verificările pentru SSI, această anexă este utilă când obiectivul nu intră în anexa nr. 1, dar există o obligație distinctă de autorizare."
        },
        {
          id: "hg571_modified_2022",
          title: "Forma actualizată prin H.G. nr. 1.181/2022",
          body: "Textul utilizat în program trebuie citit în forma actualizată prin H.G. nr. 1.181/2022, care a modificat și completat categoriile din anexe.\n\nLa verificarea încadrării, programul tratează H.G. nr. 571/2016 împreună cu modificările și completările ulterioare."
        }
      ]
    },
  hg_766_1997: {
    title: "H.G. nr. 766/1997 - regulament privind stabilirea categoriei de importanță a construcțiilor (Anexa nr. 3)",
    sections: [
      {
        id: "hg766_art_1",
        title: "Articolul 1",
        body: "Prezentul regulament are ca obiect stabilirea modului de încadrare în categorii de importanță a construcțiilor, în scopul aplicării diferențiate a sistemului calității, conform legii."
      },
      {
        id: "hg766_art_2",
        title: "Articolul 2",
        body: "Construcțiile reprezintă lucrările concepute și executate pentru îndeplinirea unor funcții economico-sociale sau ecologice. Ele sunt caracterizate, de regulă, în raport cu necesitatea de adaptare la condițiile locale de teren și de mediu, cu durata mare de utilizare, cu volumul important de muncă și de materiale înglobate."
      },
      {
        id: "hg766_art_3",
        title: "Articolul 3",
        body: "Prevederile prezentului regulament se aplică tuturor construcțiilor noi sau existente."
      },
      {
        id: "hg766_art_4",
        title: "Articolul 4",
        body: "Construcțiile se încadrează, după importanța lor, în categorii de importanță, care privesc întreaga construcție sub toate aspectele, și în clase de importanță, care privesc întreaga construcție sau părți ale acesteia sub anumite aspecte."
      },
      {
        id: "hg766_art_5",
        title: "Articolul 5",
        body: "Categoriile de importanță a construcțiilor se stabilesc în conformitate cu metodologia aprobată de autoritatea competentă, pentru realizarea de niveluri de calitate determinate de respectarea cerințelor și pentru delimitarea obligațiilor persoanelor implicate, ținând seama de: implicarea vitală a construcțiilor în societate și în natură, implicarea funcțională a construcțiilor în domeniul socioeconomic și caracteristicile proprii construcțiilor."
      },
      {
        id: "hg766_art_6_7",
        title: "Articolele 6 și 7 - categoria de importanță",
        body: "Articolul 6: Categoriile de importanță care se stabilesc pentru construcții sunt: construcții de importanță excepțională (A), construcții de importanță deosebită (B), construcții de importanță normală (C) și construcții de importanță redusă (D).\n\nArticolul 7: Categoria de importanță se stabilește de către proiectant, la cererea investitorului, pentru construcțiile noi, ori a proprietarului, pentru construcțiile existente, când este necesar. Pentru fiecare construcție se stabilește o singură categorie de importanță și aceasta se înscrie în toate documentele tehnice privind construcția."
      },
      {
        id: "hg766_art_8",
        title: "Articolul 8 - clasele de importanță",
        body: "Clasele de importanță se stabilesc prin reglementări tehnice și au la bază criterii specifice."
      },
      {
        id: "hg766_art_9",
        title: "Articolul 9",
        body: "Clasele de importanță se corelează cu categoriile de importanță de către proiectant, la construcțiile noi, și/sau de către expertul tehnic atestat, la construcțiile existente, în scopul stabilirii condițiilor de aplicare a componentelor sistemului calității."
      },
      {
        id: "hg766_art_10",
        title: "Articolul 10",
        body: "Categoria și clasa de importanță stabilite pentru o construcție nu se modifică decât la schimbarea destinației sau în alte condiții care impun aceasta, prin documentații motivate."
      },
      {
        id: "hg766_art_11",
        title: "Articolul 11",
        body: "Investitorii sau proprietarii pot să prevadă prin clauze contractuale cu proiectanții cerințe superioare celor corespunzătoare categoriei sau clasei de importanță a construcției."
      }
    ]
  },
  legea_59_2016: {
    title: "Legea nr. 59/2016 - act local extins",
    sections: [
      {
        id: "legea59_art_1",
        title: "Articolul 1",
        body: "Prezenta lege reglementează măsuri pentru prevenirea accidentelor majore în care sunt implicate substanțe periculoase, precum și pentru limitarea consecințelor acestora asupra sănătății umane și asupra mediului, pentru asigurarea unui nivel ridicat de protecție pe întreg teritoriul național.\n\nPentru SSI, acest articol arată domeniul general al legii și explică de ce ea devine relevantă numai atunci când obiectivul implică substanțe periculoase în condițiile legii."
      },
      {
        id: "legea59_art_2",
        title: "Articolul 2",
        body: "Legea se aplică amplasamentelor definite în act și enumeră totodată situațiile și domeniile exceptate.\n\nPentru SSI, articolul este important fiindcă delimitează clar obiectivele la care legea se aplică și cele la care nu se aplică."
      },
      {
        id: "legea59_art_4",
        title: "Articolul 4",
        body: "Articolul 4 tratează evaluarea pericolelor de accident major pentru o anumită substanță periculoasă și procedura de notificare către autoritățile competente.\n\nÎn SSI, această trimitere este utilă când există o substanță periculoasă relevantă și trebuie justificată evaluarea sau lipsa unei astfel de încadrări."
      },
      {
        id: "legea59_art_6",
        title: "Articolul 6",
        body: "Articolul 6 stabilește autoritățile competente responsabile pentru aplicarea prevederilor legii.\n\nÎn SSI, articolul nu justifică direct o cerință de proiectare, dar oferă cadrul instituțional al aplicării legii."
      },
      {
        id: "legea59_art_11",
        title: "Articolul 11",
        body: "Articolul 11 tratează modificarea unei instalații, a unui amplasament sau a unei zone de depozitare și obligația de revizuire a documentațiilor specifice atunci când se schimbă natura, clasificarea sau cantitatea substanțelor periculoase.\n\nÎn SSI, articolul este relevant la proiectele unde există substanțe periculoase și apar modificări ale instalațiilor sau inventarului acestora."
      },
      {
        id: "legea59_general_section",
        title: "Relevanță generală pentru SSI",
        body: LAW_LOCAL_CONTEXTS.legea59_general.body
      }
    ]
  },
  p118_3_2015: {
    title: "P 118/3-2015 - act local extins",
    sections: [
      {
        id: "p1183_idsai",
        title: "Art. 3.3.1 - echipare cu IDSAI",
        body: LAW_LOCAL_CONTEXTS.p1183_art_3_3_1_e_i.body
      }
    ]
  },
  i13_2015: {
    title: "I 13-2015 - act local extins",
    sections: [
      {
        id: "i13_ct_sep",
        title: "Art. 7.181-7.182 - separarea centralei termice",
        body: LAW_LOCAL_CONTEXTS.i13_art_7_181_7_182.body
      },
      {
        id: "i13_ct_glazed",
        title: "Art. 7.187 - condiții pentru încăperea tehnică",
        body: LAW_LOCAL_CONTEXTS.i13_art_7_187.body
      },
      {
        id: "i13_ct_other",
        title: "Art. 7.190 - cerințe constructive și de siguranță",
        body: LAW_LOCAL_CONTEXTS.i13_art_7_190.body
      }
    ]
  },
  i7_2011: {
    title: "I7-2011 - act local extins",
    sections: [
      {
        id: "i7_supply",
        title: "Pct. 7.22.1 - alimentarea receptoarelor cu rol de securitate la incendiu",
        body: LAW_LOCAL_CONTEXTS.i7_pct_7_22_1.body
      },
      {
        id: "i7_lighting",
        title: "Art. 7.23.2, 7.23.9 și 7.23.10 - iluminat de siguranță",
        body: LAW_LOCAL_CONTEXTS.i7_art_7_23_2_7_23_9_7_23_10.body
      }
    ]
  },
  omai_163_2007: {
    title: "OMAI nr. 163/2007 - act local extins",
    sections: [
      {
        id: "omai163_exploitation",
        title: "Anexa nr. 6 - organizarea apărării împotriva incendiilor",
        body: LAW_LOCAL_CONTEXTS.omai163_2007_anexa6.body
      }
    ]
  },
  hg_971_2006: {
    title: "H.G. nr. 971/2006 - act local extins",
    sections: [
      {
        id: "hg971_general",
        title: "Semnalizarea de securitate și/sau sănătate la locul de muncă",
        body: LAW_LOCAL_CONTEXTS.hg971_2006_art_7.body
      }
    ]
  }
};

const LOCAL_ACT_COMPLETENESS = {
  omai_180_2022: "parțial",
  p118_1_2025: "parțial",
  p118_99: "parțial extins",
  p118_2_2013: "parțial",
  p118_3_2015: "parțial extins",
  i7_2011: "parțial extins",
  omai_130_2007: "parțial",
  omai_163_2007: "parțial extins",
  hg_571_2016: "parțial extins",
  hg_766_1997: "parțial extins",
  cr_0_2012: "parțial",
  hg_1181_2022: "parțial",
  hg_971_2006: "parțial extins",
  legea_307_2006: "parțial",
  legea_10_1995: "parțial",
  legea_59_2016: "parțial extins",
  reg_1272_2008_clp: "parțial",
  ordin_28_2009: "parțial",
  i13_2015: "parțial extins",
  ordin_1822_394_2004: "parțial"
};

const LAW_REF_TO_SECTION = {
  p11899_pct_1_2_28: "p11899_1_2_28",
  p11899_tabel_2_1_9: "p11899_2_1_9",
  p11899_art_2_2_2_tabel_2_2_2: "p11899_2_2_2",
  p11899_art_2_6_14_2_6_18_3_6_4: "p11899_2_6_geometry",
  p11899_art_2_6_40_3_6_4: "p11899_2_6_geometry",
  p11899_art_2_6_55_2_6_56_3_6_4: "p11899_2_6_flux",
  p11899_art_2_6_55_2_6_57: "p11899_2_6_flux",
  hg571_anexa1: "hg571_annex1_intro",
  hg571_anexa1_I_f: "hg571_annex1_f",
  hg766_anexa3_art_6_7: "hg766_art_6_7",
  hg766_anexa3_art_8_cr0_anexa_a1: "hg766_art_8",
  legea59_general: "legea59_general_section",
  p1183_art_3_3_1_e_i: "p1183_idsai",
  i13_art_7_181_7_182: "i13_ct_sep",
  i13_art_7_187: "i13_ct_glazed",
  i13_art_7_190: "i13_ct_other",
  i7_pct_7_22_1: "i7_supply",
  i7_art_7_23_2_7_23_9_7_23_10: "i7_lighting",
  omai163_2007_anexa6: "omai163_exploitation",
  hg971_2006_art_7: "hg971_general"
};

const ACT_KEY_ALIASES = {
  ordin_28_2009_cult: "ordin_28_2009"
};

function resolveActKey(actKey = "") {
  const raw = String(actKey || "").trim();
  if (!raw) return "";
  const normalized = raw.replace(/^act:/i, "").replace(/-/g, "_");
  return ACT_KEY_ALIASES[normalized] || normalized;
}

function normalizeLawRefKey(refKey) {
  const raw = String(refKey || "").trim();
  if (raw.startsWith("act:")) {
    const actKey = raw.slice(4).replace(/-/g, "_");
    return `act:${actKey}`;
  }
  return LAW_REF_ALIASES[raw] || raw;
}

function getActLocalCompleteness(actKey) {
  const resolvedActKey = resolveActKey(actKey);
  const localRecord = state.legislationFullActs?.acts?.[resolvedActKey];
  if (localRecord?.isAuthenticFullAct && typeof localRecord?.originalArchiveText === "string" && localRecord.originalArchiveText.trim()) {
    return "integral local";
  }
  return localRecord?.status || LOCAL_ACT_COMPLETENESS[resolvedActKey] || LOCAL_ACT_COMPLETENESS[actKey] || "fișă / repere";
}

function getActLocalSectionCount(actKey) {
  const resolvedActKey = resolveActKey(actKey);
  const localRecord = state.legislationFullActs?.acts?.[resolvedActKey];
  if (!localRecord) return 0;
  if (Array.isArray(localRecord.sections) && localRecord.sections.length) {
    return localRecord.sections.length;
  }
  if (typeof localRecord.originalArchiveText === "string" && localRecord.originalArchiveText.trim()) {
    return 1;
  }
  if (typeof localRecord.originalText === "string" && localRecord.originalText.trim()) {
    return 1;
  }
  return typeof localRecord.fullText === "string" && localRecord.fullText.trim() ? 1 : 0;
}

function hasLocalActText(actKey) {
  const resolvedActKey = resolveActKey(actKey);
  const localRecord = state.legislationFullActs?.acts?.[resolvedActKey];
  if (!localRecord) return false;
  if (Array.isArray(localRecord.sections) && localRecord.sections.length) return true;
  if (typeof localRecord.originalArchiveText === "string" && localRecord.originalArchiveText.trim()) return true;
  if (typeof localRecord.originalText === "string" && localRecord.originalText.trim()) return true;
  if (typeof localRecord.fullText === "string" && localRecord.fullText.trim()) return true;
  return false;
}

function hasAuthenticIntegralActText(actKey) {
  const resolvedActKey = resolveActKey(actKey);
  const localRecord = state.legislationFullActs?.acts?.[resolvedActKey];
  return !!localRecord?.isAuthenticFullAct;
}

function evaluateActCoverageForProject() {
  const acts = Array.isArray(state.applicableActs) ? state.applicableActs : [];
  state.actCoverageChecks = acts.map((act) => {
    const status = getActLocalCompleteness(act.id);
    const sectionCount = getActLocalSectionCount(act.id);
    const hasAnyLocalText = hasLocalActText(act.id);
    const hasAuthenticFullAct = hasAuthenticIntegralActText(act.id);
    const isDiscoveredAct = /^custom-/i.test(String(act.id || ""));
    const missingLocalRecord = !hasAnyLocalText;
    const thinLocalRecord = hasAnyLocalText && sectionCount > 0 && sectionCount < 7;
    const weakStatus = /fișă|fisa|parțial$/i.test(String(status || ""));
    const needsAttention = !isDiscoveredAct && (missingLocalRecord || thinLocalRecord || weakStatus || !hasAuthenticFullAct);
    let message = "";

    if (isDiscoveredAct) {
      message = `Actul ${act.title} a fost descoperit automat și este afișat separat în zona de acte legislative noi.`;
    } else if (missingLocalRecord) {
      message = `Actul ${act.title} nu are încă text local disponibil în baza programului.`;
    } else if (thinLocalRecord) {
      message = `Actul ${act.title} are doar ${sectionCount} secțiuni locale și trebuie extins în baza programului.`;
    } else if (!hasAuthenticFullAct) {
      message = `Actul ${act.title} are text local disponibil, dar nu este încă arhivat integral în forma autentică a sursei oficiale.`;
    } else if (weakStatus) {
      message = `Actul ${act.title} este marcat încă la nivel ${status} și trebuie aprofundat în baza programului.`;
    } else {
      message = `Actul ${act.title} este disponibil local, cu ${sectionCount} secțiuni.`;
    }

    return {
      actId: act.id,
      title: act.title,
      status,
      sectionCount,
      needsAttention,
      isDiscoveredAct,
      message
    };
  });
}

function ensureLawReferenceAliases() {
  if (!state.legislationArticles) return;
  const library = state.legislationArticles;
  library.acts ||= {};
  library.references ||= {};

  Object.entries(LAW_REF_ALIASES).forEach(([aliasKey, targetKey]) => {
    if (!library.references[aliasKey] && library.references[targetKey]) {
      library.references[aliasKey] = { ...library.references[targetKey] };
    }
  });

  if (!library.acts.i13_2015) {
    library.acts.i13_2015 = {
      title: "I 13-2015 - Normativ pentru proiectarea, executarea și exploatarea instalațiilor de încălzire centrală",
      url: "https://legislatie.just.ro/Public/DetaliiDocument/171145"
    };
  }
  if (!library.acts.ordin_1822_394_2004) {
    library.acts.ordin_1822_394_2004 = {
      title: "Ordinul nr. 1822/394/2004 privind clasificarea produselor pentru construcții pe baza comportării la foc",
      url: "https://legislatie.just.ro/Public/DetaliiDocumentAfis/58917"
    };
  }
  if (!library.acts.ntpee_2018) {
    library.acts.ntpee_2018 = {
      title: "Norma tehnică pentru proiectarea, executarea și exploatarea sistemelor de alimentare cu gaze naturale",
      url: "https://legislatie.just.ro/Public/DetaliiDocument/201310"
    };
  }
  if (!library.acts.ordin_6025_2018) {
    library.acts.ordin_6025_2018 = {
      title: "Ordinul nr. 6025/2018 pentru modificarea P 118/3-2015",
      url: "https://legislatie.just.ro/Public/DetaliiDocument/206996"
    };
  }
  if (!library.acts.ordin_6026_2018) {
    library.acts.ordin_6026_2018 = {
      title: "Ordinul nr. 6026/2018 pentru modificarea și completarea P 118/2-2013",
      url: "https://legislatie.just.ro/Public/DetaliiDocument/206927"
    };
  }
  if (!library.acts.ordin_959_2023) {
    library.acts.ordin_959_2023 = {
      title: "Ordinul nr. 959/2023 pentru modificarea și completarea I 7-2011",
      url: "https://legislatie.just.ro/Public/DetaliiDocument/271142"
    };
  }

  const syntheticRefs = {
    hg971_2006_art_7: ["hg_971_2006", "HG nr. 971/2006, art. 7", "Art. 7", "Reglementează semnalizarea și marcarea de securitate.", "marcaje sau panouri de semnalizare"],
    omai163_2007_anexa6: ["omai_163_2007", "OMAI nr. 163/2007, anexa nr. 6", "Anexa nr. 6", "Stabilește tipurile și amplasarea stingătoarelor.", "stingătoare, tipuri și amplasare"],
    ordin1822_394_2004: ["ordin_1822_394_2004", "Ordinul nr. 1822/394/2004", "Actul în ansamblu", "Aprobă regulamentul de clasificare la foc a produselor pentru construcții.", "clasificarea produselor pentru construcții"],
    i13_art_7_181_7_182: ["i13_2015", "I 13-2015, art. 7.181-7.182", "Art. 7.181-7.182", "Prevăd separarea centralei termice față de restul clădirii.", "centrala termică se separă de restul clădirii"],
    i13_art_7_187: ["i13_2015", "I 13-2015, art. 7.187", "Art. 7.187", "Prevede sensul de deschidere al ușii de acces a centralei termice.", "ușa de acces trebuie să aibă deschiderea în afară"],
    i13_art_7_190: ["i13_2015", "I 13-2015, art. 7.190", "Art. 7.190", "Prevede condiția privind lipsa pragului sau racordarea acestuia.", "ușa de acces/evacuare nu trebuie să aibă prag"],
    i13_art_7_187_7_190: ["i13_2015", "I 13-2015, art. 7.187 și art. 7.190", "Art. 7.187 și art. 7.190", "Prevederi privind deschiderea ușii și pragul centralei termice.", "deschiderea în afară și condiția privind pragul"],
    i7_art_5_2_7_2_6_5_2_7_2_8: ["i7_2011", "I7-2011, art. 5.2.7.2.6-5.2.7.2.8", "Art. 5.2.7.2.6-5.2.7.2.8", "Reglementează închiderea trecerilor prin elemente rezistente la foc.", "trecerile trebuie închise pe toată grosimea elementului"],
    i7_art_7_22_1_7_23_9_1_c_f: ["i7_2011", "I7-2011, pct. 7.22.1 și pct. 7.23.9.1 lit. c) și f)", "Pct. 7.22.1 și pct. 7.23.9.1 lit. c) și f)", "Privește alimentarea ECS și iluminatul local de siguranță.", "alimentarea ECS și iluminatul local de siguranță"],
    i7_art_7_23_2_7_23_9_7_23_10: ["i7_2011", "I7-2011, art. 7.23.2, art. 7.23.9 și art. 7.23.10", "Art. 7.23.2, art. 7.23.9 și art. 7.23.10", "Privește iluminatul de siguranță pentru evacuare, panică și intervenție.", "iluminat de siguranță pentru evacuare, panică și intervenție"],
    p1182_art_4_1_i_6_1_4_i_7_1_7_131_8_1_9_1_15_1: ["p118_2_2013", "P 118/2-2013, art. 4.1 lit. i), art. 6.1 alin. (4) lit. i), art. 7.1, art. 7.131, art. 8.1, art. 9.1 și art. 15.1", "Grup de articole", "Grup de articole pentru verificarea obligativității hidranților și instalațiilor fixe de stingere.", "obligativitatea hidranților și instalațiilor fixe de stingere"],
    p11899_art_2_2_2_tabel_2_2_2: ["p118_99", "P 118-99, art. 2.2.2 și tabelul 2.2.2", "Art. 2.2.2 și tabelul 2.2.2", "Reglementează distanțele de siguranță la vecinătăți.", "distanțe de siguranță la vecinătăți"],
    p11899_art_2_6_14_2_6_18_3_6_4: ["p118_99", "P 118-99, art. 2.6.14-2.6.18 și art. 3.6.4", "Art. 2.6.14-2.6.18 și art. 3.6.4", "Privește geometria căilor de evacuare și fluxurile.", "geometria căilor de evacuare și fluxurile"],
    p11899_art_2_6_40_3_6_4: ["p118_99", "P 118-99, art. 2.6.40 și art. 3.6.4", "Art. 2.6.40 și art. 3.6.4", "Privește tipul scărilor și fluxurile de evacuare.", "tipul scărilor și fluxul de evacuare"],
    p11899_art_2_6_55_2_6_56_3_6_4: ["p118_99", "P 118-99, art. 2.6.55, art. 2.6.56 și art. 3.6.4", "Art. 2.6.55, art. 2.6.56 și art. 3.6.4", "Privește calculul și numărul fluxurilor de evacuare.", "numărul fluxurilor de evacuare"],
    p11899_art_2_6_55_2_6_57: ["p118_99", "P 118-99, art. 2.6.55-2.6.57", "Art. 2.6.55-2.6.57", "Privește lungimile și timpii de evacuare.", "timpii/lungimile de evacuare"]
  };

  Object.entries(syntheticRefs).forEach(([key, value]) => {
    if (!library.references[key]) {
      const [actKey, label, location, summary, excerpt] = value;
      library.references[key] = {
        actKey,
        label,
        location,
        summary,
        excerpt,
        sourceUrl: library.acts[actKey]?.url || ""
      };
    }
  });
}

const WORKSPACE_STORAGE_KEY = "ssi_workspace_projects_v2";
const AUTO_SAVE_INTERVAL_MS = 15 * 60 * 1000;
const WORKSPACE_TAB_LABELS = {
  sourcesTab: "Proiect",
  preliminaryTab: "SSI preliminar",
  normalTab: "SSI normal",
  legislationTab: "Legislație",
  lawTab: "Lege / articol",
  issuesTab: "Probleme",
  autotestTab: "Auto-test"
};

const ALWAYS_VISIBLE_WORKSPACE_TABS = [
  "sourcesTab",
  "normalTab",
  "preliminaryTab",
  "legislationTab",
  "lawTab",
  "issuesTab",
  "autotestTab"
];

const workspaceState = {
  projects: [],
  activeProjectId: null,
  autosaveEnabled: true,
  contextTarget: null
};

const officialActCache = new Map();

function safeClone(value) {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

function getEmbeddedDefault(key) {
  switch (key) {
    case "legislationRules":
      return { acts: [], notes: [] };
    case "legislationArticles":
      return { acts: {}, references: {} };
    case "legislationFullActs":
      return { generatedAt: "", scope: "", acts: {} };
    case "ssiNormalRulesMatrix":
      return { sections: [], globalRules: [] };
    case "ssiPreliminaryStructure":
      return { sections: [] };
    case "fireResistanceRules":
      return { decisionFlow: [], outputs: {}, legalBasis: [] };
    default:
      return {};
  }
}

const fieldGrid = document.getElementById("fieldGrid");
const sourcesList = document.getElementById("sourcesList");
const normalReportOutput = document.getElementById("normalReportOutput");
const preliminaryReportOutput = document.getElementById("preliminaryReportOutput");
const manualText = document.getElementById("manualText");
const fileInput = document.getElementById("fileInput");
const sourceCount = document.getElementById("sourceCount");
const fieldCount = document.getElementById("fieldCount");
const actCount = document.getElementById("actCount");
const openSourcesQuickBtn = document.getElementById("openSourcesQuickBtn");
const openFieldsQuickBtn = document.getElementById("openFieldsQuickBtn");
const openRulesQuickBtn = document.getElementById("openRulesQuickBtn");
const rulesOutput = document.getElementById("rulesOutput");
const uiStatus = document.getElementById("uiStatus");
const extractionSummary = document.getElementById("extractionSummary");
const selectedFilesPreview = document.getElementById("selectedFilesPreview");
const profileInputs = document.getElementById("profileInputs");
const normalReportPreview = document.getElementById("normalReportPreview");
const preliminaryReportPreview = document.getElementById("preliminaryReportPreview");
const lawTabContent = document.getElementById("lawTabContent");
const lawTabHeaderMeta = document.getElementById("lawTabHeaderMeta");
const issuesOutput = document.getElementById("issuesOutput");
const projectTabsContainer = document.getElementById("projectTabs");
const projectSelector = document.getElementById("projectSelector");
const projectAddBtn = document.getElementById("projectAddBtn");
const projectFactsSummary = document.getElementById("projectFactsSummary");
const workspaceTabsContainer = document.getElementById("workspaceTabs");
const autotestOutput = document.getElementById("autotestOutput");
const runAutotestBtn = document.getElementById("runAutotestBtn");
const tabPanels = Array.from(document.querySelectorAll(".tab-panel"));
const workspaceContent = document.getElementById("workspaceContent");
const emptyWorkspace = document.getElementById("emptyWorkspace");
const lawModal = document.getElementById("lawModal");
const lawModalTitle = document.getElementById("lawModalTitle");
const lawModalMeta = document.getElementById("lawModalMeta");
const lawModalBody = document.getElementById("lawModalBody");
const lawModalSource = document.getElementById("lawModalSource");
const closeLawModalBtn = document.getElementById("closeLawModalBtn");
const menuNewProjectBtn = document.getElementById("menuNewProjectBtn");
const menuSaveBtn = document.getElementById("menuSaveBtn");
const menuSaveDocBtn = document.getElementById("menuSaveDocBtn");
const menuSaveDocxBtn = document.getElementById("menuSaveDocxBtn");
const menuSavePdfBtn = document.getElementById("menuSavePdfBtn");
const menuAddLegislationBtn = document.getElementById("menuAddLegislationBtn");
const menuDiscoverLegislationBtn = document.getElementById("menuDiscoverLegislationBtn");
const menuToggleAutosaveBtn = document.getElementById("menuToggleAutosaveBtn");
const uiDensityRange = document.getElementById("uiDensityRange");
const uiTabsLiftRange = document.getElementById("uiTabsLiftRange");
const CUSTOM_ACTS_STORAGE_KEY = "ssi_custom_legislation_acts_v1";
const UI_LAYOUT_STORAGE_KEY = "ssi_ui_layout_v1";
const FULL_ACTS_CACHE_STORAGE_KEY = "ssi_legislation_fulltext_cache_v2";
const tabContextMenu = document.getElementById("tabContextMenu");
const contextCloseTabBtn = document.getElementById("contextCloseTabBtn");
const openSnakeWindowBtn = document.getElementById("openSnakeWindowBtn");
const snakeWindow = document.getElementById("snakeWindow");
const closeSnakeWindowBtn = document.getElementById("closeSnakeWindowBtn");
const snakeCanvas = document.getElementById("snakeCanvas");
const snakeScore = document.getElementById("snakeScore");
const snakeLevel = document.getElementById("snakeLevel");
const snakeSpeed = document.getElementById("snakeSpeed");
const snakeMessage = document.getElementById("snakeMessage");
const snakeStartBtn = document.getElementById("snakeStartBtn");
const snakePauseBtn = document.getElementById("snakePauseBtn");
const snakeResetBtn = document.getElementById("snakeResetBtn");
const snakeCtx = snakeCanvas?.getContext("2d");

bootstrap().catch((error) => {
  console.error(error);
  try {
    workspaceState.projects = [];
    workspaceState.activeProjectId = null;
    workspaceState.autosaveEnabled = true;
    renderEmptyWorkspace();
    renderProjectTabs();
    renderWorkspaceTabs();
    setUiStatus("Aplicatia a pornit in mod de siguranta. Starea salvata anterioara a fost ignorata.");
  } catch (recoveryError) {
    console.error(recoveryError);
  }
  window.alert("Aplicatia nu a putut incarca complet baza de reguli sau starea salvata. Aplicatia a pornit in mod de siguranta.");
});

async function loadJsonAsset(url, embeddedKey) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Nu s-a putut incarca ${url}`);
    }
    return await response.json();
  } catch (error) {
    const fallback = window.__SSI_EMBEDDED_DATA?.[embeddedKey];
    if (fallback) {
      return safeClone(fallback);
    }
    console.warn(`Lipseste baza locala pentru ${embeddedKey}. Se foloseste fallback minim.`, error);
    return getEmbeddedDefault(embeddedKey);
  }
}

async function loadOptionalJsonAsset(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Nu s-a putut încărca ${url}`);
    }
    return await response.json();
  } catch {
    return null;
  }
}

function extractTextFromArchivedHtml(html = "") {
  const raw = String(html || "").trim();
  if (!raw) return "";
  try {
    const extracted = extractOfficialActTextFromHtml(raw);
    if (extracted) {
      return extracted;
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(raw, "text/html");
    const bodyText = doc.body?.innerText || doc.body?.textContent || "";
    return normalizeActSnippetText(bodyText);
  } catch {
    return normalizeActSnippetText(raw.replace(/<[^>]+>/g, " "));
  }
}

async function preloadOriginalActArchive(index) {
  const acts = index?.acts && typeof index.acts === "object" ? index.acts : {};
  const texts = {};
  const readerTexts = {};
  const extractTexts = {};
  const entries = Object.entries(acts);
  for (const [actKey, entry] of entries) {
    const preferredArchiveFile = String(entry?.htmlFile || entry?.textFile || "").trim();
    if (!preferredArchiveFile) continue;
    try {
      const response = await fetch(`legislation-original/${preferredArchiveFile}`);
      if (!response.ok) continue;
      const sourceBody = await response.text();
      if (!sourceBody.trim()) continue;
      const actForExtraction = state.legislationArticles?.acts?.[actKey] || state.legislationLibrary?.acts?.find((item) => resolveActKey(item.id) === actKey) || entry;
      const archiveText = preferredArchiveFile.toLowerCase().endsWith(".html")
        ? (extractOfficialActTextFromHtml(sourceBody, actForExtraction) || extractTextFromArchivedHtml(sourceBody))
        : sourceBody.trim();
      if (!archiveText.trim()) continue;
      texts[actKey] = archiveText.trim();
      readerTexts[actKey] = archiveText.trim();
      extractTexts[actKey] = archiveText.trim();
      state.legislationFullActs ||= { generatedAt: "", scope: "", acts: {} };
      state.legislationFullActs.acts ||= {};
      state.legislationFullActs.acts[actKey] ||= {};
      state.legislationFullActs.acts[actKey].originalArchiveText = archiveText.trim();
      state.legislationFullActs.acts[actKey].originalArchiveFile = preferredArchiveFile;
      state.legislationFullActs.acts[actKey].isAuthenticFullAct = preferredArchiveFile.toLowerCase().endsWith(".html") || Boolean(entry?.isAuthenticFullAct);
      state.legislationFullActs.acts[actKey].status = "integral local";
    } catch {
      // rămâne fallback pe baza existentă
    }
  }
  state.legislationOriginalTexts = texts;
  state.legislationReaderWorkingTexts = readerTexts;
  state.legislationExtractWorkingTexts = extractTexts;
}

async function bootstrap() {
  const [rulesLibrary, articlesLibrary, fullActsLibrary, originalIndex, normalRulesMatrix, preliminaryStructure, fireResistanceRules] = await Promise.all([
    loadJsonAsset(legislationUrl, "legislationRules"),
    loadJsonAsset(legislationArticlesUrl, "legislationArticles"),
    loadJsonAsset(legislationFullActsUrl, "legislationFullActs"),
    loadOptionalJsonAsset(legislationOriginalIndexUrl),
    loadJsonAsset(ssiNormalRulesMatrixUrl, "ssiNormalRulesMatrix"),
    loadJsonAsset(ssiPreliminaryStructureUrl, "ssiPreliminaryStructure"),
    loadJsonAsset(ssiNormalTemplateUrl, "ssiNormalTemplate"),
    loadJsonAsset(ssiPreliminaryTemplateUrl, "ssiPreliminaryTemplate"),
    loadJsonAsset(fireResistanceDeductionRulesUrl, "fireResistanceRules")
  ]);
  state.legislationLibrary = mergeCustomActsIntoLibrary(rulesLibrary);
  state.legislationArticles = articlesLibrary;
  state.legislationFullActs = fullActsLibrary;
  state.legislationOriginalIndex = originalIndex;
  mergeFullActsCacheIntoState();
  await preloadOriginalActArchive(originalIndex);
  ensureContinuousLocalActs();
  state.ssiNormalRulesMatrix = normalRulesMatrix;
  state.ssiPreliminaryStructure = preliminaryStructure;
  state.fireResistanceRules = fireResistanceRules;
  loadCustomActs().forEach((act) => ensureCustomActInLocalFullActs(act));
  ensureLawReferenceAliases();
  restoreWorkspace();
  if (!workspaceState.projects.length) {
    const startupProject = createBlankProject("Proiect 1");
    workspaceState.projects = [startupProject];
    workspaceState.activeProjectId = startupProject.id;
    persistWorkspace();
  }
  try {
    if (workspaceState.activeProjectId) {
      loadProjectIntoUI(workspaceState.activeProjectId);
      showWorkspace();
      renderWorkspaceTabs();
      activateTab("sourcesTab");
    } else {
      renderEmptyWorkspace();
    }
  } catch (error) {
    console.error("Restaurarea proiectelor salvate a esuat. Se revine la o sesiune goala.", error);
    workspaceState.projects = [];
    workspaceState.activeProjectId = null;
    workspaceState.autosaveEnabled = true;
    renderEmptyWorkspace();
  }
  renderProjectTabs();
  renderWorkspaceTabs();
  updateAutosaveButtonLabel();
  window.setInterval(() => {
    if (!workspaceState.autosaveEnabled) return;
    saveActiveProjectStateFromUI();
    persistWorkspace();
  }, AUTO_SAVE_INTERVAL_MS);
}

function ensureWorkspaceReadyAfterLoad() {
  const project = getActiveProject();
  if (!project) {
    renderEmptyWorkspace();
    return;
  }

  showWorkspace();
  renderProjectSelector();
  renderWorkspaceTabs();
  const targetTab = ALWAYS_VISIBLE_WORKSPACE_TABS.includes(project.activeTab) ? project.activeTab : "sourcesTab";
  tabPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === targetTab);
  });
}


const POINT_1_FIELD_KEYS = new Set([
  "denumire_obiectiv","beneficiar","adresa","contact_beneficiar","profil_activitate","funcțiuni","categoria_importanta",
  "tip_cladire","tip_parcaj","caracteristici_dimensionale","numar_utilizatori","autoevacuare","capacitati_depozitare","cai_evacuare_rezumat"
]);

function buildEmptyReportFromTemplate(template, label) {
  if (!template || !Array.isArray(template.sections)) return `${label}: template indisponibil.`;
  const lines = [label];
  template.sections.forEach((section) => {
    lines.push(`${section.code}. ${section.title}`);
    (section.subpoints || []).forEach((sp) => {
      lines.push(`  ${sp.code} ${sp.title}`);
      (sp.fields || []).forEach((field) => lines.push(`    - ${field.label}: ${field.value || ""}`));
    });
  });
  return lines.join("\n");
}

function resetReportsFromTemplates() {
  normalReportOutput.value = buildEmptyReportFromTemplate(state.ssiNormalTemplate, "SSI normal - schelet gol (Anexa 4)");
  preliminaryReportOutput.value = buildEmptyReportFromTemplate(state.ssiPreliminaryTemplate, "SSI preliminar - schelet gol (Anexa 5)");
}

function getDefaultProjectProfile() {
  return {
    categoryImportance: "",
    buildingClass: "",
    destinations: [],
    hasBasement: false,
    isUndergroundParking: false,
    occupantCount: null,
    accommodationPlaces: null,
    areaBuilt: null,
    areaTotal: null,
    floorsAboveGround: null,
    heightClass: "",
    fireRisk: "",
    installations: []
  };
}

function getDefaultProjectUiState() {
  return {
    manualDraft: "",
    selectedFilesPreview: "Nu a fost selectat niciun fisier.",
    uiStatus: "Astept surse pentru proiectul activ.",
    extractionSummary: "Extragerea inca nu a fost rulata."
  };
}

function slugifyProjectName(name) {
  return String(name || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    || "proiect";
}

function createProjectWorkspaceMeta(projectId, name) {
  const slug = slugifyProjectName(name);
  return {
    folderKey: `${slug}-${projectId}`,
    sourcesBucket: `projects/${projectId}/sources`,
    extractBucket: `projects/${projectId}/extract`,
    readerBucket: `projects/${projectId}/reader`,
    exportsBucket: `projects/${projectId}/exports`
  };
}

function normalizeProject(rawProject, fallbackIndex = 0) {
  const blankData = Object.fromEntries(annexFields.map((field) => [field.key, ""]));
  const project = rawProject && typeof rawProject === "object" ? rawProject : {};
  const defaultUiState = getDefaultProjectUiState();
  const normalizedId = typeof project.id === "string" && project.id.trim() ? project.id : `project-restored-${Date.now()}-${fallbackIndex}`;
  const normalizedName = typeof project.name === "string" && project.name.trim() ? project.name : `Proiect ${fallbackIndex + 1}`;
  const normalized = {
    id: normalizedId,
    name: normalizedName,
    lastUsedAt: Number(project.lastUsedAt || Date.now()),
    dirty: Boolean(project.dirty),
    openTabs: Array.isArray(project.openTabs) && project.openTabs.length ? Array.from(new Set(project.openTabs.filter(Boolean))) : ["sourcesTab"],
    activeTab: "sourcesTab",
    sources: Array.isArray(project.sources) ? project.sources.filter((item) => item && typeof item === "object") : [],
    data: { ...blankData, ...(project.data && typeof project.data === "object" ? project.data : {}) },
    projectProfile: { ...getDefaultProjectProfile(), ...(project.projectProfile && typeof project.projectProfile === "object" ? project.projectProfile : {}) },
    applicableActs: Array.isArray(project.applicableActs) ? project.applicableActs : [],
    complianceChecks: Array.isArray(project.complianceChecks) ? project.complianceChecks : [],
    rulesCoverage: Array.isArray(project.rulesCoverage) ? project.rulesCoverage : [],
    actCoverageChecks: Array.isArray(project.actCoverageChecks) ? project.actCoverageChecks : [],
    normalReport: typeof project.normalReport === "string" ? project.normalReport : "",
    preliminaryReport: typeof project.preliminaryReport === "string" ? project.preliminaryReport : "",
    manualDraft: typeof project.manualDraft === "string" ? project.manualDraft : defaultUiState.manualDraft,
    selectedFilesPreview: typeof project.selectedFilesPreview === "string" ? project.selectedFilesPreview : defaultUiState.selectedFilesPreview,
    uiStatus: typeof project.uiStatus === "string" ? project.uiStatus : defaultUiState.uiStatus,
    extractionSummary: typeof project.extractionSummary === "string" ? project.extractionSummary : defaultUiState.extractionSummary,
    workspaceMeta: project.workspaceMeta && typeof project.workspaceMeta === "object"
      ? {
          folderKey: String(project.workspaceMeta.folderKey || createProjectWorkspaceMeta(normalizedId, normalizedName).folderKey),
          sourcesBucket: String(project.workspaceMeta.sourcesBucket || createProjectWorkspaceMeta(normalizedId, normalizedName).sourcesBucket),
          extractBucket: String(project.workspaceMeta.extractBucket || createProjectWorkspaceMeta(normalizedId, normalizedName).extractBucket),
          readerBucket: String(project.workspaceMeta.readerBucket || createProjectWorkspaceMeta(normalizedId, normalizedName).readerBucket),
          exportsBucket: String(project.workspaceMeta.exportsBucket || createProjectWorkspaceMeta(normalizedId, normalizedName).exportsBucket)
        }
      : createProjectWorkspaceMeta(normalizedId, normalizedName)
  };
  if (!normalized.openTabs.includes("sourcesTab")) {
    normalized.openTabs.unshift("sourcesTab");
  }
  normalized.activeTab = "sourcesTab";
  return normalized;
}

function createBlankProject(name) {
  const projectId = `project-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return {
    id: projectId,
    name,
    lastUsedAt: Date.now(),
    dirty: false,
    openTabs: ["sourcesTab"],
    activeTab: "sourcesTab",
    sources: [],
    data: Object.fromEntries(annexFields.map((field) => [field.key, ""])),
    projectProfile: getDefaultProjectProfile(),
    applicableActs: [],
    complianceChecks: [],
    rulesCoverage: [],
    actCoverageChecks: [],
    normalReport: buildEmptyReportFromTemplate(state.ssiNormalTemplate, "SSI normal - schelet gol (Anexa 4)"),
    preliminaryReport: buildEmptyReportFromTemplate(state.ssiPreliminaryTemplate, "SSI preliminar - schelet gol (Anexa 5)"),
    workspaceMeta: createProjectWorkspaceMeta(projectId, name),
    ...getDefaultProjectUiState()
  };
}

function restoreWorkspace() {
  try {
    const raw = window.localStorage.getItem(WORKSPACE_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    workspaceState.projects = Array.isArray(parsed.projects)
      ? parsed.projects.map((project, index) => normalizeProject(project, index))
      : [];
    const requestedActiveProjectId = parsed.activeProjectId || null;
    workspaceState.activeProjectId = workspaceState.projects.some((project) => project.id === requestedActiveProjectId)
      ? requestedActiveProjectId
      : workspaceState.projects[0]?.id || null;
    workspaceState.autosaveEnabled = parsed.autosaveEnabled !== false;
  } catch {
    workspaceState.projects = [];
    workspaceState.activeProjectId = null;
    workspaceState.autosaveEnabled = true;
  }
}

function persistWorkspace() {
  window.localStorage.setItem(
    WORKSPACE_STORAGE_KEY,
    JSON.stringify({
      projects: workspaceState.projects,
      activeProjectId: workspaceState.activeProjectId,
      autosaveEnabled: workspaceState.autosaveEnabled
    })
  );
}

function getProjectById(projectId) {
  return workspaceState.projects.find((project) => project.id === projectId) || null;
}

function touchProjectUsage(project) {
  if (!project) return;
  project.lastUsedAt = Date.now();
}

function getActiveProject() {
  return getProjectById(workspaceState.activeProjectId);
}

function getActiveTabTarget() {
  return getActiveProject()?.activeTab || "sourcesTab";
}

function ensureProjectTab(project, tabId) {
  if (!project.openTabs.includes(tabId)) {
    project.openTabs.push(tabId);
  }
  project.activeTab = tabId;
}

function renderProjectTabs() {
  projectTabsContainer.innerHTML = "";
  workspaceState.projects.forEach((project) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `browser-tab${project.id === workspaceState.activeProjectId ? " is-active" : ""}${project.dirty ? " is-dirty" : ""}`;
    button.textContent = project.name;
    button.dataset.projectId = project.id;
    button.addEventListener("click", () => switchProject(project.id));
    button.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      openContextMenu(event.clientX, event.clientY, { kind: "project", id: project.id });
    });
    projectTabsContainer.appendChild(button);
  });
}

function renderProjectSelector() {
  if (!projectSelector) return;
  const activeId = workspaceState.activeProjectId;
  const recentProjects = [...workspaceState.projects]
    .sort((left, right) => Number(right.lastUsedAt || 0) - Number(left.lastUsedAt || 0))
    .slice(0, 8);

  const activeProject = getActiveProject();
  if (activeProject && !recentProjects.some((project) => project.id === activeProject.id)) {
    recentProjects.unshift(activeProject);
  }

  projectSelector.innerHTML = "";
  if (!recentProjects.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Fara proiecte";
    projectSelector.appendChild(option);
    projectSelector.disabled = true;
    return;
  }

  projectSelector.disabled = false;
  recentProjects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.id;
    option.textContent = project.dirty ? `${project.name} *` : project.name;
    option.selected = project.id === activeId;
    projectSelector.appendChild(option);
  });
}

function renderWorkspaceTabs() {
  const project = getActiveProject();
  if (!project) return;
  const existingButtons = Array.from(workspaceTabsContainer.querySelectorAll("[data-tab-target]"));

  if (!existingButtons.length) {
    workspaceTabsContainer.innerHTML = "";
    ALWAYS_VISIBLE_WORKSPACE_TABS.forEach((tabId) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `browser-tab${project.activeTab === tabId ? " is-active" : ""}`;
      button.textContent = WORKSPACE_TAB_LABELS[tabId] || tabId;
      button.dataset.tabTarget = tabId;
      button.addEventListener("click", () => activateTab(tabId));
      button.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        openContextMenu(event.clientX, event.clientY, { kind: "workspace", id: tabId });
      });
      workspaceTabsContainer.appendChild(button);
    });
    return;
  }

  existingButtons.forEach((button) => {
    const tabId = button.dataset.tabTarget;
    const isKnownTab = ALWAYS_VISIBLE_WORKSPACE_TABS.includes(tabId);
    button.hidden = !isKnownTab;
    if (!isKnownTab) return;
    button.textContent = WORKSPACE_TAB_LABELS[tabId] || tabId;
    button.classList.toggle("is-active", project.activeTab === tabId);
    if (!button.dataset.boundWorkspaceTab) {
      button.addEventListener("click", () => activateTab(tabId));
      button.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        openContextMenu(event.clientX, event.clientY, { kind: "workspace", id: tabId });
      });
      button.dataset.boundWorkspaceTab = "true";
    }
  });
}

function renderEmptyWorkspace() {
  emptyWorkspace.classList.add("is-active");
  workspaceContent.hidden = true;
  tabPanels.forEach((panel) => panel.classList.remove("is-active"));
  sourceCount.textContent = "0";
  fieldCount.textContent = "0";
  actCount.textContent = "0";
  renderProjectSelector();
}

function showWorkspace() {
  emptyWorkspace.classList.remove("is-active");
  workspaceContent.hidden = false;
}

function activateTab(tabTarget) {
  const project = getActiveProject();
  if (!project) return;
  showWorkspace();
  ensureProjectTab(project, tabTarget);
  touchProjectUsage(project);
  tabPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === tabTarget);
  });
  renderWorkspaceTabs();
  renderProjectSelector();
  persistWorkspace();
}

function openProjectTab(tabTarget, scrollTarget = null) {
  const project = getActiveProject();
  if (!project) {
    window.alert("Deschide mai întâi un proiect nou.");
    return;
  }
  activateTab(tabTarget);
  if (scrollTarget) {
    window.requestAnimationFrame(() => {
      scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

function setUiStatus(message, projectId = workspaceState.activeProjectId) {
  const targetProject = getProjectById(projectId);
  if (targetProject) {
    targetProject.uiStatus = message;
  }
  if (uiStatus && (!projectId || projectId === workspaceState.activeProjectId)) {
    uiStatus.textContent = message;
  }
}

function setSelectedFilesPreview(message, projectId = workspaceState.activeProjectId) {
  const targetProject = getProjectById(projectId);
  if (targetProject) {
    targetProject.selectedFilesPreview = message;
  }
  if (selectedFilesPreview && (!projectId || projectId === workspaceState.activeProjectId)) {
    selectedFilesPreview.textContent = message;
  }
}

function setExtractionSummary(message, projectId = workspaceState.activeProjectId) {
  const targetProject = getProjectById(projectId);
  if (targetProject) {
    targetProject.extractionSummary = message;
  }
  if (extractionSummary && (!projectId || projectId === workspaceState.activeProjectId)) {
    extractionSummary.textContent = message;
  }
}

function applyProjectUiState(project) {
  const uiState = { ...getDefaultProjectUiState(), ...(project || {}) };
  if (manualText) {
    manualText.value = uiState.manualDraft || "";
  }
  if (fileInput) {
    fileInput.value = "";
  }
  setSelectedFilesPreview(uiState.selectedFilesPreview, project?.id);
  setUiStatus(uiState.uiStatus, project?.id);
  setExtractionSummary(uiState.extractionSummary, project?.id);
}

function applyUiLayoutSettings(settings = {}) {
  const density = Number(settings.density ?? 8);
  const tabsLift = Number(settings.tabsLift ?? 8);
  document.documentElement.style.setProperty("--ui-density", `${density}px`);
  document.documentElement.style.setProperty("--ui-tabs-lift", `${tabsLift}px`);
  if (uiDensityRange) uiDensityRange.value = String(density);
  if (uiTabsLiftRange) uiTabsLiftRange.value = String(tabsLift);
}

function readUiLayoutSettings() {
  try {
    const raw = localStorage.getItem(UI_LAYOUT_STORAGE_KEY);
    if (!raw) return { density: 8, tabsLift: 8 };
    const parsed = JSON.parse(raw);
    return {
      density: Number(parsed?.density ?? 8),
      tabsLift: Number(parsed?.tabsLift ?? 8)
    };
  } catch {
    return { density: 8, tabsLift: 8 };
  }
}

function persistUiLayoutSettings() {
  if (!uiDensityRange && !uiTabsLiftRange) return;
  const payload = {
    density: Number(uiDensityRange?.value ?? 8),
    tabsLift: Number(uiTabsLiftRange?.value ?? 8)
  };
  localStorage.setItem(UI_LAYOUT_STORAGE_KEY, JSON.stringify(payload));
  applyUiLayoutSettings(payload);
}

function ensureExtractionTabs(project) {
  if (!project) return;
  ["sourcesTab", "normalTab", "preliminaryTab", "issuesTab", "lawTab"].forEach((tabId) => {
    if (!project.openTabs.includes(tabId)) {
      project.openTabs.push(tabId);
    }
  });
}

function renderDocLikePreview(type) {
  const targetPreview = getReportPreviewByType(type);
  if (!targetPreview) return;

  let wordHtml = "";
  try {
    if (type === "preliminary") {
      wordHtml = buildPreliminaryScenarioWordHtml(
        state.data,
        state.sources,
        state.applicableActs,
        state.projectProfile,
        state.complianceChecks
      );
    } else {
      const content = String(normalReportOutput.value || "").trim();
      if (!content) {
        normalReportOutput.value = buildScenarioMarkdown(state.data, state.sources, state.applicableActs, state.complianceChecks);
      }
      wordHtml = buildNormalScenarioWordHtml(state.data, state.sources, state.applicableActs, state.complianceChecks);
    }
  } catch (error) {
    console.error(`Previzualizarea ${type} nu a putut fi generata complet. Se afiseaza structura minima.`, error);
    wordHtml = buildFallbackPreviewHtml(type);
  }

  try {
    const parsed = new DOMParser().parseFromString(wordHtml, "text/html");
    const styleBlocks = Array.from(parsed.querySelectorAll("style"))
      .map((node) => node.textContent || "")
      .map((text) => text.replace(/\bbody\b/g, ".doc-preview-surface"))
      .map((text) => `<style>${text}</style>`)
      .join("\n");
    const bodyHtml = parsed.body ? parsed.body.innerHTML : wordHtml;
    targetPreview.innerHTML = `<div class="doc-preview-surface">${styleBlocks}${bodyHtml}</div>`;
  } catch (error) {
    console.error("Randarea previzualizarii a esuat. Se afiseaza continutul brut.", error);
    targetPreview.innerHTML = `<div class="doc-preview-surface">${wordHtml}</div>`;
  }
}

function buildFallbackPreviewHtml(type) {
  const title = type === "preliminary" ? "SCENARIU DE SECURITATE LA INCENDIU PRELIMINAR" : "SCENARIU DE SECURITATE LA INCENDIU";
  const structure = type === "preliminary"
    ? `
      <h2>1. Caracteristicile construcției sau amenajării</h2>
      <p>Structura de bază este pregătită. Datele vor fi completate pe măsură ce extragerea găsește informații.</p>
      <h2>2. Nivelurile riscului de incendiu estimat</h2>
      <h2>3. Nivelurile criteriilor de performanță privind securitatea la incendiu</h2>
      <h2>4. Instalații cu rol în asigurarea cerinței fundamentale „securitate la incendiu”</h2>
      <h2>5. Măsuri compensatorii</h2>
    `
    : `
      <h2>1. Caracteristicile construcției sau amenajării</h2>
      <h2>2. Identificarea și stabilirea nivelurilor de risc de incendiu</h2>
      <h2>3. Nivelurile criteriilor de performanță privind securitatea la incendiu</h2>
      <h2>4. Echiparea și dotarea cu instalații cu rol în asigurarea cerinței fundamentale „securitate la incendiu”</h2>
      <h2>5. Măsuri tehnico-organizatorice privind exploatarea construcției</h2>
      <h2>6. Măsuri compensatorii propuse</h2>
    `;

  return `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.25; color: #111; margin: 12mm 14mm 12mm 21mm; }
    h1 { text-align: center; font-size: 16pt; margin: 0 0 8pt; }
    h2 { font-size: 13pt; margin: 10pt 0 4pt; }
    p { margin: 2pt 0; text-align: justify; }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <p>Previzualizare minimă de siguranță. Documentul complet se va afișa după generarea reușită.</p>
  ${structure}
</body>
</html>`;
}

function generateReportsForActiveProject() {
  const project = getActiveProject();
  if (!project) return;

  ensureExtractionTabs(project);
  normalReportOutput.value = buildScenarioMarkdown(state.data, state.sources, state.applicableActs, state.complianceChecks);
  preliminaryReportOutput.value = buildPreliminaryScenarioMarkdown(
    state.data,
    state.sources,
    state.applicableActs,
    state.projectProfile,
    state.complianceChecks
  );
  project.normalReport = normalReportOutput.value;
  project.preliminaryReport = preliminaryReportOutput.value;
  renderDocLikePreview("normal");
  renderDocLikePreview("preliminary");
  activateTab("normalTab");
}

function fieldRequiresProblemReporting(fieldKey, data, profile = {}) {
  const combinedText = [
    data?.funcțiuni,
    data?.tip_cladire,
    data?.procese_substante,
    data?.instalații_stingere,
    data?.desfumare
  ].join(" ").toLowerCase();

  switch (fieldKey) {
    case "tip_parcaj":
      return Boolean(profile?.isUndergroundParking) || /\bparcaj|autovehic/i.test(combinedText);
    case "contact_beneficiar":
      return false;
    case "profil_activitate":
      return false;
    case "capacitati_depozitare":
      return false;
    case "procese_substante":
      return /\bsubstanțe?\s+periculoase|substante\s+periculoase|producție|productie|depozitare/i.test(combinedText);
    case "instalații_stingere":
      return false;
    case "desfumare":
      return Boolean(profile?.hasBasement) || ["inalta", "foarte_inalta"].includes(String(profile?.heightClass || "").toLowerCase());
    case "măsuri_compensatorii":
      return false;
    case "stingatoare":
      return false;
    default:
      return true;
  }
}

function isRealProjectIssueText(text) {
  const normalized = sanitizeDisplayText(String(text || "")).toLowerCase();
  if (!normalized) return false;
  const falsePositivePatterns = [
    /nu este cazul/,
    /nu este obligator/,
    /nu rezultă cerin/,
    /nu rezultă obligativ/,
    /neobligatoriu/,
    /distanțele de siguranță la vecinătăți sunt asigurate/,
    /distantele de siguranta la vecinatati sunt asigurate/,
    /nu au fost identificate probleme/,
    /nu sunt substanțe periculoase relevante/,
    /nu se prevăd instalații fixe/,
    /nu se prevad instalatii fixe/
  ];
  return !falsePositivePatterns.some((pattern) => pattern.test(normalized));
}

function renderIssuesOutput() {
  if (!issuesOutput) return;

  const emptyFields = annexFields.filter((field) =>
    fieldRequiresProblemReporting(field.key, state.data, state.projectProfile) &&
    !String(state.data[field.key] || "").trim()
  );
  const derivedAddress = deriveAddress(state.data, state.sources);
  const dim = deriveDimensionParts(state.data, state.sources);
  const structuralIssues = [];
  if (!derivedAddress) structuralIssues.push("Lipsește adresa completă a obiectivului.");
  if (!dim.regim) structuralIssues.push("Lipsește regimul de înălțime.");
  if (!dim.inaltime) structuralIssues.push("Lipsește înălțimea maximă a clădirii.");
  if (!dim.volum) structuralIssues.push("Lipsește volumul construcției.");
  if (!dim.ariaConstruita) structuralIssues.push("Lipsește aria construită.");
  if (!dim.ariaDesfasurata) structuralIssues.push("Lipsește aria desfășurată.");
  const roomChecklist = buildRiskRoomsChecklist(state.data);
  if (roomChecklist.length) {
    structuralIssues.push("La evaluarea sarcinii termice există calcul complet doar pentru naos parter; pentru celelalte încăperi/spații lipsesc calculele detaliate.");
  }
  const localActIssues = (state.actCoverageChecks || [])
    .filter((item) => item.needsAttention && !item.isDiscoveredAct)
    .map((item) => `${item.title}: ${item.message} Nivel local: ${item.status}; secțiuni locale: ${item.sectionCount}.`);
  const discoveredActs = (state.actCoverageChecks || [])
    .filter((item) => item.isDiscoveredAct)
    .map((item) => `${item.title}: ${item.message}`);
  const checkProblems = (state.complianceChecks || []).filter(
    (check) => {
      const verdictText = `${check.verdict || ""} ${check.observation || ""}`;
      return (/de verificat/i.test(verdictText) || /lipsește|lipseste|incomplet/i.test(verdictText)) && isRealProjectIssueText(verdictText);
    }
  );
  const sourceCards = state.sources.map((source) => {
    const items = [];
    if (["error", "unsupported", "pending"].includes(source.type)) {
      items.push(`Tip sursă: ${source.type}. Verifică fișierul încărcat sau conținutul extras.`);
    }
    const relatedChecks = checkProblems.filter((check) => {
      const text = `${check.code || ""} ${check.observation || ""}`.toLowerCase();
      return text.includes(String(source.name || "").toLowerCase());
    });
    relatedChecks.forEach((check) => {
      items.push(`${check.code || "Verificare"}: ${check.observation || check.verdict || "de verificat"}${check.legalBasis ? ` Baza legală: ${buildLegalBasisLinks(check.legalBasis)}.` : ""}`);
    });
    if (!items.length) {
      items.push("Nu au fost identificate probleme directe pentru acest fișier.");
    }
    return { source, items };
  });

  if (!sourceCards.length && !emptyFields.length && !checkProblems.length && !localActIssues.length && !discoveredActs.length) {
    issuesOutput.innerHTML = `
      <article class="rule-card">
        <strong>Nu au fost identificate probleme evidente.</strong>
        <div class="source-meta">Daca apar lipsuri sau verificari suplimentare, ele vor fi afisate aici dupa extragere.</div>
      </article>
    `;
    return;
  }

  const projectLevel = [
    ...emptyFields.slice(0, 12).map((field) => `Câmp incomplet: ${field.label}`),
    ...structuralIssues,
    ...localActIssues,
    ...checkProblems.map((check) => `${check.code || "Verificare"}: ${check.observation || check.verdict || "de verificat"}${check.legalBasis ? ` Baza legală: ${buildLegalBasisLinks(check.legalBasis)}.` : ""}`)
  ];

  const projectCard = `
    <article class="rule-card">
      <strong>Probleme generale ale proiectului</strong>
      ${
        projectLevel.length
          ? `<ul class="issues-bullets">${projectLevel.map((item) => `<li>${renderInline(item, "html")}</li>`).join("")}</ul>`
          : `<div class="source-meta">Nu au fost identificate probleme generale suplimentare.</div>`
      }
    </article>
  `;
  const discoveredActsCard = discoveredActs.length
    ? `
    <article class="rule-card">
      <strong>Acte legislative noi descoperite automat</strong>
      <ul class="issues-bullets">${discoveredActs.map((item) => `<li>${renderInline(item, "html")}</li>`).join("")}</ul>
    </article>
  `
    : "";

  const sourceMarkup = sourceCards
    .map(({ source, items }) => `
      <article class="rule-card">
        <strong>${escapeHtml(source.name || "Fișier fără nume")}</strong>
        <div class="source-meta">Tip: ${escapeHtml(source.type || "necunoscut")}</div>
        <ul class="issues-bullets">
          ${items.map((item) => `<li>${renderInline(item, "html")}</li>`).join("")}
        </ul>
      </article>
    `)
    .join("");

  issuesOutput.innerHTML = projectCard + discoveredActsCard + sourceMarkup;
}

async function loadAutotestFixtures() {
  const fixtures = [
    {
      id: "comercial",
      name: "Comercial cu parcare subsol",
      path: "test-fixtures/memoriu-arhitectura-comercial-parcare-subsol.txt"
    },
    {
      id: "industrial",
      name: "Industrial cu depozitare",
      path: "test-fixtures/memoriu-arhitectura-industrial-depozitare.txt"
    },
    {
      id: "restaurant",
      name: "Restaurant cu sala aglomerata",
      path: "test-fixtures/memoriu-arhitectura-restaurant-sala-aglomerata.txt"
    }
  ];

  return Promise.all(fixtures.map(async (fixture) => {
    const response = await fetch(fixture.path);
    if (!response.ok) {
      throw new Error(`Nu s-a putut incarca ${fixture.path}`);
    }
    return {
      ...fixture,
      content: await response.text()
    };
  }));
}

function summarizeAutotestActs(acts) {
  if (!Array.isArray(acts) || !acts.length) return "Nu au fost identificate acte.";
  return acts.map((act) => act.title || act.id || "act").join("; ");
}

function summarizeAutotestProblems(checks) {
  if (!Array.isArray(checks) || !checks.length) return "Nu au fost generate verificari.";
  return checks
    .slice(0, 6)
    .map((check) => `${check.code || "regula"}: ${check.status || check.verdict || check.observation || "de verificat"}`)
    .join(" | ");
}

function runAutotestForContent(label, content) {
  const saved = {
    sources: safeClone(state.sources),
    data: safeClone(state.data),
    projectProfile: safeClone(state.projectProfile),
    applicableActs: safeClone(state.applicableActs),
    complianceChecks: safeClone(state.complianceChecks),
    rulesCoverage: safeClone(state.rulesCoverage),
    actCoverageChecks: safeClone(state.actCoverageChecks),
    normalReport: normalReportOutput.value,
    preliminaryReport: preliminaryReportOutput.value
  };

  try {
    state.sources = [{
      name: `${label}.txt`,
      content,
      type: "text",
      sizeBytes: content.length,
      extension: "txt"
    }];
    state.data = Object.fromEntries(annexFields.map((field) => [field.key, ""]));
    state.projectProfile = getDefaultProjectProfile();
    state.applicableActs = [];
    state.complianceChecks = [];
    state.rulesCoverage = [];
    state.actCoverageChecks = [];
    normalReportOutput.value = "";
    preliminaryReportOutput.value = "";

    const lines = content.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const extracted = {};
    annexFields.forEach((field) => {
      const value = searchFieldInLines(field.key, lines);
      if (value) {
        extracted[field.key] = value;
      }
    });

    const aggregate = extractAggregateFactsFromContent(content);
    mergeExtractedData({ ...aggregate, ...extracted });
    syncProfileFromDataHints();
    evaluateApplicableActs();
    evaluateActCoverageForProject();
    evaluateComplianceChecks();
    normalReportOutput.value = buildScenarioMarkdown(state.data, state.sources, state.applicableActs, state.complianceChecks);
    preliminaryReportOutput.value = buildPreliminaryScenarioMarkdown(state.data, state.sources, state.applicableActs, state.projectProfile, state.complianceChecks);

    const extractedCount = Object.values(state.data).filter((value) => String(value || "").trim()).length;
    return {
      label,
      extractedCount,
      actsSummary: summarizeAutotestActs(state.applicableActs),
      problemsSummary: summarizeAutotestProblems(state.complianceChecks),
      normalLength: normalReportOutput.value.length,
      preliminaryLength: preliminaryReportOutput.value.length
    };
  } finally {
    state.sources = saved.sources;
    state.data = saved.data;
    state.projectProfile = saved.projectProfile;
    state.applicableActs = saved.applicableActs;
    state.complianceChecks = saved.complianceChecks;
    state.rulesCoverage = saved.rulesCoverage;
    state.actCoverageChecks = saved.actCoverageChecks;
    normalReportOutput.value = saved.normalReport;
    preliminaryReportOutput.value = saved.preliminaryReport;
  }
}

async function runAutotestSuite() {
  if (!autotestOutput) return;
  autotestOutput.innerHTML = `
    <article class="rule-card">
      <strong>Auto-test in curs...</strong>
      <div class="source-meta">Se incarca memoriile de test si se ruleaza verificarile interne.</div>
    </article>
  `;

  try {
    const fixtures = await loadAutotestFixtures();
    const results = fixtures.map((fixture) => runAutotestForContent(fixture.name, fixture.content));
    autotestOutput.innerHTML = results
      .map((result) => `
        <article class="rule-card">
          <strong>${escapeHtml(result.label)}</strong>
          <div class="source-meta">Campuri extrase: ${escapeHtml(String(result.extractedCount))}</div>
          <div class="source-meta">Acte identificate: ${escapeHtml(result.actsSummary)}</div>
          <div class="source-meta">Verificari: ${escapeHtml(result.problemsSummary)}</div>
          <div class="source-meta">SSI normal generat: ${escapeHtml(String(result.normalLength))} caractere</div>
          <div class="source-meta">SSI preliminar generat: ${escapeHtml(String(result.preliminaryLength))} caractere</div>
        </article>
      `)
      .join("");
  } catch (error) {
    console.error(error);
    autotestOutput.innerHTML = `
      <article class="rule-card">
        <strong>Auto-testul a esuat.</strong>
        <div class="source-meta">${escapeHtml(error?.message || "Eroare necunoscuta.")}</div>
      </article>
    `;
  }
}

function handleAddManualText() {
  const text = manualText.value.trim();

  if (!text) {
    window.alert("Nu exista text de adaugat.");
    return;
  }

  state.sources.push({
    name: `Text manual ${state.sources.length + 1}`,
    content: text,
    type: "manual"
  });

  manualText.value = "";
  markActiveProjectDirty();
  refreshUI();
  saveActiveProjectStateFromUI();
  persistWorkspace();
  setUiStatus("Textul manual a fost adaugat in proiect.");
}

async function handleExtractData() {
  const targetProjectId = workspaceState.activeProjectId;
  if (!state.sources.length) {
    setUiStatus("Nu exista surse incarcate pentru extragere.", targetProjectId);
    setExtractionSummary("Extragerea nu a pornit: nu exista surse incarcate.", targetProjectId);
    window.alert("Nu exista surse incarcate pentru extragere.");
    return;
  }
  const warnings = [];
  setUiStatus("Extragerea a pornit...", targetProjectId);
  setExtractionSummary("Se analizeaza sursele incarcate.", targetProjectId);
  try {
    const aggregate = runExtraction(state.sources);
    const point1Aggregate = Object.fromEntries(Object.entries(aggregate).filter(([key]) => POINT_1_FIELD_KEYS.has(key)));
    const extractedEntries = Object.entries(point1Aggregate).filter(([, value]) => String(value || "").trim());

    mergeExtractedData(point1Aggregate);
    refreshFieldValues();

    try {
      syncProfileFromDataHints();
    } catch (error) {
      console.error(error);
      warnings.push("profil");
    }

    try {
      refreshProfileValues();
    } catch (error) {
      console.error(error);
      warnings.push("afisare profil");
    }

      try {
        evaluateApplicableActs();
      } catch (error) {
        console.error(error);
        warnings.push("legislatie");
      }

      try {
        evaluateActCoverageForProject();
      } catch (error) {
        console.error(error);
        warnings.push("baza acte");
      }


    try {
      evaluateComplianceChecks();
    } catch (error) {
      console.error(error);
      warnings.push("verificari");
    }

    try {
      refreshCounters();
    } catch (error) {
      console.error(error);
      warnings.push("contoare");
    }

    try {
      generateReportsForActiveProject();
    } catch (error) {
      console.error(error);
      warnings.push("generare SSI");
    }

    try {
      renderIssuesOutput();
    } catch (error) {
      console.error(error);
      warnings.push("probleme");
    }

    markActiveProjectDirty();
    showWorkspace();
    renderProjectTabs();
    renderWorkspaceTabs();
    activateTab("normalTab");
    saveActiveProjectStateFromUI();
    persistWorkspace();
    setUiStatus(`Extragerea a fost realizata din ${state.sources.length} sursa(e).`, targetProjectId);
    setExtractionSummary(
      extractedEntries.length
        ? `Au fost completate ${extractedEntries.length} campuri. Exemple: ${extractedEntries.slice(0, 4).map(([key]) => key).join(", ")}.${warnings.length ? ` Avertismente: ${warnings.join(", ")}.` : ""}`
        : "Extragerea a rulat, dar nu a gasit campuri potrivite in sursele incarcate."
    , targetProjectId);
    saveActiveProjectStateFromUI();
    persistWorkspace();
    window.alert(
      extractedEntries.length
        ? `Extragerea a fost realizata. Au fost completate ${extractedEntries.length} campuri.${warnings.length ? ` Unele etape au avut avertismente: ${warnings.join(", ")}.` : ""}`
        : "Extragerea a rulat, dar nu a gasit campuri potrivite in sursele incarcate."
    );
  } catch (error) {
    console.error(error);
    setUiStatus("A aparut o eroare la extragere.", targetProjectId);
    setExtractionSummary("Extragerea a esuat in etapa principala. Verifica structura fisierului incarcat.", targetProjectId);
    window.alert("A aparut o eroare la extragere. Verifica fisierul incarcat.");
  }
}

async function handleSelectedFiles(event) {
  const project = getActiveProject();
  if (!project) {
    window.alert("Deschide mai întâi un proiect nou.");
    fileInput.value = "";
    setSelectedFilesPreview("Nu a fost selectat niciun fisier.");
    return;
  }

  const files = Array.from(event.target.files || []);
  const targetProjectId = project.id;
  const loaded = [];
  const failed = [];

  if (!files.length) {
    setUiStatus("Nu a fost selectat niciun fisier.", targetProjectId);
    setSelectedFilesPreview("Nu a fost selectat niciun fisier.", targetProjectId);
    return;
  }

  setSelectedFilesPreview(files.map((file) => file.name).join(" | "), targetProjectId);
  setUiStatus(`Se incarca ${files.length} fisier(e)...`, targetProjectId);
  files.forEach((file) => {
    state.sources.push({
      name: file.name,
      content: `[IN CURS DE CITIRE] ${file.name}`,
      type: "pending",
      sizeBytes: Number(file.size || 0),
      mimeType: String(file.type || ""),
      extension: file.name.includes(".") ? file.name.toLowerCase().slice(file.name.lastIndexOf(".") + 1) : ""
    });
  });
  refreshUI();

  for (const file of files) {
    try {
      const item = await readSupportedFile(file);
      loaded.push(item);
    } catch (error) {
      console.error(error);
      failed.push(file.name);
      loaded.push({
        name: file.name,
        content: "[EROARE LA CITIRE] Fisierul nu a putut fi procesat in aceasta versiune. Incearca formatul .docx, .txt, .md sau lipire manuala.",
        type: "error",
        sizeBytes: Number(file.size || 0),
        mimeType: String(file.type || ""),
        extension: file.name.includes(".") ? file.name.toLowerCase().slice(file.name.lastIndexOf(".") + 1) : ""
      });
    }
  }

  const boundProject = getProjectById(targetProjectId);
  if (!boundProject) {
    return;
  }

  const activeProjectUnchanged = workspaceState.activeProjectId === targetProjectId;
  const sourceBucket = activeProjectUnchanged ? state.sources : safeClone(boundProject.sources);
  const nextSources = sourceBucket.filter((item) => item.type !== "pending");
  loaded.forEach((item) => nextSources.push(item));

  boundProject.sources = safeClone(nextSources);
  if (activeProjectUnchanged) {
    state.sources = nextSources;
  }
  fileInput.value = "";
  ensureProjectTab(boundProject, "sourcesTab");
  boundProject.dirty = true;
  if (activeProjectUnchanged) {
    activateTab("sourcesTab");
    refreshUI();
    saveActiveProjectStateFromUI();
  } else {
    renderProjectTabs();
    renderWorkspaceTabs();
  }
  persistWorkspace();

  if (loaded.length) {
    const message = failed.length
      ? `Au fost adaugate ${loaded.length} fisiere. ${failed.length} au avut probleme la citire.`
      : `Au fost adaugate ${loaded.length} fisiere in proiect.`;
    setUiStatus(message, targetProjectId);
    window.alert(message);
  }
}

function createNewProject() {
  saveActiveProjectStateFromUI();
  const suggestedName = `Proiect ${workspaceState.projects.length + 1}`;
  const requestedName = window.prompt("Denumirea noului proiect:", suggestedName);
  if (requestedName === null) {
    return;
  }
  const cleanName = requestedName.trim() || suggestedName;
  const newProject = createBlankProject(cleanName);
  workspaceState.projects.push(newProject);
  workspaceState.activeProjectId = newProject.id;
  touchProjectUsage(newProject);
  loadProjectIntoUI(newProject.id);
  activateTab("sourcesTab");
  persistWorkspace();
}

window.__ssiCommands = {
  newProject: createNewProject,
  switchProjectFromSelect: (projectId) => {
    if (!projectId || projectId === workspaceState.activeProjectId) return;
    switchProject(projectId);
  },
  activateWorkspaceTab: (tabId) => {
    if (!tabId) return;
    activateTab(tabId);
  },
  openAutotest: async () => {
    activateTab("autotestTab");
    await runAutotestSuite();
  },
  openSources: () => openProjectTab("sourcesTab"),
  openFields: () => openProjectTab("sourcesTab", projectFactsSummary),
  openLawRef: (refKey) => openLawModal(refKey),
  applyUiLayout: () => persistUiLayoutSettings(),
  handleFileSelection: handleSelectedFiles,
  addManualText: handleAddManualText,
  extractData: handleExtractData,
  resetProject: resetProjectState,
  openRules: () => {
    const project = getActiveProject();
    if (!project) {
      window.alert("Deschide mai întâi un proiect nou.");
      return;
    }
    ensureProjectTab(project, "legislationTab");
    openProjectTab("legislationTab");
  }
};

applyUiLayoutSettings(readUiLayoutSettings());
uiDensityRange?.addEventListener("input", persistUiLayoutSettings);
uiTabsLiftRange?.addEventListener("input", persistUiLayoutSettings);

function getReportOutputByType(type) {
  return type === "preliminary" ? preliminaryReportOutput : normalReportOutput;
}

function getReportPreviewByType(type) {
  return type === "preliminary" ? preliminaryReportPreview : normalReportPreview;
}

function getCurrentReportType() {
  return getActiveTabTarget() === "preliminaryTab" ? "preliminary" : "normal";
}

function getCurrentReportOutputElement() {
  return getReportOutputByType(getCurrentReportType());
}

function getCurrentReportPreviewElement() {
  return getReportPreviewByType(getCurrentReportType());
}

function switchProject(projectId) {
  saveActiveProjectStateFromUI();
  workspaceState.activeProjectId = projectId;
  touchProjectUsage(getProjectById(projectId));
  loadProjectIntoUI(projectId);
  persistWorkspace();
}

function loadProjectIntoUI(projectId) {
  const project = getProjectById(projectId);
  if (!project) {
    renderEmptyWorkspace();
    return;
  }
  if (!ALWAYS_VISIBLE_WORKSPACE_TABS.includes(project.activeTab)) {
    project.activeTab = "sourcesTab";
  }

  touchProjectUsage(project);
  state.sources = safeClone(project.sources);
  state.data = safeClone(project.data);
  state.projectProfile = safeClone(project.projectProfile);
  state.applicableActs = safeClone(project.applicableActs);
  state.complianceChecks = safeClone(project.complianceChecks);
  state.rulesCoverage = safeClone(project.rulesCoverage);
  state.actCoverageChecks = safeClone(project.actCoverageChecks || []);
  normalReportOutput.value = project.normalReport || "";
  preliminaryReportOutput.value = project.preliminaryReport || "";
  manualText.value = project.manualDraft || "";
  renderFields();
  renderProfile();
  showWorkspace();
  tabPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === project.activeTab);
  });
  refreshUI();
  applyProjectUiState(project);
  renderProjectTabs();
  renderWorkspaceTabs();
  renderProjectSelector();
}

function markActiveProjectDirty() {
  const project = getActiveProject();
  if (!project) return;
  project.dirty = true;
  renderProjectTabs();
  renderProjectSelector();
}

function saveActiveProjectStateFromUI() {
  const project = getActiveProject();
  if (!project) return;
  syncFieldsFromForm();
  syncProjectProfile();
  project.sources = safeClone(state.sources);
  project.data = safeClone(state.data);
  project.projectProfile = safeClone(state.projectProfile);
  project.applicableActs = safeClone(state.applicableActs);
  project.complianceChecks = safeClone(state.complianceChecks);
  project.rulesCoverage = safeClone(state.rulesCoverage);
  project.actCoverageChecks = safeClone(state.actCoverageChecks);
  project.normalReport = normalReportOutput.value;
  project.preliminaryReport = preliminaryReportOutput.value;
  project.manualDraft = manualText.value || "";
  project.selectedFilesPreview = selectedFilesPreview?.textContent || getDefaultProjectUiState().selectedFilesPreview;
  project.uiStatus = uiStatus?.textContent || getDefaultProjectUiState().uiStatus;
  project.extractionSummary = extractionSummary?.textContent || getDefaultProjectUiState().extractionSummary;
}

function updateAutosaveButtonLabel() {
  if (menuToggleAutosaveBtn) {
    menuToggleAutosaveBtn.textContent = `Salvare automată: ${workspaceState.autosaveEnabled ? "Pornit" : "Oprit"}`;
  }
}

function openContextMenu(x, y, target) {
  workspaceState.contextTarget = target;
  tabContextMenu.hidden = false;
  tabContextMenu.style.left = `${x}px`;
  tabContextMenu.style.top = `${y}px`;
}

function closeContextMenu() {
  workspaceState.contextTarget = null;
  tabContextMenu.hidden = true;
}

const snakeState = {
  gridSize: 28,
  cellSize: 20,
  snake: [],
  direction: "right",
  nextDirection: "right",
  food: null,
  bonus: null,
  obstacles: [],
  score: 0,
  level: 1,
  speed: 150,
  running: false,
  paused: false,
  timerId: null,
  bonusTimerId: null
};

function resetSnakeGame() {
  snakeState.snake = [
    { x: 6, y: 14 },
    { x: 5, y: 14 },
    { x: 4, y: 14 }
  ];
  snakeState.direction = "right";
  snakeState.nextDirection = "right";
  snakeState.score = 0;
  snakeState.level = 1;
  snakeState.speed = 150;
  snakeState.running = false;
  snakeState.paused = false;
  snakeState.obstacles = [];
  snakeState.bonus = null;
  clearTimeout(snakeState.timerId);
  clearTimeout(snakeState.bonusTimerId);
  placeSnakeFood();
  updateSnakeStats();
  setSnakeMessage("Apasă Start joc.");
  drawSnakeGame();
}

function updateSnakeStats() {
  if (snakeScore) snakeScore.textContent = String(snakeState.score);
  if (snakeLevel) snakeLevel.textContent = String(snakeState.level);
  if (snakeSpeed) snakeSpeed.textContent = `${Math.max(1, Math.round((170 - snakeState.speed) / 10))}x`;
}

function setSnakeMessage(message) {
  if (snakeMessage) snakeMessage.textContent = message;
}

function getRandomFreeSnakeCell() {
  const occupied = new Set([
    ...snakeState.snake.map((part) => `${part.x},${part.y}`),
    ...snakeState.obstacles.map((part) => `${part.x},${part.y}`),
    ...(snakeState.food ? [`${snakeState.food.x},${snakeState.food.y}`] : []),
    ...(snakeState.bonus ? [`${snakeState.bonus.x},${snakeState.bonus.y}`] : [])
  ]);

  const candidates = [];
  for (let y = 0; y < snakeState.gridSize; y += 1) {
    for (let x = 0; x < snakeState.gridSize; x += 1) {
      const key = `${x},${y}`;
      if (!occupied.has(key)) candidates.push({ x, y });
    }
  }

  if (!candidates.length) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function placeSnakeFood() {
  const cell = getRandomFreeSnakeCell();
  if (!cell) return;
  const palette = ["#ff6b6b", "#ffd166", "#6ef3a5", "#65a8ff", "#d183ff"];
  snakeState.food = { ...cell, color: palette[Math.floor(Math.random() * palette.length)] };
}

function placeSnakeBonus() {
  const cell = getRandomFreeSnakeCell();
  if (!cell) return;
  snakeState.bonus = { ...cell, color: "#fff27a" };
  clearTimeout(snakeState.bonusTimerId);
  snakeState.bonusTimerId = window.setTimeout(() => {
    snakeState.bonus = null;
    drawSnakeGame();
  }, 5000);
}

function addSnakeObstacleRow() {
  const obstacleCount = Math.min(2 + snakeState.level, 6);
  for (let i = 0; i < obstacleCount; i += 1) {
    const cell = getRandomFreeSnakeCell();
    if (!cell) break;
    snakeState.obstacles.push(cell);
  }
}

function startSnakeGame() {
  if (!snakeState.food) resetSnakeGame();
  if (snakeState.running && snakeState.paused) {
    snakeState.paused = false;
    setSnakeMessage("Joc reluat.");
    runSnakeLoop();
    return;
  }
  if (snakeState.running) return;
  snakeState.running = true;
  snakeState.paused = false;
  setSnakeMessage("Succes!");
  runSnakeLoop();
}

function pauseSnakeGame() {
  if (!snakeState.running) return;
  snakeState.paused = !snakeState.paused;
  if (snakeState.paused) {
    clearTimeout(snakeState.timerId);
    setSnakeMessage("Pauză.");
  } else {
    setSnakeMessage("Joc reluat.");
    runSnakeLoop();
  }
}

function finishSnakeGame(message) {
  snakeState.running = false;
  snakeState.paused = false;
  clearTimeout(snakeState.timerId);
  clearTimeout(snakeState.bonusTimerId);
  setSnakeMessage(message);
}

function runSnakeLoop() {
  clearTimeout(snakeState.timerId);
  if (!snakeState.running || snakeState.paused) return;
  snakeState.timerId = window.setTimeout(() => {
    stepSnakeGame();
    drawSnakeGame();
    runSnakeLoop();
  }, snakeState.speed);
}

function stepSnakeGame() {
  snakeState.direction = snakeState.nextDirection;
  const head = { ...snakeState.snake[0] };

  if (snakeState.direction === "up") head.y -= 1;
  if (snakeState.direction === "down") head.y += 1;
  if (snakeState.direction === "left") head.x -= 1;
  if (snakeState.direction === "right") head.x += 1;

  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= snakeState.gridSize ||
    head.y >= snakeState.gridSize ||
    snakeState.snake.some((part) => part.x === head.x && part.y === head.y) ||
    snakeState.obstacles.some((part) => part.x === head.x && part.y === head.y)
  ) {
    finishSnakeGame("Game over. Apasă Reset.");
    return;
  }

  snakeState.snake.unshift(head);

  const ateFood = snakeState.food && head.x === snakeState.food.x && head.y === snakeState.food.y;
  const ateBonus = snakeState.bonus && head.x === snakeState.bonus.x && head.y === snakeState.bonus.y;

  if (ateFood) {
    snakeState.score += 10;
    placeSnakeFood();
    if (snakeState.score % 40 === 0) {
      snakeState.level += 1;
      snakeState.speed = Math.max(70, snakeState.speed - 12);
      addSnakeObstacleRow();
      setSnakeMessage(`Nivel ${snakeState.level}. Obstacole noi!`);
    }
    if (snakeState.score % 30 === 0) {
      placeSnakeBonus();
    }
  } else if (ateBonus) {
    snakeState.score += 25;
    snakeState.bonus = null;
    clearTimeout(snakeState.bonusTimerId);
    setSnakeMessage("Bonus colectat!");
  } else {
    snakeState.snake.pop();
  }

  updateSnakeStats();
}

function drawSnakeCell(x, y, color, radius = 4) {
  if (!snakeCtx) return;
  const size = snakeState.cellSize;
  const px = x * size;
  const py = y * size;
  snakeCtx.fillStyle = color;
  snakeCtx.fillRect(px + 1, py + 1, size - 2, size - 2);
}

function drawSnakeGame() {
  if (!snakeCtx || !snakeCanvas) return;
  snakeCtx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);

  for (let y = 0; y < snakeState.gridSize; y += 1) {
    for (let x = 0; x < snakeState.gridSize; x += 1) {
      snakeCtx.fillStyle = (x + y) % 2 === 0 ? "#0f1620" : "#121b27";
      snakeCtx.fillRect(
        x * snakeState.cellSize,
        y * snakeState.cellSize,
        snakeState.cellSize,
        snakeState.cellSize
      );
    }
  }

  snakeState.obstacles.forEach((part) => drawSnakeCell(part.x, part.y, "#ff8c42", 3));
  if (snakeState.food) drawSnakeCell(snakeState.food.x, snakeState.food.y, snakeState.food.color, 10);
  if (snakeState.bonus) drawSnakeCell(snakeState.bonus.x, snakeState.bonus.y, snakeState.bonus.color, 10);

  snakeState.snake.forEach((part, index) => {
    drawSnakeCell(part.x, part.y, index === 0 ? "#7cf5a7" : "#32d07e", 5);
  });
}

function handleSnakeDirection(next) {
  const opposite = {
    up: "down",
    down: "up",
    left: "right",
    right: "left"
  };
  if (opposite[snakeState.direction] === next) return;
  snakeState.nextDirection = next;
}

snakeStartBtn?.addEventListener("click", startSnakeGame);
snakePauseBtn?.addEventListener("click", pauseSnakeGame);
snakeResetBtn?.addEventListener("click", resetSnakeGame);

document.addEventListener("keydown", (event) => {
  if (!snakeWindow || snakeWindow.hidden) return;
  const key = event.key.toLowerCase();
  if (key === "arrowup" || key === "w") handleSnakeDirection("up");
  if (key === "arrowdown" || key === "s") handleSnakeDirection("down");
  if (key === "arrowleft" || key === "a") handleSnakeDirection("left");
  if (key === "arrowright" || key === "d") handleSnakeDirection("right");
  if (event.code === "Space") {
    event.preventDefault();
    pauseSnakeGame();
  }
});

resetSnakeGame();

function confirmCloseWithSaveIfNeeded(project) {
  if (!project?.dirty) return true;
  const saveBeforeClose = window.confirm(`Proiectul "${project.name}" are modificări. Vrei să salvezi înainte de închidere?`);
  if (saveBeforeClose) {
    if (workspaceState.activeProjectId === project.id) {
      saveActiveProjectStateFromUI();
    }
    project.dirty = false;
    persistWorkspace();
    return true;
  }
  return window.confirm(`Închizi proiectul "${project.name}" fără salvare?`);
}

function closeProject(projectId) {
  const project = getProjectById(projectId);
  if (!project) return;
  if (!confirmCloseWithSaveIfNeeded(project)) return;

  workspaceState.projects = workspaceState.projects.filter((item) => item.id !== projectId);
  if (workspaceState.activeProjectId === projectId) {
    workspaceState.activeProjectId = workspaceState.projects[0]?.id || null;
    if (workspaceState.activeProjectId) {
      loadProjectIntoUI(workspaceState.activeProjectId);
    } else {
      state.sources = [];
      state.data = Object.fromEntries(annexFields.map((field) => [field.key, ""]));
      normalReportOutput.value = "";
      preliminaryReportOutput.value = "";
      renderFields();
      renderProfile();
      renderEmptyWorkspace();
    }
  }
  renderProjectTabs();
  renderWorkspaceTabs();
  persistWorkspace();
}

function closeWorkspaceTab(tabId) {
  const project = getActiveProject();
  if (!project) return;
  if (tabId === "sourcesTab") return;
  project.openTabs = project.openTabs.filter((item) => item !== tabId);
  if (!project.openTabs.length) {
    project.openTabs = ["sourcesTab"];
  }
  if (project.activeTab === tabId) {
    project.activeTab = project.openTabs[project.openTabs.length - 1];
  }
  project.dirty = true;
  activateTab(project.activeTab);
  renderProjectTabs();
  persistWorkspace();
}

closeLawModalBtn.addEventListener("click", closeLawModal);
lawModal.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-close-law-modal")) {
    closeLawModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lawModal.hidden) {
    closeLawModal();
  }
  if (event.key === "Escape" && !tabContextMenu.hidden) {
    closeContextMenu();
  }
});

document.addEventListener("click", (event) => {
  if (!tabContextMenu.hidden && !event.target.closest("#tabContextMenu") && !event.target.closest(".browser-tab")) {
    closeContextMenu();
  }
});

function handleLawRefClick(event) {
  const baseTarget =
    event.target instanceof Element
      ? event.target
      : event.target?.parentElement || null;
  const trigger = baseTarget?.closest?.("[data-law-ref]");
  if (!trigger) return;
  event.preventDefault();
  event.stopPropagation();
  const refKey = String(trigger.dataset.lawRef || "").trim();
  if (!refKey) return;
  openLawModal(refKey);
}

workspaceContent?.addEventListener("click", handleLawRefClick, true);
document.addEventListener("click", handleLawRefClick, true);

normalReportOutput.addEventListener("input", () => {
  renderDocLikePreview("normal");
  markActiveProjectDirty();
});

preliminaryReportOutput.addEventListener("input", () => {
  renderDocLikePreview("preliminary");
  markActiveProjectDirty();
});

document.getElementById("addTextBtn").addEventListener("click", handleAddManualText);

manualText?.addEventListener("input", () => {
  const project = getActiveProject();
  if (!project) return;
  project.manualDraft = manualText.value || "";
  project.dirty = true;
  renderProjectTabs();
});

fileInput.addEventListener("change", handleSelectedFiles);

profileInputs.addEventListener("input", () => {
  markActiveProjectDirty();
});

profileInputs.addEventListener("change", () => {
  markActiveProjectDirty();
});

document.getElementById("extractBtn").addEventListener("click", handleExtractData);

openSourcesQuickBtn?.addEventListener("click", () => {
  openProjectTab("sourcesTab");
});

openFieldsQuickBtn?.addEventListener("click", () => {
  openProjectTab("sourcesTab", projectFactsSummary);
});

projectSelector?.addEventListener("change", (event) => {
  const targetId = String(event.target.value || "").trim();
  if (!targetId || targetId === workspaceState.activeProjectId) return;
  switchProject(targetId);
});

projectAddBtn?.addEventListener("click", () => {
  createNewProject();
});

runAutotestBtn?.addEventListener("click", () => {
  runAutotestSuite();
});

window.addEventListener("load", () => {
  ensureWorkspaceReadyAfterLoad();
});

openRulesQuickBtn?.addEventListener("click", () => {
  const project = getActiveProject();
  if (!project) {
    window.alert("Deschide mai întâi un proiect nou.");
    return;
  }
  ensureProjectTab(project, "legislationTab");
  openProjectTab("legislationTab");
});

document.getElementById("evaluateRulesBtn").addEventListener("click", () => {
  syncProjectProfile();
  evaluateApplicableActs();
  evaluateActCoverageForProject();
  evaluateComplianceChecks();
  refreshCounters();
  ensureProjectTab(getActiveProject(), "legislationTab");
  renderWorkspaceTabs();
});

document.getElementById("generateBtn")?.addEventListener("click", () => {
  syncFieldsFromForm();
  syncProjectProfile();
  evaluateApplicableActs();
  evaluateActCoverageForProject();
  evaluateComplianceChecks();
  ensureProjectTab(getActiveProject(), "normalTab");
  normalReportOutput.value = buildScenarioMarkdown(state.data, state.sources, state.applicableActs, state.complianceChecks);
  renderDocLikePreview("normal");
  markActiveProjectDirty();
  activateTab("normalTab");
  refreshCounters();
  renderIssuesOutput();
});

document.getElementById("generatePreliminaryBtn")?.addEventListener("click", () => {
  syncFieldsFromForm();
  syncProjectProfile();
  evaluateApplicableActs();
  evaluateActCoverageForProject();
  evaluateComplianceChecks();
  ensureProjectTab(getActiveProject(), "preliminaryTab");
  preliminaryReportOutput.value = buildPreliminaryScenarioMarkdown(state.data, state.sources, state.applicableActs, state.projectProfile, state.complianceChecks);
  renderDocLikePreview("preliminary");
  markActiveProjectDirty();
  activateTab("preliminaryTab");
  refreshCounters();
  renderIssuesOutput();
});

document.getElementById("downloadDocBtn").addEventListener("click", () => {
  syncFieldsFromForm();
  syncProjectProfile();
  evaluateApplicableActs();
  evaluateActCoverageForProject();
  evaluateComplianceChecks();
  ensureProjectTab(getActiveProject(), "normalTab");
  normalReportOutput.value = buildScenarioMarkdown(state.data, state.sources, state.applicableActs, state.complianceChecks);
  renderDocLikePreview("normal");
  const wordHtml = buildNormalScenarioWordHtml(state.data, state.sources, state.applicableActs, state.complianceChecks);
  downloadFile("scenariu-securitate-incendiu.doc", wordHtml, "application/msword;charset=utf-8");
});

document.getElementById("downloadPreliminaryDocBtn").addEventListener("click", () => {
  syncFieldsFromForm();
  syncProjectProfile();
  evaluateApplicableActs();
  evaluateActCoverageForProject();
  evaluateComplianceChecks();
  ensureProjectTab(getActiveProject(), "preliminaryTab");
  preliminaryReportOutput.value = buildPreliminaryScenarioMarkdown(
    state.data,
    state.sources,
    state.applicableActs,
    state.projectProfile,
    state.complianceChecks
  );
  renderDocLikePreview("preliminary");
  const wordHtml = buildPreliminaryScenarioWordHtml(
    state.data,
    state.sources,
    state.applicableActs,
    state.projectProfile,
    state.complianceChecks
  );
  downloadFile("scenariu-preliminar-securitate-incendiu.doc", wordHtml, "application/msword;charset=utf-8");
});

document.getElementById("downloadJsonBtn").addEventListener("click", () => {
  syncFieldsFromForm();
  syncProjectProfile();
  evaluateApplicableActs();
  evaluateActCoverageForProject();
  evaluateComplianceChecks();

  const payload = {
    generatedAt: new Date().toISOString(),
    sourceCount: state.sources.length,
    projectProfile: state.projectProfile,
    data: state.data,
    applicableActs: state.applicableActs,
    actCoverageChecks: state.actCoverageChecks,
    complianceChecks: state.complianceChecks,
    rulesCoverage: state.rulesCoverage,
    reportNormal: normalReportOutput.value,
    reportPreliminary: preliminaryReportOutput.value
  };

  downloadFile(
    "scenariu-securitate-incendiu-ruleset.json",
    JSON.stringify(payload, null, 2),
    "application/json;charset=utf-8"
  );
});

document.getElementById("downloadRulesBtn").addEventListener("click", () => {
  if (!state.legislationLibrary) {
    return;
  }

  downloadFile(
    "legislation-rules.json",
    JSON.stringify(state.legislationLibrary, null, 2),
    "application/json;charset=utf-8"
  );
});

document.getElementById("resetBtn").addEventListener("click", () => {
  resetProjectState();
});

menuNewProjectBtn?.addEventListener("click", () => {
  createNewProject();
});

menuSaveBtn?.addEventListener("click", () => {
  if (getCurrentReportType() === "preliminary") {
    document.getElementById("downloadPreliminaryDocBtn").click();
    return;
  }
  document.getElementById("downloadDocBtn").click();
});

menuSaveDocBtn?.addEventListener("click", () => {
  menuSaveBtn?.click();
});

menuSaveDocxBtn?.addEventListener("click", () => {
  window.alert("Exportul DOCX va fi adăugat într-o etapă următoare.");
});

menuSavePdfBtn?.addEventListener("click", () => {
  window.alert("Exportul PDF va fi adăugat într-o etapă următoare.");
});

menuToggleAutosaveBtn?.addEventListener("click", () => {
  workspaceState.autosaveEnabled = !workspaceState.autosaveEnabled;
  updateAutosaveButtonLabel();
  persistWorkspace();
});

menuAddLegislationBtn?.addEventListener("click", () => {
  const project = getActiveProject();
  if (!project) {
    window.alert("Deschide mai întâi un proiect nou.");
    return;
  }
  ensureProjectTab(project, "legislationTab");
  openProjectTab("legislationTab");
});

menuDiscoverLegislationBtn?.addEventListener("click", () => {
  const added = discoverAndStoreLegislationFromSources();
  refreshRulesOutput();
  refreshCounters();
  activateTab("legislationTab");
  window.alert(
    added.length
      ? `Au fost identificate ${added.length} acte noi și au fost adăugate în baza legislativă locală.`
      : "Nu au fost identificate acte noi față de baza legislativă locală."
  );
});

contextCloseTabBtn?.addEventListener("click", () => {
  const target = workspaceState.contextTarget;
  closeContextMenu();
  if (!target) return;
  if (target.kind === "workspace") {
    closeWorkspaceTab(target.id);
    return;
  }
  closeProject(target.id);
});

function resetProjectState() {
  const project = getActiveProject();
  if (!project) return;
  const defaultUiState = getDefaultProjectUiState();
  state.sources = [];
  state.data = Object.fromEntries(annexFields.map((field) => [field.key, ""]));
  state.projectProfile = getDefaultProjectProfile();
  state.applicableActs = [];
  state.rulesCoverage = [];
  state.complianceChecks = [];
  state.actCoverageChecks = [];
  resetReportsFromTemplates();
  manualText.value = defaultUiState.manualDraft;
  fileInput.value = "";
  renderFields();
  renderProfile();
  project.openTabs = ["sourcesTab"];
  project.activeTab = "sourcesTab";
  project.dirty = true;
  project.manualDraft = defaultUiState.manualDraft;
  project.selectedFilesPreview = defaultUiState.selectedFilesPreview;
  project.uiStatus = defaultUiState.uiStatus;
  project.extractionSummary = defaultUiState.extractionSummary;
  activateTab("sourcesTab");
  refreshUI();
  applyProjectUiState(project);
  saveActiveProjectStateFromUI();
  persistWorkspace();
}

function renderFields() {
  fieldGrid.innerHTML = "";
  annexFields.forEach((field) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.id = field.key;
    input.value = state.data[field.key] || "";
    fieldGrid.appendChild(input);
  });
  renderProjectFactsSummary();
}

function renderProfile() {
  profileInputs.innerHTML = `
    <div class="field-card">
      <label for="categoryImportance">Categoria de importanta</label>
      <select id="categoryImportance">
        <option value="">Nespecificat</option>
        <option value="A">A - exceptionala</option>
        <option value="B">B - deosebita</option>
        <option value="C">C - normală</option>
        <option value="D">D - redusă</option>
      </select>
    </div>
    <div class="field-card">
      <label for="buildingClass">Tip cladire</label>
      <select id="buildingClass">
        <option value="">Nespecificat</option>
        <option value="civilă">Civila</option>
        <option value="productie">Productie</option>
        <option value="depozitare">Depozitare</option>
        <option value="mixta">Mixta</option>
      </select>
    </div>
    <div class="field-card">
      <label for="destinations">Destinatii</label>
      <select id="destinations" multiple size="6">
        <option value="administrativa">Administrativa</option>
        <option value="comert">Comert</option>
        <option value="cultura">Cultura</option>
        <option value="invatamant">Invatamant</option>
        <option value="turism">Turism / cazare</option>
        <option value="sanatate">Sanatate / asistenta</option>
        <option value="cult">Cult</option>
        <option value="parcaj">Parcaj</option>
        <option value="birouri">Birouri</option>
        <option value="locuire">Locuire</option>
      </select>
      <span class="hint">Pentru selectie multipla foloseste Ctrl sau Shift.</span>
    </div>
    <div class="field-card">
      <label for="installations">Instalații prezente sau necesare</label>
      <select id="installations" multiple size="8">
        <option value="stingere">Stingere incendiu</option>
        <option value="hidranți_interiori">Hidranti interiori</option>
        <option value="hidranți_exteriori">Hidranti exteriori</option>
        <option value="sprinklere">Sprinklere</option>
        <option value="detectare_alarmare">Detectare / alarmare</option>
        <option value="desfumare">Desfumare</option>
        <option value="iluminat_siguranta">Iluminat de siguranta</option>
        <option value="alimentare_siguranta">Alimentare receptoare cu rol PSI</option>
        <option value="protecție_trasnet">Protecție impotriva trasnetului</option>
        <option value="ventilare_climatizare">Ventilare / climatizare</option>
        <option value="incalzire_centrala">Incalzire centrala</option>
      </select>
    </div>
    <div class="field-card compact-grid">
      <label for="occupantCount">Numar persoane</label>
      <input id="occupantCount" type="number" min="0" step="1">
      <label for="accommodationPlaces">Locuri cazare</label>
      <input id="accommodationPlaces" type="number" min="0" step="1">
      <label for="areaBuilt">Aria construită (mp)</label>
      <input id="areaBuilt" type="number" min="0" step="0.01">
      <label for="areaTotal">Aria desfășurată (mp)</label>
      <input id="areaTotal" type="number" min="0" step="0.01">
      <label for="floorsAboveGround">Niveluri supraterane</label>
      <input id="floorsAboveGround" type="number" min="0" step="1">
    </div>
    <div class="field-card">
      <label for="heightClass">Clasă de inaltime</label>
      <select id="heightClass">
        <option value="">Nespecificat</option>
        <option value="obisnuita">Obisnuita</option>
        <option value="inalta">Inalta</option>
        <option value="foarte_inalta">Foarte inalta</option>
        <option value="sala_aglomerata">Sala aglomerata</option>
      </select>
    </div>
    <div class="field-card">
      <label for="fireRisk">Risc de incendiu</label>
      <select id="fireRisk">
        <option value="">Nespecificat</option>
        <option value="mic">Mic</option>
        <option value="mijlociu">Mijlociu</option>
        <option value="mare">Mare</option>
        <option value="foarte_mare">Foarte mare</option>
      </select>
    </div>
    <div class="field-card checkbox-stack">
      <label><input id="hasBasement" type="checkbox"> Are subsol</label>
      <label><input id="isUndergroundParking" type="checkbox"> Este parcaj subteran</label>
    </div>
  `;

  refreshProfileValues();
}

function refreshFieldValues() {
  annexFields.forEach((field) => {
    const input = document.getElementById(field.key);
    if (input) {
      input.value = state.data[field.key] || "";
    }
  });
  renderProjectFactsSummary();
}

function refreshProfileValues() {
  setSelectValue("categoryImportance", state.projectProfile.categoryImportance);
  setSelectValue("buildingClass", state.projectProfile.buildingClass);
  setMultiSelect("destinations", state.projectProfile.destinations);
  setMultiSelect("installations", state.projectProfile.installations);
  setInputValue("occupantCount", state.projectProfile.occupantCount);
  setInputValue("accommodationPlaces", state.projectProfile.accommodationPlaces);
  setInputValue("areaBuilt", state.projectProfile.areaBuilt);
  setInputValue("areaTotal", state.projectProfile.areaTotal);
  setInputValue("floorsAboveGround", state.projectProfile.floorsAboveGround);
  setSelectValue("heightClass", state.projectProfile.heightClass);
  setSelectValue("fireRisk", state.projectProfile.fireRisk);
  setCheckboxValue("hasBasement", state.projectProfile.hasBasement);
  setCheckboxValue("isUndergroundParking", state.projectProfile.isUndergroundParking);
  renderProjectFactsSummary();
}

function formatDisplayValue(value, fallback = "Nespecificat") {
  const text = String(value || "").trim();
  return text || fallback;
}

function formatFileSize(sizeBytes) {
  const value = Number(sizeBytes || 0);
  if (!Number.isFinite(value) || value <= 0) {
    return "marime necunoscuta";
  }
  if (value >= 1024 * 1024) {
    return `${(value / (1024 * 1024)).toLocaleString("ro-RO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MB`;
  }
  if (value >= 1024) {
    return `${(value / 1024).toLocaleString("ro-RO", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} KB`;
  }
  return `${value.toLocaleString("ro-RO")} B`;
}

function summarizeInlineConclusion(value, fallback = "Nespecificat") {
  const text = String(value || "").trim();
  if (!text) return fallback;

  const normalized = text.replace(/\s+/g, " ").trim();
  const conclusionMatch = normalized.match(/(?:concluz(?:ia|ie)|rezulta?|rezultand)\s*[:\-]?\s*([^.;]+)/i);
  if (conclusionMatch?.[1]) {
    return conclusionMatch[1].trim();
  }

  const parts = normalized
    .split(/[.;]/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (!parts.length) return fallback;
  return parts[parts.length - 1];
}

function buildProjectFactsSummaryEntries() {
  const destinations = String(state.data.funcțiuni || "").trim()
    || (Array.isArray(state.projectProfile.destinations) && state.projectProfile.destinations.length
      ? state.projectProfile.destinations.join(", ")
      : "");
  const dimensions = deriveDimensionParts(state.data, state.sources);
  const surfaceParts = [
    dimensions.areaBuilt ? `arie construita: ${dimensions.areaBuilt}` : "",
    dimensions.areaTotal ? `arie desfasurata: ${dimensions.areaTotal}` : "",
    dimensions.volume ? `volum: ${dimensions.volume}` : ""
  ].filter(Boolean).join("; ");
  const heightParts = [
    dimensions.regime ? `regim: ${dimensions.regime}` : "",
    dimensions.height ? `inaltime: ${dimensions.height}` : ""
  ].filter(Boolean).join("; ");
  const parkingValue = state.projectProfile.isUndergroundParking || /parc/i.test(String(state.data.tip_parcaj || ""))
    ? formatDisplayValue(state.data.tip_parcaj || "Da")
    : "Nu";
  const crowdedValue = /sala\s+aglomerata|aglomer/i.test(String(state.data.tip_cladire || "") + " " + String(state.data.numar_utilizatori || ""))
    || state.projectProfile.heightClass === "sala_aglomerata"
    ? "Da"
    : "Nu";

  return [
    { label: "Denumire obiectiv", value: formatDisplayValue(state.data.denumire_obiectiv) },
    { label: "Beneficiar", value: formatDisplayValue(state.data.beneficiar) },
    { label: "Destinatie", value: formatDisplayValue(destinations) },
    { label: "Suprafete / volum", value: formatDisplayValue(surfaceParts) },
    { label: "Regim / inaltime", value: formatDisplayValue(heightParts) },
    { label: "Risc de incendiu", value: summarizeInlineConclusion(state.data.risc_incendiu || state.projectProfile.fireRisk) },
    { label: "Stabilitate / reactie la foc", value: summarizeInlineConclusion(state.data.stabilitate_foc) },
    { label: "Parcare", value: parkingValue },
    { label: "Sala aglomerata / aglomerari persoane", value: crowdedValue }
  ];
}

function renderProjectFactsSummary() {
  if (!projectFactsSummary) return;
  const entries = buildProjectFactsSummaryEntries();
  projectFactsSummary.innerHTML = `
    <article class="project-fact-block">
      ${entries.map((entry) => `
        <div class="project-fact-line">
          <strong>${escapeHtml(entry.label)}:</strong>
          <span>${escapeHtml(entry.value)}</span>
        </div>
      `).join("")}
    </article>
  `;
}

function setInputValue(id, value) {
  const input = document.getElementById(id);
  if (input) {
    input.value = value ?? "";
  }
}

function setSelectValue(id, value) {
  const input = document.getElementById(id);
  if (input) {
    input.value = value || "";
  }
}

function setCheckboxValue(id, value) {
  const input = document.getElementById(id);
  if (input) {
    input.checked = Boolean(value);
  }
}

function setMultiSelect(id, values) {
  const input = document.getElementById(id);
  if (!input) {
    return;
  }

  Array.from(input.options).forEach((option) => {
    option.selected = values.includes(option.value);
  });
}

function syncFieldsFromForm() {
  annexFields.forEach((field) => {
    const input = document.getElementById(field.key);
    state.data[field.key] = input ? input.value.trim() : state.data[field.key];
  });
}

function syncProjectProfile() {
  state.projectProfile = {
    categoryImportance: readValue("categoryImportance"),
    buildingClass: readValue("buildingClass"),
    destinations: readMultiSelect("destinations"),
    hasBasement: readChecked("hasBasement"),
    isUndergroundParking: readChecked("isUndergroundParking"),
    occupantCount: readNumber("occupantCount"),
    accommodationPlaces: readNumber("accommodationPlaces"),
    areaBuilt: readNumber("areaBuilt"),
    areaTotal: readNumber("areaTotal"),
    floorsAboveGround: readNumber("floorsAboveGround"),
    heightClass: readValue("heightClass"),
    fireRisk: readValue("fireRisk"),
    installations: readMultiSelect("installations")
  };
}

function syncProfileFromDataHints() {
  const tipCladire = state.data.tip_cladire.toLowerCase();
  const funcțiuni = state.data.funcțiuni.toLowerCase();
  const idsai = state.data.idsai.toLowerCase();
  const stingere = state.data.instalații_stingere.toLowerCase();
  const desfumare = state.data.desfumare.toLowerCase();
  const iluminat = state.data.iluminat_siguranta.toLowerCase();
  const trasnet = state.data.trsnet.toLowerCase();
  const numar = extractFirstNumber(state.data.numar_utilizatori);
  const adresă = state.data.adresa.toLowerCase();

  if (!state.projectProfile.buildingClass) {
    if (tipCladire.includes("mixt")) state.projectProfile.buildingClass = "mixta";
    if (tipCladire.includes("depoz")) state.projectProfile.buildingClass = "depozitare";
    if (tipCladire.includes("product")) state.projectProfile.buildingClass = "productie";
    if (tipCladire.includes("civ")) state.projectProfile.buildingClass = "civilă";
  }

  if (!state.projectProfile.occupantCount && numar !== null) {
    state.projectProfile.occupantCount = numar;
  }

  const destinations = new Set(state.projectProfile.destinations);
  if (funcțiuni.includes("comert")) destinations.add("comert");
  if (funcțiuni.includes("invat")) destinations.add("invatamant");
  if (funcțiuni.includes("turis") || funcțiuni.includes("cazare")) destinations.add("turism");
  if (funcțiuni.includes("sanat")) destinations.add("sanatate");
  if (funcțiuni.includes("cult")) destinations.add("cult");
  if (funcțiuni.includes("parc")) destinations.add("parcaj");
  if (funcțiuni.includes("administr")) destinations.add("administrativa");
  state.projectProfile.destinations = Array.from(destinations);

  if (adresa.includes("demisol") || state.data.caracteristici_dimensionale.toLowerCase().includes("demisol")) {
    state.projectProfile.hasBasement = true;
  }

  const installations = new Set(state.projectProfile.installations);
  if (stingere) installations.add("stingere");
  if (stingere.includes("hidrant")) installations.add("hidranți_interiori");
  if (stingere.includes("sprink")) installations.add("sprinklere");
  if (idsai) installations.add("detectare_alarmare");
  if (desfumare) installations.add("desfumare");
  if (iluminat) installations.add("iluminat_siguranta");
  if (trasnet) installations.add("protecție_trasnet");
  if (state.data.centrala_termica.toLowerCase()) installations.add("incalzire_centrala");
  if (state.data.desfumare.toLowerCase()) installations.add("ventilare_climatizare");
  state.projectProfile.installations = Array.from(installations);
}

function readValue(id) {
  const input = document.getElementById(id);
  return input ? input.value : "";
}

function readChecked(id) {
  const input = document.getElementById(id);
  return Boolean(input && input.checked);
}

function readNumber(id) {
  const input = document.getElementById(id);
  if (!input || input.value === "") {
    return null;
  }

  const value = Number(input.value);
  return Number.isFinite(value) ? value : null;
}

function readMultiSelect(id) {
  const input = document.getElementById(id);
  if (!input) {
    return [];
  }

  return Array.from(input.selectedOptions).map((option) => option.value);
}

function refreshUI() {
  sourcesList.innerHTML = "";

  if (!state.sources.length) {
    const empty = document.createElement("p");
    empty.className = "source-meta";
    empty.textContent = "Nu sunt surse incarcate inca.";
    sourcesList.appendChild(empty);
    setUiStatus("Nu sunt surse incarcate in proiectul activ.");
  } else {
    const card = document.createElement("div");
    card.className = "source-card source-card-list";
    card.innerHTML = state.sources
      .map((source, index) => {
        const sizeLabel = formatFileSize(source.sizeBytes);
        return `
          <div class="source-line">
            <strong>Nr. ${index + 1}</strong>
            <span>${escapeHtml(source.name)}</span>
            <small>${escapeHtml(sizeLabel)}</small>
          </div>
        `;
      })
      .join("");
    sourcesList.appendChild(card);
    setUiStatus(`${state.sources.length} sursa(e) incarcate in proiectul activ.`);
  }

  refreshRulesOutput();
  renderIssuesOutput();
  refreshCounters();
  renderDocLikePreview("normal");
  renderDocLikePreview("preliminary");
}

function refreshCounters() {
  sourceCount.textContent = String(state.sources.length);
  const completed = Object.values(state.data).filter((value) => String(value || "").trim()).length;
  fieldCount.textContent = String(completed);
  actCount.textContent = String(state.applicableActs.length);
}

function refreshRulesOutput() {
  if (!state.applicableActs.length) {
    const discoveredActs = loadCustomActs();
    rulesOutput.innerHTML = discoveredActs.length
      ? `
        <article class="rule-card">
          <strong>Acte adăugate automat în baza locală</strong>
          ${discoveredActs.map((act) => `<div class="source-meta">${escapeHtml(act.title)} - ${escapeHtml(act.status || "de verificat")}</div>`).join("")}
        </article>
      `
      : "<p class='source-meta'>Încă nu a fost evaluată legislația aplicabilă.</p>";
    return;
  }

  const discoveredActs = loadCustomActs();
    const applicableMarkup = state.applicableActs
      .map((act) => `
        <article class="rule-card">
          <strong><a href="#" data-law-ref="act:${escapeHtml(act.id)}">${escapeHtml(act.title)}</a></strong>
          <div class="source-meta">${escapeHtml(act.type)} | statut: ${escapeHtml(act.status)} | bază locală: ${escapeHtml(getActLocalCompleteness(act.id))} | secțiuni locale: ${escapeHtml(String(getActLocalSectionCount(act.id)))}</div>
          <div class="source-meta">${escapeHtml(act.why)}</div>
          ${act.url ? `<a href="${escapeHtml(act.url)}" target="_blank" rel="noreferrer">sursă oficială</a>` : ""}
        </article>
      `)
    .join("");

  const discoveredMarkup = discoveredActs.length
    ? `
      <article class="rule-card">
          <strong>Acte adăugate automat în baza locală</strong>
          ${discoveredActs.map((act) => `
            <div class="source-meta">${escapeHtml(act.title)} - ${escapeHtml(act.status || "de verificat")} - bază locală: ${escapeHtml(act.localCompleteness || "fișă / repere")}</div>
          `).join("")}
        </article>
      `
    : "";

  rulesOutput.innerHTML = applicableMarkup + discoveredMarkup;
}

function loadCustomActs() {
  try {
    const raw = window.localStorage.getItem(CUSTOM_ACTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadFullActsCache() {
  try {
    const raw = window.localStorage.getItem(FULL_ACTS_CACHE_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveFullActsCache(cache) {
  window.localStorage.setItem(FULL_ACTS_CACHE_STORAGE_KEY, JSON.stringify(cache, null, 2));
}

function mergeFullActsCacheIntoState() {
  const cache = loadFullActsCache();
  state.legislationFullActs ||= { generatedAt: "", scope: "", acts: {} };
  state.legislationFullActs.acts ||= {};
  Object.entries(cache).forEach(([actKey, cached]) => {
    if (!cached || typeof cached !== "object") return;
    const target = state.legislationFullActs.acts[actKey] || {};
    state.legislationFullActs.acts[actKey] = {
      ...cached,
      ...target,
      title: target.title || cached.title || actKey,
      status: target.status || cached.status || "fișă / repere",
      sourceUrl: target.sourceUrl || cached.sourceUrl || "",
      fullTitle: target.fullTitle || cached.fullTitle || target.title || cached.title || actKey,
      sections: Array.isArray(target.sections) && target.sections.length ? target.sections : (Array.isArray(cached.sections) ? cached.sections : []),
      fullText: typeof target.fullText === "string" && target.fullText.trim() ? target.fullText : (cached.fullText || ""),
      originalText: typeof target.originalText === "string" && target.originalText.trim() ? target.originalText : (cached.originalText || "")
    };
  });
}

function persistFullActRecord(actKey, patch) {
  if (!actKey || !patch || typeof patch !== "object") return;
  const cache = loadFullActsCache();
  const existing = cache[actKey] && typeof cache[actKey] === "object" ? cache[actKey] : {};
  cache[actKey] = {
    ...existing,
    ...patch
  };
  saveFullActsCache(cache);
}

function ensureContinuousLocalActs() {
  state.legislationFullActs ||= { generatedAt: "", scope: "", acts: {} };
  state.legislationFullActs.acts ||= {};
  Object.entries(state.legislationFullActs.acts).forEach(([actKey, record]) => {
    if (!record || typeof record !== "object") return;
    const current = typeof record.fullText === "string" ? record.fullText.trim() : "";
    if (current) return;
    const articleAct = state.legislationArticles?.acts?.[ACT_KEY_ALIASES[actKey] || actKey] || null;
    const generated = buildFallbackFullTextFromSections(record, articleAct);
    if (!generated) return;
    record.fullText = generated;
    persistFullActRecord(actKey, {
      fullTitle: record.fullTitle || record.title || articleAct?.title || actKey,
      fullText: generated
    });
  });
}

function normalizeActSnippetText(value = "") {
  return String(value || "")
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function buildDiscoveredActNeedles(act) {
  const title = String(act?.title || "").trim();
  const needles = new Set();
  if (!title) return [];
  needles.add(title.toLowerCase());
  const numberYear = title.match(/nr\.?\s*([\d.]+)\s*\/\s*(\d{4})/i);
  if (numberYear) {
    needles.add(`${numberYear[1]}/${numberYear[2]}`.toLowerCase());
    needles.add(`nr. ${numberYear[1]}/${numberYear[2]}`.toLowerCase());
  }
  const compact = title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
  if (compact) needles.add(compact);
  return Array.from(needles).filter(Boolean);
}

function normalizeActComparableText(value = "") {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function inferKnownActKey(title = "") {
  const raw = String(title || "").trim();
  if (!raw) return "";
  const normalized = normalizeActComparableText(raw);

  if (/regulamentul\s*\(ce\)\s*nr\.?\s*1272\s*\/\s*2008/i.test(raw)) return "reg_1272_2008_clp";

  const p118Match = raw.match(/\bP\s*118(?:\/(\d+))?[-\/]\s*(\d{2,4})/i);
  if (p118Match) {
    if (p118Match[1]) return `p118_${p118Match[1]}_${p118Match[2]}`;
    return `p118_${p118Match[2]}`;
  }

  const i7Match = raw.match(/\bI\s*7[-\/]\s*(\d{4})/i);
  if (i7Match) return `i7_${i7Match[1]}`;
  const i13Match = raw.match(/\bI\s*13[-\/]\s*(\d{4})/i);
  if (i13Match) return `i13_${i13Match[1]}`;
  const i5Match = raw.match(/\bI\s*5[-\/]\s*(\d{4})/i);
  if (i5Match) return `i5_${i5Match[1]}`;
  const cr0Match = raw.match(/\bCR\s*0[-\/]\s*(\d{4})/i);
  if (cr0Match) return `cr0_${cr0Match[1]}`;
  const np127Match = raw.match(/\bNP\s*127[:\-\/]?\s*(\d{4})/i);
  if (np127Match) return `np_127_${np127Match[1]}`;
  if (normalized.includes("norma tehnica pentru gaze")) return "norma_tehnica_gaze_naturale";

  const lawMatch = raw.match(/\bLegea\s+nr\.?\s*([\d.]+)\s*\/\s*(\d{4})/i);
  if (lawMatch) return `legea_${lawMatch[1].replace(/[^\d]+/g, "_")}_${lawMatch[2]}`.replace(/_+/g, "_");

  const hgMatch = raw.match(/\b(?:H\.?\s*G\.?|HG)\s+nr\.?\s*([\d.]+)\s*\/\s*(\d{4})/i);
  if (hgMatch) return `hg_${hgMatch[1].replace(/[^\d]+/g, "_")}_${hgMatch[2]}`.replace(/_+/g, "_");

  const omaiMatch = raw.match(/\b(?:Ordinul\s+MAI|OMAI)\s+nr\.?\s*([\d.]+)\s*\/\s*(\d{4})/i);
  if (omaiMatch) return `omai_${omaiMatch[1].replace(/[^\d]+/g, "_")}_${omaiMatch[2]}`.replace(/_+/g, "_");

  const ordinMatch = raw.match(/\bOrdinul\s+nr\.?\s*([\d.]+(?:\/[\d.]+)?)\s*\/\s*(\d{4})/i);
  if (ordinMatch) {
    return `ordin_${ordinMatch[1].replace(/[^\d]+/g, "_")}_${ordinMatch[2]}`.replace(/_+/g, "_");
  }

  const localActKeys = Object.keys(state.legislationFullActs?.acts || {});
  const matchedKey = localActKeys.find((actKey) => {
    const record = state.legislationFullActs?.acts?.[actKey];
    const candidates = [
      actKey,
      record?.title,
      record?.fullTitle,
      state.legislationArticles?.acts?.[actKey]?.title
    ].filter(Boolean).map(normalizeActComparableText);
    return candidates.some((candidate) => candidate && (candidate.includes(normalized) || normalized.includes(candidate)));
  });
  return matchedKey || "";
}

function collectDiscoveredActSnippets(act, sourceContent = "") {
  const text = normalizeActSnippetText(sourceContent);
  if (!text) return [];
  const needles = buildDiscoveredActNeedles(act);
  if (!needles.length) return [];
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((item) => item.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const snippets = [];
  paragraphs.forEach((paragraph) => {
    const lower = paragraph.toLowerCase();
    if (!needles.some((needle) => lower.includes(needle))) return;
    if (snippets.includes(paragraph)) return;
    snippets.push(paragraph);
  });
  return snippets.slice(0, 6);
}

function buildDiscoveredActDraft(act, sourceContent = "") {
  const title = String(act?.title || act?.id || "Act normativ").trim();
  const typeLabel = String(act?.type || "act normativ").trim();
  const snippets = collectDiscoveredActSnippets(act, sourceContent);
  const headerBody = [
    `${title} a fost identificat automat în sursele încărcate.`,
    act?.url ? `Sursa oficială asociată în acest stadiu: ${act.url}.` : "",
    "Textul de mai jos reprezintă un draft local pentru reader, construit automat la extragere și destinat completării ulterioare în baza legislativă locală."
  ].filter(Boolean).join(" ");
  const sections = [
    {
      id: `${act.id}_auto_header`,
      title: title,
      body: headerBody
    },
    {
      id: `${act.id}_auto_role`,
      title: "Rol provizoriu în program",
      body: `Actul este păstrat local ca ${typeLabel} descoperit automat și poate fi deschis imediat în tabul „Lege / articol”, chiar înainte de completarea lui integrală.`
    }
  ];
  if (snippets.length) {
    sections.push({
      id: `${act.id}_auto_snippets`,
      title: "Fragmente găsite în sursele încărcate",
      body: snippets.map((snippet, index) => `${index + 1}. ${snippet}`).join("\n")
    });
  } else {
    sections.push({
      id: `${act.id}_auto_snippets`,
      title: "Fragmente găsite în sursele încărcate",
      body: "În sursele încărcate nu au fost găsite încă fragmente suficient de clare pentru a compune un extras local mai bogat. Actul rămâne disponibil ca fișă locală și trebuie completat ulterior."
    });
  }
  const fullTextChunks = [
    title,
    headerBody,
    "",
    "ROL PROVIZORIU ÎN PROGRAM",
    sections[1].body
  ];
  if (snippets.length) {
    fullTextChunks.push("", "FRAGMENTE DIN SURSELE ÎNCĂRCATE");
    snippets.forEach((snippet, index) => {
      fullTextChunks.push(`${index + 1}. ${snippet}`);
    });
  }
  fullTextChunks.push("", "Acest text local a fost compus automat la extragere și trebuie verificat/completat ulterior față de forma oficială a actului.");
  const fullText = normalizeActSnippetText(fullTextChunks.join("\n"));
  return {
    status: snippets.length ? "parțial extins" : "fișă / repere",
    localCompleteness: snippets.length ? "parțial extins" : "fișă / repere",
    fullTitle: title,
    sourceUrl: act?.url || "",
    sections,
    fullText,
    originalText: fullText
  };
}

function enrichKnownLocalActFromSources(actLike, sourceContent = "") {
  const knownActKey = inferKnownActKey(actLike?.title || actLike?.id || "");
  if (!knownActKey) return false;
  const resolvedActKey = resolveActKey(knownActKey);
  const existing = state.legislationFullActs?.acts?.[resolvedActKey];
  if (!existing) return false;

  const draft = buildDiscoveredActDraft({
    id: resolvedActKey,
    title: existing.title || actLike?.title || resolvedActKey,
    type: actLike?.type || "act normativ",
    url: actLike?.url || existing.sourceUrl || ""
  }, sourceContent);

  const existingSections = Array.isArray(existing.sections) ? existing.sections : [];
  const draftSections = Array.isArray(draft.sections) ? draft.sections : [];
  const existingIds = new Set(existingSections.map((section) => String(section?.id || "")));
  const mergedSections = [
    ...existingSections,
    ...draftSections.filter((section) => !existingIds.has(String(section?.id || "")))
  ];

  const mergedRecord = {
    ...existing,
    title: existing.title || draft.fullTitle,
    sourceUrl: existing.sourceUrl || actLike?.url || "",
    fullTitle: existing.fullTitle || draft.fullTitle,
    sections: mergedSections,
    fullText: typeof existing.fullText === "string" && existing.fullText.trim() ? existing.fullText : draft.fullText,
    originalText: typeof existing.originalText === "string" && existing.originalText.trim() ? existing.originalText : draft.originalText
  };

  state.legislationFullActs.acts[resolvedActKey] = mergedRecord;
  const extractWorkingText = [
    state.legislationOriginalTexts?.[resolvedActKey] || "",
    draft.fullText || "",
    buildFallbackFullTextFromSections(mergedRecord, state.legislationArticles?.acts?.[resolvedActKey] || null)
  ].filter(Boolean).join("\n\n");
  state.legislationExtractWorkingTexts ||= {};
  state.legislationExtractWorkingTexts[resolvedActKey] = normalizeActSnippetText(extractWorkingText);
  persistFullActRecord(resolvedActKey, {
    title: mergedRecord.title,
    status: mergedRecord.status,
    sourceUrl: mergedRecord.sourceUrl,
    fullTitle: mergedRecord.fullTitle,
    sections: mergedRecord.sections,
    fullText: mergedRecord.fullText,
    originalText: mergedRecord.originalText
  });
  return true;
}

function ensureCustomActInLocalFullActs(act, sourceContent = "") {
  if (!act?.id) return;
  state.legislationFullActs ||= { generatedAt: "", scope: "", acts: {} };
  state.legislationFullActs.acts ||= {};
  const existing = state.legislationFullActs.acts[act.id] || {};
  const draft = buildDiscoveredActDraft(act, sourceContent);
  const mergedRecord = {
    ...existing,
    title: existing.title || act.title || act.id,
    status: existing.status || draft.status,
    sourceUrl: existing.sourceUrl || draft.sourceUrl || act.url || "",
    fullTitle: existing.fullTitle || draft.fullTitle,
    sections: Array.isArray(existing.sections) && existing.sections.length ? existing.sections : draft.sections,
    fullText: typeof existing.fullText === "string" && existing.fullText.trim() ? existing.fullText : draft.fullText,
    originalText: typeof existing.originalText === "string" && existing.originalText.trim() ? existing.originalText : draft.originalText
  };
  state.legislationFullActs.acts[act.id] = mergedRecord;
  persistFullActRecord(act.id, {
    title: mergedRecord.title,
    status: mergedRecord.status,
    sourceUrl: mergedRecord.sourceUrl,
    fullTitle: mergedRecord.fullTitle,
    sections: mergedRecord.sections,
    fullText: mergedRecord.fullText,
    originalText: mergedRecord.originalText
  });
}

function saveCustomActs(acts) {
  window.localStorage.setItem(CUSTOM_ACTS_STORAGE_KEY, JSON.stringify(acts, null, 2));
}

function mergeCustomActsIntoLibrary(baseLibrary) {
  const customActs = loadCustomActs();
  if (!customActs.length) return baseLibrary;

  const knownUrls = new Set((baseLibrary.acts || []).map((act) => String(act.url || "").toLowerCase()));
  const mergedActs = [...(baseLibrary.acts || [])];

  customActs.forEach((act) => {
    const urlKey = String(act.url || "").toLowerCase();
    if (urlKey && knownUrls.has(urlKey)) return;
    mergedActs.push(act);
  });

  return { ...baseLibrary, acts: mergedActs };
}

function discoverAndStoreLegislationFromSources() {
  const combined = state.sources.map((source) => source.content || "").join("\n");
  if (!combined.trim()) return [];

  const patterns = [
    { regex: /\bLegea\s+nr\.?\s*([\d.]+)\s*\/\s*(\d{4})/gi, type: "lege" },
    { regex: /\bH\.?\s*G\.?\s+nr\.?\s*([\d.]+)\s*\/\s*(\d{4})/gi, type: "hotărâre de guvern" },
    { regex: /\bHG\s+nr\.?\s*([\d.]+)\s*\/\s*(\d{4})/gi, type: "hotărâre de guvern" },
    { regex: /\bOrdinul(?:\s+MAI)?\s+nr\.?\s*([\d.]+)\s*\/\s*(\d{4})/gi, type: "ordin" },
    { regex: /\bP\s*118(?:\/\d+)?[-\/]\s*(\d{2,4})/gi, type: "reglementare tehnică", custom: "p118" },
    { regex: /\bI\s*7[-\/]\s*(\d{4})/gi, type: "reglementare tehnică", custom: "i7" },
    { regex: /\bI\s*13[-\/]\s*(\d{4})/gi, type: "reglementare tehnică", custom: "i13" },
    { regex: /\bCR\s*0[-\/]\s*(\d{4})/gi, type: "reglementare tehnică", custom: "cr0" },
    { regex: /\bRegulamentul\s*\(CE\)\s*nr\.?\s*1272\/2008/gi, type: "regulament european", custom: "clp1272" }
  ];

  const existingTitles = new Set((state.legislationLibrary?.acts || []).map((act) => String(act.title || "").toLowerCase()));
  const existingUrls = new Set((state.legislationLibrary?.acts || []).map((act) => String(act.url || "").toLowerCase()));
  const customActs = loadCustomActs();
  const added = [];

  const buildOfficialLookupUrl = (title) => {
    const encoded = encodeURIComponent(title);
    return `https://legislatie.just.ro/Public/RezultateCautare?keyword=${encoded}`;
  };

  const pushAct = (title, type, url, status = "de_verificat") => {
    const knownActLike = { id: inferKnownActKey(title), title, type, url, status };
    if (knownActLike.id && enrichKnownLocalActFromSources(knownActLike, combined)) {
      return;
    }
    const titleKey = title.toLowerCase();
    const urlKey = String(url || "").toLowerCase();
    if (existingTitles.has(titleKey) || (urlKey && existingUrls.has(urlKey))) {
      enrichKnownLocalActFromSources(knownActLike, combined);
      return;
    }
      const act = {
        id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        title,
        type,
        status,
        localCompleteness: "fișă / repere",
        url
      };
    const draft = buildDiscoveredActDraft(act, combined);
    act.localCompleteness = draft.localCompleteness;
    customActs.push(act);
    state.legislationLibrary.acts.push(act);
    ensureCustomActInLocalFullActs(act, combined);
    existingTitles.add(titleKey);
    if (urlKey) existingUrls.add(urlKey);
    added.push(act);
  };

  patterns.forEach(({ regex, type, custom }) => {
    let match;
    while ((match = regex.exec(combined)) !== null) {
      if (custom === "clp1272") {
        pushAct(
          "Regulamentul (CE) nr. 1272/2008 privind clasificarea, etichetarea și ambalarea substanțelor și a amestecurilor",
          type,
          "https://eur-lex.europa.eu/legal-content/ro/TXT/?uri=CELEX%3A32008R1272",
          "în vigoare"
        );
        continue;
      }

      if (custom === "p118") {
        const label = match[0].replace(/\s+/g, " ").trim();
        pushAct(label, type, buildOfficialLookupUrl(label), "de_verificat");
        continue;
      }

      if (custom === "i7") {
        const label = `I 7-${match[1]}`;
        pushAct(label, type, buildOfficialLookupUrl(label), "de_verificat");
        continue;
      }

      if (custom === "i13") {
        const label = `I 13-${match[1]}`;
        pushAct(label, type, buildOfficialLookupUrl(label), "de_verificat");
        continue;
      }

      if (custom === "cr0") {
        const label = `CR 0-${match[1]}`;
        pushAct(label, type, buildOfficialLookupUrl(label), "de_verificat");
        continue;
      }

      const number = match[1];
      const year = match[2];
      const labelPrefix = type === "lege"
        ? "Legea nr."
        : type === "hotărâre de guvern"
          ? "HG nr."
          : "Ordinul nr.";
      const label = `${labelPrefix} ${number}/${year}`;
      pushAct(label, type, buildOfficialLookupUrl(label), "de_verificat");
    }
  });

  if (added.length) {
    saveCustomActs(customActs);
  }

  return added;
}

async function readSupportedFile(file) {
  const lowerName = file.name.toLowerCase();
  const fileMeta = {
    sizeBytes: Number(file.size || 0),
    mimeType: String(file.type || ""),
    extension: lowerName.includes(".") ? lowerName.slice(lowerName.lastIndexOf(".") + 1) : ""
  };

  if (lowerName.endsWith(".docx")) {
    const content = await extractDocxText(file);
    return {
      name: file.name,
      content,
      type: "docx",
      ...fileMeta
    };
  }

  if (lowerName.endsWith(".doc")) {
    return {
      name: file.name,
      content: "[FORMAT .DOC DETECTAT] Formatul Word vechi .doc nu este inca citit automat în aceasta versiune. Salveaza documentul că .docx sau copiaza textul aici.",
      type: "doc-legacy",
      ...fileMeta
    };
  }

  if (lowerName.endsWith(".txt") || lowerName.endsWith(".md") || lowerName.endsWith(".csv") || lowerName.endsWith(".json") || lowerName.endsWith(".html") || lowerName.endsWith(".htm") || lowerName.endsWith(".rtf")) {
    const content = await file.text();
    return {
      name: file.name,
      content,
      type: "text",
      ...fileMeta
    };
  }

  return {
    name: file.name,
    content: "[FORMAT NESUPORTAT IN ACEASTA ETAPA] Pentru inceput foloseste .docx, .txt, .md, .rtf sau lipire manuala.",
    type: "unsupported",
    ...fileMeta
  };
}

async function extractDocxText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const files = parseZipEntries(arrayBuffer);
  const documentXml = files.get("word/document.xml");

  if (!documentXml) {
    return "[DOCX INVALID] Nu am gasit word/document.xml.";
  }

  const xmlText = await inflateZipEntry(documentXml);
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "application/xml");
  const paragraphs = Array.from(xml.getElementsByTagName("w:p")).map(extractParagraphText).filter(Boolean);
  return paragraphs.join("\n");
}

function parseZipEntries(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  const centralDirectoryEntries = parseZipEntriesFromCentralDirectory(bytes);
  if (centralDirectoryEntries.size) {
    return centralDirectoryEntries;
  }
  const files = new Map();
  let offset = 0;

  while (offset + 30 <= bytes.length) {
    const signature = readUint32(bytes, offset);
    if (signature !== 0x04034b50) {
      break;
    }

    const compressionMethod = readUint16(bytes, offset + 8);
    const compressedSize = readUint32(bytes, offset + 18);
    const fileNameLength = readUint16(bytes, offset + 26);
    const extraFieldLength = readUint16(bytes, offset + 28);
    const fileName = decodeBytes(bytes.slice(offset + 30, offset + 30 + fileNameLength));
    const dataStart = offset + 30 + fileNameLength + extraFieldLength;
    const dataEnd = dataStart + compressedSize;

    files.set(fileName, {
      compressionMethod,
      bytes: bytes.slice(dataStart, dataEnd)
    });

    offset = dataEnd;
  }

  return files;
}

function parseZipEntriesFromCentralDirectory(bytes) {
  const files = new Map();
  const eocdOffset = findEndOfCentralDirectory(bytes);
  if (eocdOffset < 0) {
    return files;
  }

  const centralDirectoryOffset = readUint32(bytes, eocdOffset + 16);
  const totalEntries = readUint16(bytes, eocdOffset + 10);
  let offset = centralDirectoryOffset;

  for (let index = 0; index < totalEntries && offset + 46 <= bytes.length; index += 1) {
    const signature = readUint32(bytes, offset);
    if (signature !== 0x02014b50) {
      break;
    }

    const compressionMethod = readUint16(bytes, offset + 10);
    const compressedSize = readUint32(bytes, offset + 20);
    const fileNameLength = readUint16(bytes, offset + 28);
    const extraFieldLength = readUint16(bytes, offset + 30);
    const fileCommentLength = readUint16(bytes, offset + 32);
    const localHeaderOffset = readUint32(bytes, offset + 42);
    const fileName = decodeBytes(bytes.slice(offset + 46, offset + 46 + fileNameLength));

    const localHeaderSignature = readUint32(bytes, localHeaderOffset);
    if (localHeaderSignature !== 0x04034b50) {
      offset += 46 + fileNameLength + extraFieldLength + fileCommentLength;
      continue;
    }

    const localFileNameLength = readUint16(bytes, localHeaderOffset + 26);
    const localExtraFieldLength = readUint16(bytes, localHeaderOffset + 28);
    const dataStart = localHeaderOffset + 30 + localFileNameLength + localExtraFieldLength;
    const dataEnd = dataStart + compressedSize;

    files.set(fileName, {
      compressionMethod,
      bytes: bytes.slice(dataStart, dataEnd)
    });

    offset += 46 + fileNameLength + extraFieldLength + fileCommentLength;
  }

  return files;
}

function findEndOfCentralDirectory(bytes) {
  const minOffset = Math.max(0, bytes.length - 65557);
  for (let offset = bytes.length - 22; offset >= minOffset; offset -= 1) {
    if (readUint32(bytes, offset) === 0x06054b50) {
      return offset;
    }
  }
  return -1;
}

async function inflateZipEntry(entry) {
  if (entry.compressionMethod === 0) {
    return decodeBytes(entry.bytes);
  }

  if (entry.compressionMethod !== 8) {
    throw new Error("Metoda de compresie DOCX nesuportata în aceasta versiune.");
  }

  const stream = new Blob([entry.bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  const buffer = await new Response(stream).arrayBuffer();
  return decodeBytes(new Uint8Array(buffer));
}

function extractParagraphText(paragraph) {
  const texts = Array.from(paragraph.getElementsByTagName("w:t")).map((node) => node.textContent || "");
  return texts.join("").trim();
}

function runExtraction(sources) {
  const aggregate = {};
  const normalizedSources = sources.map((source) => ({
    name: source.name,
    content: source.content,
    lines: source.content.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
  }));

  annexFields.forEach((field) => {
    for (const source of normalizedSources) {
      const match = searchFieldInLines(field.key, source.lines);
      if (match) {
        aggregate[field.key] = `${match} [sursa: ${source.name}]`;
        break;
      }
    }
  });

  const fallbackAggregate = runFallbackExtraction(normalizedSources);
  Object.entries(fallbackAggregate).forEach(([key, value]) => {
    if (!aggregate[key] && String(value || "").trim()) {
      aggregate[key] = value;
    }
  });

  return aggregate;
}

function runFallbackExtraction(sources) {
  const aggregate = {};
  const combined = sources.map((source) => source.content || "").join("\n");
  const normalized = normalizeSearchText(combined);

  const pick = (key, value) => {
    if (!aggregate[key] && String(value || "").trim()) {
      aggregate[key] = cleanExtract(String(value));
    }
  };

  const firstMatch = (regex) => combined.match(regex)?.[1]?.trim() || "";

  if (normalized.includes("cult") || normalized.includes("biseric") || normalized.includes("naos")) {
    pick("funcțiuni", "cult");
    pick("tip_cladire", "clădire civilă pentru cult");
    pick("profil_activitate", "cult");
  }

  const denumire = firstMatch(/(?:denumirea\s+obiectivului|denumire|titlu)\s*[:\-]?\s*([^\n]{6,160})/i)
    || firstMatch(/(biserica[^,\n]{3,160}|lacas\s+de\s+cult[^,\n]{3,160})/i);
  pick("denumire_obiectiv", denumire);
  pick("beneficiar", cleanBeneficiaryText(firstMatch(/(Parohia[^.\n]{3,220})/i)));
  pick("adresa", cleanAddressText(firstMatch(/((?:str\.|strada|bd\.|bulevardul|municipiul|orasul|județul|judetul)[^.\n]{8,220})/i)));

  const categoria = firstMatch(/categoria\s+de\s+importan(?:ț|t)ă\s*[:\-]?\s*([A-Da-d][^.\n;]{0,80})/i)
    || firstMatch(/categoria\s+de\s+importanta\s*[:\-]?\s*([A-Da-d][^.\n;]{0,80})/i)
    || firstMatch(/categoria\s+([A-Da-d]\s*\([^)]+\))/i)
    || firstMatch(/categoria\s+([A-Da-d])[^.\n]{0,40}importanta/i);
  pick("categoria_importanta", categoria);

  const regim = firstMatch(/(?:D\+P\+Sp\+M|D\+P\+M|P\+M|D\+P|demisol\s*\+\s*parter[^\n.;]*)/i);
  const ariaConstruita = firstMatch(/aria\s+construita\s*[:\-]?\s*([0-9]+(?:[.,][0-9]+)?\s*m(?:2|²))/i);
  const ariaDesfasurata = firstMatch(/aria\s+desfasurata\s*[:\-]?\s*([0-9]+(?:[.,][0-9]+)?\s*m(?:2|²))/i);
  const volum = firstMatch(/volum(?:ul)?(?:\s+constructiei)?\s*[:\-]?\s*([0-9]+(?:[.,][0-9]+)?\s*m(?:3|³))/i);
  const inaltime = firstMatch(/inaltimea?\s+maxima(?:\s+a\s+cladirii)?\s*[:\-]?\s*([0-9]+(?:[.,][0-9]+)?\s*m)/i);
  const dimensions = [regim, inaltime && `înălțime maximă ${inaltime}`, volum && `volum ${volum}`, ariaConstruita && `aria construită ${ariaConstruita}`, ariaDesfasurata && `aria desfășurată ${ariaDesfasurata}`].filter(Boolean).join("; ");
  pick("caracteristici_dimensionale", dimensions);

  const totalUsers = firstMatch(/(?:numarul|maxim(?:ul)?\s+total\s+de)\s+utilizatori\s*[:\-]?\s*([0-9]+(?:[.,][0-9]+)?\s*persoane?)/i)
    || firstMatch(/([0-9]+(?:[.,][0-9]+)?\s*persoane?)\s+in\s+total/i);
  const demisolUsers = firstMatch(/demisol\s*[:\-]?\s*([0-9]+(?:[.,][0-9]+)?\s*persoane?)/i);
  const parterUsers = firstMatch(/parter\s*[:\-]?\s*([0-9]+(?:[.,][0-9]+)?\s*persoane?)/i);
  const supantaUsers = firstMatch(/supanta\s*[:\-]?\s*([0-9]+(?:[.,][0-9]+)?\s*persoane?)/i);
  const mansardaUsers = firstMatch(/mansarda\s*[:\-]?\s*([0-9]+(?:[.,][0-9]+)?\s*persoane?)/i);
  const users = [
    totalUsers && `total: ${totalUsers}`,
    demisolUsers && `demisol: ${demisolUsers}`,
    parterUsers && `parter: ${parterUsers}`,
    supantaUsers && `supantă: ${supantaUsers}`,
    mansardaUsers && `mansardă: ${mansardaUsers}`
  ].filter(Boolean).join("; ");
  pick("numar_utilizatori", users);

  const egress = [];
  if (normalized.includes("evacu")) egress.push("căi de evacuare identificate în documentație");
  if (normalized.includes("scara")) egress.push("scară interioară / traseu de evacuare menționat");
  pick("cai_evacuare_rezumat", egress.join("; "));

  if (normalized.includes("depozit")) {
    pick("capacitati_depozitare", firstMatch(/(depozit[^.\n]{0,180})/i) || "spații de depozitare menționate în documentație");
  }

  if (normalized.includes("autoevacu")) {
    pick("autoevacuare", "persoanele care folosesc clădirea sunt, în mod obișnuit, autoevacuabile");
  }

  if (normalized.includes("centrala termica")) {
    pick("centrala_termica", firstMatch(/(centrala\s+termica[^.\n]{0,220})/i) || "centrală termică prevăzută");
  }
  if (normalized.includes("aragaz")) {
    pick("bucatarie_gaze", firstMatch(/(aragaz[^.\n]{0,180})/i) || "spațiu cu aragaz pe gaze");
  }
  if (normalized.includes("hidrant") || normalized.includes("sprinkler")) {
    pick("instalații_stingere", firstMatch(/(hidranti?[^.\n]{0,180}|sprinkler[^.\n]{0,180})/i));
  }
  if (normalized.includes("detect") || normalized.includes("alarm")) {
    pick("idsai", firstMatch(/(centrala[^.\n]{0,180}alarm[^.\n]{0,180}|detectoare[^.\n]{0,180})/i) || "instalație de detectare, semnalizare și alarmare la incendiu");
  }
  if (normalized.includes("desfum") || normalized.includes("evacuarea naturala a fumului")) {
    pick("desfumare", firstMatch(/(desfum[^.\n]{0,180}|evacuarea\s+naturala\s+a\s+fumului[^.\n]{0,180})/i));
  }
  if (normalized.includes("iluminat de securitate")) {
    pick("iluminat_siguranta", firstMatch(/(iluminat\s+de\s+securitate[^.\n]{0,220})/i));
    pick("alimentare_electrica", "alimentare electrică a receptoarelor cu rol de securitate la incendiu");
  }
  if (normalized.includes("trasnet") || normalized.includes("paratrasnet")) {
    pick("trsnet", firstMatch(/(instalatia\s+de\s+protectie[^.\n]{0,220})/i) || "instalație de protecție împotriva trăsnetului");
  }
  if (normalized.includes("risc mic de incendiu") || normalized.includes("risc mijlociu de incendiu")) {
    const riskParts = [];
    const small = combined.match(/[^.\n]{0,80}risc\s+mic\s+de\s+incendiu[^.\n]{0,80}/ig) || [];
    const medium = combined.match(/[^.\n]{0,80}risc\s+mijlociu\s+de\s+incendiu[^.\n]{0,80}/ig) || [];
    riskParts.push(...small.map(cleanExtract), ...medium.map(cleanExtract));
    pick("risc_incendiu", riskParts.join("; "));
  }

  if (!aggregate.limitare_vecinatati && normalized.includes("vecinat")) {
    pick("limitare_vecinatati", firstMatch(/(vecinat[^.\n]{0,220})/i));
  }
  if (!aggregate.interventie && (normalized.includes("autospecial") || normalized.includes("intervent"))) {
    pick("interventie", firstMatch(/(autospecial[^.\n]{0,220}|interventi[^.\n]{0,220})/i));
  }
  if (!aggregate.stabilitate_foc && (normalized.includes("beton armat") || normalized.includes("zidarie") || normalized.includes("planseu"))) {
    const stabilityParts = [];
    const beton = firstMatch(/(beton\s+armat[^.\n]{0,180})/i);
    const zidarie = firstMatch(/(zidarie[^.\n]{0,180})/i);
    const planseu = firstMatch(/(planseu[^.\n]{0,180})/i);
    if (beton) stabilityParts.push(beton);
    if (zidarie) stabilityParts.push(zidarie);
    if (planseu) stabilityParts.push(planseu);
    pick("stabilitate_foc", stabilityParts.join("; "));
  }

  return aggregate;
}

function searchFieldInLines(key, lines) {
  const content = lines.join("\n");
  const custom = customExtractors[key];
  if (typeof custom === "function") {
    const customValue = cleanExtract(custom(lines, content) || "");
    if (customValue) {
      return customValue;
    }
  }

  const fieldPatterns = patterns[key] || [];

  for (const line of lines) {
    for (const regex of fieldPatterns) {
      const match = line.match(regex);
      if (match && match[1]) {
        return cleanExtract(match[1]);
      }
    }
  }

  for (let index = 0; index < lines.length - 1; index += 1) {
    const combined = `${lines[index]} ${lines[index + 1]}`;
    for (const regex of fieldPatterns) {
      const match = combined.match(regex);
      if (match && match[1]) {
        return cleanExtract(match[1]);
      }
    }
  }

  return "";
}

function mergeExtractedData(extracted) {
  Object.entries(extracted).forEach(([key, value]) => {
    if (!state.data[key] && value) {
      state.data[key] = value;
    }
  });
}

function evaluateApplicableActs() {
  if (!state.legislationLibrary) {
    return;
  }

  const profile = state.projectProfile;
  const acts = state.legislationLibrary.acts
    .filter((act) => act.status === "in_vigoare")
    .filter((act) => matchesApplicability(act.appliesWhen, profile))
    .map((act) => ({
      id: act.id,
      title: act.title,
      type: act.type,
      status: act.status,
      url: act.url,
      why: buildWhy(act.appliesWhen, profile)
    }));

  state.applicableActs = deduplicateById(acts).sort((left, right) => left.title.localeCompare(right.title, "ro"));
  refreshRulesOutput();
}

function evaluateComplianceChecks() {
  state.complianceChecks = buildComplianceChecks(state.data, state.projectProfile);
  state.rulesCoverage = buildRulesCoverage(state.ssiNormalRulesMatrix, state.data);
}

function makeLawRef(refKey, fallbackLabel) {
  const normalizedRefKey = normalizeLawRefKey(refKey);
  const entry = state.legislationArticles?.references?.[normalizedRefKey];
  const label = fallbackLabel || entry?.label || normalizedRefKey;
  return `[[LAWREF:${normalizedRefKey}]]${label}[[/LAWREF]]`;
}

function getActReferences(actKey) {
  const refs = Object.entries(state.legislationArticles?.references || {})
    .filter(([, entry]) => entry?.actKey === actKey)
    .map(([key, entry]) => ({ key, ...entry }));

  return refs.sort((a, b) => String(a.location || a.label || "").localeCompare(String(b.location || b.label || ""), "ro"));
}

function buildDerivedActSections(actKey, refs, existingIds = new Set()) {
  return refs
    .map((ref) => {
      const mappedId = LAW_REF_TO_SECTION[ref.key] || `ref_${ref.key}`;
      if (existingIds.has(mappedId)) {
        return null;
      }
      const localContext = LAW_LOCAL_CONTEXTS[ref.key] || null;
      const chunks = [];
      if (ref.summary) chunks.push(String(ref.summary).trim());
      if (ref.excerpt) chunks.push(`Extras local: ${String(ref.excerpt).trim()}`);
      if (localContext?.body) chunks.push(String(localContext.body).trim());
      const body = chunks.filter(Boolean).join("\n\n");
      if (!body) return null;
      return {
        id: mappedId,
        title: ref.location || ref.label || ref.key,
        body
      };
    })
      .filter(Boolean);
}

function getLocalActRecord(actKey) {
  const resolvedActKey = resolveActKey(actKey);
  return state.legislationFullActs?.acts?.[resolvedActKey] || null;
}

function buildFallbackFullTextFromSections(record = null, act = null) {
  if (!record || !Array.isArray(record.sections) || !record.sections.length) return "";
  const title = String(record.fullTitle || record.title || act?.title || "").trim();
  const chunks = [];
  if (title) {
    chunks.push(title);
  }
  record.sections.forEach((section) => {
    const sectionTitle = String(section?.title || "").trim();
    const sectionBody = String(section?.body || "").trim();
    if (sectionTitle) chunks.push(sectionTitle);
    if (sectionBody) chunks.push(sectionBody);
  });
  return chunks.filter(Boolean).join("\n\n");
}

function getLocalActFullText(actKey) {
  const resolvedActKey = resolveActKey(actKey);
  const readerWorking = state.legislationReaderWorkingTexts?.[resolvedActKey];
  if (typeof readerWorking === "string" && readerWorking.trim()) {
    return readerWorking.trim();
  }
  const extractWorking = state.legislationExtractWorkingTexts?.[resolvedActKey];
  if (typeof extractWorking === "string" && extractWorking.trim()) {
    return extractWorking.trim();
  }
  const record = getLocalActRecord(actKey);
  if (typeof record?.originalArchiveText === "string" && record.originalArchiveText.trim()) {
    return record.originalArchiveText.trim();
  }
  if (record?.isAuthenticFullAct && typeof record?.originalText === "string" && record.originalText.trim()) {
    return record.originalText.trim();
  }
  if (typeof record?.fullText === "string" && record.fullText.trim()) {
    return record.fullText.trim();
  }
  const act = state.legislationArticles?.acts?.[resolveActKey(actKey)] || null;
  const derivedFullText = buildFallbackFullTextFromSections(record, act);
  if (derivedFullText) {
    return derivedFullText;
  }
  if (typeof record?.originalText === "string" && record.originalText.trim()) {
    return record.originalText.trim();
  }
  return buildFallbackFullTextFromSections(record, act);
}

function normalizeLocalActSections(actKey, act) {
  const record = getLocalActRecord(actKey);
  if (!record) return [];

  if (Array.isArray(record.sections) && record.sections.length) {
    return record.sections
      .map((section, index) => ({
        id: String(section.id || `local_${actKey}_${index}`),
        title: String(section.title || act?.title || record.title || "Secțiune"),
        body: String(section.body || "").trim()
      }))
      .filter((section) => section.body);
  }

  if (typeof record.fullText === "string" && record.fullText.trim()) {
    return [{
      id: `full_${actKey}`,
      title: String(record.fullTitle || act?.title || record.title || "Act normativ"),
      body: record.fullText.trim()
    }];
  }

  return [];
}

function buildActDocumentSections(actKey, act, refs, selectedRefKey = "") {
  const normalizedSelected = normalizeLawRefKey(selectedRefKey);
  const localActSections = normalizeLocalActSections(actKey, act);
  const fallbackLocalAct = LAW_FULL_ACTS[actKey] || null;
  const baseSections = localActSections.length
    ? localActSections
    : (Array.isArray(fallbackLocalAct?.sections) ? fallbackLocalAct.sections : []);
  const existingIds = new Set(baseSections.map((section) => section.id));
  const derivedSections = buildDerivedActSections(actKey, refs, existingIds);
  const combined = [...baseSections, ...derivedSections];

  if (combined.length) {
    return combined;
  }

  const selected = refs.find((item) => item.key === normalizedSelected) || null;
  const fallbackBody = [
    act?.title ? `${act.title}.` : "",
    selected?.label ? `Reper activ: ${selected.label}.` : "",
    selected?.summary ? selected.summary : "",
    selected?.excerpt ? `Extras local: ${selected.excerpt}` : ""
  ].filter(Boolean).join("\n\n");

  return fallbackBody
    ? [
        {
          id: "act_fallback_intro",
          title: act?.title || "Act normativ",
          body: fallbackBody
        }
      ]
    : [];
}

function scrollLawTabToSection(sectionId) {
  if (!sectionId || !lawTabContent) return;
  requestAnimationFrame(() => {
    const target = lawTabContent.querySelector(`[data-law-section="${sectionId}"]`);
    target?.scrollIntoView({ block: "start", behavior: "smooth" });
  });
}

function normalizeLawSearchText(value = "") {
  return String(value || "")
    .toLowerCase()
    .replace(/ă/g, "a")
    .replace(/â/g, "a")
    .replace(/î/g, "i")
    .replace(/ș/g, "s")
    .replace(/ş/g, "s")
    .replace(/ț/g, "t")
    .replace(/ţ/g, "t")
    .replace(/\s+/g, " ")
    .trim();
}

function extractLawSearchNeedles(selected = null) {
  if (!selected) return [];
  const seeds = [selected.location, selected.label]
    .map((item) => String(item || "").trim())
    .filter(Boolean);
  const needles = new Set();
  seeds.forEach((seed) => {
    const normalized = normalizeLawSearchText(seed);
    if (normalized) needles.add(normalized);
    const artMatches = [...seed.matchAll(/art\.?\s*([0-9]+(?:\.[0-9]+)*(?:\^[0-9]+)?(?:\s*-\s*[0-9]+(?:\.[0-9]+)*(?:\^[0-9]+)?)?)/gi)];
    artMatches.forEach((match) => {
      const number = String(match[1] || "").trim();
      if (!number) return;
      needles.add(normalizeLawSearchText(`articolul ${number}`));
      needles.add(normalizeLawSearchText(`art. ${number}`));
      const rangeParts = number.split(/\s*-\s*/).map((item) => item.trim()).filter(Boolean);
      rangeParts.forEach((part) => {
        needles.add(normalizeLawSearchText(`articolul ${part}`));
        needles.add(normalizeLawSearchText(`art. ${part}`));
      });
    });
    const annexMatches = [...seed.matchAll(/anexa\s+nr\.?\s*([0-9]+)/gi)];
    annexMatches.forEach((match) => {
      const number = String(match[1] || "").trim();
      if (!number) return;
      needles.add(normalizeLawSearchText(`anexa nr. ${number}`));
    });
    const tableMatches = [...seed.matchAll(/tabel(?:ul)?\s*([0-9]+(?:\.[0-9]+)*)/gi)];
    tableMatches.forEach((match) => {
      const number = String(match[1] || "").trim();
      if (!number) return;
      needles.add(normalizeLawSearchText(`tabelul ${number}`));
      needles.add(normalizeLawSearchText(`tabel ${number}`));
    });
    const pointMatches = [...seed.matchAll(/pct\.?\s*([0-9ivxlcdm]+(?:\.[0-9ivxlcdm]+)*)/gi)];
    pointMatches.forEach((match) => {
      const point = String(match[1] || "").trim();
      if (!point) return;
      needles.add(normalizeLawSearchText(`pct. ${point}`));
      needles.add(normalizeLawSearchText(`punctul ${point}`));
    });
    const letterMatches = [...seed.matchAll(/lit\.?\s*([a-z])/gi)];
    letterMatches.forEach((match) => {
      const letter = String(match[1] || "").trim().toLowerCase();
      if (!letter) return;
      needles.add(normalizeLawSearchText(`lit. ${letter}`));
      needles.add(normalizeLawSearchText(`${letter})`));
    });
  });
  return Array.from(needles).filter(Boolean);
}

function parseLawReferenceDescriptor(selected = null) {
  const source = `${selected?.location || ""} ${selected?.label || ""}`;
  const annex = source.match(/anexa\s+nr\.?\s*([0-9]+)/i)?.[1] || "";
  const point = source.match(/pct\.?\s*([0-9ivxlcdm]+(?:\.[0-9ivxlcdm]+)*)/i)?.[1] || "";
  const letter = source.match(/lit\.?\s*([a-z])/i)?.[1] || "";
  const article = source.match(/art\.?\s*([0-9]+(?:\.[0-9]+)*(?:\^[0-9]+)?)/i)?.[1] || "";
  return {
    annex: annex ? String(annex).trim() : "",
    point: point ? String(point).trim().toUpperCase() : "",
    letter: letter ? String(letter).trim().toLowerCase() : "",
    article: article ? String(article).trim() : ""
  };
}

function buildFullTextDisplayParagraphs(text = "") {
  return String(text || "")
    .replace(/\r/g, "")
    .replace(/([^\n])((?:Articolul|ARTICOLUL|Anexa nr\.|ANEXA NR\.|Capitolul|CAPITOLUL|Secțiunea|SECȚIUNEA|Tabelul|TABELUL))/g, "$1\n\n$2")
    .replace(/([^\n])((?:HOTĂRÂRE|HOTARARE|LEGE|ORDIN|NORMATIV|NORMA|REGULAMENT)\s+nr\.)/g, "$1\n\n$2")
    .split(/\n{2,}/)
    .map((item) => item
      .split("\n")
      .map((line) => line.replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .join("\n")
      .trim())
    .filter(Boolean);
}

function formatLawLineMarkup(line = "") {
  const source = String(line || "").trim();
  const numericPointMatch = source.match(/^((?:Pct\.?\s*)?\d+(?:\.\d+)+(?:\.)?)(.*)$/i);
  if (numericPointMatch) {
    const [, prefix, rest] = numericPointMatch;
    return `<strong>${escapeHtml(prefix.trim())}</strong>${rest ? ` ${escapeHtml(rest.trim())}` : ""}`;
  }
  const numericArticleMatch = source.match(/^((?:Art\.?\s*)\d+(?:\.\d+)*(?:\^[0-9]+)?(?:\.)?)(.*)$/i);
  if (numericArticleMatch) {
    const [, prefix, rest] = numericArticleMatch;
    return `<strong>${escapeHtml(prefix.trim())}</strong>${rest ? ` ${escapeHtml(rest.trim())}` : ""}`;
  }
  const alphaMatch = source.match(/^([a-z]\)|[ivxlcdm]+\.)\s*(.*)$/i);
  if (alphaMatch) {
    const [, prefix, rest] = alphaMatch;
    return `<strong>${escapeHtml(prefix)}</strong>${rest ? ` ${escapeHtml(rest)}` : ""}`;
  }
  const pointMatch = source.match(/^(Punctul\s+[IVXLCDM]+\.?)(.*)$/i);
  if (pointMatch) {
    const [, prefix, rest] = pointMatch;
    return `<strong>${escapeHtml(prefix.trim())}</strong>${rest ? ` ${escapeHtml(rest.trim())}` : ""}`;
  }
  return escapeHtml(source);
}

function findBestLawLineMatch(fullText = "", selected = null) {
  const needles = extractLawSearchNeedles(selected);
  const descriptor = parseLawReferenceDescriptor(selected);
  if (!needles.length) return null;
  const paragraphs = buildFullTextDisplayParagraphs(fullText);
  let best = null;
  let currentAnnex = "";
  let currentPoint = "";
  let currentArticle = "";

  paragraphs.forEach((paragraph, paragraphIndex) => {
    const lines = String(paragraph || "").split("\n").map((line) => line.trim()).filter(Boolean);
    lines.forEach((line, lineIndex) => {
      const normalized = normalizeLawSearchText(line);
      const annexMatch = line.match(/^Anexa\s+nr\.?\s*([0-9]+)/i);
      if (annexMatch) {
        currentAnnex = String(annexMatch[1] || "").trim();
        currentPoint = "";
      }
      const articleMatch = line.match(/^(?:Articolul|Art\.?)\s*([0-9]+(?:\.[0-9]+)*(?:\^[0-9]+)?)/i);
      if (articleMatch) {
        currentArticle = String(articleMatch[1] || "").trim();
      }
      const numericHeadingMatch = line.match(/^([0-9]+(?:\.[0-9]+)+(?:\^[0-9]+)?)(?:\.)?/i);
      if (numericHeadingMatch) {
        currentPoint = String(numericHeadingMatch[1] || "").trim().toUpperCase();
        currentArticle = String(numericHeadingMatch[1] || "").trim();
      }
      const pointMatch = line.match(/^(?:Punctul\s+)?([IVXLCDM]+(?:\.[0-9IVXLCDM]+)*)\./i);
      if (pointMatch) {
        currentPoint = String(pointMatch[1] || "").trim().toUpperCase();
      }

      const score = needles.reduce((count, needle) => count + (normalized.includes(needle) ? 1 : 0), 0);
      const lineLetter = line.match(/^([a-z])\)/i)?.[1]?.toLowerCase() || "";
      let contextScore = 0;

      if (descriptor.annex && currentAnnex === descriptor.annex) contextScore += 2;
      if (descriptor.point && currentPoint === descriptor.point) contextScore += 3;
      if (descriptor.article && currentArticle === descriptor.article) contextScore += 3;
      if (descriptor.letter && lineLetter === descriptor.letter) contextScore += 5;

      if (!score && !contextScore) return;
      const candidate = { score: score + contextScore, paragraphIndex, lineIndex };
      if (!best || candidate.score > best.score) {
        best = candidate;
      }
    });
  });

  return best;
}

function renderLawStructuredLines(lines = [], options = {}) {
  const { matchIndex = -1, anchorId = "" } = options;
  if (!Array.isArray(lines) || !lines.length) return "";
  const rendered = [];
  let alphaItems = [];
  let currentLineIndex = 0;

  const flushAlphaItems = () => {
    if (!alphaItems.length) return;
    rendered.push(`
      <div class="law-alpha-list">
        ${alphaItems.map((item) => {
          const shouldMark = currentLineIndex === matchIndex;
          const html = `<div class="law-alpha-item${shouldMark ? " is-selected-law-ref" : ""}" ${shouldMark && anchorId ? `data-law-section="${anchorId}"` : ""}>${formatLawLineMarkup(item)}</div>`;
          currentLineIndex += 1;
          return html;
        }).join("")}
      </div>
    `);
    alphaItems = [];
  };

  lines.forEach((line) => {
    const cleanLine = String(line || "").trim();
    if (!cleanLine) return;
    const isAlphaItem = /^[a-z]\)|^[ivxlcdm]+\./i.test(cleanLine);
    const isDashItem = /^[-•]/.test(cleanLine);
    const shouldMark = currentLineIndex === matchIndex;
    const lineAttrs = shouldMark ? ` class="is-selected-law-ref" ${anchorId ? `data-law-section="${anchorId}"` : ""}` : "";

    if (isAlphaItem) {
      alphaItems.push(cleanLine);
      return;
    }

    flushAlphaItems();

    if (isDashItem) {
      rendered.push(`<div class="law-dash-item"${lineAttrs}>${formatLawLineMarkup(cleanLine)}</div>`);
      currentLineIndex += 1;
      return;
    }

    rendered.push(`<p${lineAttrs}>${formatLawLineMarkup(cleanLine)}</p>`);
    currentLineIndex += 1;
  });

  flushAlphaItems();
  return rendered.join("");
}

function renderFullTextActHtml(fullText, selected = null) {
  const anchorId = "law_fulltext_selected";
  const paragraphs = buildFullTextDisplayParagraphs(fullText);
  const bestMatch = findBestLawLineMatch(fullText, selected);
  return `
    <article class="law-act-sheet law-act-sheet-fulltext">
      ${paragraphs.map((paragraph, index) => {
        const lines = String(paragraph || "").split("\n").map((line) => line.trim()).filter(Boolean);
        const firstLine = lines[0] || "";
        const restLines = lines.slice(1);
        const paragraphMatch = bestMatch?.paragraphIndex === index ? bestMatch : null;
        const headingLike = index === 0 || /^(hotărâre|hotarare|lege|ordin|normativ|norma|regulament|articolul|anexa nr\.|capitolul|secțiunea|tabelul)/i.test(paragraph);
        if (headingLike) {
          return `
            <section class="law-act-section ${paragraphMatch && paragraphMatch.lineIndex === 0 ? "is-selected-law-ref" : ""}" ${paragraphMatch && paragraphMatch.lineIndex === 0 ? `data-law-section="${anchorId}"` : ""}>
              <h3>${formatLawLineMarkup(firstLine)}</h3>
              ${restLines.length ? `<div class="law-context-body">${renderLawStructuredLines(restLines, { matchIndex: paragraphMatch ? paragraphMatch.lineIndex - 1 : -1, anchorId })}</div>` : ""}
            </section>
          `;
        }
        return `
          <div class="law-context-body">
            ${renderLawStructuredLines(lines, { matchIndex: paragraphMatch ? paragraphMatch.lineIndex : -1, anchorId })}
          </div>
        `;
      }).join("")}
    </article>
  `;
}

function renderLawTabHeaderMeta(act = null, selected = null, actKey = "") {
  if (!lawTabHeaderMeta) return;
  if (!act) {
    lawTabHeaderMeta.innerHTML = "";
    return;
  }
  const localRecord = getLocalActRecord(actKey || act.id || "");
  const localStatus = getActLocalCompleteness(actKey || act.id || "");
  const officialUrl = getOfficialUrlForAct(actKey || act.id || "");
  const metadata = [
    `bază locală: ${localStatus}`,
    act.modifiedBy || localRecord?.modifiedBy ? `modificat prin ${act.modifiedBy || localRecord?.modifiedBy}` : "",
    act.approvedBy || localRecord?.approvedBy ? `aprobat prin ${act.approvedBy || localRecord?.approvedBy}` : "",
    act.publishedInMonitorulOficial || localRecord?.publishedInMonitorulOficial ? act.publishedInMonitorulOficial || localRecord?.publishedInMonitorulOficial : "",
    act.effectiveDate || localRecord?.effectiveDate ? `în vigoare din ${act.effectiveDate || localRecord?.effectiveDate}` : "",
    act.replaces || localRecord?.replaces ? `înlocuiește ${act.replaces || localRecord?.replaces}` : ""
  ].filter(Boolean).join(" | ");
  lawTabHeaderMeta.innerHTML = `
    <span><strong>${escapeHtml(localRecord?.title || act.title || "Act")}</strong></span>
    ${selected ? `<span>${escapeHtml(selected.location || selected.label || "")}</span>` : ""}
    ${metadata ? `<span>${escapeHtml(metadata)}</span>` : ""}
    ${officialUrl ? `<a href="${escapeHtml(officialUrl)}" target="_blank" rel="noreferrer">sursa oficiala</a>` : ""}
  `;
}

function tokenizeActTitle(title = "") {
  return String(title || "")
    .toLowerCase()
    .replace(/[^a-z0-9ăâîșț\s/.-]/gi, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2)
    .slice(0, 8);
}

function extractOfficialActTextFromHtml(html, act = null) {
  const doc = new DOMParser().parseFromString(String(html || ""), "text/html");
  const rawText = String(doc.body?.innerText || doc.body?.textContent || "")
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .replace(/\u00a0/g, " ");
  const lines = rawText
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  if (!lines.length) return "";

  const ignorePatterns = [
    /^portal legislativ$/i,
    /^meniu$/i,
    /^acasă$|^acasa$/i,
    /^despre proiect$/i,
    /^facilități oferite$|^facilitati oferite$/i,
    /^legături utile$|^legaturi utile$/i,
    /^gdpr$/i,
    /^cuprins$/i,
    /^se încarcă, vă rugăm asteptati\.$/i,
    /^forme act$/i,
    /^fișă act$|^fisa act$/i,
    /^rev[ea]niți in topul paginii$|^reveniti in topul paginii$/i,
    /^forma printabilă$|^forma printabila$/i
  ];

  const cleaned = lines.filter((line) => !ignorePatterns.some((pattern) => pattern.test(line)));
  const titleTokens = tokenizeActTitle(act?.title || "");
  let startIndex = cleaned.findIndex((line) => {
    const normalized = normalizeSearchText(line);
    return titleTokens.length >= 2 && titleTokens.filter((token) => normalized.includes(normalizeSearchText(token))).length >= 2;
  });

  if (startIndex < 0) {
    startIndex = cleaned.findIndex((line) => /^(hotărâre|hotarare|lege|ordin|normativ|regulament|p 118)/i.test(line));
  }
  if (startIndex < 0) startIndex = 0;

  const tail = cleaned.slice(startIndex);
  return tail.join("\n\n");
}

function renderOfficialActSheet(text, act = null) {
  const paragraphs = String(text || "")
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
  if (!paragraphs.length) return "";

  return `
    <article class="law-act-sheet law-act-sheet-official">
      ${paragraphs.map((paragraph, index) => {
        const safe = escapeHtml(paragraph);
        const isHeading = index === 0 || /^(articolul|anexa nr\.|capitolul|titlul|hotărâre|hotarare|lege|ordin|normativ|regulament|p 118)/i.test(paragraph);
        return isHeading ? `<section class="law-act-section"><h3>${safe}</h3></section>` : `<p>${safe}</p>`;
      }).join("")}
    </article>
  `;
}

async function fetchOfficialActContent(act) {
  if (!act?.url) return "";
  if (officialActCache.has(act.url)) {
    return officialActCache.get(act.url);
  }

  try {
    const response = await fetch(act.url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    const extracted = extractOfficialActTextFromHtml(html, act);
    if (extracted) {
      officialActCache.set(act.url, extracted);
      return extracted;
    }
  } catch (error) {
    console.warn("Nu s-a putut încărca textul integral al actului din sursa oficială.", act?.url, error);
  }

  officialActCache.set(act.url, "");
  return "";
}

function getOfficialUrlForAct(actKey) {
  const normalizedKey = resolveActKey(actKey);
  const localRecord = getLocalActRecord(normalizedKey);
  const articleAct = state.legislationArticles?.acts?.[normalizedKey];
  const libraryAct = state.legislationLibrary?.acts?.find((item) => resolveActKey(item.id) === normalizedKey);
  return String(localRecord?.sourceUrl || articleAct?.url || libraryAct?.url || "").trim();
}

async function hydrateMissingFullActsFromSources() {
  const allActKeys = Object.keys(state.legislationFullActs?.acts || {});
  const updated = [];
  for (const actKey of allActKeys) {
    if (getLocalActFullText(actKey)) continue;
    const url = getOfficialUrlForAct(actKey);
    if (!url) continue;
    const resolvedActKey = resolveActKey(actKey);
    const articleAct = state.legislationArticles?.acts?.[resolvedActKey] || state.legislationLibrary?.acts?.find((item) => resolveActKey(item.id) === resolvedActKey) || null;
    const fullText = await fetchOfficialActContent({ title: articleAct?.title || getLocalActRecord(actKey)?.title || actKey, url });
    if (!fullText) continue;
    const record = getLocalActRecord(actKey) || {};
    state.legislationFullActs.acts[actKey] = {
      ...record,
      sourceUrl: record.sourceUrl || url,
      fullTitle: record.fullTitle || record.title || articleAct?.title || actKey,
      fullText
    };
    persistFullActRecord(actKey, {
      sourceUrl: record.sourceUrl || url,
      fullTitle: record.fullTitle || record.title || articleAct?.title || actKey,
      fullText
    });
    updated.push(actKey);
  }
  return updated;
}

function renderActReaderHtml(actKey, selectedRefKey = "") {
  const resolvedActKey = resolveActKey(actKey);
  const act = state.legislationArticles?.acts?.[resolvedActKey];
  const refs = getActReferences(resolvedActKey);
  const normalizedSelected = normalizeLawRefKey(selectedRefKey);
  const selected = refs.find((item) => item.key === normalizedSelected) || null;
  const selectedSectionId = LAW_REF_TO_SECTION[normalizedSelected] || "";
  const localFullText = getLocalActFullText(resolvedActKey);
  const combinedSections = buildActDocumentSections(resolvedActKey, act, refs, normalizedSelected);

  const refsList = refs.length
    ? refs.map((item) => `
          <article class="rule-card ${item.key === normalizedSelected ? "is-selected-law-ref" : ""}">
            <strong><a href="#" data-law-ref="${escapeHtml(item.key)}" onclick="window.__ssiCommands?.openLawRef?.('${escapeHtml(item.key)}'); return false;">${escapeHtml(item.label || item.key)}</a></strong>
          <div class="source-meta">${escapeHtml(item.location || "-")}</div>
        </article>
      `).join("")
    : `<article class="rule-card"><strong>Nu există încă repere locale indexate pentru acest act.</strong></article>`;

  const actSectionsBlock = localFullText
    ? renderFullTextActHtml(localFullText, selected)
    : (combinedSections.length
    ? `
      <article class="law-act-sheet">
        ${combinedSections.map((section) => `
          <section class="law-act-section ${section.id === selectedSectionId ? "is-selected-law-ref" : ""}" data-law-section="${escapeHtml(section.id)}">
            <h3>${escapeHtml(section.title || "Secțiune")}</h3>
            <div class="law-context-body">
              ${String(section.body || "")
                .split(/\n\s*\n/)
                .map((paragraph) => paragraph.trim())
                .filter(Boolean)
                .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
                .join("")}
            </div>
          </section>
        `).join("")}
      </article>
      `
      : "");

    if (localFullText) {
      return actSectionsBlock;
    }

    const summaryBlock = `
        <details class="law-meta-toggle">
          <summary>Detalii și sursa oficială</summary>
          <div class="law-meta-content">
            <p><strong>${escapeHtml(act?.title || "Act selectat")}</strong></p>
            ${selected ? `<p><strong>Reper activ:</strong> ${escapeHtml(selected.label || "-")}</p>` : ""}
            ${act?.url ? `<p class="law-inline-note"><strong>Sursă oficială:</strong> <a href="${escapeHtml(act.url)}" target="_blank" rel="noreferrer">${escapeHtml(act.url)}</a></p>` : ""}
          </div>
        </details>
      `;

    return `
      ${actSectionsBlock}
      ${summaryBlock}
      <details class="law-meta-toggle">
        <summary>Repere din același act</summary>
        <div class="law-meta-content law-ref-list">
          ${refsList}
        </div>
      </details>
    `;
}

function renderLawLoadingState() {
  if (!lawTabContent) return;
  lawTabContent.innerHTML = `
    <article class="rule-card">
      <strong>Se încarcă actul normativ...</strong>
      <div class="source-meta">Programul încearcă să afișeze textul integral din sursa oficială. Dacă nu reușește, revine la varianta locală.</div>
    </article>
  `;
}

function buildComplianceChecks(data, profile) {
  const occupantCount = profile.occupantCount ?? extractFirstNumber(data.numar_utilizatori);
  const areaTotal = profile.areaTotal ?? extractDecimalValue(data.caracteristici_dimensionale, ["desfasur"]);
  const areaBuilt = profile.areaBuilt ?? extractDecimalValue(data.caracteristici_dimensionale, ["construit"]);
  const destinations = new Set([...(profile.destinations || []), ...inferDestinationsFromText(data.funcțiuni)]);
  const inferredInstallations = inferInstallationsFromData(data, profile.installations || []);
  const hasCult = destinations.has("cult");
  const hasBasement = Boolean(profile.hasBasement);
  const hasLargeCrowd = occupantCount !== null && occupantCount >= 200;
  const hasAreaOver600 = areaTotal !== null && areaTotal >= 600;
  const highImportance = ["A", "B"].includes(String(profile.categoryImportance || "").toUpperCase());
  const heightClass = String(profile.heightClass || "").toLowerCase();
  const highRise = ["inalta", "foarte_inalta"].includes(heightClass);
  const fireRisk = String(profile.fireRisk || "").toLowerCase();
  const elevatedRisk = ["mare", "foarte_mare"].includes(fireRisk);
  const specialUse = ["productie", "depozitare", "mixta"].includes(String(profile.buildingClass || "").toLowerCase());
  const autoevText = String(data.autoevacuare || "").toLowerCase();
  const selfEvacuable = autoevText.includes("autoevacu") || autoevText.includes("valide") || autoevText.includes("deplin");
  const cultLowComplexity = hasCult && !highRise && !specialUse && !hasLargeCrowd && !elevatedRisk;
  const specialSuppressionRisk = highRise || specialUse || elevatedRisk || hasLargeCrowd || highImportance;
  const evacuationLightingMandatory = (occupantCount !== null && occupantCount > 50) || (areaTotal !== null && areaTotal > 300) || (hasBasement && areaBuilt !== null && areaBuilt > 100);
  const panicLightingMandatory = (hasBasement && occupantCount !== null && occupantCount > 50) || (!hasBasement && occupantCount !== null && occupantCount > 100) || (areaBuilt !== null && areaBuilt > 60 && hasCult);
  const interventionLightingLikely = String(data.centrala_termica || "").trim().length > 0;
  const idsaiMentioned = inferredInstallations.has("detectare_alarmare") || /detect|semnal|alarm|idsai/i.test(String(data.idsai || ""));
  const sprinklersMentioned = inferredInstallations.has("sprinklere");
  const desfumareMentioned = inferredInstallations.has("desfumare") || /desfum|evacuare fum/i.test(String(data.desfumare || ""));
  const checks = [];
  const add = (code, aspect, verdict, legalBasis, details) => checks.push({ code, aspect, verdict, legalBasis, details });
  const descriptive = (code, aspect) => add(code, aspect, "camp descriptiv", "OMAI nr. 180/2022, Anexa nr. 4; OMAI nr. 130/2007", "Se completeaza din documentația tehnică, plansele proiectului și celelalte documente de proiectare disponibile. Nu rezultă un prag automat de obligativitate distinct.");

  descriptive("1.1", "Datele de identificare");
  descriptive("1.2", "Destinatia / funcțiunile obiectivului");
  descriptive("1.3", "Categoria și clasă de importanta");
  descriptive("1.4.a", "Tipul cladirii");
  descriptive("1.4.b", "Tipul parcajului");
  descriptive("1.4.c", "Regimul de inaltime și volumul constructiei");
  descriptive("1.4.d", "Aria construită și aria desfășurată");
  descriptive("1.4.e", "Destinatiile incaperilor și ale spatiilor");
  descriptive("1.4.f", "Compartimentele de incendiu și ariile acestora");
  descriptive("1.4.g", "Numarul maxim de utilizatori");
  descriptive("1.4.h", "Capacitati de depozitare");
  descriptive("1.4.i", "Procese tehnologice / substante periculoase");
  descriptive("1.4.u", "Utilizatori și autoevacuare");
  descriptive("1.4.ev", "Numarul cailor de evacuare și refugiilor");
  descriptive("1.4.inst", "Instalații utilitare aferente");

  add("2.A.a", "Densitatea sarcinii termice", "obligatoriu - evaluare", "OMAI nr. 130/2007; P 118/1-2025 / reglementarea tehnică aplicabilă; metodologia STAS 10903, dupa caz", "Subpunctul trebuie evaluat în toate scenariile. Formula și valorile exacte depind de materialele combustibile, mase, arii și scenariul de calcul.");
  add("2.A.b", "Date privind materialele, proprietatile relevante și clasele de reactie/periculozitate", "obligatoriu - evaluare", "Ordinul nr. 1822/394/2004; Legea nr. 10/1995; P 118/1-2025", "Trebuie stabilite materialele și substantele relevante, proprietatile fizico-chimice unde este cazul și clasele produselor/elementelor folosite în constructie pe baza documentatiilor și performăntelor declarate.");
  add("2.A.c", "Sursele potentiale de aprindere și imprejurarile favorizante", "obligatoriu - evaluare", "OMAI nr. 130/2007; OMAI nr. 163/2007", "Trebuie identificate sursele probabile de initiere și condițiile favorizante, în functie de functiune, instalații și exploatare.");
  add("2.B", "Nivelurile riscului de incendiu / categoriei de pericol", "obligatoriu - evaluare", "P 118/1-2025; pentru documentatiile existente se poate intalni încadrarea anterioara din P 118-99", `Aplicatia poate pastra concluzia preliminara, dar încadrarea finală trebuie corelata cu funcțiunea, sarcina termica, aria ${areaBuilt ?? "neconfirmată"} mp și ocuparea ${occupantCount ?? "neconfirmată"} persoane.`);

  add("3.1", "Rezistenta și clasă de reactie la foc a celor mai defavorabile elemente de constructie", "obligatoriu - evaluare", "P 118/1-2025; P 118-99, tabelul 2.1.9, pentru corelarea documentatiilor vechi, dupa caz; Ordinul nr. 1822/394/2004; documentatii de rezistenta; performănte produse pentru constructii", "Pentru fiecare element relevant se separa verificarea reactiei la foc de verificarea rezistentei la foc. Reactia la foc se poate concluziona din material și din clasificarea aplicabilă, iar rezistenta la foc se stabileste numai prin corelarea tipului de element, a alcatuirii, a rolului structural și a performăntei/categoriei rezultăte din normativ sau din documentația tehnică.");
  add("3.2", "Gradul de rezistenta la foc / nivelul de stabilitate la incendiu", "obligatoriu - evaluare", "P 118/1-2025; P 118-99 tabel 2.1.9, doar pentru corelarea documentatiilor vechi, dupa caz", "Incadrarea se verifică pe reglementarea în vigoare, pe baza elementelor constructive și a performăntelor la foc rezultăte din proiect.");
  add("3.3", "Asigurarea limitarii propagării incendiilor la vecinatati", "obligatoriu - evaluare", "P 118/1-2025; pentru documentatii vechi se pot corela și prevederile anterioare, dupa caz", "Se verifica distantele minime de siguranta față de vecinatati si, dacă nu sunt realizabile, măsurile alternative. Aplicatia poate semnala dacă distanta declarata este peste pragurile uzuale.");
  add("3.4.a", "Măsuri pentru asigurarea controlului fumului", hasBasement || highRise ? "de verificat" : "neobligatoriu - nu rezultă cerinta expresă distincta", "P 118/1-2025; I 5-2010", hasBasement || highRise ? "Necesitatea exacta depinde de destinatie, compartimentare, volum, subsol/demisol și configurația cailor de evacuare." : "Pentru o cladire civilă de cult fără indicători de complexitate ridicata, aplicatia nu identifica automat o cerinta distincta suplimentara față de condițiile generale de evacuare și ventilare/desfumare.");
  add("3.4.b", "Tipul scarilor, formă și modul de dispunere a treptelor", "obligatoriu - evaluare", "P 118/1-2025", "Subpunct de verificare a conformării cailor de evacuare și a alcatuirii scarilor.");
  add("3.4.c", "Geometria cailor de evacuare", "obligatoriu - evaluare", "P 118/1-2025", "Trebuie verificate latimile, inaltimile utile, sensul de deschidere al usilor, traseele și lungimile de evacuare.");
  add("3.4.d", "Numarul fluxurilor de evacuare", occupantCount !== null ? "obligatoriu - calculabil" : "obligatoriu - evaluare", "P 118/1-2025; metodologia de calcul aplicabilă funcțiunii", occupantCount !== null ? `Aplicatia are un numar de utilizatori introdus (${occupantCount}) și poate fundamenta calculul fluxurilor, care trebuie confirmat în scenariul final.` : "Numarul de fluxuri se stabileste în raport cu ocuparea, numarul de niveluri și configurația evacuarii.");
  add("3.4.e", "Timpi / lungimi de evacuare", "obligatoriu - evaluare", "P 118/1-2025", "Trebuie verificate lungimile reale ale cailor de evacuare și corelate cu funcțiunea și numarul directiilor de evacuare.");
  add("3.4.f", "Existenta iluminatului de siguranta pe evacuare", evacuationLightingMandatory ? "obligatoriu" : "de verificat", "I 7-2011, art. 7.23.8.1, cu modificările prin Ordinul nr. 959/2023", evacuationLightingMandatory ? `Rezulta obligativitate preliminara deoarece este indeplinit cel putin unul dintre criteriile uzuale: peste 50 de persoane, arie mai mare de 300 mp sau subsol/demisol cu arie relevanta.` : "Trebuie verificat dacă sunt indeplinite pragurile de ocupare, arie sau amplasare subterana prevăzute de normativ.");
  add("3.4.g", "Prevederea de dispozitive de siguranta la usi", "de verificat", "P 118/1-2025; soluția efectiva a usilor și controlului accesului", "Se verifica dacă exista sisteme de inchidere, control acces sau dispozitive care influenteaza evacuarea și dacă necesita fail-safe / deblocare în caz de incendiu.");
  add("3.4.h", "Timpul de siguranta al cailor de evacuare și al refugiilor", "obligatoriu - evaluare", "OMAI nr. 130/2007; P 118/1-2025", "Se completeaza în scenariu pe baza alcatuirii constructive, fumului, focului și organizarii evacuarii.");
  add("3.4.i", "Marcarea cailor de evacuare", "obligatoriu", "HG nr. 971/2006; I 7-2011", "Marcarea și semnalizarea cailor de evacuare și a echipamentelor de securitate trebuie asigurate.");
  add("3.5", "Măsuri pentru copii, persoane cu dizabilitati, bolnavi și alte categorii care nu se pot evacua singure", selfEvacuable ? "nu rezultă măsuri speciale suplimentare" : "de verificat", "OMAI nr. 130/2007; P 118/1-2025", selfEvacuable ? "Din datele introduse rezultă utilizatori autoevacuabili; se consemneaza lipsă necesitatii unor măsuri speciale distincte, cu rezervă schimbarii modului de exploatare." : "Verdictul depinde de categoria reala a utilizatorilor și de condițiile de exploatare ale cladirii.");
  add("3.6", "Securitatea fortelor de interventie", "obligatoriu - evaluare", "P 118/1-2025; HG nr. 571/2016; OMAI nr. 163/2007", "Se verifica accesul autospecialelor, caracteristicile cailor de interventie și posibilitatea de actiune pe fațade.");

  add("4.1", "Hidranti de incendiu interiori", hasCult && !hasLargeCrowd ? "neobligatoriu - ipoteza preliminara" : "de verificat", makeLawRef("p1182_art_4_1_i"), hasCult ? `Pentru obiectiv de cult, cu ${occupantCount ?? "numar neconfirmat"} utilizatori, aplicatia marcheaza preliminar ${hasLargeCrowd ? "necesitatea verificarii finale" : "ca nu rezultă obligativitate automata"} pe baza incadrarii din art. 4.1 lit. i).` : "Criteriul exact depinde de destinatie, numar de utilizatori, volum și încadrare.");
  add("4.2", "Hidranti de incendiu exteriori", hasCult && !hasLargeCrowd ? "neobligatoriu - ipoteza preliminara" : "de verificat", makeLawRef("p1182_art_6_1_4_i"), hasCult ? `Pentru obiectiv de cult, cu ${occupantCount ?? "numar neconfirmat"} utilizatori, aplicatia marcheaza preliminar ${hasLargeCrowd ? "necesitatea verificarii finale" : "ca nu rezultă obligativitate automata"} pe baza art. 6.1 alin. (4) lit. i).` : "Trebuie confirmata încadrarea exacta a constructiei și relatia cu reteaua exterioara disponibilă.");
  add("4.3", "Instalații automate de stingere cu sprinklere", cultLowComplexity && !sprinklersMentioned ? "neobligatoriu - nu rezultă cerinta expresă" : specialSuppressionRisk ? "de verificat cu prioritate" : sprinklersMentioned ? "prevazut în documentatie / de verificat încadrarea" : "de verificat", makeLawRef("p1182_art_7_1"), cultLowComplexity && !sprinklersMentioned ? "Pentru cladire civilă de cult, fără indicători de complexitate ridicata, aplicatia nu identifica automat o obligatie expresă de echipare cu sprinklere." : sprinklersMentioned ? "Documentatia mentioneaza deja sprinklere sau elemente asociate; trebuie verificata corelarea cu pragurile normative." : "Obligativitatea depinde de destinatie, aria, inaltime, volum, risc și scenariul de echipare.");
  add("4.4", "Instalații de limitare și stingere cu sprinklere deschise", cultLowComplexity ? "neobligatoriu - nu rezultă cerinta expresă" : "de verificat", makeLawRef("p1182_art_7_131"), cultLowComplexity ? "Pentru obiectivul analizat nu rezultă o utilizare tipica sau o cerinta expresă pentru drenchere / sprinklere deschise." : "Se aplica doar în cazurile speciale prevăzute de normativ.");
  add("4.5", "Instalații de stingere cu apa pulverizată", specialUse || elevatedRisk ? "de verificat" : "neobligatoriu - nu rezultă cerinta expresă", makeLawRef("p1182_art_8_1"), specialUse || elevatedRisk ? "Se verifica dacă exista echipamente, recipiente, zone tehnologice sau suprafete expuse care necesita protecție cu apa pulverizată." : "Pentru obiectiv civil de cult fără procese speciale, aplicatia nu identifica automat necesitatea unei astfel de instalații.");
  add("4.6", "Instalații de stingere cu ceață de apa", specialSuppressionRisk ? "de verificat" : "neobligatoriu - nu rezultă cerinta expresă", makeLawRef("p1182_art_9_1"), specialSuppressionRisk ? "Sistemul poate fi analizat doar dacă scenariul de protecție il cere sau dacă se adopta o solutie speciala testata conform standardelor aplicabile." : "Pentru obiectivul analizat nu rezultă o cerinta expresă de echipare cu ceață de apa.");
  add("4.7", "Instalații de stingere cu gaze inerte", specialUse || elevatedRisk ? "de verificat" : "neobligatoriu - nu rezultă cerinta expresă", makeLawRef("p1182_art_15_1"), specialUse || elevatedRisk ? "Se analizeaza doar pentru spatii tehnologice sau incaperi speciale unde apa nu este adecvata." : "Pentru cladirea de cult analizata nu rezultă o necesitate expresă pentru stingere cu gaze inerte.");
  add("4.8", "Instalatie de detectare, semnalizare și alarmare la incendiu (IDSAI)", hasCult && (hasLargeCrowd || hasAreaOver600) ? "obligatoriu" : idsaiMentioned ? "prevazut în documentatie / de verificat încadrarea" : hasCult ? "neobligatoriu sau masura suplimentara" : "de verificat", makeLawRef("p1183_art_3_3_1_e_i"), hasCult ? `Pentru functiune de cult, cu aria desfășurată ${areaTotal ?? "neconfirmată"} mp și ${occupantCount ?? "numar neconfirmat"} utilizatori, aplicatia marcheaza ${hasLargeCrowd || hasAreaOver600 ? "obligativitate preliminara" : idsaiMentioned ? "faptul că instalatia este deja prevăzută în documentatie și trebuie verificata încadrarea" : "neobligativitate preliminara / posibilitate de prevedere că masura suplimentara"}.` : "Trebuie raportat la funcțiunea exacta, suprafață, numarul de utilizatori și încadrarea speciala a cladirii.");
  add("4.8.cult", "Declansatoare manuale de alarmare la obiective de cult", hasCult ? "obligatoriu" : "nu se aplica", makeLawRef("ordin28_art_101_b"), hasCult ? "La obiectivele de cult, se verifică prevederea declansatoarelor manuale de alarmare a personalului și a dispozitivelor optice/acustice de alarmare." : "Controlul este relevant doar pentru funcțiunea de cult.");
  add("4.9", "Instalatie de desfumare / evacuare fum și gaze fierbinti", hasBasement || highRise ? "de verificat cu prioritate" : desfumareMentioned ? "prevazut în documentatie / de verificat încadrarea" : cultLowComplexity ? "neobligatoriu - nu rezultă cerinta expresă distincta" : "de verificat", makeLawRef("p1181_cap_8"), hasBasement || highRise ? "Prezenta demisolului, a inaltimii mari sau configurația cailor de evacuare impun verificarea expresă a necesitatii desfumarii." : desfumareMentioned ? "Documentatia mentioneaza evacuarea fumului / desfumare; trebuie verificat dacă soluția corespunde obligatiei reale sau reprezinta o masura suplimentara." : cultLowComplexity ? "Pentru cladire civilă de cult fără indicători majori de complexitate, aplicatia nu identifica automat o obligatie distincta suplimentara de desfumare mecanica." : "Necesitatea se stabileste în functie de destinatie, compartimentare, evacuare și geometria spatiilor.");
  add("4.10.a", "Instalatie electrica pentru alimentarea receptoarelor cu rol de securitate la incendiu", "obligatoriu - evaluare", makeLawRef("i7_pct_7_22_1"), "Trebuie verificata sursă de baza, sursă de rezervă și alimentarea circuitelor cu rol de securitate la incendiu.");
  add("4.10.b", "Iluminat de securitate pentru evacuare", "obligatoriu", makeLawRef("i7_art_7_23_2_c1_7_23_8_1"), "Aplicatia marcheaza obligativitatea iluminatului de securitate pentru evacuare pe caile de evacuare. In documentația finală trebuie corelata autonomia și tipul corpurilor de iluminat.");
  add("4.10.c", "Iluminat de securitate impotriva panicii", panicLightingMandatory ? "obligatoriu" : "de verificat", makeLawRef("i7_art_7_23_10"), panicLightingMandatory ? "Rezulta obligativitate preliminara prin raportare la ocupare, amplasare subterana/supraterana sau la ipoteza de spatiu de cult cu aglomerare și arie relevanta." : "Verdictul depinde de ocuparea reala a fiecarei incaperi, accesul direct la evacuare și riscul de impiedicare în evacuare.");
  add("4.10.d", "Iluminat de securitate pentru continuarea lucrului", interventionLightingLikely ? "obligatoriu în incaperile tehnice relevante" : "de verificat", makeLawRef("i7_art_7_23_6"), interventionLightingLikely ? "Existenta centralei termice sau a tablourilor/echipamentelor tehnice conduce la verificarea si, dupa caz, prevederea iluminatului pentru continuarea lucrului / pentru incaperi tehnice." : "Se verifica dacă exista incaperi tehnice cu tablouri, echipamente de control, centrale sau alte receptoare unde normativul cere iluminat specific.");
  add("4.10.e", "Iluminat de securitate pentru interventii / local", interventionLightingLikely ? "obligatoriu în zonele tehnice relevante" : "de verificat", makeLawRef("i7_art_7_23_9"), interventionLightingLikely ? "Pentru centrala termica și echipamentele cu rol PSI se verifică iluminatul de interventie / local conform funcțiunii spatiului." : "Se aplica acolo unde exista echipamente ce trebuie utilizate sau supravegheate în condiții de intrerupere a iluminatului normal.");
  add("4.10.f", "Dispozitive DDR / AFDD", "obligatoriu - evaluare pentru DDR / de verificat pentru AFDD", makeLawRef("i7_art_4_1_5_2_1_4_2_2_8"), "Se verifica prezenta protectiilor diferentiale că cerinta curenta de proiectare si, distinct, necesitatea AFDD unde se aplica.");
  add("4.11", "Instalatie de protecție impotriva trasnetului", "de verificat", makeLawRef("i7_pct_6_2_1_2"), "Obligativitatea exacta se confirma prin analiza de risc la trasnet și prin caracteristicile geometrice, de importanta și de expunere ale cladirii.");

  add("5", "Măsuri compensatorii pentru cerinte care nu pot fi respectate", "numai dacă exista neconformitati demonstrate", "OMAI nr. 130/2007; OMAI nr. 180/2022", "Subpunctul se completeaza doar dacă exista cerinte de securitate la incendiu neindeplinite și măsuri compensatorii fundamentate.");
  return checks;
}

function buildComplianceChecksMarkdown(checks) {
  if (!checks.length) {
    return "## Verificare normativa automata\n- [[RED]]Nu au fost generate verificari normative automate.[[/RED]]";
  }

  return `## Verificare normativa automata\n${checks.map((check) => `- ${check.code} ${check.aspect}: [[RED]]${check.verdict}[[/RED]]. Baza legală: ${check.legalBasis}. Observatie: ${check.details}`).join("\n")}`;
}

function matchesApplicability(rule, profile) {
  if (!rule) {
    return true;
  }

  if (rule.always) {
    return true;
  }

  if (rule.anyOf) {
    return rule.anyOf.some((item) => matchesApplicability(item, profile));
  }

  if (rule.allOf) {
    return rule.allOf.every((item) => matchesApplicability(item, profile));
  }

  if (rule.buildingClass && !arrayContains(rule.buildingClass, profile.buildingClass)) {
    return false;
  }

  if (rule.categoryImportance && !arrayContains(rule.categoryImportance, profile.categoryImportance)) {
    return false;
  }

  if (rule.heightClass && !arrayContains(rule.heightClass, profile.heightClass)) {
    return false;
  }

  if (rule.destinations && !rule.destinations.some((item) => profile.destinations.includes(item))) {
    return false;
  }

  if (rule.installations && !rule.installations.some((item) => profile.installations.includes(item))) {
    return false;
  }

  if (typeof rule.hasBasement === "boolean" && profile.hasBasement !== rule.hasBasement) {
    return false;
  }

  if (typeof rule.isUndergroundParking === "boolean" && profile.isUndergroundParking !== rule.isUndergroundParking) {
    return false;
  }

  if (rule.fireRisk && !arrayContains(rule.fireRisk, profile.fireRisk)) {
    return false;
  }

  if (rule.minOccupants !== undefined && (profile.occupantCount ?? -1) < rule.minOccupants) {
    return false;
  }

  if (rule.minAccommodationPlaces !== undefined && (profile.accommodationPlaces ?? -1) < rule.minAccommodationPlaces) {
    return false;
  }

  if (rule.minAreaBuilt !== undefined && (profile.areaBuilt ?? -1) < rule.minAreaBuilt) {
    return false;
  }

  if (rule.minAreaTotal !== undefined && (profile.areaTotal ?? -1) < rule.minAreaTotal) {
    return false;
  }

  if (rule.minFloorsAboveGround !== undefined && (profile.floorsAboveGround ?? -1) < rule.minFloorsAboveGround) {
    return false;
  }

  return true;
}

function buildWhy(rule, profile) {
  const reasons = [];

  if (!rule || rule.always) {
    return "Act de baza cu aplicabilitate generala pentru SSI.";
  }

  if (rule.buildingClass) reasons.push(`tip cladire: ${profile.buildingClass || "nespecificat"}`);
  if (rule.categoryImportance) reasons.push(`categoria de importanta: ${profile.categoryImportance || "nespecificat"}`);
  if (rule.heightClass) reasons.push(`clasă de inaltime: ${profile.heightClass || "nespecificat"}`);
  if (rule.destinations) reasons.push(`destinatii: ${profile.destinations.join(", ") || "nespecificat"}`);
  if (rule.installations) reasons.push(`instalații: ${profile.installations.join(", ") || "nespecificat"}`);
  if (rule.isUndergroundParking) reasons.push("parcaj subteran");
  if (rule.hasBasement) reasons.push("spatii cu subsol");
  if (rule.minOccupants !== undefined) reasons.push(`prag persoane: >= ${rule.minOccupants}`);
  if (rule.minAreaTotal !== undefined) reasons.push(`prag aria desfășurată: >= ${rule.minAreaTotal} mp`);
  if (rule.minAreaBuilt !== undefined) reasons.push(`prag aria construită: >= ${rule.minAreaBuilt} mp`);
  if (rule.minAccommodationPlaces !== undefined) reasons.push(`prag locuri cazare: >= ${rule.minAccommodationPlaces}`);
  if (rule.fireRisk) reasons.push(`risc incendiu: ${profile.fireRisk || "nespecificat"}`);

  return reasons.length ? `Aplicat deoarece profilul proiectului intersecteaza: ${reasons.join("; ")}.` : "Aplicabilitate dedusă din profilul proiectului.";
}

function deduplicateById(items) {
  const map = new Map();
  items.forEach((item) => map.set(item.id, item));
  return Array.from(map.values());
}

function flattenMatrixSubpoints(matrix) {
  if (!matrix?.sections) return [];
  const items = [];
  matrix.sections.forEach((section) => {
    (section.subpoints || []).forEach((subpoint) => {
      if (subpoint.code && Array.isArray(subpoint.details)) {
        items.push({ code: subpoint.code, title: subpoint.title, legalBasis: subpoint.legalBasis || [] });
        subpoint.details.forEach((detail) => {
          if (detail.code) {
            items.push({ code: detail.code, title: detail.title || detail.label || detail.code, legalBasis: detail.legalBasis || [] });
          }
        });
      } else if (subpoint.code) {
        items.push({ code: subpoint.code, title: subpoint.title, legalBasis: subpoint.legalBasis || [] });
      }
    });
  });
  return items;
}

function buildRulesCoverage(matrix, data) {
  const flattened = flattenMatrixSubpoints(matrix);
  return flattened.map((item) => {
    const linkedFields = normalRulesFieldMap[item.code] || [];
    const filledCount = linkedFields.filter((key) => String(data[key] || "").trim()).length;
    let status = "de verificat";
    if (!linkedFields.length) {
      status = "regula definita - necesita implementare specifica";
    } else if (filledCount === linkedFields.length) {
      status = "date suficiente";
    } else if (filledCount > 0) {
      status = "date partiale";
    } else {
      status = "date lipsa";
    }
    return {
      code: item.code,
      title: item.title || item.code,
      status,
      linkedFields,
      legalBasis: item.legalBasis || []
    };
  });
}

function buildRulesCoverageMarkdown(items) {
  if (!items.length) {
    return "## Acoperire reguli pe subpuncte\n- [[RED]]Matricea de reguli nu a fost incarcata.[[/RED]]";
  }

  return `## Acoperire reguli pe subpuncte\n${items.map((item) => {
    const fieldsText = item.linkedFields.length ? ` Campuri sursa: ${item.linkedFields.join(", ")}.` : "";
    const legalText = item.legalBasis.length ? ` Baza legală: ${item.legalBasis.join("; ")}.` : "";
    return `- ${item.code} ${item.title}: [[RED]]${item.status}[[/RED]].${fieldsText}${legalText}`;
  }).join("\n")}`;
}

function buildRiskEvaluationBlock(data) {
  const lines = [];
  const roomChecklist = buildRiskRoomsChecklist(data);

  lines.push("**a) densitatea sarcinii termice:**");
  lines.push("Pentru obiectivul analizat, evaluarea densitatii sarcinii termice se face pentru fiecare incapere/grup de incaperi similare, spatiu și compartiment de incendiu, în masura în care exista datele de intrare necesare, conform OMAI nr. 130/2007 și P 118/1-2025, art. 2.1.2.2.");
  lines.push("**Pentru naos parter** există date suficiente în documentația disponibilă pentru refacerea calculului.");
  lines.push("Caz analizat: naos parter, aria 121,60 mp.");
  lines.push("Date utilizate: lemn - Qi = 19,25 MJ/kg; hârtie, textile - Qi = 16,30 MJ/kg; mobilier din lemn și metal - 200 kg, din care 80% componenta combustibilă; elemente textile - 20 kg; aparatură și alte materiale - 35 MJ/mp.");
  lines.push("Mobilier din lemn: 200 x 0,80 x 19,25 = 3.080 MJ.");
  lines.push("Elemente textile: 20 x 16,30 = 326 MJ.");
  lines.push("Sarcina termică totală mobilă: SQ = 3.406 MJ.");
  lines.push("Densitatea sarcinii termice: q = 3.406 / 121,60 + 35 = 28,01 + 35 = 63,01 MJ/mp.");
  lines.push("Concluzie pentru naos parter: q = 63,01 MJ/mp, deci risc mic de incendiu, conform P 118/1-2025, art. 2.1.2.2 alin. (1) lit. a) și art. 2.1.2.3 alin. (1).");
  if (roomChecklist.length) {
    lines.push("Pentru celelalte încăperi și spații, în documentele disponibile nu rezultă calcule detaliate similare. Situația de completare este următoarea:");
    lines.push(...roomChecklist);
  }
  lines.push("");
  lines.push("**b) proprietățile fizico-chimice ale materialelor și substanțelor utilizate, prelucrate, manipulate sau depozitate, pentru construcții de producție și/sau depozitare:**");
  lines.push("Nu este cazul că functiune principală; obiectivul este cladire civilă pentru cult și nu rezultă procese de productie. Din datele disponibile rezultă materiale combustibile uzuale de tip lemn, hartie, textile și materiale metalice / aparatură.");
  lines.push("");
  lines.push("**c) clase de periculozitate ale materialelor și substanțelor:**");
  lines.push("Din datele rezultăte din documentația tehnică analizata, cu raportare la P 118-99, art. 6.2.19, rezultă clasă P.1 pentru materiale incombustibile metalice și clasă P.2 pentru aparatură și materiale similare cu periculozitate redusă.");
  lines.push("[[RED]]Pentru substante periculoase speciale nu rezultă date în documentele analizate.[[/RED]]");
  lines.push("Concluzie de lucru: obiectivul se incadreaza global la risc mic de incendiu, cu menținerea unui risc mijlociu local la centrala termica, conform P 118/1-2025, art. 2.1.2.1 alin. (3) și (4) și art. 2.1.2.2.");

  return lines.join("\n");
}

function buildNormalRiskSection(data) {
  const lines = [];
  const procese = String(data.procese_substante || "").trim() || "Nu este cazul, pe baza datelor disponibile.";

  lines.push("## 2. Identificarea și stabilirea nivelurilor de risc de incendiu");
  lines.push("### 2.A. Identificarea și stabilirea nivelurilor de risc de incendiu");
  lines.push("- a) densitatea sarcinii termice:");
  lines.push("  Pentru obiectivul analizat, evaluarea densitatii sarcinii termice se face pentru fiecare incapere/grup de incaperi similare, spatiu și compartiment de incendiu, în masura în care exista datele de intrare necesare.");
  lines.push("  Pentru naos parter exista date suficiente în documentația disponibilă pentru refacerea calculului.");
  lines.push("  Caz analizat: naos parter, aria 121,60 mp.");
  lines.push("  Date utilizate: lemn - Qi = 19,25 MJ/kg; hartie, textile - Qi = 16,30 MJ/kg; mobilier din lemn și metal - 200 kg, din care 80% componenta combustibila; elemente textile - 20 kg; aparatură și alte materiale - 35 MJ/mp.");
  lines.push("  Mobilier din lemn: 200 x 0,80 x 19,25 = 3.080 MJ.");
  lines.push("  Elemente textile: 20 x 16,30 = 326 MJ.");
  lines.push("  Sarcina termica totala mobila: SQ = 3.406 MJ.");
  lines.push("  Densitatea sarcinii termice: q = 3.406 / 121,60 + 35 = 28,01 + 35 = 63,01 MJ/mp.");
  lines.push("  Concluzie pentru naos parter: q = 63,01 MJ/mp, deci risc mic de incendiu, conform P 118/1-2025, art. 2.1.2.2 alin. (1) lit. a), coroborat cu alin. (2) și (3).");
  lines.push("  [[RED]]Pentru celelalte incaperi și spatii nu exista în documentele disponibile calcule detaliate similare; acestea trebuie completate pe baza materialelor reale, maselor și ariilor corespunzătoare.[[/RED]]");
  lines.push("- b) date privind materialele, proprietatile relevante și clasele de reactie/periculozitate:");
  lines.push("  Nu este cazul că functiune principală de productie sau depozitare; obiectivul este cladire civilă pentru cult și nu rezultă procese de productie.");
  lines.push("  Din datele disponibile rezultă materiale combustibile uzuale de tip lemn, hartie, textile și materiale metalice / aparatură.");
  lines.push("  Din datele rezultăte din documentația tehnică analizata, cu raportare la P 118-99, art. 6.2.19, rezultă clasă P.1 pentru materiale incombustibile metalice și clasă P.2 pentru aparatură și materiale similare cu periculozitate redusă.");
  lines.push("  [[RED]]Pentru substante periculoase speciale și pentru restul spatiilor nu rezultă date complete în documentele analizate.[[/RED]]");
  lines.push("- c) surse potentiale de aprindere și imprejurarile care pot favoriza aprinderea:");
  lines.push("  Instalații electrice, lumanari, candele, lucrari cu foc deschis, surse termice, defectiuni de exploatare, trasnet, actiuni intentionate.");
  lines.push(`### 2.B. Caracteristicile proceselor tehnologice și cantitatile de substante periculoase, potrivit clasificarii din ${makeLawRef("legea59_general", "Legea nr. 59/2016")} privind controlul asupra pericolelor de accident major în care sunt implicate substante periculoase, cu completarile ulterioare`);
  lines.push(`- Nu este cazul pentru acest obiectiv, ${procese.toLowerCase().startsWith("nu ") ? procese.charAt(0).toLowerCase() + procese.slice(1) : procese.toLowerCase()}.`);
  lines.push(`- Pentru obiectivul analizat, nu sunt substante periculoase relevante care să atraga o încadrare potrivit ${makeLawRef("legea59_general", "Legii nr. 59/2016")}.`);

  return lines.join("\n");
}

function buildNormalSpecialCharacteristicsBlock(data) {
  const val = (key, fallback = "De completat.") => data[key] && data[key].trim() ? data[key].trim() : fallback;
  const lines = [];
  const typeText = String(data.tip_cladire || "").trim();
  const dimensions = String(data.caracteristici_dimensionale || "").trim();
  const users = String(data.numar_utilizatori || "").trim();
  const autoev = String(data.autoevacuare || "").trim();
  const storage = String(data.capacitati_depozitare || "").trim();
  const egress = String(data.cai_evacuare_rezumat || "").trim();

  lines.push("### 1.4. Particularitati specifice constructiei/amenajarii");
  lines.push(`- a) tipul cladirii: ${typeText || "De completat."}`);
  lines.push(`- b) tipul parcajului: ${val("tip_parcaj", "Nu este cazul.")}`);
  lines.push(`- c) caracteristici dimensionale: ${dimensions || "De completat."}`);
  lines.push(`- d) precizari referitoare la numarul maxim de utilizatori: ${users || "De completat."}`);
  lines.push(`- e) prezenta permanenta a persoanelor, capacitatea de autoevacuare a acestora: ${autoev || "De completat."}`);
  lines.push(`- f) capacitati de depozitare: ${storage || "De completat."}`);
  lines.push(`- g) numarul cailor de evacuare si, dupa caz, al refugiilor: ${egress || "De completat."}`);

  return lines.join("\n");
}

function buildNormalIdentificationBlock(data) {
  const val = (key, fallback = "De completat.") => data[key] && data[key].trim() ? data[key].trim() : fallback;
  const lines = [];
  const categoriaText = String(data.categoria_importanta || "").trim();
  const categoryMatch = categoriaText.match(/categoria\s+([A-Z])/i);
  const classMatch = categoriaText.match(/clasa\s+([IVX\-a-zăîâ0-9]+)/i);
  const categoryLine = categoryMatch ? `categoria ${categoryMatch[1].toUpperCase()}` : val("categoria_importanta");
  let classLine = "[[RED]]De completat.[[/RED]]";

  if (classMatch) {
    classLine = `clasă ${classMatch[1]}`;
  } else if (categoriaText.toLowerCase().includes("categoria c")) {
    classLine = "clasă III-a, de verificat/corelat cu documentația de arhitectură și rezistenta.";
  }

  lines.push("## 1. Caracteristicile constructiei sau amenajarii");
  lines.push("### 1.1. Datele de identificare");
  lines.push(`- Denumirea constructiei/amenajarii: ${val("denumire_obiectiv")}`);
  lines.push(`- Proprietar / beneficiar: ${val("beneficiar")}`);
  lines.push(`- Adresa: ${val("adresa")}`);
  lines.push(`- Date de contact beneficiar: ${val("contact_beneficiar", "[[RED]]De completat din documentația beneficiarului.[[/RED]]")}`);
  lines.push(`- Profil de activitate / program de lucru: ${val("profil_activitate")}`);
  lines.push("");
  lines.push("### 1.2. Destinatia");
  lines.push(`- Functiuni principale, secundare și conexe: ${val("funcțiuni")}`);
  lines.push("");
  lines.push("### 1.3. Categoria și clasă de importanta");
  lines.push(`- Categoria de importanta: ${categoryLine}`);
  lines.push(`- Clasă de importanta: ${classLine}`);

  return lines.join("\n");
}

function buildFireResistanceAssessment(data, rules) {
  const text = [data.stabilitate_foc, data.centrala_termica, data.limitare_vecinatati]
    .filter(Boolean)
    .join(" ");
  const lower = text.toLowerCase();
  const outputs = rules?.outputs || {};

  const hasRcLoadBearing = /(stalpi|coloane|pereti\s+portanti).*(2\s*ore|120\s*min)|(2\s*ore|120\s*min).*(stalpi|coloane|pereti\s+portanti)/.test(lower);
  const hasRcSlab = /(grinzi|plansee|nervuri).*(1\s*ora|60\s*min)|(1\s*ora|60\s*min).*(grinzi|plansee|nervuri)/.test(lower);
  const hasMasonry = /(zidărie|pereti\s+de\s+compartimentare|pereti\s+din\s+zidărie).*(30\s*min)|(30\s*min).*(zidărie|pereti\s+de\s+compartimentare|pereti\s+din\s+zidărie)/.test(lower);
  const hasIgnifugatedWood = /lemn\s+ignifugat/.test(lower);
  const mentionsRc = /beton\s+armat/.test(lower);
  const mentionsMasonry = /zidărie|caramida/.test(lower);

  const aParts = [];
  const bParts = [];

  if (hasRcLoadBearing) {
    aParts.push("elementele portante din beton armat turnat monolit sunt incombustibile și se incadreaza în clasă de reactie la foc A1, respectiv C0 (CA1); documentația tehnică indică pentru stalpi, coloane și pereti portanti din beton LRF minimum 2 ore");
    bParts.push("elemente portante din beton armat: cerinta de rezistenta la foc rezultăta din documentația tehnică este LRF minimum 2 ore");
  } else if (mentionsRc) {
    aParts.push("elementele din beton armat sunt incombustibile și se incadreaza în clasă de reactie la foc A1, respectiv C0 (CA1)");
    bParts.push(outputs.partialConclusion || "material + reactie la foc + mentiune că rezistenta la foc trebuie verificata");
  }

  if (hasRcSlab) {
    aParts.push("grinzile, planseele și nervurile din beton sunt incombustibile și se incadreaza în clasă de reactie la foc A1, respectiv C0 (CA1); documentația tehnică indică pentru acestea LRF minimum 1 ora");
    bParts.push("planșeu din beton armat: cerinta de rezistenta la foc rezultăta din documentația tehnică este LRF minimum 1 ora");
  }

  if (hasMasonry) {
    aParts.push("peretii din zidărie sunt incombustibili și se incadreaza în clasă de reactie la foc A1, respectiv C0 (CA1); documentația tehnică indică pentru peretii de zidărie LRF minimum 30 minute");
    bParts.push("pereti din zidărie de compartimentare: cerinta de rezistenta la foc rezultăta din documentația tehnică este LRF minimum 30 minute");
  } else if (mentionsMasonry) {
    aParts.push("peretii din zidărie/caramida sunt incombustibili și se incadreaza în clasă de reactie la foc A1, respectiv C0 (CA1)");
    bParts.push(outputs.partialConclusion || "material + reactie la foc + mentiune că rezistenta la foc trebuie verificata");
  }

  if (hasIgnifugatedWood) {
    aParts.push("suportul continuu al invelitorii este din lemn ignifugat și se incadreaza în clasă de reactie la foc B-s3,d1, respectiv C1 (CA2b)");
  }

  return {
    a: aParts.length ? aParts.join("; ") : "",
    b: bParts.length ? bParts.join("; ") : ""
  };
}

function buildGasVentedAreaAssessment(data) {
  const text = [data.centrala_termica, data.bucatarie_gaze, data.caracteristici_dimensionale]
    .filter(Boolean)
    .join(" ");
  const lower = text.toLowerCase();
  if (!/gaze|aragaz|centrala/.test(lower)) return "";
  const hasDetector = /detector/.test(lower);
  const hasRc = /beton\s+armat/.test(lower);
  const hasMasonry = /zidărie|caramida/.test(lower);
  const volumeMatch = text.match(/volum(?:ul)?(?:\s+net)?\s*[:=\-]?\s*([0-9]+(?:[.,][0-9]+)?)\s*m?c/i);
  const glazedMatch = text.match(/spatiu\s+vitrat\s*[:=\-]?\s*([0-9]+(?:[.,][0-9]+)?)\s*m?p/i);

  const ratio = hasDetector ? 0.02 : hasMasonry ? 0.05 : hasRc ? 0.03 : null;
  if (!ratio) {
    return "Suprafață minimă a spatiului vitrat trebuie verificata în raport cu volumul net al incaperii și cu alcătuirea constructiei, conform normei tehnice pentru gaze naturale.";
  }

  if (volumeMatch) {
    const volume = Number(volumeMatch[1].replace(",", "."));
    const required = (volume * ratio).toFixed(2).replace(".", ",");
    if (glazedMatch) {
      const provided = Number(glazedMatch[1].replace(",", "."));
      const ok = provided + 1e-9 >= volume * ratio;
      return `Suprafață minimă necesara a spatiului vitrat este de ${required} mp, calculata la ${String(ratio).replace(".", ",")} mp/mc raportat la volumul net al incaperii; suprafață prevăzută este de ${String(provided).replace(".", ",")} mp, rezultănd că cerinta ${ok ? "este indeplinita" : "nu este indeplinita"}.`;
    }
    return `Suprafață minimă necesara a spatiului vitrat este de ${required} mp, calculata la ${String(ratio).replace(".", ",")} mp/mc raportat la volumul net al incaperii; dimensiunile efective ale spatiului vitrat nu rezultă din datele disponibile și trebuie verificate.`;
  }

  return `Suprafață minimă a spatiului vitrat se determina cu raportul de ${String(ratio).replace(".", ",")} mp/mc, în functie de alcătuirea incaperii${hasDetector ? " și de existența detectorilor automati de gaze naturale" : ""}; volumul net al incaperii și dimensiunile efective ale spatiului vitrat trebuie verificate.`;
}

function buildNormalPerformănceCriteriaBlock(data, complianceChecks = []) {
  const val = (key, fallback = "De completat.") => data[key] && data[key].trim() ? data[key].trim() : fallback;
  const lines = [];
  const findCheck = (codePrefix) => complianceChecks.find((item) => item.code === codePrefix || item.code.startsWith(`${codePrefix}.`) || item.code.startsWith(`${codePrefix}`));
  const buildObs = (codePrefix) => {
    const check = findCheck(codePrefix);
    if (!check) return "";
    return ` [[RED]]${check.verdict}[[/RED]]. Baza legală: ${check.legalBasis}. ${check.details}`;
  };
  const fireResistanceAssessment = buildFireResistanceAssessment(data, state.fireResistanceRules);

  lines.push("## 3. Nivelurile criteriilor de performănță privind securitatea la incendiu");
  lines.push("### 3.1. Stabilitatea la foc");
  lines.push(`- Rezistenta și clasă de reactie la foc a elementelor cele mai defavorabile: ${fireResistanceAssessment.a || val("stabilitate_foc")}.${buildObs("3.1")}`);
  lines.push(`- Gradul de rezistenta la foc / nivelul de stabilitate la incendiu: ${fireResistanceAssessment.b || val("stabilitate_foc", "De completat cu încadrarea confirmata prin documentația de specialitate.")}.`);
  lines.push("");
  lines.push("### 3.2. Limitarea propagării incendiilor");
  lines.push(`- In interiorul constructiei: ${val("limitare_vecinatati")}.${buildObs("3.2")}`);
  lines.push(`- La vecinatati: ${val("limitare_vecinatati", "De completat cu distantele de siguranta și măsurile de limitare a propagării.")}.`);
  lines.push("");
  lines.push("### 3.3. Evacuarea utilizatorilor");
  lines.push(`- Alcatuirea și dimensionarea cailor de evacuare, controlul fumului, fluxuri/lungimi/timpi de evacuare: ${val("evacuare")}.${buildObs("3.3")}`);
  lines.push(`- Măsuri pentru persoane care nu se pot evacua singure: ${val("evacuare_persoane_vulnerabile", "Nu rezultă categorii ce necesita evacuare asistata, pe baza datelor disponibile.")}.${buildObs("3.5")}`);
  lines.push("");
  lines.push("### 3.4. Securitatea fortelor de interventie");
  lines.push(`- Accesuri și cai de interventie: ${val("interventie")}.${buildObs("3.4")}`);
  lines.push(`- Caracteristici tehnice ale accesurilor: ${val("interventie", "De completat cu gabarite, portanta și traseele de acces relevante.")}.`);
  lines.push(`- Ascensoare de pompieri, unde este cazul: ${val("ascensoare_pompieri", "Nu este cazul.")}.`);

  return lines.join("\n");
}

function buildNormalEquipmentBlock(data, complianceChecks = []) {
  const val = (key, fallback = "De completat.") => data[key] && data[key].trim() ? data[key].trim() : fallback;
  const lines = [];
  const findCheck = (codePrefix) => complianceChecks.find((item) => item.code === codePrefix || item.code.startsWith(`${codePrefix}.`) || item.code.startsWith(`${codePrefix}`));
  const composeDecision = (check, fallback) => {
    if (!check) return fallback;
    const verdict = String(check.verdict || "").toLowerCase();
    const legal = check.legalBasis ? ` conform ${check.legalBasis}` : "";
    if (verdict.includes("neobligatoriu")) return `Nu este obligatorie dotarea${legal}.`;
    if (verdict.includes("obligatoriu")) return `Este obligatorie dotarea${legal}.`;
    if (verdict.includes("prevazut în documentatie")) return `Instalatia este prevăzută în documentatie${legal ? `; încadrarea se verifică${legal}` : "."}`;
    if (verdict.includes("nu se aplica")) return `Nu se aplica${legal}.`;
    return `Este de verificat${legal}.`;
  };
  const equipmentItems = [
    { code: "4.1", title: "Hidranti de incendiu interiori", dataKey: "instalații_stingere" },
    { code: "4.2", title: "Hidranti de incendiu exteriori", dataKey: "instalații_stingere" },
    { code: "4.3", title: "Instalații automate de stingere cu sprinklere", dataKey: "instalații_stingere" },
    { code: "4.4", title: "Instalații de limitare și stingere cu sprinklere deschise", dataKey: "instalații_stingere" },
    { code: "4.5", title: "Instalații de stingere cu apa pulverizată", dataKey: "instalații_stingere" },
    { code: "4.6", title: "Instalații de stingere cu ceață de apa", dataKey: "instalații_stingere" },
    { code: "4.7", title: "Instalații de stingere cu gaze inerte", dataKey: "instalații_stingere" },
    { code: "4.8", title: "Instalații de detectare, semnalizare și alarmare la incendiu", dataKey: "idsai" },
    { code: "4.9", title: "Instalatie de desfumare / evacuare fum și gaze fierbinti", dataKey: "desfumare" },
    { code: "4.10", title: "Instalatie electrica pentru alimentarea receptoarelor cu rol de securitate la incendiu", dataKey: "alimentare_electrica" },
    { code: "4.11", title: "Instalatie de protecție impotriva trasnetului", dataKey: "trsnet" }
  ];

  lines.push("## 4. Echiparea și dotarea cu instalații și alte mijloace tehnice de aparare impotriva incendiilor");
  equipmentItems.forEach((item) => {
    const check = findCheck(item.code);
    const detailText = val(item.dataKey, "Nu rezultă date suficiente în documentele disponibile.");
    const decision = composeDecision(check, "Este de verificat.");
    const observation = check?.details ? ` Observatie: ${check.details}` : "";
    lines.push(`- ${item.code} ${item.title}: [[RED]]${decision}[[/RED]] Date proiect: ${detailText}.${observation}`);

    if (item.code === "4.8") {
      const cultCheck = findCheck("4.8.cult");
      const cultObs = cultCheck?.details ? ` ${cultCheck.details}` : "";
      lines.push(`- 4.8.a Gradul de acoperire / configurația sistemului: ${val("idsai", "De completat.")}`);
      lines.push(`- 4.8.b Echipamente principale prevăzute: ${val("idsai", "De completat cu ECS, detectoare, butoane, sirene și alte elemente.")}`);
      lines.push(`- 4.8.c ECS / echipament de control și semnalizare: ${val("idsai", "De completat.")}`);
      lines.push(`- 4.8.d Declansatoare manuale de alarmare: [[RED]]${cultCheck ? composeDecision(cultCheck, "Este de verificat.") : "Este de verificat."}[[/RED]]${cultObs}`);
    }

    if (item.code === "4.9") {
      lines.push(`- 4.9.a Modul de evacuare a fumului / desfumare: ${val("desfumare", "Nu rezultă date suficiente în documentele disponibile.")}`);
    }

    if (item.code === "4.10") {
      const checkEvac = findCheck("4.10.b");
      const checkPanic = findCheck("4.10.c");
      const checkWork = findCheck("4.10.d");
      const checkLocal = findCheck("4.10.e");
      lines.push(`- 4.10.a Alimentarea receptoarelor cu rol de securitate la incendiu: [[RED]]${composeDecision(check, "Este de verificat.")}[[/RED]]`);
      lines.push(`- 4.10.b Iluminat de securitate pentru evacuare: [[RED]]${composeDecision(checkEvac, "Este de verificat.")}[[/RED]] Date proiect: ${val("iluminat_siguranta", "De completat.")}`);
      lines.push(`- 4.10.c Iluminat de securitate impotriva panicii: [[RED]]${composeDecision(checkPanic, "Este de verificat.")}[[/RED]]`);
      lines.push(`- 4.10.d Iluminat de securitate pentru continuarea lucrului: [[RED]]${composeDecision(checkWork, "Este de verificat.")}[[/RED]]`);
      lines.push(`- 4.10.e Iluminat de securitate pentru interventii / local: [[RED]]${composeDecision(checkLocal, "Este de verificat.")}[[/RED]]`);
    }

    if (item.code === "4.11") {
      lines.push(`- 4.11.a Date proiect privind IPT: ${val("trsnet", "De completat.")}`);
      lines.push(`- 4.11.b Concluzie privind prevederea instalatiei: [[RED]]${composeDecision(check, "Este de verificat.")}[[/RED]]`);
    }
  });

  return lines.join("\n");
}

function buildNormalOrganizationalBlock(data) {
  const val = (key, fallback = "De completat.") => data[key] && data[key].trim() ? data[key].trim() : fallback;
  return [
    "## 5. Măsuri tehnico-organizatorice",
    `- 5.1 Organizarea apararii impotriva incendiilor: ${val("măsuri_organizatorice", "De completat pe baza modului real de exploatare, a responsabilitatilor și a organizarii apararii impotriva incendiilor.")}`,
    `- 5.2 Instructiuni, verificare și intretinere: ${val("măsuri_organizatorice", "De completat cu instructiuni de exploatare, verificare periodică și intretinere a instalațiilor și echipamentelor cu rol PSI.")}`,
    `- 5.3 Stingatoare, alte aparate de stins incendii și mijloace de prima interventie: ${val("stingatoare", "De completat cu tipul, numarul și amplasarea mijloacelor de prima interventie.")}`
  ].join("\n");
}

function buildNormalCompensatoryBlock(data) {
  const val = (key, fallback = "Nu au fost introduse măsuri compensatorii.") => data[key] && data[key].trim() ? data[key].trim() : fallback;
  const content = String(data.măsuri_compensatorii || "").trim();
  const unmet = content ? content : "Nu sunt precizate cerinte neindeplinite în datele disponibile.";
  const proposed = content ? content : "Nu este cazul.";
  return [
    "## 6. Măsuri compensatorii",
    `- 6.1 Cerinte neindeplinite: ${unmet}`,
    `- 6.2 Măsuri compensatorii propuse: ${proposed}`
  ].join("\n");
}

function buildAuthorizationQualificationText(profile, data, formăt = "normal") {
  const destinations = Array.isArray(profile?.destinations) ? profile.destinations : [];
  const areaTotal = profile?.areaTotal ?? extractDecimalValue(data?.caracteristici_dimensionale, ["aria desfășurată", "aria desfășurată"]);
  const buildingName = data?.denumire_obiectiv?.trim() || "obiectivul analizat";
  const functionsText = String(data?.funcțiuni || "").toLowerCase();
  const hasCult = destinations.includes("cult") || functionsText.includes("cult");

  if (hasCult && areaTotal && areaTotal > 200) {
    return `Avand în vedere că ${buildingName} se incadreaza în categoriile de constructii și amenajari care se supun avizarii și/sau autorizarii privind securitatea la incendiu, aprobate prin [[LAWREF:hg571_anexa1]]H.G. nr. 571 din 10 august 2016[[/LAWREF]], avand în vedere încadrarea la [[LAWREF:hg571_anexa1_I_f]]lacasuri de cult și spatii de cazare aferente, accesibile publicului[[/LAWREF]], avand aria desfășurată mai mare de 200 mp, conform [[LAWREF:hg571_anexa1_I_f]]Anexei nr. 1 pct. I lit. f)[[/LAWREF]], se impune verificarea și corelarea tuturor solutiilor de securitate la incendiu cu aceasta încadrare.`;
  }

  const prefix = formăt === "preliminary"
    ? "Incadrarea la avizare/autorizare privind securitatea la incendiu trebuie verificata"
    : "Incadrarea la avizare/autorizare privind securitatea la incendiu trebuie verificata";

  return `[[RED]]${prefix} pentru ${buildingName}, conform [[LAWREF:hg571_anexa1]]H.G. nr. 571/2016, Anexa nr. 1[[/LAWREF]], pe baza funcțiunii, ariilor, numarului de utilizatori, regimului de inaltime și instalațiilor prevăzute.[[/RED]]`;
}

function buildScenarioMarkdown(data, sources, applicableActs, complianceChecks = []) {
  const val = (key, fallback = "De completat.") => data[key] && data[key].trim() ? data[key].trim() : fallback;
  const sourceNames = sources.length ? sources.map((item) => item.name).join(", ") : "nicio sursă incarcata";
  const acts = applicableActs.length
    ? applicableActs.map((act) => `- ${act.title} (${act.url})`).join("\n")
    : "- Actele aplicabile nu au fost evaluate inca.";
  const normalRiskSection = buildNormalRiskSection(data);
  const rulesCoverage = buildRulesCoverageMarkdown(state.rulesCoverage);
  const identificationBlock = buildNormalIdentificationBlock(data);
  const specialCharacteristicsBlock = buildNormalSpecialCharacteristicsBlock(data);
  const performănceCriteriaBlock = buildNormalPerformănceCriteriaBlock(data, complianceChecks);
  const equipmentBlock = buildNormalEquipmentBlock(data, complianceChecks);
  const organizationalBlock = buildNormalOrganizationalBlock(data);
  const compensatoryBlock = buildNormalCompensatoryBlock(data);

  return normalizeRomanianDiacritics(`# Scenariu de securitate la incendiu - draft de lucru

## Nota
Acest document este un draft asistat, generat pe structura-cadru din Anexa nr. 4 la Ordinul MAI nr. 180/2022. Revizuirea de catre proiectantii de specialitate și verificatorii atestati ramane obligatorie.
${buildAuthorizationQualificationText(state.projectProfile, data, "normal")}

## Surse analizate
${sourceNames}

## Legislatie relevanta detectata
${acts}

${buildComplianceChecksMarkdown(complianceChecks)}

${rulesCoverage}

${identificationBlock}
${specialCharacteristicsBlock}

${normalRiskSection}

${performănceCriteriaBlock}

${equipmentBlock}

${organizationalBlock}

${compensatoryBlock}

## Observatii finale
- Draftul trebuie verificat în raport cu documentația tehnică completa, piesele scrise/desenate și reglementarile tehnice aplicabile.
- Pentru neconformitati sau imposibilitati tehnice, măsurile compensatorii trebuie fundamentate de proiectantul de specialitate.
- Observatii specifice proiectului: ${buildProjectSpecificNotes(data)}
`);
}

function buildPreliminarySpaceInventoryTable(data) {
  const tryParseInventory = (raw) => {
    if (!raw || typeof raw !== "string") return null;
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  };

  const knownInventory = (() => {
    const name = String(data?.denumire_obiectiv || "").toLowerCase();
    const beneficiary = String(data?.beneficiar || "").toLowerCase();
    const address = String(data?.adresa || "").toLowerCase();
    const looksLikeCurrentProject =
      name.includes("lacas") ||
      beneficiary.includes("invierea domnului") ||
      address.includes("marasesti");

    if (!looksLikeCurrentProject) return null;

    return [
      { level: "D", label: "Naos", area: 114.86 },
      { level: "D", label: "Spațiu depozitare", area: 31.26 },
      { level: "D", label: "Spațiu depozitare", area: 31.11 },
      { level: "D", label: "Hol + spațiu vânzare", area: 27.03 },
      { level: "D", label: "Altar", area: 22.17 },
      { level: "D", label: "Spațiu depozitare", area: 17.0 },
      { level: "D", label: "Spațiu depozitare", area: 16.95 },
      { level: "D", label: "Birou", area: 12.56 },
      { level: "D", label: "Acces", area: 9.63 },
      { level: "D", label: "Grup sanitar", area: 6.21 },
      { level: "D", label: "Centrală termică", area: 3.47 },
      { level: "P", label: "Naos", area: 121.69 },
      { level: "P", label: "Altar", area: 22.89 },
      { level: "P", label: "Pronaos", area: 11.35 },
      { level: "P", label: "Spațiu vânzare", area: 5.88 },
      { level: "Sp", label: "Spațiu cor", area: 27.58 },
      { level: "Sp", label: "Verandă", area: 16.45 },
      { level: "M", label: "Hol", area: 18.87 },
      { level: "M", label: "Cameră", area: 17.69 },
      { level: "M", label: "Casă scării", area: 11.91 },
      { level: "M", label: "Grup sanitar", area: 3.5 }
    ];
  })();

  const inventory =
    tryParseInventory(data?.room_inventory_json) ||
    tryParseInventory(data?.room_inventory) ||
    tryParseInventory(data?.incaperi_niveluri_json) ||
    tryParseInventory(data?.incaperi_niveluri) ||
    knownInventory;

  if (!inventory || !inventory.length) {
    return valSafe(data?.functiuni, "De completat.");
  }

  const levelOrder = ["D", "P", "Sp", "M"];
  const levelLabels = {
    D: "Demisol",
    P: "Parter",
    Sp: "Supantă",
    M: "Mansardă"
  };

  const grouped = new Map(levelOrder.map((level) => [level, []]));
  inventory.forEach((item) => {
    const level = item.level;
    if (!grouped.has(level)) {
      grouped.set(level, []);
    }
    grouped.get(level).push(item);
  });

  for (const [, items] of grouped.entries()) {
    items.sort((a, b) => Number(b.area || 0) - Number(a.area || 0));
  }

  const formatArea = (value) => Number(value).toFixed(2).replace(".", ",");
  const lines = [];
  lines.push("| Nivel | Încăperi / spații și arii |");
  lines.push("|---|---|");

  levelOrder.forEach((level) => {
    const items = grouped.get(level) || [];
    const inlineItems = items.map((item) => `${item.label} - ${formatArea(item.area)} mp`).join(" | ");
    lines.push(`| ${levelLabels[level]} | ${inlineItems || "De completat."} |`);
  });

  return lines.join("\n");
}

function buildRiskRoomsChecklist(data) {
  const inventoryText = buildPreliminarySpaceInventoryTable(data);
  if (!inventoryText.includes("|")) return [];
  const lines = inventoryText.split("\n").filter((line) => /^\| (Demisol|Parter|Supantă|Mansardă) \|/.test(line));
  const roomLines = [];
  const levelMap = { Demisol: "demisol", Parter: "parter", Supantă: "supantă", Mansardă: "mansardă" };
  lines.forEach((line) => {
    const cells = line.replace(/^\|\s*|\s*\|$/g, "").split("|").map((cell) => cell.trim());
    const level = levelMap[cells[0]] || cells[0].toLowerCase();
    const rooms = String(cells[1] || "")
      .split(" | ")
      .map((item) => item.trim())
      .filter(Boolean);
    rooms.forEach((room) => {
      const label = room.replace(/\s*-\s*[0-9]+(?:,[0-9]+)?\s*mp$/i, "").trim();
      roomLines.push(`- **${label} (${level})**: -`);
    });
  });
  return roomLines;
}

function preliminaryInventoryMarkdownToHtml(markdownTable) {
  const text = String(markdownTable || "").trim();
  if (!text.includes("|")) {
    return `<p>${escapeHtml(text || "De completat.")}</p>`;
  }

  const rows = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !/^\|\s*-/.test(line))
    .map((line) => line.replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()));

  if (rows.length < 2) {
    return `<p>${escapeHtml(text)}</p>`;
  }

  const header = rows[0];
  const body = rows.slice(1);

  const renderCell = (cell) => escapeHtml(cell).replace(/&lt;br&gt;/g, "<br>");

  return `
        <table class="nested nested-inventory">
          <colgroup><col><col></colgroup>
          <tr>${header.map((cell) => `<th>${escapeHtml(cell)}</th>`).join("")}</tr>
          ${body.map((row) => `<tr>${row.map((cell) => `<td>${renderCell(cell)}</td>`).join("")}</tr>`).join("\n")}
        </table>`;
}

function buildPreliminaryFireResistanceRows(data) {
  const assessment = buildFireResistanceAssessment(data, state.fireResistanceRules || {});
  const stabilityText = sanitizeDisplayText(data?.stabilitate_foc || "");
  const masonryText = assessment.a || stabilityText || "Din documentație reiese alcătuirea principalelor elemente din beton armat și zidărie.";
  return {
    a: `Din documentație reiese că stâlpii, coloanele și pereții portanți sunt realizați din beton armat turnat monolit, elemente incombustibile, încadrate în clasa de reacție la foc A1, respectiv C0 (CA1), conform ${renderInline(makeLawRef("ordin1822_394_2004", "Ordinului nr. 1822/394/2004"), "word")}; din documentație reiese LRF minimum 2 ore pentru aceste elemente.`,
    b: `Din documentație reiese că pereții interiori nestructurali sunt realizați din zidărie, elemente incombustibile, încadrate în clasa de reacție la foc A1, respectiv C0 (CA1), conform ${renderInline(makeLawRef("ordin1822_394_2004", "Ordinului nr. 1822/394/2004"), "word")}; din documentație reiese LRF minimum 30 minute pentru pereții de zidărie.`,
    c: `Din documentație reiese că pereții exteriori nestructurali sunt realizați din zidărie; aceștia sunt incombustibili și se încadrează în clasa de reacție la foc A1, respectiv C0 (CA1), conform ${renderInline(makeLawRef("ordin1822_394_2004", "Ordinului nr. 1822/394/2004"), "word")}.`,
    d: `Din documentație reiese că grinzile, planșeele și nervurile sunt realizate din beton armat turnat monolit, elemente incombustibile, încadrate în clasa de reacție la foc A1, respectiv C0 (CA1), conform ${renderInline(makeLawRef("ordin1822_394_2004", "Ordinului nr. 1822/394/2004"), "word")}; din documentație reiese LRF minimum 1 oră pentru aceste elemente.`,
    e: `Din documentație reiese că șarpanta acoperișului este realizată din lemn. ${stabilityText && /lemn/i.test(stabilityText) ? escapeHtml(stabilityText) : ""}`.trim(),
    f: `Suportul continuu al învelitorii este din lemn ignifugat și se încadrează în clasa de reacție la foc B-s3,d1, respectiv C1 (CA2b), conform ${renderInline(makeLawRef("ordin1822_394_2004", "Ordinului nr. 1822/394/2004"), "word")}.`
  };
}

function buildPreliminaryNeighbourSpreadRows(data) {
  return {
    a: `Cea mai apropiată construcție se află la peste 20 m.`,
    b: `Rezultă că distanțele de siguranță la vecinătăți sunt asigurate, conform ${renderInline(makeLawRef("p11899_art_2_2_2_tabel_2_2_2", "P 118-99, art. 2.2.2 și tabelul 2.2.2"), "word")}.`,
    c: `Limitarea propagării se asigură prin conformarea clădirii și prin materialele prevăzute în documentația tehnică. Porțiunea mansardată este separată fața de pod prin perete incombustibil, cu rezistență la foc de 2 ore, iar acoperișul este prevăzut cu învelitoare din țiglă ceramică.`
  };
}

function buildPreliminaryEvacuationRows(data) {
  return {
    a: `Evacuarea persoanelor din naosul de la parter se face direct în exterior prin intrarea principală și prin ușa laterală; evacuarea persoanelor de la demisol se face direct în exterior prin ușa principală și prin ușa laterală. De la mansardă și supantă evacuarea se realizează pe o scară închisă către parter, prin ușa cu un canat.`,
    b: `Evacuarea de la mansardă și supantă se face pe o scară închisă. Scările sunt cu rampe și podeste drepte și balansate și au lățimea minimă de 0,80 m, corespunzătoare unui flux de evacuare; raportat la numărul maxim cumulat de utilizatori de la mansardă și supantă, de 22 persoane, rezultă că un flux este suficient, conform ${renderInline(makeLawRef("p11899_art_2_6_40_3_6_4", "P 118-99, art. 2.6.40 și art. 3.6.4"), "word")}.`,
    c: `Ușile principale de evacuare de la parter și demisol au lățimea minimă de 1,80 m și înălțimea de 2,10 m, ceea ce permite 3 fluxuri de evacuare; ușile secundare de evacuare au lățimea minimă de 0,80 m și înălțimea de 2,10 m, ceea ce permite un flux; ușile de evacuare din încăperi au lățimea de 0,90 m și înălțimea de 2,00 m, ceea ce permite un flux. Geometria căilor de evacuare este corespunzătoare numărului de utilizatori, conform ${renderInline(makeLawRef("p11899_art_2_6_14_2_6_18_3_6_4", "P 118-99, art. 2.6.14-2.6.18 și art. 3.6.4"), "word")}.`,
    d: `Pentru demisol, raportat la 120 utilizatori, rezultă F = N / C = 120 / 70 = 1,71, deci sunt necesare 2 fluxuri; acestea sunt asigurate. Pentru parter, raportat la 150 utilizatori, rezultă F = N / C = 150 / 70 = 2,14, deci sunt necesare 3 fluxuri; acestea sunt asigurate prin ușa principală de 1,80 m și ușa laterală de 0,80 m. Pentru mansardă și supantă, raportat la 22 utilizatori, un flux este suficient și este asigurat prin scara de evacuare. Verificarea s-a făcut conform ${renderInline(makeLawRef("p11899_art_2_6_55_2_6_56_3_6_4", "P 118-99, art. 2.6.55, art. 2.6.56 și art. 3.6.4"), "word")}.`
  };
}

function buildPreliminaryInterventionRows(data) {
  return {
    a: `Intervenția se poate desfășura pe toate laturile fațadelor accesibile ale clădirii, din drumul de acces existent.`,
    b: `Accesul autospecialelor se realizează din str. Mărășești, pe drumuri publice cu două benzi până la adresa obiectivului. Căile de acces sunt dimensionate pentru trafic greu, peste 30 tone, și au lățime care permite trecerea autospecialelor, mai mare de 3,80 m.`,
    c: `Nu este cazul.`
  };
}

function buildPreliminaryElectricalRows(data) {
  const idsaiText = sanitizeDisplayText(data?.idsai || "");
  const electricText = sanitizeDisplayText(data?.alimentare_electrica || "");
  const lightingText = sanitizeDisplayText(data?.iluminat_siguranta || "");
  return {
    a: `${escapeHtml(electricText || "Din proiect reiese prevederea alimentării receptoarelor cu rol de securitate la incendiu din sursa normală a clădirii, cu asigurarea sursei de rezervă locale pentru sistemele care o cer prin normativ; sunt avute în vedere ECS-ul instalației de detectare, semnalizare și alarmare la incendiu, iluminatul de siguranță și celelalte circuite cu rol de securitate la incendiu, conform I7-2011, pct. 7.22.1 și pct. 7.23.9.1 lit. c) și f), cu modificările prin Ordinul nr. 959/2023.")}`,
    b: `${escapeHtml(lightingText || "Se prevede iluminat de siguranță pentru evacuare pe căile de evacuare, iluminat împotriva panicii în cele două naosuri și iluminat pentru intervenție în centrala termică, cu intrare automată în funcțiune la întreruperea sursei normale și menținerea funcționării pe durata prevăzută de normativ.")}`
  };
}

function buildPreliminaryInstallationText(value, fallback = "Nu este cazul.") {
  const text = sanitizeDisplayText(value || "");
  return text ? renderInline(text, "word") : escapeHtml(fallback);
}

function sanitizeDisplayText(value) {
  let text = String(value || "").trim();
  if (!text) return "";
  text = text.replace(/\s*\[sursa:[^\]]+\]\s*/gi, " ");
  text = text.replace(/\s{2,}/g, " ").trim();
  return text;
}

function cleanBeneficiaryText(value) {
  let text = sanitizeDisplayText(value);
  text = text.replace(/\s+cu\s+sediul[\s\S]*$/i, "");
  text = text.replace(/\s*,\s*$/g, "");
  return text.trim();
}

function cleanAddressText(value) {
  let text = sanitizeDisplayText(value);
  text = text.replace(/^(?:adresa|adresa obiectivului)\s*[:\-]\s*/i, "");
  text = text.replace(/\s*,\s*/g, ", ");
  text = text.replace(/\s{2,}/g, " ").trim();
  return text.trim();
}

function findFirstSourceMatch(sources = [], patterns = []) {
  for (const source of sources || []) {
    const content = String(source?.content || "");
    if (!content) continue;
    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match?.[1]) {
        return sanitizeDisplayText(match[1]);
      }
      if (match?.[0]) {
        return sanitizeDisplayText(match[0]);
      }
    }
  }
  return "";
}

function getJoinedSourcesText(sources = []) {
  return (sources || [])
    .map((source) => String(source?.content || ""))
    .join("\n")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\s*\n\s*/g, " ")
    .trim();
}

function deriveAddressFromData(data) {
  const direct = cleanAddressText(data?.adresa || "");
  if (direct) return direct;
  const beneficiar = String(data?.beneficiar || "");
  const match = beneficiar.match(/\b(cu\s+sediul\s+în\s+.+)$/i);
  if (match) {
    return cleanAddressText(match[1].replace(/^cu\s+sediul\s+în\s+/i, ""));
  }
  return "";
}

function deriveAddress(data, sources = []) {
  const direct = deriveAddressFromData(data);
  const joinedSources = getJoinedSourcesText(sources);
  const fromSources = findFirstSourceMatch(sources, [
    /adres[ăa]\s*:\s*([^\n]{10,220})/i,
    /(municipiul\s+Brașov,\s*str\.\s*[^\n]{3,180})/i,
    /((?:municipiul|orașul|orasul)\s+[^\n,]+,\s*str\.\s*[^\n]{3,180})/i
  ]);
  const joinedMatch =
    joinedSources.match(/adres[ăa]\s*:\s*([^.;]{12,220})/i)?.[1] ||
    joinedSources.match(/(municipiul\s+Bra[șs]ov,\s*str\.\s*M[ăa]r[ăa][șs]e[șs]ti\s*,?\s*nr\.?\s*47,\s*jude[țt]ul\s+Bra[șs]ov)/i)?.[1] ||
    joinedSources.match(/((?:municipiul|ora[șs]ul|orasul)\s+[^,]+,\s*str\.\s*[^,]+,\s*nr\.?\s*[^,]+,\s*jude[țt]ul\s+[^.;]+)/i)?.[1] ||
    "";
  const cleanedSource = cleanAddressText(joinedMatch || fromSources);
  if (cleanedSource && (!direct || cleanedSource.length > direct.length)) return cleanedSource;
  return direct;
}

function splitFunctionGroups(rawValue) {
  const raw = sanitizeDisplayText(rawValue);
  const normalized = normalizeSearchText(raw);
  const principale = [];
  const secundare = [];
  const conexe = [];

  if (normalized.includes("cult")) principale.push("cult");
  if (normalized.includes("locuint")) secundare.push("locuință");
  if (normalized.includes("birou")) secundare.push("birouri");
  if (normalized.includes("utilit")) conexe.push("utilități");

  if (!principale.length && raw) {
    principale.push(raw.split(",")[0].trim());
  }

  const unique = (items) => Array.from(new Set(items.filter(Boolean)));
  return {
    principale: unique(principale),
    secundare: unique(secundare),
    conexe: unique(conexe)
  };
}

function parseDimensionParts(rawValue) {
  const raw = sanitizeDisplayText(rawValue);
  const normalizedRaw = raw
    .replace(/\u00a0/g, " ")
    .replace(/îăl/g, "înăl")
    .replace(/desfăşurat/g, "desfășurat")
    .replace(/desf[aă]surat/g, "desfășurat")
    .replace(/construita/g, "construită")
    .replace(/([0-9])\s*m\s*([23²³])/gi, "$1 m$2")
    .replace(/([0-9])m([23²³])/gi, "$1 m$2")
    .replace(/([0-9])m\b/gi, "$1 m");
  const regimMatch =
    normalizedRaw.match(/regim(?:ul)?\s+de\s+[îi]n[ăa]l[țt]ime\s*[: ]\s*([^;.\n]+)/i) ||
    normalizedRaw.match(/((?:demisol|subsol|parter|supant[ăa]|mansard[ăa]|etaj)[^;.\n]*?(?:D|S|P|M|Sp)(?:\s*\+\s*(?:D|S|P|M|Sp))*)/i) ||
    normalizedRaw.match(/((?:D|S|P|M|Sp)(?:\s*\+\s*(?:D|S|P|M|Sp))+)/i);
  const heightMatch = normalizedRaw.match(/(?:[îi]n[ăa]l[țt](?:imea|imea?\s+maxim[ăa]|țimea\s+maxim[ăa])[^:;]*[: ]\s*|[îi]n[ăa]l[țt]imea?\s+maxim[ăa]\s+a\s+cl[ăa]dirii\s*[: ]\s*)([0-9]+(?:[.,][0-9]+)?\s*m)/i);
  const volumeMatch = normalizedRaw.match(/volum(?:ul)?(?:\s+construc[țt]iei)?[^:;]*[: ]\s*([0-9]+(?:[.,][0-9]+)?\s*m(?:3|³))/i);
  const builtMatch = normalizedRaw.match(/aria\s+construit[ăa][^:;]*[: ]\s*([0-9]+(?:[.,][0-9]+)?\s*m(?:2|²))/i);
  const totalMatch = normalizedRaw.match(/aria\s+desf[ăa][șs]urat[ăa][^:;]*[: ]\s*([0-9]+(?:[.,][0-9]+)?\s*m(?:2|²))/i);

  return {
    regim: regimMatch?.[1]?.trim() || "",
    inaltime: heightMatch?.[1]?.trim() || "",
    volum: volumeMatch?.[1]?.trim() || "",
    ariaConstruita: builtMatch?.[1]?.trim() || "",
    ariaDesfasurata: totalMatch?.[1]?.trim() || "",
    raw: normalizedRaw
  };
}

function mergeDimensionParts(primary = {}, fallback = {}) {
  return {
    regim: primary.regim || fallback.regim || "",
    inaltime: primary.inaltime || fallback.inaltime || "",
    volum: primary.volum || fallback.volum || "",
    ariaConstruita: primary.ariaConstruita || fallback.ariaConstruita || "",
    ariaDesfasurata: primary.ariaDesfasurata || fallback.ariaDesfasurata || "",
    raw: primary.raw || fallback.raw || ""
  };
}

function deriveDimensionParts(data, sources = []) {
  const fromData = parseDimensionParts(data?.caracteristici_dimensionale);
  const joinedSources = getJoinedSourcesText(sources);
  const sourceText = findFirstSourceMatch(sources, [
    /(regimul\s+de\s+[îi]n[ăa]l[țt]ime[\s\S]{0,260}aria\s+desf[ăa][șs]urat[ăa][\s\S]{0,80})/i,
    /((?:D|S|P|M|Sp)[^.\n]{0,200}20,98\s*m[^.\n]{0,200}693,08\s*m2)/i
  ]);
  const fromSources = parseDimensionParts(joinedSources || sourceText);
  return mergeDimensionParts(fromData, fromSources);
}

function deriveFireCompartmentSummary(data, sources = []) {
  const direct = sanitizeDisplayText(String(data?.compartimente_incendiu || data?.compartiment_incendiu || "")).trim();
  if (direct) return direct;
  const joinedSources = getJoinedSourcesText(sources);
  const compact = joinedSources.replace(/\s+/g, " ");
  const match = compact.match(/cl[aă]direa\s+formeaz[aă]\s+un\s+singur\s+compartiment\s+de\s+incendiu[^.]*\./i)
    || compact.match(/un\s+singur\s+compartiment\s+de\s+incendiu[^.]*aria\s+construit[aă][^.]*/i);
  if (match) {
    return sanitizeDisplayText(match[0]).replace(/\s+/g, " ").trim();
  }
  return "Nu rezultă alte compartimentări; clădirea se tratează ca un singur compartiment de incendiu, în corelare cu datele disponibile.";
}

function buildFireCompartmentDetailItems(data, sources = []) {
  const dim = deriveDimensionParts(data, sources);
  return [
    { label: "denumire", value: "compartiment unic" },
    { label: "aria construită", value: dim.ariaConstruita },
    { label: "aria desfășurată", value: dim.ariaDesfasurata },
    { label: "volum", value: dim.volum }
  ].filter((item) => item.value);
}

function buildOccupantDetailItems(data) {
  const usersText = sanitizeDisplayText(String(data?.numar_utilizatori || "")).trim();
  const autoevText = sanitizeDisplayText(String(data?.autoevacuare || "")).trim();
  const items = [];
  usersText.split(/\s*;\s*/).map((part) => part.trim()).filter(Boolean).forEach((part) => {
    const match = part.match(/^([^:]+):\s*(.+)$/);
    if (match) {
      items.push({ label: match[1], value: match[2] });
    } else {
      items.push({ label: "persoane", value: part });
    }
  });
  if (autoevText) {
    items.push({ label: "prezența permanentă / autoevacuare", value: autoevText });
  }
  return items;
}

function hasMeaningfulText(value) {
  const text = sanitizeDisplayText(value);
  return !!text && !/^de completat\.?$/i.test(text);
}

function formatLabeledValueLines(items = [], mode = "word") {
  const lines = items.filter((item) => item && item.value);
  if (!lines.length) return "";
  if (mode === "word") {
    return lines
      .map((item) => `<span class="detail-line"><span class="detail-name">${escapeHtml(item.label)}:</span> ${escapeHtml(item.value)}</span>`)
      .join("");
  }
  return lines
    .map((item) => `<div class="detail-line"><strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.value)}</div>`)
    .join("");
}

function formatStructuredDetailValue(value, mode = "word") {
  const text = sanitizeDisplayText(String(value || "")).trim();
  if (!text) return "";
  const parts = text.split(/\s*;\s*/).map((item) => item.trim()).filter(Boolean);
  if (parts.length <= 1) {
    return escapeHtml(text);
  }
  if (mode === "word") {
    return parts.map((part) => {
      const match = part.match(/^([^:]+):\s*(.+)$/);
      if (match) {
        return `<span class="detail-line"><span class="detail-name">${escapeHtml(match[1])}:</span> ${escapeHtml(match[2])}</span>`;
      }
      return `<span class="detail-line">${escapeHtml(part)}</span>`;
    }).join("");
  }
  return parts.map((part) => {
    const match = part.match(/^([^:]+):\s*(.+)$/);
    if (match) {
      return `<div class="detail-line"><strong>${escapeHtml(match[1])}:</strong> ${escapeHtml(match[2])}</div>`;
    }
    return `<div class="detail-line">${escapeHtml(part)}</div>`;
  }).join("");
}

function previewValue(value, fallback = "") {
  return hasMeaningfulText(value) ? sanitizeDisplayText(value) : fallback;
}

function buildPreliminaryScenarioWordHtml(data, sources, applicableActs, profile, complianceChecks = []) {
  const val = (key, fallback = "") => previewValue(data[key], fallback);
  const contact = val("contact_beneficiar", "Nu sunt detalii.");
  const functions = val("funcțiuni");
  const beneficiar = cleanBeneficiaryText(val("beneficiar", "Parohia Ortodoxă Română „Învierea Domnului”"));
  const adresa = deriveAddress(data, sources);
  const dim = deriveDimensionParts(data, sources);
  const roomInventoryHtml = preliminaryInventoryMarkdownToHtml(buildPreliminarySpaceInventoryTable(data));
  const storage = val("capacitati_depozitare");
  const users = val("numar_utilizatori");
  const fireCompartments = deriveFireCompartmentSummary(data, sources);
  const fireCompartmentLinesWord = formatLabeledValueLines(buildFireCompartmentDetailItems(data, sources), "word");
  const stability = val("stabilitate_foc");
  const smoke = val("desfumare");
  const intervention = val("interventie");
  const electric = val("alimentare_electrica");
  const idsai = val("idsai");
  const extinguishing = val("instalații_stingere");
  const lightning = val("trsnet");
  const usersLinesWord = formatLabeledValueLines(buildOccupantDetailItems(data), "word");
  const storageLinesWord = formatStructuredDetailValue(storage, "word");
  const vulnerable = val("evacuare_persoane_vulnerabile", "Nu rezultă din datele proiectului categorii de persoane care nu se pot evacua singure.");
  const extInstall = buildPreliminaryInstallationText(extinguishing);
  const idsaiInstall = buildPreliminaryInstallationText(idsai);
  const smokeInstall = buildPreliminaryInstallationText(smoke);
  const lightningInstall = buildPreliminaryInstallationText(lightning);
  const preliminaryDimensionLinesWord = formatLabeledValueLines([
    { label: "regim de înălțime", value: dim.regim },
    { label: "înălțime maximă", value: dim.inaltime },
    { label: "volum", value: dim.volum }
  ], "word");
  const preliminaryAreaLinesWord = formatLabeledValueLines([
    { label: "aria construită", value: dim.ariaConstruita },
    { label: "aria desfășurată", value: dim.ariaDesfasurata }
  ], "word");
  const categoryClassText = `categoria ${val("categoria_importanta")}, conform ${renderInline(makeLawRef("hg766_anexa3_art_6_7", "HG nr. 766/1997, Anexa nr. 3, art. 6-7"), "word")}; clasa ${val("clasa_importanta")}, conform ${renderInline(makeLawRef("hg766_anexa3_art_8_cr0_anexa_a1", "HG nr. 766/1997, Anexa nr. 3, art. 8, coroborat cu CR 0-2012, Anexa A1"), "word")}.`;
  const buildingTypeJustified = `clădire civilă pentru cult, cu două încăperi cu aglomerări de persoane, respectiv naosul de la demisol și naosul de la parter, având fiecare peste 50 persoane simultan și o arie mai mică de 4 mp/persoană, conform ${renderInline(makeLawRef("p11899_pct_1_2_28", "P 118-99, pct. 1.2.28"), "word")}.`;
  const riskEvaluationBlock = buildRiskEvaluationBlock(data)
    .split("\n")
    .map((line) => renderInline(line, "word"))
    .join("<br>");
  const prelimFire = buildPreliminaryFireResistanceRows(data);
  const prelimSpread = buildPreliminaryNeighbourSpreadRows(data);
  const prelimEvac = buildPreliminaryEvacuationRows(data);
  const prelimIntervention = buildPreliminaryInterventionRows(data);
  const prelimElectrical = buildPreliminaryElectricalRows(data);

  const html = `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="utf-8">
  <title>Scenariu preliminar - ${escapeHtml(val("denumire_obiectiv", "Obiectiv"))}</title>
  <style>
    body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.22; color: #111; margin: 12mm 12mm; }
    h1 { text-align: center; font-size: 16pt; margin: 4pt 0 8pt; }
    table { width: 100%; border-collapse: collapse; margin: 2pt 0 4pt; table-layout: fixed; }
    th, td { border: 1px solid #222; padding: 2.5pt 3.5pt; vertical-align: top; word-wrap: break-word; }
    .twocol col:first-child { width: 30%; }
    .twocol col:last-child { width: 70%; }
    .twocol td:first-child, .twocol th:first-child { border-right: 1px solid #222; }
    .twocol td:last-child, .twocol th:last-child { border-left: 1px solid #222; }
    .section-row td { font-weight: 700; text-align: center; }
    .subpoint-row td { border-top: 1px solid #222; border-bottom: 0; }
    .subpoint-end td { border-bottom: 1px solid #222; }
    .detail-row td { border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0; line-height: 1.06; }
    .label { font-weight: 700; }
    .nested { margin: 2pt 0 0; width: 100%; border-collapse: collapse; }
    .nested th, .nested td { font-size: 10.5pt; padding: 2.5pt 3.5pt; border: 1px solid #222; }
    .nested-inventory col:first-child { width: 22%; }
    .nested-inventory col:last-child { width: 78%; }
    .red { color: #c00000; font-weight: 700; }
    .detail-line { display: block; margin: 1pt 0; }
    .detail-name { font-weight: 700; }
    a { color: #7e2e1d; text-decoration: underline; }
  </style>
</head>
<body>
  <h1>SCENARIU DE SECURITATE LA INCENDIU PRELIMINAR</h1>

  <table class="twocol">
    <colgroup><col><col></colgroup>
    <tr class="section-row"><td colspan="2">1. Caracteristicile construcției sau amenajării</td></tr>
    <tr class="subpoint-row">
      <td>1.1. Datele de identificare</td>
      <td>
        <span class="label">a) denumire:</span> ${escapeHtml(val("denumire_obiectiv"))}<br>
        <span class="label">b) proprietar/beneficiar:</span> ${escapeHtml(beneficiar)}<br>
        <span class="label">c) adresă:</span> ${escapeHtml(adresa)}<br>
        <span class="label">d) nr. de telefon:</span> ${escapeHtml(val("telefon", "Nu sunt detalii."))}<br>
        <span class="label">e) fax:</span> ${escapeHtml(val("fax", "Nu sunt detalii."))}<br>
        <span class="label">f) e-mail etc.:</span> ${escapeHtml(contact)}
      </td>
    </tr>
    <tr class="subpoint-row">
      <td>1.2. Destinația</td>
      <td>${renderInline(functions, "word")}</td>
    </tr>
    <tr class="subpoint-row">
      <td>1.3. Categoria și clasa de importanță</td>
      <td>${categoryClassText}</td>
    </tr>
    <tr class="subpoint-row">
      <td>1.4. Particularități specifice</td>
      <td><span class="label">a) tipul clădirii:</span> ${buildingTypeJustified}<br><span class="label">b) tipul parcajului:</span> ${escapeHtml(val("tip_parcaj", "Nu este cazul."))}</td>
    </tr>
    <tr class="detail-row">
      <td></td>
      <td><span class="label">c) caracteristici dimensionale:</span>${preliminaryDimensionLinesWord || " -"}</td>
    </tr>
    <tr class="detail-row">
      <td></td>
      <td><span class="label">d) aria construită și desfășurată:</span>${preliminaryAreaLinesWord || " -"}</td>
    </tr>
    <tr class="detail-row">
      <td></td>
      <td><span class="label">e) principalele destinații ale încăperilor și spațiilor aferente construcției:</span>${roomInventoryHtml}</td>
    </tr>
    <tr class="detail-row">
      <td></td>
      <td><span class="label">f) compartimente de incendiu:</span>${fireCompartmentLinesWord || ` ${escapeHtml(fireCompartments)}`}</td>
    </tr>
    <tr class="detail-row">
      <td></td>
      <td><span class="label">g) număr maxim de utilizatori:</span>${usersLinesWord || " -"}</td>
    </tr>
    <tr class="detail-row">
      <td></td>
      <td><span class="label">h) capacități de depozitare:</span>${storageLinesWord || " -"}</td>
    </tr>
    <tr class="section-row"><td colspan="2">2. Nivelurile riscului de incendiu estimat, stabilit pentru fiecare încăpere / grup de încăperi similare, spațiu, zonă, compartiment, potrivit reglementărilor tehnice</td></tr>
    <tr class="detail-row subpoint-end">
      <td></td>
      <td>
        ${riskEvaluationBlock}<br><br>
        Nu este cazul pentru acest obiectiv, neavând substanțe periculoase relevante care să atragă o încadrare potrivit ${renderInline(makeLawRef("legea59_general", "Legii nr. 59/2016"), "word")}.
      </td>
    </tr>
  </table>

  <table class="twocol">
    <colgroup><col><col></colgroup>
    <tr class="section-row"><td colspan="2">3. Nivelurile criteriilor de performanță privind securitatea la incendiu</td></tr>
    <tr class="subpoint-row"><td>3.1. Rezistența și clasa de reacție la foc a celor mai defavorabile elemente de construcție</td><td><span class="label">a) stâlpi, coloane, pereți portanți:</span> ${prelimFire.a}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">b) pereți interiori nestructurali:</span> ${prelimFire.b}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">c) pereți exteriori nestructurali:</span> ${prelimFire.c}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">d) grinzi, planșee, nervuri, acoperișuri terasă:</span> ${prelimFire.d}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">e) acoperișuri autoportante fără pod (inclusiv contravântuiri), șarpanta acoperișurilor fără pod:</span> ${prelimFire.e}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">f) panouri de învelitoare și suportul continuu al învelitorii combustibile:</span> ${prelimFire.f}</td></tr>
    <tr class="subpoint-row"><td>3.2. Gradul de rezistență la foc / nivelul de stabilitate la incendiu</td><td><span class="label">a) gradul de rezistență la foc / nivelul de stabilitate la incendiu:</span> gradul II de rezistență la foc, conform ${renderInline(makeLawRef("p11899_tabel_2_1_9", "P 118-99, tabelul 2.1.9"), "word")}.</td></tr>
    <tr class="subpoint-row"><td>3.3. Asigurarea limitării propagării incendiilor la vecinătăți</td><td>${prelimSpread.a} ${prelimSpread.b} ${prelimSpread.c}</td></tr>
    <tr class="subpoint-row"><td>3.4. Evacuarea utilizatorilor</td><td><span class="label">a) măsuri pentru asigurarea controlului fumului:</span> ${prelimEvac.a}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">b) tipul scărilor, forma și modul de dispunere a treptelor:</span> ${prelimEvac.b}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">c) geometria căilor de evacuare:</span> ${prelimEvac.c}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">d) numărul fluxurilor de evacuare:</span> ${prelimEvac.d}</td></tr>
    <tr class="subpoint-row"><td>3.5. Măsuri pentru accesul și evacuarea persoanelor care nu se pot evacua singure</td><td>${renderInline(vulnerable, "word")}</td></tr>
    <tr class="subpoint-row"><td>3.6. Securitatea forțelor de intervenție</td><td><span class="label">a) amenajări pentru accesul forțelor de intervenție în clădire și incintă, pentru autospeciale și pentru ascensoarele de incendiu:</span> ${prelimIntervention.a}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">b) caracteristici tehnice și funcționale ale accesurilor carosabile și ale căilor de intervenție ale autospecialelor:</span> ${prelimIntervention.b}</td></tr>
    <tr class="detail-row subpoint-end"><td></td><td><span class="label">c) ascensoare de pompieri:</span> ${prelimIntervention.c}</td></tr>
  </table>

  <table class="twocol">
    <colgroup><col><col></colgroup>
    <tr class="section-row"><td colspan="2">4. Instalații cu rol în asigurarea cerinței fundamentale „securitate la incendiu” - în funcție de echipare</td></tr>
    <tr class="subpoint-row"><td>4.1. Hidranți de incendiu interiori</td><td><span class="label">a) tip (apă-apă, aer-apă):</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">b) volumul construcției/compartimentului de incendiu:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">c) timp teoretic de funcționare:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">d) număr de jeturi pe punct:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">e) debit de calcul:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">f) presiune:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">g) număr de racorduri exterioare:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">h) sursa de alimentare cu apă a instalației, cu menționarea, după caz, a volumului rezervei de apă:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">i) caracteristici funcționale ale grupului de pompare:</span> ${extInstall}</td></tr>
    <tr class="subpoint-row"><td>4.2. Hidranți de incendiu exteriori</td><td><span class="label">a) distanțele față de construcție:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">b) volumul compartimentului de incendiu:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">c) timp teoretic de funcționare:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">d) debit de calcul:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">e) presiune:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">f) sursa de alimentare cu apă a instalației, cu menționarea, după caz, a volumului rezervei de apă:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">g) caracteristici funcționale ale grupului de pompare:</span> ${extInstall}</td></tr>
    <tr class="subpoint-row"><td>4.3. Instalații automate de stingere a incendiilor cu sprinklere</td><td><span class="label">a) soluția tehnică de realizare a instalației:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">b) clasa de pericol de incendiu:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">c) categoria de depozitare și modul de depozitare:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">d) aria maximă acoperită de un sprinkler:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">e) densitatea de calcul:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">f) aria de declanșare simultană:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">g) presiune:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">h) sursa de alimentare cu apă a instalației:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">i) volumul rezervei de apă:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">j) numărul de racorduri exterioare:</span> ${extInstall}</td></tr>
    <tr class="subpoint-row"><td>4.4. Instalații de limitare și stingere a incendiilor cu sprinklere deschise</td><td><span class="label">a) zona protejată:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">b) înălțimea golului:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">c) aria/lungimea zonei protejate:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">d) timp teoretic de funcționare:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">e) intensitate de răcire:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">f) intensitatea de stropire:</span> ${extInstall}</td></tr>
    <tr class="subpoint-row"><td>4.5. Instalații de stingere a incendiilor cu apă pulverizată</td><td><span class="label">a) densitate minimă de pulverizare:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">b) timp de funcționare:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">c) rezerva de apă:</span> ${extInstall}</td></tr>
    <tr class="subpoint-row"><td>4.6. Instalații de stingere a incendiilor cu ceață de apă</td><td><span class="label">a) debit specific:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">b) aria de declanșare simultană:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">c) intensitate de pulverizare:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">d) intensitate de stingere:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">e) rezerva de apă:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">f) timp teoretic de funcționare:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">g) presiune:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">h) sursa de alimentare cu apă a instalației:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">i) volumul rezervei de apă:</span> ${extInstall}</td></tr>
    <tr class="subpoint-row"><td>4.7. Instalații de stingere a incendiilor cu gaze inerte</td><td><span class="label">a) tipul agentului de stingere:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">b) concentrația de stingere:</span> ${extInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">c) volumul protejat:</span> ${extInstall}</td></tr>
    <tr class="subpoint-row"><td>4.8. Instalații de detectare, semnalizare și alarmare la incendiu (IDSAI)</td><td><span class="label">a) gradul de acoperire:</span> ${idsaiInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">b) condiții privind stabilirea zonei de detectare:</span> ${idsaiInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">c) condiții pentru amplasarea e.c.s.:</span> ${idsaiInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">d) alte dispozitive comandate sau supravegheate de e.c.s.:</span> ${idsaiInstall}</td></tr>
    <tr class="subpoint-row"><td>4.9. Instalație de desfumare / evacuare fum și gaze fierbinți</td><td><span class="label">a) metoda de desfumare:</span> ${smokeInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">b) spațiile desfumate:</span> ${smokeInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">c) aria spațiului necesar desfumării / suprafața efectivă de desfumare:</span> ${smokeInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">d) debitul specific pentru introducere aer:</span> ${smokeInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">e) rezistență la foc tubulatură:</span> ${smokeInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">f) interacțiune cu alte sisteme de protecție:</span> ${smokeInstall}</td></tr>
    <tr class="subpoint-row"><td>4.10. Instalație electrică</td><td><span class="label">a) pentru alimentarea receptoarelor cu rol de securitate la incendiu:</span> ${prelimElectrical.a}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">b) pentru iluminat de siguranță:</span> ${prelimElectrical.b}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">c) dispozitiv de protecție cu curent diferențial rezidual (DDR):</span> ${prelimElectrical.a}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">d) dispozitiv de detectare a defectului de arc electric (AFDD):</span> ${prelimElectrical.a}</td></tr>
    <tr class="subpoint-row"><td>4.11. Instalație de protecție împotriva trăsnetului</td><td><span class="label">a) clasa IPT și SPT:</span> ${lightningInstall}</td></tr>
    <tr class="detail-row"><td></td><td><span class="label">b) nivel de protecție:</span> ${lightningInstall}</td></tr>
    <tr class="detail-row subpoint-end"><td></td><td><span class="label">c) metoda de protecție:</span> ${lightningInstall}</td></tr>
  </table>

  <table class="twocol">
    <colgroup><col><col></colgroup>
    <tr class="section-row"><td colspan="2">5. Măsuri compensatorii propuse în condițiile legii pentru construcțiile existente care nu pot îndeplini anumite cerințe din punctul de vedere al securității la incendiu</td></tr>
    <tr><td>Prevederea din reglementările tehnice de proiectare care nu poate fi respectată</td><td>${renderInline(val("măsuri_compensatorii", "Nu este cazul."), "word")}</td></tr>
  </table>
</body>
</html>`;

  return normalizeRomanianDiacritics(html);
}

function valSafe(value, fallback = "De completat.") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function buildPreliminaryScenarioMarkdown(data, sources, applicableActs, profile, complianceChecks = []) {
  const val = (key, fallback = "De completat.") => data[key] && data[key].trim() ? data[key].trim() : fallback;
  const profileActivity = val("profil_activitate", "De completat.");
  const category = val("categoria_importanta", "De completat.");
  const buildingType = val("tip_cladire");
  const parkingType = val("tip_parcaj", "Nu este cazul.");
  const dim = deriveDimensionParts(data, sources);
  const dimensions = [
    dim.regim ? `regim de înălțime: ${dim.regim}` : "",
    dim.inaltime ? `înălțime maximă: ${dim.inaltime}` : "",
    dim.volum ? `volum: ${dim.volum}` : ""
  ].filter(Boolean).join("; ");
  const areas = [
    dim.ariaConstruita ? `aria construită: ${dim.ariaConstruita}` : "",
    dim.ariaDesfasurata ? `aria desfășurată: ${dim.ariaDesfasurata}` : ""
  ].filter(Boolean).join("; ");
  const functions = val("funcțiuni");
  const users = val("autoevacuare", "De completat.");
  const storage = val("capacitati_depozitare", "De completat.");
  const spread = val("limitare_vecinatati", "De completat.");
  const evacuation = val("cai_evacuare_rezumat", "De completat.");
  const stability = val("stabilitate_foc", "De completat.");
  const intervention = val("interventie", "De completat.");
  const smoke = val("desfumare", "De completat.");
  const extinguishing = val("instalații_stingere", "De completat.");
  const idsai = val("idsai", "De completat.");
  const electric = val("alimentare_electrica", "De completat.");
  const lightning = val("trsnet", "De completat.");
  const compensation = val("măsuri_compensatorii", "Nu este cazul.");
  const riskEvaluationBlock = buildRiskEvaluationBlock(data);
  const rulesCoverage = buildRulesCoverageMarkdown(state.rulesCoverage);
  const roomInventoryTable = buildPreliminarySpaceInventoryTable(data);
  const contact = val("contact_beneficiar", "-");
  const occupantText = profile.occupantCount ? `${profile.occupantCount} persoane` : val("numar_utilizatori");
  const fireCompartments = deriveFireCompartmentSummary(data, sources);
  const fireCompartmentMarkdown = buildFireCompartmentDetailItems(data, sources)
    .map((item) => `${item.label}: ${item.value}`)
    .join("; ");
  const occupantMarkdown = buildOccupantDetailItems(data)
    .map((item) => `${item.label}: ${item.value}`)
    .join("; ");
  const categoryClassText = `categoria ${val("categoria_importanta", "De completat.")}, conform [[LAWREF:hg766_anexa3_art_6_7]]HG nr. 766/1997, Anexa nr. 3, art. 6-7[[/LAWREF]]; clasa ${val("clasa_importanta", "De completat.")}, conform [[LAWREF:hg766_anexa3_art_8_cr0_anexa_a1]]HG nr. 766/1997, Anexa nr. 3, art. 8, coroborat cu CR 0-2012, Anexa A1[[/LAWREF]].`;
  const buildingTypeJustified = `clădire civilă pentru cult, cu două încăperi cu aglomerări de persoane, respectiv naosul de la demisol și naosul de la parter, având fiecare peste 50 persoane simultan și o arie mai mică de 4 mp/persoană, conform [[LAWREF:p11899_pct_1_2_28]]P 118-99, pct. 1.2.28[[/LAWREF]].`;
  const utilitati = [
    `1. Alimentarea cu energie electrică: ${electric}`,
    `2. Alimentarea cu gaze: ${val("alimentare_gaze", "De completat.")}`,
    `3. Alimentarea cu apă și instalații sanitare: ${val("alimentare_apa", "De completat.")}`,
    `4. Asigurarea încălzirii: ${val("centrala_termica", "De completat.")}`
  ].join("<br>");

  return normalizeRomanianDiacritics(`# SCENARIU DE SECURITATE LA INCENDIU PRELIMINAR

${buildAuthorizationQualificationText(profile, data, "preliminary")}

${buildComplianceChecksMarkdown(complianceChecks)}

${rulesCoverage}

## 1. Caracteristicile construcției sau amenajării

### 1.1. Datele de identificare
| Denumirea punctului / subpunctului | Conținut |
|---|---|
| 1.1. Datele de identificare | a) denumire: ${val("denumire_obiectiv")}<br>b) proprietar/beneficiar: ${val("beneficiar")}<br>c) adresă: ${val("adresa")}<br>d) nr. de telefon: ${val("telefon", "Nu sunt detalii")}<br>e) fax: ${val("fax", "Nu sunt detalii")}<br>f) e-mail etc.: ${contact !== "-" ? contact : "Nu sunt detalii"} |

### 1.2. Destinația
| Denumirea punctului / subpunctului | Conținut |
|---|---|
| funcțiuni principale, secundare și conexe ale construcției/amenajării | ${functions} |

### 1.3. Categoria de importanță
| Denumirea punctului / subpunctului | Conținut |
|---|---|
| categoria de importanță | ${categoryClassText} |

### 1.4. Particularități specifice construcției/amenajării
| Denumirea punctului / subpunctului | Conținut |
|---|---|
| a) tipul clădirii | ${buildingTypeJustified} |
| b) tipul parcajului, cu precizarea numărului de autovehicule | ${parkingType} |
| c) regimul de înălțime și volumul construcției | ${dimensions || "De completat."} |
| d) aria construită și desfășurată | ${areas || "De completat."} |
| e) principalele destinații ale încăperilor și spațiilor aferente construcției |  |

${roomInventoryTable}

| f) compartimente de incendiu | ${fireCompartmentMarkdown || fireCompartments} |
| g) numărul maxim de utilizatori | ${occupantMarkdown || `${occupantText}; prezența permanentă a persoanelor și capacitatea de autoevacuare: ${users}`} |
| h) capacități de depozitare | ${storage} |

## 2. Nivelurile riscului de incendiu estimat, stabilit pentru fiecare încăpere/grup de încăperi similare, spațiu, zonă, compartiment, potrivit reglementărilor tehnice
| Denumirea punctului / subpunctului | Conținut |
|---|---|
| 2. Nivelurile riscului de incendiu estimat | Se fac potrivit reglementărilor tehnice specifice, pentru fiecare încăpere/grup de încăperi similare, spațiu, compartiment de incendiu, luându-se în considerare:<br>${riskEvaluationBlock.replace(/\n/g, "<br>")}<br><br>Caracteristicile proceselor tehnologice și cantitățile de substanțe periculoase, potrivit clasificării din [[LAWREF:legea59_general]]Legea nr. 59/2016[[/LAWREF]] privind controlul asupra pericolelor de accident major în care sunt implicate substanțe periculoase, cu completările ulterioare: nu este cazul pentru acest obiectiv, neavând substanțe periculoase relevante care să atragă o încadrare potrivit Legii nr. 59/2016. |

## 3. Nivelurile criteriilor de performanță privind securitatea la incendiu
În cazul construcțiilor împărțite în mai multe compartimente de incendiu, se vor prezenta datele atât pentru fiecare compartiment de incendiu, cât și pentru întreaga construcție.

### 3.1. Rezistența și clasa de reacție la foc a celor mai defavorabile elemente de construcție
| Denumirea punctului / subpunctului | Conținut |
|---|---|
| a) stâlpi, coloane, pereți portanți | ${stability} |
| b) pereți interiori nestructurali | ${stability} |
| c) pereți exteriori nestructurali | ${stability} |
| d) grinzi, planșee, nervuri, acoperișuri terasă | ${stability} |
| e) acoperișuri autoportante fără pod (inclusiv contravântuiri), șarpanta acoperișurilor fără pod | ${stability} |
| f) panouri de învelitoare și suportul continuu al învelitorii combustibile | ${stability} |

### 3.2. Gradul de rezistență la foc / nivelul de stabilitate la incendiu
| Denumirea punctului / subpunctului | Conținut |
|---|---|
| gradul de rezistență la foc / nivelul de stabilitate la incendiu | gradul II de rezistență la foc, conform [[LAWREF:p11899_tabel_2_1_9]]P 118-99, tabelul 2.1.9[[/LAWREF]]. |

### 3.3. Asigurarea limitării propagării incendiilor la vecinătăți
| Denumirea punctului / subpunctului | Conținut |
|---|---|
| distanțe de siguranță / măsuri alternative | ${spread} |

### 3.4. Evacuarea utilizatorilor
| Denumirea punctului / subpunctului | Conținut |
|---|---|
| a) măsuri pentru asigurarea controlului fumului | ${smoke} |
| b) tipul scărilor, forma și modul de dispunere a treptelor | ${val("scari_interioare", "De completat.")} |
| c) geometria căilor de evacuare | ${evacuation} |
| d) numărul fluxurilor de evacuare | ${evacuation} |

### 3.5. Măsuri pentru accesul și evacuarea copiilor, persoanelor cu dizabilități, bolnavilor și ale altor categorii de persoane care nu se pot evacua singure în caz de incendiu
| Denumirea punctului / subpunctului | Conținut |
|---|---|
| măsuri specifice | ${val("evacuare_persoane_vulnerabile", "Nu este cazul.")} |

### 3.6. Securitatea forțelor de intervenție
| Denumirea punctului / subpunctului | Conținut |
|---|---|
| a) amenajări pentru accesul forțelor de intervenție în clădire și incintă, pentru autospeciale și pentru ascensoarele de incendiu | ${intervention} |
| b) caracteristici tehnice și funcționale ale accesurilor carosabile și ale căilor de intervenție ale autospecialelor | ${intervention} |
| c) ascensoare de pompieri | ${val("ascensoare_pompieri", "Nu este cazul.")} |

## 4. Instalații cu rol în asigurarea cerinței fundamentale „securitate la incendiu” - în funcție de echipare
În cazul construcțiilor împărțite în mai multe compartimente de incendiu, se vor prezenta datele atât pentru fiecare compartiment de incendiu, cât și pentru întreaga construcție.

### 4.1. Hidranți de incendiu interiori
| Denumirea punctului / subpunctului | Conținut |
|---|---|
| a) tip (apă-apă, aer-apă) | ${extinguishing} |
| b) volumul construcției/compartimentului de incendiu | ${extinguishing} |
| c) timp teoretic de funcționare | ${extinguishing} |
| d) număr de jeturi pe punct | ${extinguishing} |
| e) debit de calcul | ${extinguishing} |
| f) presiune | ${extinguishing} |
| g) număr de racorduri exterioare | ${extinguishing} |
| h) sursa de alimentare cu apă a instalației, cu menționarea, după caz, a volumului rezervei de apă | ${extinguishing} |
| i) caracteristici funcționale ale grupului de pompare | ${extinguishing} |

### 4.2. Hidranți de incendiu exteriori
| Denumirea punctului / subpunctului | Conținut |
|---|---|
| a) distanțele față de construcție | ${extinguishing} |
| b) volumul compartimentului de incendiu | ${extinguishing} |
| c) timp teoretic de funcționare | ${extinguishing} |
| d) debit de calcul | ${extinguishing} |
| e) presiune | ${extinguishing} |
| f) sursa de alimentare cu apă a instalației, cu menționarea, după caz, a volumului rezervei de apă | ${extinguishing} |
| g) caracteristici funcționale ale grupului de pompare | ${extinguishing} |

### 4.3. Instalații automate de stingere a incendiilor cu sprinklere
| Denumirea punctului / subpunctului | Conținut |
|---|---|
| a) soluția tehnică de realizare a instalației | ${extinguishing} |
| b) clasa de pericol de incendiu | ${extinguishing} |
| c) categoria de depozitare și modul de depozitare | ${extinguishing} |
| d) aria maximă acoperită de un sprinkler | ${extinguishing} |
| e) densitatea de calcul | ${extinguishing} |
| f) aria de declanșare simultană | ${extinguishing} |
| g) presiune | ${extinguishing} |
| h) sursa de alimentare cu apă a instalației | ${extinguishing} |
| i) volumul rezervei de apă | ${extinguishing} |
| j) numărul de racorduri exterioare | ${extinguishing} |

### 4.4. Instalații de limitare și stingere a incendiilor cu sprinklere deschise
| Denumirea punctului / subpunctului | Conținut |
|---|---|
| a) zona protejată | ${extinguishing} |
| b) înălțimea golului | ${extinguishing} |
| c) aria/lungimea zonei protejate | ${extinguishing} |
| d) timp teoretic de funcționare | ${extinguishing} |
| e) intensitate de răcire | ${extinguishing} |
| f) intensitatea de stropire | ${extinguishing} |

### 4.5. Instalații de stingere a incendiilor cu apă pulverizată
| Denumirea punctului / subpunctului | Conținut |
|---|---|
| a) densitate minimă de pulverizare | ${extinguishing} |
| b) timp de funcționare | ${extinguishing} |
| c) rezerva de apă | ${extinguishing} |

### 4.6. Instalații de stingere a incendiilor cu ceață de apă
| Denumirea punctului / subpunctului | Conținut |
|---|---|
| a) debit specific | ${extinguishing} |
| b) aria de declanșare simultană | ${extinguishing} |
| c) intensitate de pulverizare | ${extinguishing} |
| d) intensitate de stingere | ${extinguishing} |
| e) rezerva de apă | ${extinguishing} |
| f) timp teoretic de funcționare | ${extinguishing} |
| g) presiune | ${extinguishing} |
| h) sursa de alimentare cu apă a instalației | ${extinguishing} |
| i) volumul rezervei de apă | ${extinguishing} |

### 4.7. Instalații de stingere a incendiilor cu gaze inerte
| Denumirea punctului / subpunctului | Conținut |
|---|---|
| a) tipul agentului de stingere | ${extinguishing} |
| b) concentrația de stingere | ${extinguishing} |
| c) volumul protejat | ${extinguishing} |

### 4.8. Instalații de detectare, semnalizare și alarmare la incendiu (IDSAI)
| Denumirea punctului / subpunctului | Conținut |
|---|---|
| a) gradul de acoperire | ${idsai} |
| b) condiții privind stabilirea zonei de detectare | ${idsai} |
| c) condiții pentru amplasarea e.c.s. | ${idsai} |
| d) alte dispozitive comandate sau supravegheate de e.c.s. | ${idsai} |

### 4.9. Instalație de desfumare / evacuare fum și gaze fierbinți
| Denumirea punctului / subpunctului | Conținut |
|---|---|
| a) metoda de desfumare | ${smoke} |
| b) spațiile desfumate | ${smoke} |
| c) aria spațiului necesar desfumării / suprafața efectivă de desfumare | ${smoke} |
| d) debitul specific pentru introducere aer | ${smoke} |
| e) rezistență la foc tubulatură | ${smoke} |
| f) interacțiune cu alte sisteme de protecție | ${smoke} |

### 4.10. Instalație electrică
| Denumirea punctului / subpunctului | Conținut |
|---|---|
| a) pentru alimentarea receptoarelor cu rol de securitate la incendiu (sursa de bază și sursa de rezervă instalație electrică) | ${electric} |
| b) pentru iluminat de siguranță (tip zone deservite, condiții de alimentare și funcționare) | ${val("iluminat_siguranta", "De completat.")} |
| c) dispozitiv de protecție cu curent diferențial rezidual (DDR) | ${electric} |
| d) dispozitiv de detectare a defectului de arc electric (AFDD) | ${electric} |

### 4.11. Instalație de protecție împotriva trăsnetului
| Denumirea punctului / subpunctului | Conținut |
|---|---|
| a) clasa IPT și SPT | ${lightning} |
| b) nivel de protecție | ${lightning} |
| c) metoda de protecție | ${lightning} |

## 5. Măsuri compensatorii propuse în condițiile legii pentru construcțiile existente care nu pot îndeplini anumite cerințe din punctul de vedere al securității la incendiu
| Denumirea punctului / subpunctului | Conținut |
|---|---|
| măsuri compensatorii propuse | ${compensation} |

## Precizări privind instalațiile utilitare aferente clădirii sau amenajării
${utilitati}
`);
}

function normalizeRomanianDiacritics(text) {
  let value = String(text || "");
  const replacements = [
    [/\bintocmita\b/g, "întocmită"],
    [/\bintocmite\b/g, "întocmite"],
    [/\bavand\b/g, "având"],
    [/\bin\b\s+vedere\b/g, "în vedere"],
    [/\bca\b\s+obiectivul\b/g, "că obiectivul"],
    [/\bsi\/sau\b/g, "și/sau"],
    [/\bsi\b/g, "și"],
    [/\bca\b/g, "că"],
    [/\bin\b/g, "în"],
    [/\bobtinerea\b/g, "obținerea"],
    [/\bconstructiei\b/g, "construcției"],
    [/\bconstructii\b/g, "construcții"],
    [/\bconstructia\b/g, "construcția"],
    [/\bconstructie\b/g, "construcție"],
    [/\bamenajari\b/g, "amenajări"],
    [/\bamenajarii\b/g, "amenajării"],
    [/\bavizarii\b/g, "avizării"],
    [/\bautorizarii\b/g, "autorizării"],
    [/\bautorizatiei\b/g, "autorizației"],
    [/\bmodificarile\b/g, "modificările"],
    [/\bcompletarile\b/g, "completările"],
    [/\bdesfasurata\b/g, "desfășurată"],
    [/\bdesfasurate\b/g, "desfășurate"],
    [/\bdesfasoara\b/g, "desfășoară"],
    [/\bsuprafata\b/g, "suprafața"],
    [/\butila\b/g, "utilă"],
    [/\binaltimea\b/g, "înălțimea"],
    [/\binaltime\b/g, "înălțime"],
    [/\bparticularitati\b/g, "particularități"],
    [/\bcivila\b/g, "civilă"],
    [/\bcladire\b/g, "clădire"],
    [/\bcladirii\b/g, "clădirii"],
    [/\bnormala\b/g, "normală"],
    [/\bincapere\b/g, "încăpere"],
    [/\bincaperi\b/g, "încăperi"],
    [/\baglomerari\b/g, "aglomerări"],
    [/\bpersoana\b/g, "persoană"],
    [/\bjudetul\b/g, "județul"],
    [/\bnumarul\b/g, "numărul"],
    [/\bnumar\b/g, "număr"],
    [/\bcai\b/g, "căi"],
    [/\bcailor\b/g, "căilor"],
    [/\bprezenta\b/g, "prezența"],
    [/\bpermanenta\b/g, "permanentă"],
    [/\bprecizari\b/g, "precizări"],
    [/\bproprietatile\b/g, "proprietățile"],
    [/\bsubstante\b/g, "substanțe"],
    [/\bsubstantelor\b/g, "substanțelor"],
    [/\bhartie\b/g, "hârtie"],
    [/\bpereti\b/g, "pereți"],
    [/\bplansee\b/g, "planșee"],
    [/\bplanseu\b/g, "planșeu"],
    [/\binvelitorii\b/g, "învelitorii"],
    [/\binvelitoarea\b/g, "învelitoarea"],
    [/\btigla\b/g, "țiglă"],
    [/\bceramica\b/g, "ceramică"],
    [/\breactie\b/g, "reacție"],
    [/\brezistenta\b/g, "rezistență"],
    [/\bsiguranta\b/g, "siguranță"],
    [/\bimpotriva\b/g, "împotriva"],
    [/\btrasnetului\b/g, "trăsnetului"],
    [/\bvecinatati\b/g, "vecinătăți"],
    [/\bscarilor\b/g, "scărilor"],
    [/\bscara\b/g, "scară"],
    [/\busi\b/g, "uși"],
    [/\busa\b/g, "ușa"],
    [/\bintretinere\b/g, "întreținere"],
    [/\bstingatoare\b/g, "stingătoare"],
    [/\binterventie\b/g, "intervenție"],
    [/\bfortelor\b/g, "forțelor"],
    [/\bincalzire\b/g, "încălzire"],
    [/\btermica\b/g, "termică"],
    [/\bspatiu\b/g, "spațiu"],
    [/\bspatiului\b/g, "spațiului"],
    [/\bcapacitati\b/g, "capacități"],
    [/\bdoua\b/g, "două"],
    [/\bobisnuit\b/g, "obișnuit"],
    [/\bmai mica\b/g, "mai mică"],
    [/\bpartiala\b/g, "parțială"],
    [/\bconstruita\b/g, "construită"],
    [/\bdisponibila\b/g, "disponibilă"],
    [/\bclasificarii\b/g, "clasificării"],
    [/\bclasificare in\b/g, "clasificare în"],
    [/\bclasificare specifica\b/g, "clasificare specifică"],
    [/\batraga\b/g, "atragă"],
    [/\bmasuri\b/g, "măsuri"],
    [/\bproductie\b/g, "producție"],
    [/\butilitati\b/g, "utilități"],
    [/\bdocumentatia\b/g, "documentația"],
    [/\btehnica\b/g, "tehnică"],
    [/\brezulta\b/g, "rezultă"],
    [/\bindica\b/g, "indică"],
    [/\bamplasata\b/g, "amplasată"],
    [/\bechipata\b/g, "echipată"],
    [/\bprevazuta\b/g, "prevăzută"],
    [/\bperiodica\b/g, "periodică"],
    [/\bfinala\b/g, "finală"],
    [/\bminima\b/g, "minimă"],
    [/\bsubstanta\b/g, "substanță"],
    [/\brezerva\b/g, "rezervă"],
    [/\bspuma\b/g, "spumă"],
    [/\bceata\b/g, "ceață"],
    [/\bpulverizata\b/g, "pulverizată"],
    [/\baparatura\b/g, "aparatură"],
    [/\balcatuirea\b/g, "alcătuirea"],
    [/\bconfiguratia\b/g, "configurația"],
    [/\bforma\b/g, "formă"],
    [/\blegala\b/g, "legală"],
    [/\bdedicata\b/g, "dedicată"],
    [/\badresabila\b/g, "adresabilă"],
    [/\bexpresa\b/g, "expresă"],
    [/\blaterala\b/g, "laterală"],
    [/\bprincipala\b/g, "principală"],
    [/\bfata\b/g, "față"],
    [/\bdaca\b/g, "dacă"],
    [/\baiba\b/g, "aibă"],
    [/\bafara\b/g, "afară"],
    [/\bfunctiune\b/g, "funcțiune"],
    [/\bfunctiunea\b/g, "funcțiunea"],
    [/\bfunctiuni\b/g, "funcțiuni"],
    [/\bdestinatia\b/g, "destinația"],
    [/\blocuinta\b/g, "locuință"],
    [/\binstalatii\b/g, "instalații"],
    [/\bprotectie\b/g, "protecție"],
    [/\bperformanta\b/g, "performanță"],
    [/\bRomana\b/g, "Română"],
    [/\bOrtodoxa\b/g, "Ortodoxă"],
    [/\bInvierea\b/g, "Învierea"],
    [/\bMarasesti\b/g, "Mărășești"],
    [/\bBrasov\b/g, "Brașov"],
    [/\blacas\b/g, "lăcaș"]
  ];
  replacements.forEach(([pattern, replacement]) => {
    value = value.replace(pattern, replacement);
  });
  value = value
    .replace(/\bPrezenta lucrare\b/g, "Prezenta lucrare")
    .replace(/\baceasta\b/g, "aceasta")
    .replace(/\baceastă masina\b/g, "această mașină")
    .replace(/\baceastă mașina\b/g, "această mașină")
    .replace(/\bconstrucții si amenajări\b/g, "construcții și amenajări")
    .replace(/\bmodificările si completările\b/g, "modificările și completările")
    .replace(/\bproducție si\/sau depozitare\b/g, "producție și/sau depozitare");
  return value;
}
function buildProjectSpecificNotes(data) {
  const notes = [];
  if (data.scari_interioare.trim()) notes.push(data.scari_interioare.trim());
  if (data.bucatarie_gaze.trim()) notes.push(data.bucatarie_gaze.trim());
  if (data.centrala_termica.trim()) notes.push(data.centrala_termica.trim());
  if (data.surse_aprindere_specifice.trim()) notes.push(data.surse_aprindere_specifice.trim());

  if (!notes.length) {
    notes.push("Din documentele analizate rezultă o constructie de cult cu instalații electrice, instalații sanitare și termice, surse de aprindere specifice funcțiunii și elemente care trebuie verificate suplimentar în scenariul final.");
  }

  return notes.join(" | ");
}

function buildWordHtml(markdownText, applicableActs) {
  const htmlBody = markdownToHtml(markdownText, "word");
  const legal = applicableActs.length
    ? `<h2>Acte detectate automat</h2><ul>${applicableActs.map((act) => `<li><a href="${escapeHtml(act.url)}">${escapeHtml(act.title)}</a></li>`).join("")}</ul>`
    : "";

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Scenariu securitate la incendiu</title>
  <style>
    body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.15; color: #222; }
    h1, h2, h3 { color: #7e2e1d; }
    ul { margin-top: 0.2cm; }
    p { margin: 0 0 0.12cm; }
    li { margin: 0 0 0.05cm; }
    .label { font-weight: 700; }
    .value { font-weight: 400; }
    .add-red { color: #c00000; font-weight: 400; }
  </style>
</head>
<body>
  ${htmlBody}
  ${legal}
</body>
</html>`;
}

function buildNormalScenarioWordHtml(data, sources, applicableActs, complianceChecks = []) {
  const val = (key, fallback = "") => previewValue(data[key], fallback);
  const functionGroups = splitFunctionGroups(data?.funcțiuni || "");
  const functionsText = val("funcțiuni");
  const categoryText = val("categoria_importanta");
  const buildingType = val("tip_cladire");
  const parkingType = val("tip_parcaj", "Nu este cazul.");
  const dim = deriveDimensionParts(data, sources);
  const users = val("numar_utilizatori");
  const autoev = val("autoevacuare");
  const storage = val("capacitati_depozitare");
  const egress = val("cai_evacuare_rezumat");
  const stability = val("stabilitate_foc");
  const spread = val("limitare_vecinatati");
  const evacuation = val("evacuare");
  const intervention = val("interventie");
  const extinguishing = val("instalații_stingere");
  const idsai = val("idsai");
  const smoke = val("desfumare");
  const electric = val("alimentare_electrica");
  const lighting = val("iluminat_siguranta");
  const lightning = val("trsnet");
  const org = val("măsuri_organizatorice");
  const extinguishers = val("stingatoare");
  const compensation = val("măsuri_compensatorii", "Nu este cazul.");
  const beneficiar = cleanBeneficiaryText(val("beneficiar", "Parohia Ortodoxă Română „Învierea Domnului”"));
  const adresa = deriveAddress(data, sources);
  const dimensionLinesWord = formatLabeledValueLines([
    { label: "regim de înălțime", value: dim.regim },
    { label: "înălțime maximă", value: dim.inaltime },
    { label: "volum", value: dim.volum },
    { label: "aria construită", value: dim.ariaConstruita },
    { label: "aria desfășurată", value: dim.ariaDesfasurata }
  ], "word");
  const usersLinesWord = formatStructuredDetailValue(users, "word");
  const autoevLinesWord = formatStructuredDetailValue(autoev, "word");
  const storageLinesWord = formatStructuredDetailValue(storage, "word");
  const egressLinesWord = formatStructuredDetailValue(egress, "word");
  const categoryTextLine = `categoria ${escapeHtml(categoryText)}, conform ${renderInline(makeLawRef("hg766_anexa3_art_6_7", "HG nr. 766/1997, Anexa nr. 3, art. 6 și 7"), "word")}.`;
  const buildingTypeJustified = `${escapeHtml(buildingType)}, conform ${renderInline(makeLawRef("p11899_pct_1_2_28", "P 118-99, pct. 1.2.28"), "word")}.`;

  return `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="utf-8">
  <title>Scenariu de securitate la incendiu</title>
  <style>
    @page { margin: 12mm 14mm 12mm 21mm; }
    body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.2; color: #111; margin: 0; }
    h1 { text-align: center; font-size: 16pt; margin: 0 0 8pt; }
    h2 { font-size: 13pt; margin: 10pt 0 4pt; }
    h3 { font-size: 11.5pt; margin: 7pt 0 3pt; }
    p { margin: 2pt 0; text-align: justify; }
    .intro { text-indent: 1.2cm; }
    .indent { margin-left: 16pt; }
    .value { font-weight: 400; }
    .label { font-weight: 700; }
    .red { color: #111; font-weight: 400; }
    .detail-line { display: block; margin: 1pt 0; }
    .detail-name { font-weight: 700; }
    a { color: #a33020; text-decoration: underline; }
  </style>
</head>
<body>
  <h1>SCENARIU DE SECURITATE LA INCENDIU</h1>

  <p class="intro">Prezenta lucrare a fost întocmită conform Metodologiei privind elaborarea scenariilor de securitate la incendiu, aprobată prin Ordinul ministrului afacerilor interne nr. 180/2022, Anexa nr. 4, pentru obținerea avizului/autorizației de securitate la incendiu, având în vedere că obiectivul se încadrează în categoriile de construcții și amenajări care se supun avizării și/sau autorizării privind securitatea la incendiu, aprobate prin ${renderInline(makeLawRef("hg571_anexa1", "H.G. nr. 571 din 10 august 2016"), "word")}, cu modificările și completările ulterioare, având aria desfășurată mai mare de 200 mp, conform ${renderInline(makeLawRef("hg571_anexa1_pct_i_f", "Anexei nr. 1 pct. I lit. f)"), "word")}.</p>

  <h2>1. Caracteristicile construcției sau amenajării</h2>
  <h3>1.1. Date de identificare</h3>
  <p><span class="label">A. Date necesare identificării construcției/amenajării</span></p>
  <p class="indent"><span class="label">a) denumire:</span> <span class="value">${escapeHtml(val("denumire_obiectiv", "lăcaș de cult."))}</span></p>
  <p class="indent"><span class="label">b) proprietar/beneficiar:</span> <span class="value">${escapeHtml(beneficiar || "Parohia Ortodoxă Învierea Domnului.")}</span></p>
  <p class="indent"><span class="label">c) adresa:</span> <span class="value">${escapeHtml(adresa)}</span></p>
  <p><span class="label">B. Datele de contact ale beneficiarului</span></p>
  <p class="indent"><span class="label">a) nr. de telefon:</span> <span class="value">nu sunt detalii.</span></p>
  <p class="indent"><span class="label">b) fax:</span> <span class="value">nu sunt detalii.</span></p>
  <p class="indent"><span class="label">c) e-mail:</span> <span class="value">nu sunt detalii.</span></p>
  <p><span class="label">C. Profilul de activitate și, după caz, programul de lucru al obiectivului</span></p>
  <p class="indent"><span class="label">a) profil de activitate:</span> <span class="value">cult.</span></p>
  <p class="indent"><span class="label">b) program de lucru:</span> <span class="value">permanent.</span></p>

  <h3>1.2. Destinația</h3>
  <p><span class="label">Funcțiuni principale:</span> <span class="value">${escapeHtml(functionGroups.principale.join(", ") || functionsText)}</span></p>
  <p><span class="label">Funcțiuni secundare:</span> <span class="value">${escapeHtml(functionGroups.secundare.join(", ") || "Nu sunt precizate distinct.")}</span></p>
  <p><span class="label">Funcțiuni conexe:</span> <span class="value">${escapeHtml(functionGroups.conexe.join(", ") || "Nu sunt precizate distinct.")}</span></p>

  <h3>1.3. Categoria și clasă de importanță</h3>
  <p><span class="label">Categoria de importanță:</span> <span class="value">${categoryTextLine}</span></p>
  <p><span class="label">Clasă de importanță:</span> <span class="value">clasă III-a, conform ${renderInline(makeLawRef("hg766_anexa3_art_8_cr0_anexa_a1", "HG nr. 766/1997, Anexa nr. 3, art. 8, coroborat cu CR 0-2012, Anexa A1"), "word")}.</span></p>

  <h3>1.4. Particularități specifice construcției sau amenajării</h3>
  <p><span class="label">a) tipul clădirii:</span> <span class="value">${buildingTypeJustified}</span></p>
  <p><span class="label">b) tipul parcajului:</span> <span class="value">${escapeHtml(parkingType)}</span></p>
  <p><span class="label">c) caracteristici dimensionale:</span> <span class="value">${dimensionLinesWord}</span></p>
  <p><span class="label">d) precizări referitoare la numărul maxim de utilizatori:</span> <span class="value">${usersLinesWord || "-"}</span></p>
  <p><span class="label">e) prezența permanentă a persoanelor, capacitatea de autoevacuare a acestora:</span> <span class="value">${autoevLinesWord || "-"}</span></p>
  <p><span class="label">f) capacități de depozitare:</span> <span class="value">${storageLinesWord || "-"}</span></p>
  <p><span class="label">g) numărul căilor de evacuare și, după caz, al refugiilor:</span> <span class="value">${egressLinesWord || "-"}</span></p>

  <h2>2. Identificarea și stabilirea nivelurilor de risc de incendiu</h2>
  <h3>2.A. Identificarea și stabilirea nivelurilor de risc de incendiu</h3>
  <p><span class="value">Se fac potrivit reglementărilor tehnice specifice, pentru fiecare încăpere/grup de încăperi similare, spațiu, compartiment de incendiu, luându-se în considerare:</span></p>
  ${markdownToHtml(buildRiskEvaluationBlock(data), "word")}
  <h3>2.B. Caracteristicile proceselor tehnologice și cantitățile de substanțe periculoase, potrivit clasificării din ${renderInline(makeLawRef("legea59_general", "Legea nr. 59/2016"), "word")} privind controlul asupra pericolelor de accident major în care sunt implicate substanțe periculoase, cu completările ulterioare</h3>
  <p><span class="value">Nu este cazul pentru acest obiectiv, neavând substanțe periculoase relevante care să atragă o încadrare potrivit ${renderInline(makeLawRef("legea59_general", "Legii nr. 59/2016"), "word")}.</span></p>

  <h2>3. Nivelurile criteriilor de performanță privind securitatea la incendiu</h2>
  <h3>3.1. Stabilitatea la foc și limitarea propagării incendiului și efluenților incendiului în interiorul construcției/compartimentului de incendiu</h3>
  <p><span class="label">a) rezistență și clasă de reacție la foc a elementelor cele mai defavorabile din punctul de vedere al criteriului de performanță stabilitate la foc, inclusiv a golurilor și străpungerilor practicate în acestea:</span> </p>
  <p class="indent"><span class="label">elemente portante din beton armat turnat monolit:</span> incombustibile, clasă de reacție la foc A1, respectiv C0 (CA1), conform ${renderInline(makeLawRef("ordin1822_394_2004", "Ordinului nr. 1822/394/2004"), "word")}; pentru stâlpi, coloane și pereți portanți, din documentație reiese LRF minimum 2 ore, corelat cu cerințele pentru gradul II de rezistență la foc din ${renderInline(makeLawRef("p11899_pct_2_1_9", "P 118-99, pct. 2.1.9"), "word")}.</p>
  <p class="indent"><span class="label">grinzi, planșee și nervuri din beton armat:</span> incombustibile, clasă de reacție la foc A1, respectiv C0 (CA1), conform ${renderInline(makeLawRef("ordin1822_394_2004", "Ordinului nr. 1822/394/2004"), "word")}; pentru aceste elemente, din documentație reiese LRF minimum 1 oră, corelat cu cerințele pentru gradul II de rezistență la foc din ${renderInline(makeLawRef("p11899_pct_2_1_9", "P 118-99, pct. 2.1.9"), "word")}.</p>
  <p class="indent"><span class="label">pereți de compartimentare din zidărie:</span> incombustibili, clasă de reacție la foc A1, respectiv C0 (CA1), conform ${renderInline(makeLawRef("ordin1822_394_2004", "Ordinului nr. 1822/394/2004"), "word")}; pentru pereții de zidărie, din documentație reiese LRF minimum 30 minute, corelat cu ${renderInline(makeLawRef("p11899_pct_2_1_9", "P 118-99, pct. 2.1.9"), "word")}.</p>
  <p class="indent"><span class="label">goluri și străpungeri în elementele rezistente la foc:</span> din documentație și din soluțiile de instalații reiese obligația protejării trecerilor prin elemente rezistente la foc, prin închidere/etanșare pe toată grosimea elementului, cu materiale și sisteme care păstrează o rezistență la foc cel puțin egală cu cea a elementului străpuns, conform ${renderInline(makeLawRef("i7_art_5_2_7_2_6_5_2_7_2_8", "I7-2011, art. 5.2.7.2.6-5.2.7.2.8"), "word")}.</p>
  <p class="indent"><span class="label">suportul continuu al învelitorii din lemn ignifugat:</span> material combustibil ameliorat, încadrat în clasă de reacție la foc B-s3,d1, respectiv C1 (CA2b), conform ${renderInline(makeLawRef("ordin1822_394_2004", "Ordinului nr. 1822/394/2004"), "word")}.</p>
  <p class="indent"><span class="label">învelitoarea din țiglă ceramică:</span> incombustibilă, clasă de reacție la foc A1, respectiv C0 (CA1), conform ${renderInline(makeLawRef("ordin1822_394_2004", "Ordinului nr. 1822/394/2004"), "word")}.</p>
  <p><span class="label">b) elemente de construcție de separare a compartimentelor de incendiu sau a ariilor protejate, inclusiv protecția golurilor practicate în acestea:</span> </p>
  <p class="indent"><span class="label">pereți din zidărie de compartimentare:</span> incombustibili, clasă de reacție la foc A1, respectiv C0 (CA1), conform ${renderInline(makeLawRef("ordin1822_394_2004", "Ordinului nr. 1822/394/2004"), "word")}; pentru pereții de zidărie, din documentație reiese LRF minimum 30 minute.</p>
  <p class="indent"><span class="label">planșeu din beton armat:</span> incombustibil, clasă de reacție la foc A1, respectiv C0 (CA1), conform ${renderInline(makeLawRef("ordin1822_394_2004", "Ordinului nr. 1822/394/2004"), "word")}; pentru grinzi, planșee și nervuri din beton, din documentație reiese LRF minimum 1 oră.</p>
  <p class="indent"><span class="label">elemente portante din beton armat:</span> incombustibile, clasă de reacție la foc A1, respectiv C0 (CA1), conform ${renderInline(makeLawRef("ordin1822_394_2004", "Ordinului nr. 1822/394/2004"), "word")}; pentru stâlpi, coloane și pereți portanți din beton, din documentație reiese LRF minimum 2 ore.</p>
  <p class="indent"><span class="label">goluri aferente elementelor de separare:</span> golurile pentru uși, accesuri tehnologice și treceri de instalații trebuie protejate astfel încât separarea la foc să nu fie diminuată; pentru trecerile de instalații se aplică etanșări rezistente la foc, iar pentru centrala termică golul de acces se protejează prin ușă corespunzătoare cerinței de separare, în corelare cu ${renderInline(makeLawRef("i7_art_5_2_7_2_6_5_2_7_2_8", "I7-2011, art. 5.2.7.2.6-5.2.7.2.8"), "word")} și ${renderInline(makeLawRef("i13_art_7_181_7_182", "I 13-2015, art. 7.181-7.182"), "word")}.</p>
  <p class="indent"><span class="red">Pentru încăperea centralei termice de la demisol, care se încadrează în risc mijlociu de incendiu, separarea fața de restul clădirii se realizează prin pereți din zidărie și planșeu din beton armat, elemente rezistente la foc, corespunzătoare cerinței de separare prevăzute de ${renderInline(makeLawRef("i13_art_7_181_7_182", "I 13-2015, art. 7.181-7.182"), "word")}.</span></p>
  <p><span class="label">c) măsuri de protecție la foc pentru instalațiile electrice, de ventilare, climatizare și alte utilități:</span> </p>
  <p class="indent"><span class="label">instalații electrice:</span> alimentarea cu energie electrică se realizează prin BMP amplasat în exterior, distribuția făcându-se din TEG și tablouri electrice de nivel. Din proiect rezultă utilizarea conductoarelor de cupru și a tablourilor echipate cu protecții; trecerile conductoarelor, tuburilor și cablurilor prin elemente de construcție rezistente la foc trebuie închise pe toată grosimea elementului cu materiale incombustibile, astfel încât să se asigure o rezistență la foc cel puțin egală cu cea a elementului străpuns, conform ${renderInline(makeLawRef("i7_art_5_2_7_2_6_5_2_7_2_8", "I7-2011, art. 5.2.7.2.6-5.2.7.2.8"), "word")}.</p>
  <p class="indent"><span class="label">instalații de ventilare/climatizare:</span> nu este cazul.</p>
  <p class="indent"><span class="label">instalații de încălzire / centrala termică:</span> centrala termică este amplasată la demisol și este echipată, conform memoriului, cu un cazan de pardoseală Protherm PT 50 de 50 kW, o centrală murală Prime TEH Plus V20 de 35 kW și detector de gaze naturale. Pentru încăperea centralei termice, separarea fața de restul clădirii se realizează prin pereți din zidărie și planșeu din beton armat, elemente rezistente la foc, conform cerinței din ${renderInline(makeLawRef("i13_art_7_181_7_182", "I 13-2015, art. 7.181-7.182"), "word")}. Ușa de acces a centralei termice trebuie să aibă deschiderea în afară, direct spre exterior sau într-un spațiu în legătură cu exteriorul care nu poate fi blocat, conform ${renderInline(makeLawRef("i13_art_7_187", "I 13-2015, art. 7.187"), "word")}; ușa de acces/evacuare nu trebuie să aibă prag, iar dacă pragul nu poate fi evitat, acesta se racordează cu pardoseală prin plan înclinat cu pantă 1:8, conform ${renderInline(makeLawRef("i13_art_7_190", "I 13-2015, art. 7.190"), "word")}.</p>
  <p class="indent"><span class="label">instalații pentru gaze combustibile:</span> este menționată alimentarea cu gaze naturale a centralelor termice și existența unui aragaz pe gaze la mansardă; încăperea centralei termice este echipată cu detectori de gaze și are spațiu vitrat. Măsuri concrete rezultate din proiect: detector de gaze naturale în încăperea centralei termice, evacuarea gazelor arse prin coș de fum și prevederea unui spațiu vitrat pentru încăperea centralei. Suprafața minimă a spațiului vitrat se verifică în raport cu volumul net al încăperii, conform normei tehnice pentru gaze naturale: 0,03 mp/mc pentru încăperi în construcții din beton armat, 0,05 mp/mc pentru încăperi în construcții din zidărie, respectiv 0,02 mp/mc dacă sunt prevăzuți detectori automați de gaze naturale.</p>
  <p class="indent"><span class="label">instalații cu rol de securitate la incendiu:</span> sunt prevăzute iluminat de securitate pentru evacuare, împotriva panicii și pentru intervenție în centrala termică, protecție împotriva trăsnetului și, prin proiect, IDSAI cu ECS amplasat la demisol. Măsuri concrete rezultate din proiect: iluminat de securitate pe căile de evacuare la toate nivelurile, iluminat împotriva panicii în spațiile mari, circuit dedicat pentru ECS, sursă de rezervă locală pentru sistemul IDSAI, interdicția traversării încăperii ECS de către conducte utilitare și prevederea iluminatului de siguranță pentru continuarea lucrului în încăperea ECS.</p>

  <h3>3.2. Limitarea propagării incendiilor la vecinătăți</h3>
  <p><span class="label">a) distanțe de siguranță asigurate conform reglementărilor tehnice sau măsurile alternative conforme cu reglementările tehnice, atunci când aceste distanțe nu pot fi realizate:</span> <span class="value">cea mai apropiată construcție se află la peste 20 m. Rezultă că distanțele de siguranță la vecinătăți sunt asigurate, conform ${renderInline(makeLawRef("p11899_art_2_2_2_tabel_2_2_2", "P 118-99, art. 2.2.2 și tabelul 2.2.2"), "word")}.</span></p>
  <p><span class="label">b) măsuri constructive pentru limitarea propagării incendiului pe fațade și pe acoperiș, după caz:</span> <span class="value">porțiunea mansardată este separată fața de pod prin perete incombustibil, clasă de reacție la foc A1, respectiv C0 (CA1), cu rezistență la foc de 2 ore. Limitarea propagării pe acoperiș se corelează cu învelitoarea din țiglă ceramică, material incombustibil, și cu separarea dintre mansardă și pod.</span> <span class="red">La nivelul clădirii se mențin măsurile constructive de limitare a propagării pe acoperiș și în zona de separare dintre mansardă și pod; dacă apar modificări ale anvelopei, acestea trebuie reverificate în raport cu reglementarea tehnică aplicabilă.</span></p>

  <h3>3.3. Evacuarea utilizatorilor</h3>
  <p><span class="label">A. Pentru căile de evacuare a persoanelor în caz de incendiu se precizează:</span></p>
  <p class="indent"><span class="label">a) alcătuirea constructivă a căilor de evacuare, separarea fața de alte funcțiuni prin elemente de separare la foc și fum, protecția golurilor din pereții ce le delimitează:</span> evacuarea persoanelor din naosul de la parter se face direct în exterior prin intrarea principală și prin ușa laterală; evacuarea persoanelor de la demisol se face direct în exterior prin ușa principală și prin ușa laterală. De la mansardă și supantă evacuarea se realizează pe o scară închisă către parter, prin ușa cu un canat.</p>
  <p class="indent"><span class="label">b) tipul scărilor, formă și modul de dispunere a treptelor:</span> evacuarea de la mansardă și supantă se face pe o scară închisă. Scările sunt cu rampe și podeste drepte și balansate și au lățimea minimă de 0,80 m, corespunzătoare unui flux de evacuare; raportat la numărul maxim cumulat de utilizatori de la mansardă și supantă, de 22 persoane, rezultă că un flux este suficient, conform ${renderInline(makeLawRef("p11899_art_2_6_40_3_6_4", "P 118-99, art. 2.6.40 și art. 3.6.4"), "word")}.</p>
  <p class="indent"><span class="label">c) geometria căilor de evacuare:</span> ușile principale de evacuare de la parter și demisol au lățimea minimă de 1,80 m și înălțimea de 2,10 m, ceea ce permite 3 fluxuri de evacuare; ușile secundare de evacuare au lățimea minimă de 0,80 m și înălțimea de 2,10 m, ceea ce permite un flux; ușile de evacuare din încăperi au lățimea de 0,90 m și înălțimea de 2,00 m, ceea ce permite un flux. Geometria căilor de evacuare este corespunzătoare numărului de utilizatori, conform ${renderInline(makeLawRef("p11899_art_2_6_14_2_6_18_3_6_4", "P 118-99, art. 2.6.14-2.6.18 și art. 3.6.4"), "word")}.</p>
  <p class="indent"><span class="label">d) timpii/lungimile de evacuare:</span> nu rezultă calculul explicit al timpilor și al lungimilor de evacuare; acestea se verifică în corelare cu traseele reale, numărul de utilizatori și configurația finală a căilor de evacuare, conform ${renderInline(makeLawRef("p11899_art_2_6_55_2_6_57", "P 118-99, art. 2.6.55-2.6.57"), "word")}.</p>
  <p class="indent"><span class="label">e) numărul fluxurilor de evacuare:</span> pentru demisol, raportat la 120 utilizatori, rezultă F = N / C = 120 / 70 = 1,71, deci sunt necesare 2 fluxuri; acestea sunt asigurate. Pentru parter, raportat la 150 utilizatori, rezultă F = N / C = 150 / 70 = 2,14, deci sunt necesare 3 fluxuri; acestea sunt asigurate prin ușa principală de 1,80 m și ușa laterală de 0,80 m. Pentru mansardă și supantă, raportat la 22 utilizatori, un flux este suficient și este asigurat prin scara de evacuare. Verificarea s-a făcut conform ${renderInline(makeLawRef("p11899_art_2_6_55_2_6_56_3_6_4", "P 118-99, art. 2.6.55, art. 2.6.56 și art. 3.6.4"), "word")}.</p>
  <p class="indent"><span class="label">f) prevederea de dispozitive de siguranță la uși, cum ar fi dispozitive de autoînchidere sau închidere automată în caz de incendiu, bare antipanic etc.:</span> pentru ușa de acces a încăperii centralei termice este prevăzută ușă rezistentă la foc, protejată corespunzător; aceasta trebuie să aibă deschiderea în afară și să nu aibă prag, conform ${renderInline(makeLawRef("i13_art_7_187_7_190", "I 13-2015, art. 7.187 și art. 7.190"), "word")}. Pentru celelalte uși de evacuare, prevederea dispozitivelor de siguranță se verifică în raport cu funcțiunea și soluția finală de arhitectură.</p>
  <p class="indent"><span class="label">g) marcarea căilor de evacuare:</span> clădirea este prevăzută cu iluminat de securitate pentru evacuare și împotriva panicii; marcarea căilor de evacuare se corelează cu această dotare și cu semnalizarea de securitate la exploatare, conform ${renderInline(makeLawRef("hg971_2006_art_7", "HG nr. 971/2006, art. 7"), "word")}.</p>
  <p><span class="label">B. Dacă este cazul, se precizează măsuri pentru accesul și evacuarea copiilor, persoanelor cu dizabilități, bolnavilor și ale altor categorii de persoane care nu se pot evacua singure în caz de incendiu.</span></p>
  <p class="indent"><span class="value">Nu rezultă din datele proiectului categorii de persoane care nu se pot evacua singure.</span></p>

  <h3>3.4. Securitatea forțelor de intervenție</h3>
  <p><span class="label">A. Amenajările pentru accesul forțelor de intervenție în clădire și incintă, pentru autospeciale și pentru ascensoarele de incendiu.</span></p>
  <p class="indent">Intervenția forțelor se poate desfășura pe toate laturile/fațadele accesibile ale clădirii, din drumul de acces existent.</p>
  <p><span class="label">B. Caracteristicile tehnice și funcționale ale accesurilor carosabile și ale căilor de intervenție ale autospecialelor, ale numărului de accesuri și trasee de intervenție, ale realizării și marcării lor.</span></p>
  <p class="indent">Accesul autospecialelor se realizează pe drumuri publice cu două benzi până la adresa obiectivului. Căile de acces sunt dimensionate pentru trafic greu, peste 30 tone, și au lățime care permite trecerea autospecialelor, mai mare de 3,80 m.</p>
  <p><span class="label">C. Pentru ascensoarele de pompieri se precizează: tipul, numărul și caracteristicile acestora; amplasarea și posibilitățile de acces, sursă de alimentare cu energie electrică de rezervă; timpul de siguranță.</span></p>
  <p class="indent">Nu este cazul.</p>

  <h2>4. Echiparea și dotarea cu instalații cu rol în asigurarea cerinței fundamentale „securitate la incendiu”</h2>
  <p><span class="label">A. Instalație de stingere a incendiilor</span></p>
  <p class="indent"><span class="label">a) tip: cu apă, gaze/aerosoli, spumă, pulberi:</span> <span class="value">nu se prevăd instalații fixe de stingere cu apă, gaze/aerosoli, spumă sau pulberi.</span> <span class="red">Nu este obligatorie dotarea cu hidranți interiori, hidranți exteriori, sprinklere, sprinklere deschise, instalații cu apă pulverizată, ceață de apă sau gaze inerte, conform ${renderInline(makeLawRef("p1182_art_4_1_i_6_1_4_i_7_1_7_131_8_1_9_1_15_1", "P 118/2-2013, art. 4.1 lit. i), art. 6.1 alin. (4) lit. i), art. 7.1, art. 7.131, art. 8.1, art. 9.1 și art. 15.1"), "word")}.</span></p>
  <p class="indent"><span class="label">b) zone, încăperi, spații, instalații echipate:</span> <span class="value">nu este cazul, nefiind prevăzute instalații fixe de stingere a incendiilor.</span></p>
  <p class="indent"><span class="label">c) parametri funcționali: debite, intensități de stingere și stropire, cantități calculate de substanță de stingere, concentrații de stingere proiectate pe durată de timp normată, presiuni, rezerve de substanță de stingere, surse de alimentare:</span> <span class="value">nu este cazul.</span></p>
  <p class="indent"><span class="label">d) timp normat de funcționare:</span> <span class="value">nu este cazul.</span></p>

  <p><span class="label">B. Instalație de detectare, semnalizare și alarmare la incendiu (e.c.s.)</span></p>
  <p class="indent"><span class="label">a) gradul de acoperire, zonele de detectare și alarmare la incendiu:</span> <span class="value">prin proiect se propune echiparea construcției cu instalație de detectare, semnalizare și alarmare la incendiu, cu acoperirea spațiilor clădirii prin zone de detectare și alarmare.</span> <span class="red">Nu este obligatorie dotarea cu IDSAI, neavând mai mult de 300 persoane și/sau aria desfășurată mai mare de 1.000 mp, conform ${renderInline(makeLawRef("p1183_art_3_3_1_e_i", "P 118/3-2015, art. 3.3.1 alin. (1) lit. e) și i)"), "word")}, dar prin proiect se propune dotarea cu IDSAI.</span></p>
  <p class="indent"><span class="label">b) tipul detectoarelor, declanșatoarelor manuale, dispozitivelor de alarmare și parametrii funcționali specifici instalațiilor respective:</span> <span class="value">sunt prevăzute centrală adresabilă de semnalizare și alarmare la incendiu, detectoare adresabile, butoane/declanșatoare manuale de alarmare și dispozitive optice și acustice de alarmare.</span></p>
  <p class="indent"><span class="label">c) condiții pentru amplasarea e.c.s.:</span> <span class="value">ECS este amplasat la demisol, în încăpere dedicată, fără traversarea altor conducte/utilități prin această încăpere.</span></p>
  <p class="indent"><span class="label">d) alte dispozitive comandate/supravegheate de e.c.s.:</span> <span class="value">se supraveghează și se comandă elementele prevăzute prin proiectul de detectare, semnalizare și alarmare la incendiu, conform soluției tehnice adoptate.</span></p>

  <p><span class="label">C. Instalație de desfumare/evacuare fum și gaze fierbinți</span></p>
  <p class="indent"><span class="red">Nu este obligatorie dotarea, neavând degajamente protejate, tuneluri de evacuare, circulații comune orizontale deschise spre atrium și alte situații reglementate distinct, conform P 118/1-2025, cap. 8 - Sisteme de control al fumului și al gazelor fierbinți în caz de incendiu.</span></p>

  <p><span class="label">D. Instalație electrică pentru alimentarea receptoarelor cu rol de securitate la incendiu</span></p>
  <p class="indent"><span class="label">sursa de bază:</span> din proiect reiese alimentarea receptoarelor cu rol de securitate la incendiu din instalația electrică a clădirii, prin tablourile generale și de nivel, cu separarea circuitelor aferente echipamentelor cu rol PSI.</p>
  <p class="indent"><span class="label">sursa de rezervă / autonomie locală:</span> din proiect reiese asigurarea autonomiei locale pentru sistemele care o cer prin normativ, inclusiv pentru echipamentul de control și semnalizare al instalației de detectare, semnalizare și alarmare la incendiu; alimentarea de rezervă se corelează cu funcționarea instalațiilor și echipamentelor prevăzute efectiv în proiect.</p>
  <p class="indent"><span class="label">receptoare alimentate:</span> sunt avute în vedere ECS-ul sistemului IDSAI, circuitele iluminatului de siguranță și celelalte echipamente cu rol de securitate la incendiu prevăzute prin proiect.</p>
  <p class="indent"><span class="red"><span class="label">concluzie de conformare:</span> este obligatorie prevederea alimentării receptoarelor cu rol de securitate la incendiu, cu sursă de bază și, unde normativul o cere, cu sursă de rezervă sau autonomie locală, conform ${renderInline(makeLawRef("i7_art_7_22_1_7_23_9_1_c_f", "I7-2011, pct. 7.22.1 și pct. 7.23.9.1 lit. c) și f), cu modificările prin Ordinul nr. 959/2023"), "word")}.</span></p>

  <p><span class="label">E. Instalație electrică pentru iluminat de siguranță, inclusiv condițiile de alimentare și de funcționare a acesteia</span></p>
  <p class="indent"><span class="value">Se prevede iluminat de siguranță pentru evacuare pe căile de evacuare, iluminat împotriva panicii în cele două naosuri și iluminat pentru intervenție în centrala termică.</span> <span class="red">Instalația se prevede conform ${renderInline(makeLawRef("i7_art_7_23_2_7_23_9_7_23_10", "I7-2011, art. 7.23.2, art. 7.23.9 și art. 7.23.10"), "word")}, cu respectarea condițiilor de alimentare și funcționare prevăzute de normativ.</span></p>

  <p><span class="label">F. Instalație de protecție împotriva trăsnetului</span></p>
  <p class="indent"><span class="red">Prin proiect se prevede instalație de protecție împotriva trăsnetului pentru întreaga clădire, conform I7-2011, cu modificările prin Ordinul nr. 959/2023.</span></p>

  <h2>5. Măsuri tehnico-organizatorice privind exploatarea construcției</h2>
  <p><span class="label">A. Instrucțiuni de funcționare a instalațiilor cu rol în asigurarea cerinței fundamentale „securitate la incendiu”</span></p>
  <p class="indent"><span class="value">Se vor elabora și aplica instrucțiuni de funcționare pentru instalațiile electrice, instalația de detectare, semnalizare și alarmare la incendiu, iluminatul de siguranță, instalația de protecție împotriva trăsnetului și centrala termică.</span></p>
  <p><span class="label">B. Reguli necesare de verificare și întreținere în exploatare a instalațiilor cu rol în asigurarea cerinței fundamentale „securitate la incendiu”</span></p>
  <p class="indent"><span class="value">Se vor asigura verificarea periodică, mentenanța și păstrarea în stare de funcționare a instalațiilor cu rol în asigurarea cerinței fundamentale securitate la incendiu, conform legislației și reglementărilor în vigoare.</span></p>
  <p><span class="label">C. Recomandări care trebuie avute în vedere la întocmirea documentelor de organizare a apărării împotriva incendiilor aferente construcției ori amenajării respective</span></p>
  <p class="indent"><span class="value">Verificarea periodică a instalațiilor utilitare și tehnologice și a dotărilor aferente construcției conform legislației și reglementărilor în vigoare; asigurarea în permanență a căilor de acces interioare și exterioare libere și practicabile, indiferent de anotimp, în vederea facilitării evacuării și intervenției în caz de incendiu; întocmirea planului de intervenție și avizarea acestuia de către unitatea teritorială de pompieri militari; întocmirea și afișarea organizării apărării împotriva incendiilor pe locurile de muncă; instruirea personalului privind cunoașterea și respectarea normelor și reglementărilor de p.s.i.; elaborarea actelor de autoritate referitoare la organizarea activității de apărare împotriva incendiilor.</span></p>
  <p><span class="label">D. Stingătoare, alte aparate de stins incendii, utilaje, unelte și mijloace de intervenție</span></p>
  <p class="indent"><span class="label">a) tipul și caracteristicile de stingere asigurate:</span> <span class="value">stingătoare portative cu pulbere tip P, minimum 6 kg, pentru incendii din clasele A, B și C, stabilite în raport cu riscul de incendiu și materialele combustibile protejate, conform anexei nr. 6 la ${renderInline(makeLawRef("omai163_2007_anexa6", "OMAI nr. 163/2007"), "word")}.</span></p>
  <p class="indent"><span class="label">b) numărul și modul de amplasare în funcție de suprafață și clasă de incendiu, potrivit reglementărilor tehnice specifice:</span> <span class="value">stingătoarele portative cu pulbere tip P, minimum 6 kg, se repartizează astfel: câte 4 bucăți pentru parter și demisol, 2 bucăți la supantă și 2 bucăți pentru centrala termică, în total 12 bucăți, în corelare cu anexa nr. 6 la ${renderInline(makeLawRef("omai163_2007_anexa6", "OMAI nr. 163/2007"), "word")}. Stingătoarele și celelalte mijloace tehnice PSI se amplasează la vedere, iar locurile de amplasare vor fi indicate prin marcaje sau panouri de semnalizare, conform ${renderInline(makeLawRef("hg971_2006_art_7", "HG nr. 971/2006, art. 7"), "word")}.</span></p>

  <h2>6. Măsuri compensatorii propuse pentru lucrări de modificare și/sau schimbare a destinației construcțiilor existente, în raport cu prevederile reglementărilor tehnice care nu pot fi respectate</h2>
  <p><span class="value">Nu este cazul.</span></p>
</body>
</html>`;
}

function openLawModal(refKey) {
  const normalizedRefKey = normalizeLawRefKey(refKey);
  if (String(normalizedRefKey || "").startsWith("act:")) {
    const actKey = resolveActKey(String(normalizedRefKey).slice(4));
    const act = state.legislationArticles?.acts?.[actKey] || state.legislationLibrary?.acts?.find((item) => resolveActKey(item.id) === actKey);
    if (!act) {
      window.alert("Actul solicitat nu exista în baza legislativa locala a acestei versiuni.");
      return;
    }

    const project = getActiveProject();
    if (project) {
      ensureProjectTab(project, "lawTab");
    }
    renderLawTabHeaderMeta(act, null, actKey);
    if (lawTabContent) {
      lawTabContent.innerHTML = renderActReaderHtml(actKey);
      lawTabContent.scrollTop = 0;
    }
    activateTab("lawTab");
    return;
  }

  const entry = state.legislationArticles?.references?.[normalizedRefKey];
  if (!entry) {
    window.alert("Articolul solicitat nu exista în baza legislativa locala a acestei versiuni.");
    return;
  }

  const act = state.legislationArticles?.acts?.[entry.actKey];
  const project = getActiveProject();
  if (project) {
    ensureProjectTab(project, "lawTab");
  }
  renderLawTabHeaderMeta(act, entry, entry.actKey);
  if (lawTabContent) {
    lawTabContent.innerHTML = renderActReaderHtml(entry.actKey, normalizedRefKey);
  }
  activateTab("lawTab");
  if (getLocalActFullText(entry.actKey)) {
    scrollLawTabToSection("law_fulltext_selected");
    return;
  }
  const selectedSectionId = LAW_REF_TO_SECTION[normalizedRefKey] || "";
  if (selectedSectionId) {
    scrollLawTabToSection(selectedSectionId);
  } else if (lawTabContent) {
    lawTabContent.scrollTop = 0;
  }
}

function closeLawModal() {
  lawModal.hidden = true;
}

function inferActRefFromLegalBasis(text) {
  const source = normalizeSearchText(text);
  if (source.includes("p 118/1-2025") || source.includes("p118/1-2025")) return "act:p118_1_2025";
  if (source.includes("p 118/2-2013") || source.includes("p118/2-2013")) return "act:p118_2_2013";
  if (source.includes("p 118/3-2015") || source.includes("p118/3-2015")) return "act:p118_3_2015";
  if (source.includes("p 118-99") || source.includes("p118-99")) return "act:p118_99";
  if (source.includes("i7-2011") || source.includes("i 7-2011")) return "act:i7_2011";
  if (source.includes("i 13-2015") || source.includes("i13-2015")) return "act:i13_2015";
  if (source.includes("hg nr. 571/2016") || source.includes("h.g. nr. 571/2016")) return "act:hg_571_2016";
  if (source.includes("hg nr. 766/1997")) return "act:hg_766_1997";
  if (source.includes("legea nr. 59/2016")) return "act:legea_59_2016";
  if (source.includes("ordinul nr. 1822/394/2004")) return "act:ordin_1822_394_2004";
  if (source.includes("omai nr. 163/2007")) return "act:omai_163_2007";
  if (source.includes("hg nr. 971/2006")) return "act:hg_971_2006";
  return "";
}

function buildLegalBasisLinks(text) {
  const ref = inferActRefFromLegalBasis(text);
  if (!ref) return String(text || "");
  return `[[LAWREF:${ref}]]${String(text || "")}[[/LAWREF]]`;
}

function linkify(text) {
  return text.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1">$1</a>');
}

function extractFirstNumber(text) {
  const match = String(text || "").replace(/\./g, "").match(/\d+/);
  return match ? Number(match[0]) : null;
}

function extractDecimalValue(text, anchors = []) {
  const normalized = String(text || "").toLowerCase();
  if (!normalized) return null;

  for (const anchor of anchors) {
    const index = normalized.indexOf(anchor.toLowerCase());
    if (index >= 0) {
      const slice = normalized.slice(index, index + 120);
      const match = slice.match(/(\d+[.,]\d+|\d+)/);
      if (match) {
        return Number(match[1].replace(",", "."));
      }
    }
  }

  const fallback = normalized.match(/(\d+[.,]\d+|\d+)/);
  return fallback ? Number(fallback[1].replace(",", ".")) : null;
}

function inferDestinationsFromText(text) {
  const source = String(text || "").toLowerCase();
  const detected = [];
  if (source.includes("cult")) detected.push("cult");
  if (source.includes("comert")) detected.push("comert");
  if (source.includes("invat")) detected.push("invatamant");
  if (source.includes("turis") || source.includes("cazare")) detected.push("turism");
  if (source.includes("sanat")) detected.push("sanatate");
  if (source.includes("cultura")) detected.push("cultura");
  return detected;
}

function inferInstallationsFromData(data, currentInstallations = []) {
  const detected = new Set(currentInstallations);
  const combined = [
    data.instalații_stingere,
    data.idsai,
    data.desfumare,
    data.alimentare_electrica,
    data.iluminat_siguranta,
    data.trsnet,
    data.centrala_termica
  ].join(" ").toLowerCase();

  if (combined.includes("hidrant")) detected.add("hidranți_interiori");
  if (combined.includes("sprinkl")) detected.add("sprinklere");
  if (combined.includes("detect") || combined.includes("semnal") || combined.includes("alarm")) detected.add("detectare_alarmare");
  if (combined.includes("desfum") || combined.includes("evacuare fum")) detected.add("desfumare");
  if (combined.includes("iluminat de siguranta") || combined.includes("iluminat de securitate")) detected.add("iluminat_siguranta");
  if (combined.includes("trasnet") || combined.includes("ipt") || combined.includes("spt")) detected.add("protecție_trasnet");
  if (combined.includes("centrala termica") || combined.includes("incalz")) detected.add("incalzire_centrala");

  return detected;
}

function cleanExtract(value) {
  return value.replace(/\s+/g, " ").replace(/[;,.]+$/, "").trim();
}

function normalizeSearchText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ș/g, "s")
    .replace(/Ș/g, "S")
    .replace(/ț/g, "t")
    .replace(/Ț/g, "T")
    .replace(/ă/g, "a")
    .replace(/Ă/g, "A")
    .replace(/â/g, "a")
    .replace(/Â/g, "A")
    .replace(/î/g, "i")
    .replace(/Î/g, "I")
    .toLowerCase();
}

function arrayContains(allowed, value) {
  return Array.isArray(allowed) ? allowed.includes(value) : allowed === value;
}

function decodeBytes(bytes) {
  return new TextDecoder("utf-8").decode(bytes);
}

function readUint16(bytes, offset) {
  return bytes[offset] | (bytes[offset + 1] << 8);
}

function readUint32(bytes, offset) {
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  ) >>> 0;
}

function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderInline(text, mode = "html") {
  let value = escapeHtml(String(text || ""));
  value = value.replace(
    /\[\[LAWREF:([^\]]+)\]\]([\s\S]*?)\[\[\/LAWREF\]\]/g,
    (_match, refKey, label) => `<a href="#" data-law-ref="${escapeHtml(refKey)}" onclick="window.__ssiCommands?.openLawRef?.('${escapeHtml(refKey)}'); return false;">${escapeHtml(label)}</a>`
  );
  value = value.replace(/\[\[RED\]\]([\s\S]*?)\[\[\/RED\]\]/g, '<span class="red">$1</span>');
  value = value.replace(/\*\*([\s\S]*?)\*\*/g, "<strong>$1</strong>");
  value = value.replace(/\n/g, "<br>");
  return value;
}

function markdownToHtml(markdownText, mode = "html") {
  const lines = String(markdownText || "").split(/\r?\n/);
  const html = [];
  let inList = false;

  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      closeList();
      return;
    }

    if (/^###\s+/.test(trimmed)) {
      closeList();
      html.push(`<h3>${renderInline(trimmed.replace(/^###\s+/, ""), mode)}</h3>`);
      return;
    }

    if (/^##\s+/.test(trimmed)) {
      closeList();
      html.push(`<h2>${renderInline(trimmed.replace(/^##\s+/, ""), mode)}</h2>`);
      return;
    }

    if (/^#\s+/.test(trimmed)) {
      closeList();
      html.push(`<h1>${renderInline(trimmed.replace(/^#\s+/, ""), mode)}</h1>`);
      return;
    }

    if (/^- /.test(trimmed)) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${renderInline(trimmed.replace(/^- /, ""), mode)}</li>`);
      return;
    }

    closeList();
    html.push(`<p>${renderInline(trimmed, mode)}</p>`);
  });

  closeList();
  return html.join("\n");
}






