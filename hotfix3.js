(function () {
  function init() {
    if (!window.__ssiCommands || typeof state === "undefined" || typeof normalizeSearchText !== "function") {
      window.setTimeout(init, 150);
      return;
    }

    const normalizeDiscoveredLabel = (text) => String(text || "")
      .replace(/\s+/g, " ")
      .replace(/\s*nr\.?\s*/i, " nr. ")
      .replace(/\s*\/\s*/g, "/")
      .replace(/\s*-\s*/g, "-")
      .trim();

    const discoveryKey = (label) => normalizeSearchText(label)
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");

    const localeNumberPattern = /[0-9]{1,3}(?:[.\s][0-9]{3})+(?:[,.][0-9]+)?|[0-9]+(?:[,.][0-9]+)?/;

    function parseLocaleNumber(value) {
      const raw = String(value || "").replace(/\u00a0/g, " ").trim();
      const match = raw.match(localeNumberPattern);
      if (!match) return null;
      let text = match[0].replace(/\s+/g, "");
      const lastComma = text.lastIndexOf(",");
      const lastDot = text.lastIndexOf(".");
      if (lastComma >= 0 && lastDot >= 0) {
        const decimal = lastComma > lastDot ? "," : ".";
        const thousand = decimal === "," ? "." : ",";
        text = text.split(thousand).join("").replace(decimal, ".");
      } else if (lastDot >= 0) {
        const parts = text.split(".");
        text = parts.length > 1 && parts[parts.length - 1].length === 3
          ? parts.join("")
          : text;
      } else if (lastComma >= 0) {
        const parts = text.split(",");
        text = parts.length > 1 && parts[parts.length - 1].length === 3 && parts[0].length <= 3
          ? parts.join("")
          : text.replace(",", ".");
      }
      const parsed = Number(text);
      return Number.isFinite(parsed) ? parsed : null;
    }

    window.parseLocaleNumber = parseLocaleNumber;
    window.extractFirstNumber = extractFirstNumber = function (text) {
      return parseLocaleNumber(text);
    };
    window.extractDecimalValue = extractDecimalValue = function (text, anchors = []) {
      const source = String(text || "");
      if (!source) return null;
      for (const anchor of anchors) {
        const index = source.toLowerCase().indexOf(String(anchor || "").toLowerCase());
        if (index >= 0) {
          const value = parseLocaleNumber(source.slice(index, index + 160));
          if (value !== null) return value;
        }
      }
      return parseLocaleNumber(source);
    };

    if (typeof parseDimensionParts === "function") {
      parseDimensionParts = window.parseDimensionParts = function (rawValue) {
        const raw = sanitizeDisplayText(rawValue);
        const normalizedRaw = raw
          .replace(/\u00a0/g, " ")
          .replace(/inaltime/gi, "inaltime")
          .replace(/desfasurat/gi, "desfasurat")
          .replace(/construita/gi, "construita")
          .replace(/([0-9])\s*m\s*([23²³])/gi, "$1 m$2")
          .replace(/([0-9])m([23²³])/gi, "$1 m$2")
          .replace(/([0-9])m\b/gi, "$1 m");
        const num = "[0-9]{1,3}(?:[.\\s][0-9]{3})*(?:[,.][0-9]+)?|[0-9]+(?:[,.][0-9]+)?";
        const regimMatch =
          normalizedRaw.match(/regim(?:ul)?\s+de\s+(?:inaltime|[îi]n[ăa]l[țt]ime)\s*[: ]\s*([^;.\n]+)/i) ||
          normalizedRaw.match(/((?:demisol|subsol|parter|supant[ăa]|mansard[ăa]|etaj)[^;.\n]*?(?:D|S|P|M|Sp)(?:\s*\+\s*(?:D|S|P|M|Sp))*)/i) ||
          normalizedRaw.match(/((?:D|S|P|M|Sp)(?:\s*\+\s*(?:D|S|P|M|Sp))+)/i);
        const heightMatch = normalizedRaw.match(new RegExp(`(?:(?:inaltime|[îi]n[ăa]l[țt](?:imea|imea?\\s+maxim[ăa]|țimea\\s+maxim[ăa]))[^:;]*[: ]\\s*|[îi]n[ăa]l[țt]imea?\\s+maxim[ăa]\\s+a\\s+cl[ăa]dirii\\s*[: ]\\s*)(${num}\\s*m)`, "i"));
        const volumeMatch = normalizedRaw.match(new RegExp(`volum(?:ul)?(?:\\s+construc[țt]iei)?[^:;]*[: ]\\s*(${num}\\s*m(?:3|³|c))`, "i"));
        const builtMatch = normalizedRaw.match(new RegExp(`aria\\s+construit[ăa]?[^:;]*[: ]\\s*(${num}\\s*m(?:2|²|p))`, "i"));
        const totalMatch = normalizedRaw.match(new RegExp(`aria\\s+(?:desfasurat[ăa]?|desf[ăa][șs]urat[ăa])[^:;]*[: ]\\s*(${num}\\s*m(?:2|²|p))`, "i"));
        return {
          regim: regimMatch?.[1]?.trim() || "",
          inaltime: heightMatch?.[1]?.trim() || "",
          volum: volumeMatch?.[1]?.trim() || "",
          ariaConstruita: builtMatch?.[1]?.trim() || "",
          ariaDesfasurata: totalMatch?.[1]?.trim() || "",
          raw: normalizedRaw
        };
      };
    }

    const sourceSnippetFor = (needle, content) => {
      const clean = String(content || "").replace(/\s+/g, " ");
      const idx = clean.toLowerCase().indexOf(String(needle || "").toLowerCase().slice(0, 24));
      if (idx < 0) return clean.slice(0, 220);
      return clean.slice(Math.max(0, idx - 80), idx + 220);
    };

    const knownActForLabel = (label) => {
      const needle = normalizeSearchText(label).replace(/\s+/g, " ");
      const articleActs = Object.entries(state.legislationArticles?.acts || {}).map(([id, act]) => ({ id, ...act }));
      const ruleActs = (state.legislationLibrary?.acts || []).map((act) => ({ id: resolveActKey(act.id), ...act }));
      return [...articleActs, ...ruleActs].find((act) => {
        const hay = normalizeSearchText(`${act.id || ""} ${act.title || ""} ${act.url || ""}`).replace(/\s+/g, " ");
        return hay.includes(needle) || needle.includes(normalizeSearchText(act.id || ""));
      }) || null;
    };

    function detectLegislationCandidatesFromSources() {
      const rows = [];
      const seen = new Set();
      const specs = [
        { type: "lege", re: /\bLegea\s+nr\.?\s*([\d.]+)\s*\/\s*(\d{4})/gi, make: (m) => `Legea nr. ${m[1]}/${m[2]}` },
        { type: "hotarare guvern", re: /\b(?:H\.?\s*G\.?|HG)\s+nr\.?\s*([\d.]+)\s*\/\s*(\d{4})/gi, make: (m) => `HG nr. ${m[1]}/${m[2]}` },
        { type: "ordin", re: /\b(?:Ordinul|OMAI|Ordinul\s+MAI)\s+nr\.?\s*([\d.]+)\s*\/\s*(\d{4})/gi, make: (m) => `Ordinul nr. ${m[1]}/${m[2]}` },
        { type: "normativ", re: /\bP\s*118\s*\/\s*([123])\s*[-\/]\s*(\d{4})/gi, make: (m) => `P 118/${m[1]}-${m[2]}` },
        { type: "normativ", re: /\bP\s*118\s*[-\/]\s*(99|1999)\b/gi, make: () => "P 118-99" },
        { type: "normativ", re: /\bI\s*7\s*[-\/]\s*(\d{4})/gi, make: (m) => `I 7-${m[1]}` },
        { type: "normativ", re: /\bI\s*13\s*[-\/]\s*(\d{4})/gi, make: (m) => `I 13-${m[1]}` },
        { type: "normativ", re: /\bCR\s*0\s*[-\/]\s*(\d{4})/gi, make: (m) => `CR 0-${m[1]}` },
        { type: "regulament european", re: /\bRegulamentul\s*\(CE\)\s*nr\.?\s*1272\s*\/\s*2008/gi, make: () => "Regulamentul (CE) nr. 1272/2008" }
      ];

      (state.sources || []).forEach((source) => {
        const content = source.content || "";
        specs.forEach((spec) => {
          let match;
          while ((match = spec.re.exec(content)) !== null) {
            const label = normalizeDiscoveredLabel(spec.make(match));
            const key = discoveryKey(label);
            if (seen.has(key)) continue;
            seen.add(key);
            const known = knownActForLabel(label);
            const lookup = `https://legislatie.just.ro/Public/RezultateCautare?keyword=${encodeURIComponent(label)}`;
            rows.push({
              key,
              label,
              type: spec.type,
              sourceName: source.name || "sursa fara nume",
              snippet: sourceSnippetFor(match[0], content),
              knownActId: known?.id || "",
              knownTitle: known?.title || "",
              knownUrl: known?.url || "",
              officialLookupUrl: known?.url || lookup,
              status: known ? "in_baza_locala" : "candidat_neverificat",
              integrationStatus: known
                ? "Act existent in baza. Verifica Lege/articol pentru textul integral."
                : "Act nou detectat. Trebuie verificat in sursa oficiala, apoi introdus in legislation-discovery/pending-acts.json pentru workflow."
            });
          }
        });
      });
      state.legislationDiscovery = rows;
      return rows;
    }

    window.discoverAndStoreLegislationFromSources = function () {
      return detectLegislationCandidatesFromSources().filter((item) => item.status !== "in_baza_locala");
    };

    function renderLegislationDiscoveryCard() {
      const rows = state.legislationDiscovery || [];
      if (!rows.length) return "";
      const pending = rows.filter((row) => row.status !== "in_baza_locala");
      const payload = {
        generatedAt: new Date().toISOString(),
        source: "Extrage - candidati detectati in memorii",
        acts: pending.map((row) => ({
          id: row.key,
          title: row.label,
          type: row.type,
          status: "candidate_unverified",
          url: "",
          officialLookupUrl: row.officialLookupUrl,
          sourceName: row.sourceName,
          snippet: row.snippet
        }))
      };
      return `
        <article class="rule-card" data-ssi-legislation-discovery="true">
          <strong>Acte legislative detectate de Extrage</strong>
          <div class="source-meta">${rows.length} trimiteri gasite; ${pending.length} necesita verificare/integrate in arhiva.</div>
          <ul class="issues-bullets">
            ${rows.map((row) => `
              <li>
                <strong>${escapeHtml(row.label)}</strong> - ${row.status === "in_baza_locala" ? "exista in baza locala" : "nou / neverificat"}.
                <a href="${escapeHtml(row.officialLookupUrl)}" target="_blank" rel="noreferrer">verifica sursa oficiala</a><br>
                <span class="source-meta">${escapeHtml(row.integrationStatus)}</span>
              </li>
            `).join("")}
          </ul>
          ${pending.length ? `<details><summary>JSON pentru integrare controlata in workflow</summary><pre class="law-fulltext-pre">${escapeHtml(JSON.stringify(payload, null, 2))}</pre></details>` : ""}
        </article>
      `;
    }

    function normalizeComparableText(value) {
      return normalizeSearchText(String(value || ""))
        .replace(/\[[^\]]+\]/g, "")
        .replace(/[^a-z0-9]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    }

    function readLineValue(content, regex) {
      const lines = String(content || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
      for (const line of lines) {
        const match = line.match(regex);
        if (match) return (match[1] || match[0]).replace(/^.*?[:\-]\s*/i, "").trim();
      }
      return "";
    }

    function detectSourceDiscrepancies() {
      const specs = [
        { key: "denumire", label: "Denumire obiectiv", re: /\bdenumir(?:ea|e)\s+(?:obiectivului|obiectiv|constructiei|investitiei)\s*[:\-]\s*(.+)/i },
        { key: "beneficiar", label: "Beneficiar", re: /\b(?:beneficiar|proprietar|investitor)\s*[:\-]\s*(.+)/i },
        { key: "adresa", label: "Adresa", re: /\b(?:adresa|amplasament)(?:\s+obiectivului)?\s*[:\-]\s*(.+)/i },
        { key: "regim", label: "Regim de inaltime", re: /regim(?:ul)?\s+de\s+(?:inaltime|[îi]n[ăa]l[țt]ime)\s*[:\-]\s*([^;.\n]+)/i },
        { key: "ariaConstruita", label: "Aria construita", re: /aria\s+construit[ăa]?\s*[:\-]\s*([^;.\n]+)/i, numeric: true },
        { key: "ariaDesfasurata", label: "Aria desfasurata", re: /aria\s+(?:desfasurat[ăa]?|desf[ăa][șs]urat[ăa])\s*[:\-]\s*([^;.\n]+)/i, numeric: true },
        { key: "volum", label: "Volum", re: /volum(?:ul)?(?:\s+construc[țt]iei)?\s*[:\-]\s*([^;.\n]+)/i, numeric: true },
        { key: "utilizatori", label: "Numar utilizatori", re: /num[aă]r(?:ul)?(?:\s+maxim)?\s+(?:de\s+)?utilizatori\s*[:\-]\s*([^;.\n]+)/i, numeric: true }
      ];
      const sources = (state.sources || []).filter((source) => String(source.content || "").trim());
      const rows = [];
      specs.forEach((spec) => {
        const values = sources
          .map((source) => {
            const value = readLineValue(source.content, spec.re);
            if (!value) return null;
            const normalized = spec.numeric
              ? String(parseLocaleNumber(value))
              : normalizeComparableText(value);
            if (!normalized || normalized === "null") return null;
            return { sourceName: source.name || "sursa fara nume", value, normalized };
          })
          .filter(Boolean);
        const distinct = Array.from(new Set(values.map((item) => item.normalized)));
        if (distinct.length > 1) {
          rows.push({ key: spec.key, label: spec.label, values });
        }
      });
      state.sourceDiscrepancies = rows;
      return rows;
    }

    window.detectSourceDiscrepancies = detectSourceDiscrepancies;

    function renderSourceDiscrepancyCard() {
      const rows = detectSourceDiscrepancies();
      if (!rows.length) return "";
      return `
        <article class="rule-card" data-ssi-source-discrepancies="true">
          <strong>Neconcordante intre memorii</strong>
          <div class="source-meta">${rows.length} campuri au valori diferite intre sursele proiectului.</div>
          <ul class="issues-bullets">
            ${rows.slice(0, 12).map((row) => `
              <li>
                <strong>${escapeHtml(row.label)}</strong>:
                ${row.values.map((item) => `${escapeHtml(item.sourceName)} = ${escapeHtml(item.value)}`).join(" | ")}
              </li>
            `).join("")}
          </ul>
        </article>
      `;
    }

    function removeLegislationCardsFromIssues() {
      if (!issuesOutput) return;
      issuesOutput.querySelectorAll("article.rule-card").forEach((card) => {
        const title = card.querySelector("strong")?.textContent || "";
        if (/Acte legislative (?:noi descoperite automat|detectate de Extrage)/i.test(title)) {
          card.remove();
        }
      });
    }

    function renderDiscoveryInRules() {
      if (!rulesOutput) return;
      rulesOutput.querySelectorAll("[data-ssi-legislation-discovery]").forEach((node) => node.remove());
      const card = renderLegislationDiscoveryCard();
      if (card) rulesOutput.insertAdjacentHTML("afterbegin", card);
    }

    const nativeRenderIssuesOutput = window.renderIssuesOutput || renderIssuesOutput;
    window.renderIssuesOutput = renderIssuesOutput = function () {
      nativeRenderIssuesOutput();
      if (!issuesOutput) return;
      removeLegislationCardsFromIssues();
      const discrepancyCard = renderSourceDiscrepancyCard();
      if (discrepancyCard) issuesOutput.insertAdjacentHTML("afterbegin", discrepancyCard);
      renderDiscoveryInRules();
    };

    if (typeof refreshRulesOutput === "function") {
      const nativeRefreshRulesOutput = window.refreshRulesOutput || refreshRulesOutput;
      window.refreshRulesOutput = refreshRulesOutput = function () {
        nativeRefreshRulesOutput();
        renderDiscoveryInRules();
      };
    }

    if (typeof handleExtractData === "function") {
      const nativeHandleExtractData = window.handleExtractData || handleExtractData;
      window.handleExtractData = handleExtractData = async function () {
        const result = await nativeHandleExtractData();
        detectLegislationCandidatesFromSources();
        detectSourceDiscrepancies();
        if (typeof refreshRulesOutput === "function") refreshRulesOutput();
        renderIssuesOutput();
        return result;
      };
    }

    if (typeof resetProjectState === "function") {
      const nativeResetProjectState = window.resetProjectState || resetProjectState;
      window.resetProjectState = resetProjectState = function () {
        state.legislationDiscovery = [];
        state.sourceDiscrepancies = [];
        return nativeResetProjectState();
      };
    }

    const previousExtract = window.__ssiCommands.extractData;
    window.__ssiCommands.extractData = async function () {
      const result = await previousExtract?.();
      detectLegislationCandidatesFromSources();
      detectSourceDiscrepancies();
      if (typeof refreshRulesOutput === "function") refreshRulesOutput();
      renderIssuesOutput();
      return result;
    };

    const previousReset = window.__ssiCommands.resetProject;
    window.__ssiCommands.resetProject = function () {
      state.legislationDiscovery = [];
      state.sourceDiscrepancies = [];
      return previousReset?.();
    };
  }

  init();
}());
