import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const archiveRoot = path.join(root, "legislation-original");
const htmlDir = path.join(archiveRoot, "source-html");
const textDir = path.join(archiveRoot, "source-text");
const programDir = path.join(root, "legislation-program");
const discoveryFile = path.join(root, "legislation-discovery", "pending-acts.json");

const URL_OVERRIDES = {
  p118_1_2025: "https://legislatie.just.ro/Public/FormaPrintabila/00000G01QVZ9POFCH793CM3CGOOUUBU6",
  p118_2_2013: "https://legislatie.just.ro/Public/FormaPrintabila/00000G0HNIJIX5VTWB11FJ0S1GTIDV0G",
  i7_2011: "https://legislatie.just.ro/Public/FormaPrintabila/00000G16IGYIBJMONJS1TQZWUTSYW731",
  reg_1272_2008_clp: "https://publications.europa.eu/resource/cellar/6bf54b59-7673-461b-b8e1-f24c545cbd3c.0006.01/DOC_1"
};

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(root, file), "utf8").replace(/^\uFEFF/, ""));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function decodeEntities(text) {
  return String(text || "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#537;|&#x219;/gi, "\u0219")
    .replace(/&#539;|&#x21b;/gi, "\u021b")
    .replace(/&#259;|&#x103;/gi, "\u0103")
    .replace(/&#226;|&#xE2;/gi, "\u00e2")
    .replace(/&#238;|&#xEE;/gi, "\u00ee")
    .replace(/&#(\d+);/g, (_match, code) => String.fromCharCode(Number(code)));
}

function stripHtml(html) {
  return decodeEntities(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<\/(?:p|div|li|tr|h[1-6]|section|article)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function slugifyActId(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80);
}

function collectPendingActs() {
  if (!fs.existsSync(discoveryFile)) return [];
  const pending = JSON.parse(fs.readFileSync(discoveryFile, "utf8").replace(/^\uFEFF/, ""));
  const acts = Array.isArray(pending?.acts) ? pending.acts : [];
  return acts
    .map((act) => ({
      id: slugifyActId(act.id || act.title),
      title: String(act.title || act.id || "").trim(),
      url: String(act.url || act.officialUrl || "").trim(),
      type: act.type || "act detectat",
      status: act.status || "candidate_unverified",
      discoveredFrom: act.sourceName || pending.source || "",
      sourceSnippet: act.snippet || ""
    }))
    .filter((act) => act.id && act.title && act.url);
}

function detectLegalStatus(text) {
  const normalized = String(text || "").toLowerCase();
  if (/abrogat|iesit din vigoare|ie\u0219it din vigoare/.test(normalized)) return "posibil_abrogat";
  if (/in vigoare|\u00een vigoare|forma in vigoare|forma \u00een vigoare/.test(normalized)) return "in_vigoare";
  return "de_verificat";
}

function collectActs() {
  const articles = readJson("legislation-articles.json");
  const fullActs = readJson("legislation-full-acts.json");
  const map = new Map();

  Object.entries(fullActs.acts || {}).forEach(([id, act]) => {
    map.set(id, {
      id,
      title: act.title || id,
      url: act.url || "",
      localStatusBeforeArchive: act.status || "",
      localSectionCountBeforeArchive: Array.isArray(act.sections) ? act.sections.length : 0
    });
  });

  Object.entries(articles.acts || {}).forEach(([id, act]) => {
    const existing = map.get(id) || { id };
    map.set(id, {
      ...existing,
      title: existing.title || act.title || id,
      url: existing.url || act.url || ""
    });
  });

  collectPendingActs().forEach((act) => {
    if (!map.has(act.id)) map.set(act.id, act);
  });

  return Array.from(map.values())
    .map((act) => ({ ...act, url: URL_OVERRIDES[act.id] || act.url }))
    .filter((act) => act.url)
    .sort((left, right) => left.id.localeCompare(right.id));
}

function buildProgramIndex(records) {
  return {
    generatedAt: new Date().toISOString(),
    source: "legislation-original read-only archive",
    acts: Object.fromEntries(records.map((record) => [
      record.id,
      {
        id: record.id,
        title: record.title,
        officialUrl: record.url,
        textPath: `legislation-original/${record.textPath}`,
        htmlPath: `legislation-original/${record.htmlPath}`,
        textLength: record.textLength,
        httpStatus: record.httpStatus,
        readOnly: true,
        isAuthenticFullAct: record.httpStatus >= 200 && record.httpStatus < 300 && record.textLength > 5000,
        legalStatus: record.legalStatus || "de_verificat",
        downloadedAt: record.downloadedAt
      }
    ]))
  };
}

async function main() {
  ensureDir(htmlDir);
  ensureDir(textDir);
  ensureDir(programDir);

  const acts = collectActs();
  const records = [];

  for (const act of acts) {
    console.log(`Downloading ${act.id} from ${act.url}`);
    const response = await fetch(act.url, {
      headers: {
        "user-agent": "Mozilla/5.0 Asistent-SSI-Legal-Archive",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "accept-language": "ro-RO,ro;q=0.9,en;q=0.5"
      }
    });
    const html = await response.text();
    const text = stripHtml(html);
    const htmlPath = `source-html/${act.id}.html`;
    const textPath = `source-text/${act.id}.txt`;

    fs.writeFileSync(path.join(archiveRoot, htmlPath), html, "utf8");
    fs.writeFileSync(path.join(archiveRoot, textPath), text, "utf8");

    records.push({
      ...act,
      htmlPath,
      textPath,
      htmlFile: htmlPath,
      textFile: textPath,
      httpStatus: response.status,
      downloadedAt: new Date().toISOString(),
      htmlLength: html.length,
      textLength: text.length,
      isAuthenticFullAct: response.status >= 200 && response.status < 300 && text.length > 3000,
      legalStatus: detectLegalStatus(text || html),
      readOnly: true
    });

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const archiveIndex = {
    generatedAt: new Date().toISOString(),
    source: "official URLs listed per act",
    count: records.length,
    readOnly: true,
    acts: Object.fromEntries(records.map((record) => [record.id, record]))
  };

  fs.writeFileSync(path.join(archiveRoot, "index.json"), JSON.stringify(archiveIndex, null, 2), "utf8");
  fs.writeFileSync(path.join(programDir, "full-acts-index.json"), JSON.stringify(buildProgramIndex(records), null, 2), "utf8");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
