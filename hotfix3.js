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
        <article class="rule-card">
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

    const nativeRenderIssuesOutput = window.renderIssuesOutput || renderIssuesOutput;
    window.renderIssuesOutput = renderIssuesOutput = function () {
      nativeRenderIssuesOutput();
      if (!issuesOutput) return;
      const card = renderLegislationDiscoveryCard();
      if (card) issuesOutput.insertAdjacentHTML("afterbegin", card);
    };

    const previousReset = window.__ssiCommands.resetProject;
    window.__ssiCommands.resetProject = function () {
      state.legislationDiscovery = [];
      return previousReset?.();
    };
  }

  init();
}());
