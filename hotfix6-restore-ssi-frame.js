(function () {
  function init() {
    if (
      typeof state === "undefined" ||
      typeof buildScenarioMarkdown !== "function" ||
      typeof buildPreliminaryScenarioMarkdown !== "function" ||
      typeof renderDocLikePreview !== "function" ||
      typeof normalReportOutput === "undefined" ||
      typeof preliminaryReportOutput === "undefined"
    ) {
      window.setTimeout(init, 150);
      return;
    }

    if (typeof window.extractAggregateFactsFromContent !== "function" && typeof runExtraction === "function") {
      window.extractAggregateFactsFromContent = (content) => runExtraction([{ name: "Auto-test", content: String(content || "") }]);
    }

    function activeProject() {
      try {
        return typeof getActiveProject === "function" ? getActiveProject() : null;
      } catch {
        return null;
      }
    }

    function syncBeforeBuild() {
      try { if (typeof syncFieldsFromForm === "function") syncFieldsFromForm(); } catch {}
      try { if (typeof syncProjectProfile === "function") syncProjectProfile(); } catch {}
      try { if (typeof evaluateApplicableActs === "function") evaluateApplicableActs(); } catch {}
      try { if (typeof evaluateActCoverageForProject === "function") evaluateActCoverageForProject(); } catch {}
      try { if (typeof evaluateComplianceChecks === "function") evaluateComplianceChecks(); } catch {}
    }

    function isShortBrokenFrame(text) {
      const value = String(text || "");
      return /Cadru generat curat|ssi-frame-readonly|Structura este incarcata din fisierul read-only/i.test(value) ||
        !/1\.1\.\s*Datele de identificare/i.test(value) ||
        !/3\.1\.\s*Rezisten/i.test(value) ||
        !/4\.1\.\s*Hidran/i.test(value);
    }

    function buildFullReports() {
      syncBeforeBuild();
      const normalBase = buildScenarioMarkdown(
        state.data || {},
        state.sources || [],
        state.applicableActs || [],
        state.complianceChecks || []
      );
      const preliminary = buildPreliminaryScenarioMarkdown(
        state.data || {},
        state.sources || [],
        state.applicableActs || [],
        state.projectProfile || {},
        state.complianceChecks || []
      );
      const normal = buildCompleteNormalFromAnnexFrame(normalBase, preliminary);
      return { normal, preliminary };
    }

    function buildCompleteNormalFromAnnexFrame(normalBase, preliminary) {
      const base = String(normalBase || "");
      const prelim = String(preliminary || "");
      const baseBodyIndex = base.search(/^##\s+1\.\s+/m);
      const prelimBodyIndex = prelim.search(/^##\s+1\.\s+/m);
      if (prelimBodyIndex < 0) return base;
      const header = baseBodyIndex >= 0 ? base.slice(0, baseBodyIndex).trim() : `# Scenariu de securitate la incendiu - draft de lucru

## Nota
Acest document este un draft asistat, generat pe structura-cadru din Anexa nr. 4 la Ordinul MAI nr. 180/2022. Revizuirea de catre proiectantii de specialitate si verificatorii atestati ramane obligatorie.`;
      const body = prelim.slice(prelimBodyIndex)
        .replace(/^##\s+2\.\s+Nivelurile riscului de incendiu estimat/im, "## 2. Nivelurile riscului de incendiu")
        .replace(/SCENARIU DE SECURITATE LA INCENDIU PRELIMINAR/g, "SCENARIU DE SECURITATE LA INCENDIU");
      return `${header}\n\n${body}`.trim();
    }

    function writeFullReports(force) {
      const project = activeProject();
      const reports = buildFullReports();

      if (force || isShortBrokenFrame(normalReportOutput.value)) {
        normalReportOutput.value = reports.normal;
      }
      if (force || isShortBrokenFrame(preliminaryReportOutput.value)) {
        preliminaryReportOutput.value = reports.preliminary;
      }

      if (project) {
        project.normalReport = normalReportOutput.value;
        project.preliminaryReport = preliminaryReportOutput.value;
      }

      try { restoredRenderDocLikePreview("normal"); } catch {}
      try { restoredRenderDocLikePreview("preliminary"); } catch {}
      try { if (typeof refreshCounters === "function") refreshCounters(); } catch {}
    }

    function markdownPreviewHtml(markdown) {
      if (typeof markdownToHtml === "function") {
        return markdownToHtml(markdown, "html");
      }
      return String(markdown || "")
        .split(/\n{2,}/)
        .map((part) => `<p>${typeof escapeHtml === "function" ? escapeHtml(part) : part}</p>`)
        .join("");
    }

    function restoredRenderDocLikePreview(type) {
      const output = type === "preliminary" ? preliminaryReportOutput : normalReportOutput;
      const preview = type === "preliminary"
        ? (typeof preliminaryReportPreview !== "undefined" ? preliminaryReportPreview : null)
        : (typeof normalReportPreview !== "undefined" ? normalReportPreview : null);
      if (!preview || !output) return;
      preview.innerHTML = `<div class="doc-preview-surface">${markdownPreviewHtml(output.value || "")}</div>`;
    }

    const previousRenderPreview = renderDocLikePreview;
    renderDocLikePreview = window.renderDocLikePreview = function (type) {
      try {
        restoredRenderDocLikePreview(type);
      } catch (error) {
        previousRenderPreview(type);
      }
    };

    if (typeof generateReportsForActiveProject === "function") {
      generateReportsForActiveProject = window.generateReportsForActiveProject = function () {
        writeFullReports(true);
        try {
          if (typeof activateTab === "function") activateTab("normalTab");
        } catch {}
      };
    }

    if (typeof handleExtractData === "function") {
      const previousExtract = handleExtractData;
      handleExtractData = window.handleExtractData = async function () {
        const result = await previousExtract();
        writeFullReports(true);
        try {
          if (typeof saveActiveProjectStateFromUI === "function") saveActiveProjectStateFromUI();
          if (typeof persistWorkspace === "function") persistWorkspace();
        } catch {}
        return result;
      };
    }

    if (typeof resetProjectState === "function") {
      const previousReset = resetProjectState;
      resetProjectState = window.resetProjectState = function () {
        const result = previousReset();
        writeFullReports(true);
        return result;
      };
    }

    if (typeof loadProjectIntoUI === "function") {
      const previousLoad = loadProjectIntoUI;
      loadProjectIntoUI = window.loadProjectIntoUI = function (projectId) {
        const result = previousLoad(projectId);
        writeFullReports(false);
        return result;
      };
    }

    if (window.__ssiCommands) {
      window.__ssiCommands = {
        ...window.__ssiCommands,
        extractData: () => handleExtractData(),
        resetProject: () => resetProjectState(),
        openAutotest: async () => {
          if (typeof activateTab === "function") activateTab("autotestTab");
          if (typeof runAutotestSuite === "function") await runAutotestSuite();
        },
        restoreFullSsiFrame: () => writeFullReports(true)
      };
    }

    writeFullReports(false);
  }

  init();
}());
