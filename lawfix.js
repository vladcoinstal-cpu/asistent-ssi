(function () {
  const previousOpenLawModal = openLawModal;

  openLawModal = function openLawModalWithFallback(refKey) {
    let missingMessage = "";
    const originalAlert = window.alert;
    window.alert = (message) => {
      missingMessage = String(message || "");
    };

    try {
      previousOpenLawModal(refKey);
    } finally {
      window.alert = originalAlert;
    }

    if (!missingMessage) return;

    const normalizedRef = typeof normalizeLawRefKey === "function" ? normalizeLawRefKey(refKey) : String(refKey || "");
    const project = getActiveProject?.();
    if (project) {
      ensureProjectTab(project, "lawTab");
    }
    if (lawTabHeaderMeta) {
      lawTabHeaderMeta.textContent = "Referinta legislativa detectata automat";
    }
    if (lawTabContent) {
      lawTabContent.innerHTML = `
        <article class="rule-card">
          <strong>Referinta legislativa necartografiata inca</strong>
          <div class="source-meta">Cheie referinta: ${escapeHtml(normalizedRef)}</div>
          <p>Aplicatia a detectat aceasta trimitere in SSI, dar nu are inca articolul local mapat la textul integral. Verifica actul in sursa oficiala si adauga articolul in baza legislativa locala.</p>
        </article>
      `;
      lawTabContent.scrollTop = 0;
    }
    activateTab("lawTab");
  };

  window.__ssiCommands = {
    ...window.__ssiCommands,
    openLawRef: (refKey) => openLawModal(refKey)
  };
}());
