(function () {
  const duplicateInlineHandlers = [
    ["addTextBtn", "onclick"],
    ["extractBtn", "onclick"],
    ["resetBtn", "onclick"],
    ["projectAddBtn", "onclick"],
    ["openSourcesQuickBtn", "onclick"],
    ["openFieldsQuickBtn", "onclick"],
    ["openRulesQuickBtn", "onclick"],
    ["menuNewProjectBtn", "onclick"],
    ["fileInput", "onchange"],
    ["projectSelector", "onchange"]
  ];

  duplicateInlineHandlers.forEach(([id, attr]) => {
    document.getElementById(id)?.removeAttribute(attr);
  });

  const normalizeUnit = (value) => String(value || "")
    .replace(/\s*mp\b/i, " m2")
    .replace(/\s*mc\b/i, " m3")
    .replace(/\s+/g, " ")
    .trim();

  const clean = (value) => cleanExtract(String(value || ""));

  customExtractors.denumire_obiectiv = function denumireObiectiv(lines) {
    const joined = lines.join(" ");
    const match = joined.match(/\bdenumire\s+obiectiv\s*[:\-]\s*([^.\n]{3,220})/i)
      || joined.match(/\bdenumirea\s+(?:obiectivului|constructiei|investitiei)\s*[:\-]\s*([^.\n]{3,220})/i);
    return match ? clean(match[1]) : "";
  };

  customExtractors.beneficiar = function beneficiar(lines) {
    const directLine = lines.find((line) => /(?:beneficiar|proprietar|investitor)\s*[:\-]/i.test(line));
    if (directLine) {
      return cleanBeneficiaryText(directLine.replace(/^(?:beneficiar|proprietar|investitor)\s*[:\-]\s*/i, ""));
    }
    const joined = lines.join(" ");
    const match = joined.match(/\b(Parohia\b[^.\n]{3,200})/i)
      || joined.match(/(?:beneficiar|proprietar|investitor)\s*[:\-]\s*([^.\n]{3,200})/i);
    return match ? cleanBeneficiaryText(match[1] || match[0]) : "";
  };

  customExtractors.caracteristici_dimensionale = function caracteristiciDimensionale(lines) {
    const joined = lines.join(" ");
    const regim = joined.match(/regim(?:ul)?\s+de\s+inaltime\s*[:\-]?\s*([^;.\n]+)/i)?.[1]?.trim();
    const inaltime = joined.match(/inaltimea?\s+maxima(?:\s+a\s+cladirii)?\s*[:\-]?\s*([0-9][0-9., ]*\s*m)\b/i)?.[1]?.trim();
    const volum = joined.match(/volum(?:ul)?(?:\s+construit|\s+constructiei)?\s*[:\-]?\s*([0-9][0-9., ]*\s*(?:m3|m³|mc))\b/i)?.[1]?.trim();
    const ariaC = joined.match(/aria\s+construit[ăa]\s*[:\-]?\s*([0-9][0-9., ]*\s*(?:m2|m²|mp))\b/i)?.[1]?.trim();
    const ariaD = joined.match(/aria\s+desf[ăa][șs]urat[ăa]\s*[:\-]?\s*([0-9][0-9., ]*\s*(?:m2|m²|mp))\b/i)?.[1]?.trim();
    const parts = [];
    if (regim) parts.push(`regim de inaltime: ${regim}`);
    if (inaltime) parts.push(`inaltime maxima: ${normalizeUnit(inaltime)}`);
    if (volum) parts.push(`volum: ${normalizeUnit(volum)}`);
    if (ariaC) parts.push(`aria construită: ${normalizeUnit(ariaC)}`);
    if (ariaD) parts.push(`aria desfășurată: ${normalizeUnit(ariaD)}`);
    return parts.join("; ");
  };

  const originalEvacuare = customExtractors.evacuare;
  customExtractors.evacuare = function evacuare(lines, content) {
    const joined = lines.join(" ");
    const users = joined.match(/evacuarea\s+utilizatorilor[^.]*\./i)?.[0];
    return [users, originalEvacuare?.(lines, content)].filter(Boolean).map(clean).join(" ");
  };

  syncProfileFromDataHints = function syncProfileFromDataHintsFixed() {
    const tipCladire = String(state.data.tip_cladire || "").toLowerCase();
    const functiuni = String(state.data.funcțiuni || "").toLowerCase();
    const idsai = String(state.data.idsai || "").toLowerCase();
    const stingere = String(state.data.instalații_stingere || "").toLowerCase();
    const desfumare = String(state.data.desfumare || "").toLowerCase();
    const iluminat = String(state.data.iluminat_siguranta || "").toLowerCase();
    const trasnet = String(state.data.trsnet || "").toLowerCase();
    const numar = extractFirstNumber(state.data.numar_utilizatori);
    const adresa = String(state.data.adresa || "").toLowerCase();

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
    if (functiuni.includes("comert")) destinations.add("comert");
    if (functiuni.includes("invat")) destinations.add("invatamant");
    if (functiuni.includes("turis") || functiuni.includes("cazare")) destinations.add("turism");
    if (functiuni.includes("sanat")) destinations.add("sanatate");
    if (functiuni.includes("cult")) destinations.add("cult");
    if (functiuni.includes("parc")) destinations.add("parcaj");
    if (functiuni.includes("administr")) destinations.add("administrativa");
    state.projectProfile.destinations = Array.from(destinations);

    if (adresa.includes("demisol") || String(state.data.caracteristici_dimensionale || "").toLowerCase().includes("demisol")) {
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
    if (String(state.data.centrala_termica || "").toLowerCase()) installations.add("incalzire_centrala");
    if (String(state.data.desfumare || "").toLowerCase()) installations.add("ventilare_climatizare");
    state.projectProfile.installations = Array.from(installations);
  };

  buildProjectFactsSummaryEntries = function buildProjectFactsSummaryEntriesFixed() {
    const destinations = String(state.data.funcțiuni || "").trim()
      || (Array.isArray(state.projectProfile.destinations) && state.projectProfile.destinations.length
        ? state.projectProfile.destinations.join(", ")
        : "");
    const dimensions = deriveDimensionParts(state.data, state.sources);
    const surfaceParts = [
      dimensions.ariaConstruita ? `arie construita: ${dimensions.ariaConstruita}` : "",
      dimensions.ariaDesfasurata ? `arie desfasurata: ${dimensions.ariaDesfasurata}` : "",
      dimensions.volum ? `volum: ${dimensions.volum}` : ""
    ].filter(Boolean).join("; ");
    const heightParts = [
      dimensions.regim ? `regim: ${dimensions.regim}` : "",
      dimensions.inaltime ? `inaltime: ${dimensions.inaltime}` : ""
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
  };
}());
