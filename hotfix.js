(function(){
  const blankData=()=>Object.fromEntries(annexFields.map((field)=>[field.key,""]));
  const cleanValue=(value)=>cleanExtract(String(value||""));
  function bindClick(id,handler){
    const element=document.getElementById(id);
    if(!element)return;
    element.removeAttribute("onclick");
    element.onclick=null;
    element.addEventListener("click",(event)=>{
      event.preventDefault();
      event.stopImmediatePropagation();
      handler(event);
    },true);
  }
  function hideAutotest(){
    document.querySelectorAll('[data-tab-target="autotestTab"],#openAutotestBtn,#autotestTab').forEach((element)=>{
      element.hidden=true;
      element.remove();
    });
  }
  function clearProjectExtractionState(){
    state.data=blankData();
    state.projectProfile=getDefaultProjectProfile();
    state.applicableActs=[];
    state.complianceChecks=[];
    state.rulesCoverage=[];
    state.actCoverageChecks=[];
    normalReportOutput.value="";
    preliminaryReportOutput.value="";
    renderFields();
    renderProfile();
    refreshFieldValues();
    refreshProfileValues();
    refreshCounters();
    renderDocLikePreview("normal");
    renderDocLikePreview("preliminary");
    renderIssuesOutput();
  }
  function sanitizeProject(project){
    if(!project)return;
    project.sources=Array.isArray(project.sources)?safeClone(project.sources):[];
    project.data={...blankData(),...(project.data&&typeof project.data==="object"?project.data:{})};
    project.projectProfile={...getDefaultProjectProfile(),...(project.projectProfile&&typeof project.projectProfile==="object"?project.projectProfile:{})};
    project.applicableActs=Array.isArray(project.applicableActs)?safeClone(project.applicableActs):[];
    project.complianceChecks=Array.isArray(project.complianceChecks)?safeClone(project.complianceChecks):[];
    project.rulesCoverage=Array.isArray(project.rulesCoverage)?safeClone(project.rulesCoverage):[];
    project.actCoverageChecks=Array.isArray(project.actCoverageChecks)?safeClone(project.actCoverageChecks):[];
    if(project.activeTab==="autotestTab")project.activeTab="sourcesTab";
    project.openTabs=Array.isArray(project.openTabs)?project.openTabs.filter((tabId)=>tabId&&tabId!=="autotestTab"):["sourcesTab"];
    if(!project.openTabs.includes("sourcesTab"))project.openTabs.unshift("sourcesTab");
  }
  syncProfileFromDataHints=function(){
    const txt=(key)=>String(state.data[key]||"").toLowerCase();
    const tipCladire=txt("tip_cladire"),functiuni=txt("funcțiuni"),idsai=txt("idsai"),stingere=txt("instalații_stingere"),desfumare=txt("desfumare"),iluminat=txt("iluminat_siguranta"),trasnet=txt("trsnet"),adresa=txt("adresa");
    const numar=extractFirstNumber(state.data.numar_utilizatori);
    if(!state.projectProfile.buildingClass){
      if(tipCladire.includes("mixt"))state.projectProfile.buildingClass="mixta";
      if(tipCladire.includes("depoz"))state.projectProfile.buildingClass="depozitare";
      if(tipCladire.includes("product"))state.projectProfile.buildingClass="productie";
      if(tipCladire.includes("civ"))state.projectProfile.buildingClass="civila";
    }
    if(!state.projectProfile.occupantCount&&numar!==null)state.projectProfile.occupantCount=numar;
    const destinations=new Set(state.projectProfile.destinations||[]);
    if(functiuni.includes("comert"))destinations.add("comert");
    if(functiuni.includes("invat"))destinations.add("invatamant");
    if(functiuni.includes("turis")||functiuni.includes("cazare"))destinations.add("turism");
    if(functiuni.includes("sanat"))destinations.add("sanatate");
    if(functiuni.includes("cult"))destinations.add("cult");
    if(functiuni.includes("parc"))destinations.add("parcaj");
    if(functiuni.includes("administr"))destinations.add("administrativa");
    state.projectProfile.destinations=Array.from(destinations);
    if(adresa.includes("demisol")||txt("caracteristici_dimensionale").includes("demisol"))state.projectProfile.hasBasement=true;
    const installations=new Set(state.projectProfile.installations||[]);
    if(stingere)installations.add("stingere");
    if(stingere.includes("hidrant"))installations.add("hidranti_interiori");
    if(stingere.includes("sprink"))installations.add("sprinklere");
    if(idsai)installations.add("detectare_alarmare");
    if(desfumare)installations.add("desfumare");
    if(iluminat)installations.add("iluminat_siguranta");
    if(trasnet)installations.add("protectie_trasnet");
    if(txt("centrala_termica"))installations.add("incalzire_centrala");
    if(desfumare)installations.add("ventilare_climatizare");
    state.projectProfile.installations=Array.from(installations);
  };
  const originalCreateBlankProject=createBlankProject;
  createBlankProject=function(name){
    const project=originalCreateBlankProject(name);
    sanitizeProject(project);
    return project;
  };
  const originalLoadProjectIntoUI=loadProjectIntoUI;
  loadProjectIntoUI=function(projectId){
    const project=getProjectById(projectId);
    sanitizeProject(project);
    clearProjectExtractionState();
    originalLoadProjectIntoUI(projectId);
    hideAutotest();
  };
  const originalHandleExtractData=handleExtractData;
  handleExtractData=async function(){
    const targetProjectId=workspaceState.activeProjectId;
    if(!state.sources.length)return originalHandleExtractData();
    clearProjectExtractionState();
    await originalHandleExtractData();
    sanitizeProject(getProjectById(targetProjectId));
    saveActiveProjectStateFromUI();
    persistWorkspace();
    hideAutotest();
  };
  const originalResetProjectState=resetProjectState;
  resetProjectState=function(){
    originalResetProjectState();
    sanitizeProject(getActiveProject());
    clearProjectExtractionState();
    saveActiveProjectStateFromUI();
    persistWorkspace();
    hideAutotest();
  };
  const originalActivateTab=activateTab;
  activateTab=function(tabTarget){
    originalActivateTab(tabTarget==="autotestTab"?"sourcesTab":tabTarget);
    hideAutotest();
  };
  const normalizeUnit=(value)=>String(value||"").replace(/\s*mp\b/i," m2").replace(/\s*mc\b/i," m3").replace(/\s+/g," ").trim();
  customExtractors.denumire_obiectiv=function(lines){
    const joined=lines.join(" ");
    const match=joined.match(/\bdenumire\s+obiectiv\s*[:\-]\s*([^.\n]{3,220})/i)||joined.match(/\bdenumirea\s+(?:obiectivului|constructiei|investitiei)\s*[:\-]\s*([^.\n]{3,220})/i);
    return match?cleanValue(match[1]):"";
  };
  customExtractors.beneficiar=function(lines){
    const directLine=lines.find((line)=>/(?:beneficiar|proprietar|investitor)\s*[:\-]/i.test(line));
    if(directLine)return cleanBeneficiaryText(directLine.replace(/^(?:beneficiar|proprietar|investitor)\s*[:\-]\s*/i,""));
    const joined=lines.join(" ");
    const match=joined.match(/\b(Parohia\b[^.\n]{3,200})/i)||joined.match(/(?:beneficiar|proprietar|investitor)\s*[:\-]\s*([^.\n]{3,200})/i);
    return match?cleanBeneficiaryText(match[1]||match[0]):"";
  };
  customExtractors.caracteristici_dimensionale=function(lines){
    const joined=lines.join(" ");
    const regim=joined.match(/regim(?:ul)?\s+de\s+inaltime\s*[:\-]?\s*([^;.\n]+)/i)?.[1]?.trim();
    const inaltime=joined.match(/inaltimea?\s+maxima(?:\s+a\s+cladirii)?\s*[:\-]?\s*([0-9][0-9., ]*\s*m)\b/i)?.[1]?.trim();
    const volum=joined.match(/volum(?:ul)?(?:\s+construit|\s+constructiei)?\s*[:\-]?\s*([0-9][0-9., ]*\s*(?:m3|m³|mc))\b/i)?.[1]?.trim();
    const ariaC=joined.match(/aria\s+construit[ăa]\s*[:\-]?\s*([0-9][0-9., ]*\s*(?:m2|m²|mp))\b/i)?.[1]?.trim();
    const ariaD=joined.match(/aria\s+desf[ăa][șs]urat[ăa]\s*[:\-]?\s*([0-9][0-9., ]*\s*(?:m2|m²|mp))\b/i)?.[1]?.trim();
    return [regim?`regim de inaltime: ${regim}`:"",inaltime?`inaltime maxima: ${normalizeUnit(inaltime)}`:"",volum?`volum: ${normalizeUnit(volum)}`:"",ariaC?`aria construita: ${normalizeUnit(ariaC)}`:"",ariaD?`aria desfasurata: ${normalizeUnit(ariaD)}`:""] .filter(Boolean).join("; ");
  };
  const originalEvacuare=customExtractors.evacuare;
  customExtractors.evacuare=function(lines,content){
    const joined=lines.join(" ");
    const users=joined.match(/evacuarea\s+utilizatorilor[^.\n]*\./i)?.[0];
    return [users,originalEvacuare?.(lines,content)].filter(Boolean).map(cleanValue).join(" ");
  };
  bindClick("addTextBtn",()=>handleAddManualText());
  bindClick("extractBtn",()=>handleExtractData());
  bindClick("resetBtn",()=>resetProjectState());
  bindClick("projectAddBtn",()=>createNewProject());
  bindClick("menuNewProjectBtn",()=>createNewProject());
  bindClick("openSourcesQuickBtn",()=>openProjectTab("sourcesTab"));
  bindClick("openFieldsQuickBtn",()=>openProjectTab("sourcesTab",projectFactsSummary));
  bindClick("openRulesQuickBtn",()=>{
    const project=getActiveProject();
    if(!project){window.alert("Deschide mai intai un proiect nou.");return;}
    ensureProjectTab(project,"legislationTab");
    openProjectTab("legislationTab");
  });
  const fileInputElement=document.getElementById("fileInput");
  if(fileInputElement){
    fileInputElement.removeAttribute("onchange");
    fileInputElement.onchange=null;
    fileInputElement.addEventListener("change",(event)=>{event.stopImmediatePropagation();handleSelectedFiles(event);},true);
  }
  const projectSelectorElement=document.getElementById("projectSelector");
  if(projectSelectorElement){
    projectSelectorElement.removeAttribute("onchange");
    projectSelectorElement.onchange=null;
    projectSelectorElement.addEventListener("change",(event)=>{
      event.stopImmediatePropagation();
      const projectId=event.target.value;
      if(projectId&&projectId!==workspaceState.activeProjectId)switchProject(projectId);
    },true);
  }
  window.__ssiCommands={
    ...window.__ssiCommands,
    newProject:()=>createNewProject(),
    switchProjectFromSelect:(projectId)=>{if(projectId&&projectId!==workspaceState.activeProjectId)switchProject(projectId);},
    activateWorkspaceTab:(tabId)=>activateTab(tabId),
    openAutotest:()=>activateTab("sourcesTab"),
    openSources:()=>openProjectTab("sourcesTab"),
    openFields:()=>openProjectTab("sourcesTab",projectFactsSummary),
    handleFileSelection:(event)=>handleSelectedFiles(event),
    addManualText:()=>handleAddManualText(),
    extractData:()=>handleExtractData(),
    resetProject:()=>resetProjectState()
  };
  hideAutotest();
  workspaceState.projects.forEach(sanitizeProject);
  if(workspaceState.activeProjectId)loadProjectIntoUI(workspaceState.activeProjectId);
}());
