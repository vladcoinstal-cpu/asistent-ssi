(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SSISemantic = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function sanitizeDisplayText(value) {
    return String(value || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function normalizeSourceText(sources = []) {
    return (sources || [])
      .map((s) => String((s && (s.text || s.content || s.value)) || ''))
      .join('\n')
      .replace(/\u00a0/g, ' ');
  }

  function extractMeasurement(text, labelRegex, unitPattern) {
    const labelMatch = text.match(labelRegex);
    if (!labelMatch) return '';
    const tail = text.slice(labelMatch.index + labelMatch[0].length, labelMatch.index + labelMatch[0].length + 140);
    const re = new RegExp(`([0-9]{1,3}(?:[. ][0-9]{3})*(?:,[0-9]+)?|[0-9]+(?:,[0-9]+)?)\\s*${unitPattern}(?=\\s|$|[,;.)])`, 'i');
    const m = tail.match(re);
    if (!m) return '';
    const candidate = m[0].replace(/\s+/g, ' ').trim()
      .replace(/\bmp\b/i, 'm²').replace(/\bm2\b/i, 'm²')
      .replace(/\bmc\b/i, 'm³').replace(/\bm3\b/i, 'm³');
    const digits = candidate.replace(/[^0-9]/g, '');
    return digits.length < 3 ? '' : candidate;
  }

  function normalizeRegime(value) {
    const compactDirect = String(value || '').match(/\b(?:D|S|P|Sp|M|[0-9]+\s*E)(?:\s*\+\s*(?:D|S|P|Sp|M|[0-9]+\s*E))+\b/i);
    if (compactDirect) {
      return compactDirect[0].replace(/\s+/g, '').replace(/sp/gi, 'Sp').toUpperCase().replace(/\+SP/g, '+Sp');
    }
    const compact = sanitizeDisplayText(value)
      .replace(/[()]/g, ' ')
      .replace(/(?:regim(?:ul)?\s+de\s+[îi]n[ăa]l[țt]ime|[îi]n[ăa]l[țt]ime)/gi, ' ')
      .replace(/\b(?:si|și)\b/gi, '+')
      .replace(/\s*\+\s*/g, '+')
      .replace(/[,;/]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const tokens = compact.match(/\b(?:Sp|E(?:taj)?\s*\d+|E\d+|[0-9]+\s*E|demisol|subsol|parter|supant[ăa]?|mansard[ăa]?|etaj\s*[0-9]+|(?:^|[+ ])(?:D|S|P|M)(?=$|[+ ]))\b/gi) || [];
    return tokens.map((token) => {
      const t = token.toLowerCase().replace(/\s+/g, '');
      if (t === 'demisol' || t === 'd') return 'D';
      if (t === 'subsol' || t === 's') return 'S';
      if (t === 'parter' || t === 'p') return 'P';
      if (t.startsWith('supant') || t === 'sp') return 'Sp';
      if (t.startsWith('mansard') || t === 'm') return 'M';
      const e = t.match(/(?:etaj|e)(\d+)/) || t.match(/(\d+)e/);
      return e ? `${e[1]}E` : '';
    }).filter(Boolean).join('+');
  }

  function parseDimensionParts(rawValue) {
    const raw = sanitizeDisplayText(rawValue)
      .replace(/îăl/g, 'înăl').replace(/desfăşurat/g, 'desfășurat').replace(/desf[aă]surat/g, 'desfășurat')
      .replace(/construita/g, 'construită').replace(/([0-9])\s*m\s*([23²³])/gi, '$1 m$2')
      .replace(/([0-9])m([23²³])/gi, '$1 m$2').replace(/([0-9])m\b/gi, '$1 m');

    const regimRaw =
      raw.match(/regim(?:ul)?\s+de\s+[îi]n[ăa]l[țt]ime\s*[: ]\s*([^;\n]+)/i)?.[1] ||
      raw.match(/\b((?:D|S|P|M|Sp|[0-9]+\s*E)(?:\s*\+\s*(?:D|S|P|M|Sp|[0-9]+\s*E))+)/i)?.[1] || '';

    const labeledHeight = raw.match(/(?:[îi]n[ăa]l(?:ț|t)ime(?:a)?(?:\s+maxim[ăa])?(?:\s+a\s+cl[ăa]dirii)?[^:;]*[: ]\s*)([0-9]+(?:[.,][0-9]+)?\s*m)/i)?.[1]?.trim() || '';
    const looseHeight = !labeledHeight ? (raw.match(/\b([0-9]+(?:[.,][0-9]+)?\s*m)\b(?!\s*[²³23])/i)?.[1] || '') : '';
    return {
      regim: normalizeRegime(regimRaw),
      inaltime: labeledHeight || looseHeight,
      volum: extractMeasurement(raw, /volum(?:ul)?(?:\s+construc[țt]iei)?[^:;]*[: ]\s*/i, '(?:m(?:3|³)|mc)'),
      ariaConstruita: extractMeasurement(raw, /ari[ae]\s+construit[ăa][^:;]*[: ]\s*/i, '(?:m(?:2|²)|mp)'),
      ariaDesfasurata: extractMeasurement(raw, /ari[ae]\s+desf[ăa][șs]urat[ăa][^:;]*[: ]\s*/i, '(?:m(?:2|²)|mp)')
    };
  }

  function deriveDimensionParts(data = {}, sources = []) {
    const fromData = parseDimensionParts(data.caracteristici_dimensionale || '');
    const fromSources = parseDimensionParts(normalizeSourceText(sources));
    const validRegime = (v) => /^(?:D|S|P|Sp|M|[0-9]+E)(?:\+(?:D|S|P|Sp|M|[0-9]+E))*$/i.test(String(v || '').trim());
    const validMetric = (v, unit) => new RegExp(`^[0-9]{1,3}(?:[. ][0-9]{3})*(?:,[0-9]+)?\\s*(?:${unit})$`, 'i').test(String(v || '').trim());
    const pick = (a, b, check) => (check(a) ? a : (check(b) ? b : (a || b || '')));
    return {
      regim: pick(fromData.regim, fromSources.regim, validRegime),
      inaltime: pick(fromData.inaltime, fromSources.inaltime, (v) => validMetric(v, 'm')),
      ariaConstruita: pick(fromData.ariaConstruita, fromSources.ariaConstruita, (v) => validMetric(v, 'm(?:2|²)')),
      ariaDesfasurata: pick(fromData.ariaDesfasurata, fromSources.ariaDesfasurata, (v) => validMetric(v, 'm(?:2|²)')),
      volum: pick(fromData.volum, fromSources.volum, (v) => validMetric(v, 'm(?:3|³)'))
    };
  }

  function buildSemantic14Model({ data = {}, sources = [] }) {
    const dimensions = deriveDimensionParts(data, sources);
    const sourceText = normalizeSourceText(sources);
    const explicitFunctions = String(data['funcțiuni'] || data.functiuni || '');
    const explicitBuildingType = String(data.tip_cladire || '');
    const sourceFunctionsLine = sourceText.match(/func[țt]iuni\s+principale(?:,\s*secundare\s+si\s+conexe)?\s*[:\-]\s*([^\n.]{2,180})/i)?.[1] || '';
    const sourceBuildingLine = sourceText.match(/tipul?\s+cl[ăa]dirii\s*[:\-]\s*([^\n.]{2,220})/i)?.[1] || '';
    const sourceAgglomeratedLine = sourceText.match(/sal[ăa]\s+aglomerat[ăa][^\n.]*/i)?.[0] || '';
    const sourceIntro = sourceText.slice(0, 1800);
    const combinedText = `${explicitFunctions}\n${explicitBuildingType}\n${sourceFunctionsLine}\n${sourceBuildingLine}\n${sourceAgglomeratedLine}\n${sourceIntro}`.toLowerCase();
    const functionTags = [];
    const push = (tag, re) => { if (re.test(combinedText)) functionTags.push(tag); };
    push('sală aglomerată', /sala|sală|aglomerat/);
    push('restaurant / alimentație publică', /restaurant|alimentatie|alimentație|bucatarie|bucătărie/);
    push('parcaj', /parcaj|subsol|locuri\s+auto/);
    push('depozitare', /depozit|depozitare/);
    push('industrial', /industrial|productie|producție/);
    push('birouri', /birou|birouri/);
    push('cult', /cult|biseric|lacas|lăcaș/);
    function deriveStorageModel(text) {
      const normalized = String(text || '').toLowerCase();
      const hasStorageContext = /depozit|depozitare|magazie|spa[țt]iu\s+de\s+depozitare/.test(normalized);
      const hasProcessOnly = /buc[ăa]t[ăa]rie|gaze\s+naturale|linie\s+cald[ăa]|preparare/.test(normalized);
      if (!hasStorageContext && hasProcessOnly) return { raw: '', status: 'not-storage-context' };
      const sentences = String(text || '').split(/(?<=[.?!])\s+/).filter(Boolean);
      const hits = sentences.filter((s) => /depozit|depozitare|magazie|spa[țt]iu\s+de\s+depozitare/i.test(s));
      const cleaned = hits
        .filter((s) => !/buc[ăa]t[ăa]rie|gaze\s+naturale|linie\s+cald[ăa]|preparare/i.test(s))
        .join(' ')
        .trim();
      return { raw: cleaned, status: cleaned ? 'ok' : 'ok-or-empty' };
    }
    const storageRawInput = `${String(data.capacitati_depozitare || '')}\n${normalizeSourceText(sources)}`;
    const storageModel = deriveStorageModel(storageRawInput);

    const cleanUsers = String(data.numar_utilizatori || '').replace(/\b(?:e\)|f\)|g\)|h\)|i\)|1\.4\.[efghi])\b[\s\S]*$/i, '').replace(/\b(?:capacit[aă]ți?\s+de\s+depozitare|propriet[ăa]țile?\s+fizico-chimice|substan[țt]e|proces(?:e|elor)?|c[ăa]i?\s+de\s+evacuare)\b[\s\S]*$/i, '').trim();
    return {
      dimensions: {
        regim: dimensions.regim || '',
        inaltime: dimensions.inaltime || '',
        inaltimeMaxima: dimensions.inaltime || '',
        ariaConstruita: dimensions.ariaConstruita || '',
        ariaDesfasurata: dimensions.ariaDesfasurata || '',
        volum: dimensions.volum || ''
      },
      users: { raw: cleanUsers },
      storage: { raw: storageModel.raw || '', status: storageModel.status }
      ,
      functions: { tags: [...new Set(functionTags)] }
    };
  }

  function auditSemantic14Model(model, expected) {
    const checks = [];
    const add = (field, actual, expectedValue, rule) => {
      let status = 'ok';
      if (!actual) status = 'missing';
      else if (actual !== expectedValue) status = rule(actual, expectedValue);
      checks.push({ field, actual, expected: expectedValue, status });
    };
    const metricRule = (actual, expectedValue) => {
      if (!/[m][²2³3]|mp|mc/i.test(actual)) return 'wrong-unit';
      if (actual.length < expectedValue.length - 2) return 'truncated';
      return 'wrong-value';
    };
    add('regim', model.dimensions.regim, expected.regim, (a) => /pers|demisol:\s*\d+/i.test(a) ? 'contaminated' : 'wrong-value');
    add('inaltimeMaxima', model.dimensions.inaltimeMaxima, expected.inaltimeMaxima, metricRule);
    add('ariaConstruita', model.dimensions.ariaConstruita, expected.ariaConstruita, metricRule);
    add('ariaDesfasurata', model.dimensions.ariaDesfasurata, expected.ariaDesfasurata, metricRule);
    add('volum', model.dimensions.volum, expected.volum, metricRule);
    return { ok: checks.every((c) => c.status === 'ok'), checks };
  }

  function buildSemantic123Model({ data = {}, sources = [] }) {
    const sourceText = normalizeSourceText(sources);
    const text = `${String(data.denumire_obiectiv || '')}\n${String(data.beneficiar || '')}\n${String(data.adresa || '')}\n${String(data['funcțiuni'] || data.functiuni || '')}\n${String(data.categoria_importanta || '')}\n${sourceText}`;
    const normalize = (v) => sanitizeDisplayText(v);
    const first = (re) => normalize(text.match(re)?.[1] || '');
    const functionTagsRaw = buildSemantic14Model({ data, sources }).functions.tags;
    const functionTags = functionTagsRaw.filter((tag) => !/depozitare/i.test(tag));
    const cleanName = (value) => sanitizeDisplayText(String(value || ""))
      .replace(/\b(?:beneficiar|proprietar|investitor|adresa)\b\s*[:\-].*$/i, "")
      .trim();
    const cleanBeneficiary = (value) => sanitizeDisplayText(String(value || ""))
      .replace(/\bcu\s+sediul\s+in\b.*$/i, "")
      .replace(/\b(adresa|str\.|strada|municipiul|orasul|jude[țt]ul)\b.*$/i, "")
      .trim();
    const cleanAddress = (value) => sanitizeDisplayText(String(value || ""))
      .replace(/^(?:beneficiar|proprietar|investitor)\s*[:\-]\s*/i, "")
      .replace(/\b(adresa|adres[ăa]\s+obiectivului)\s*[:\-]\s*/i, "")
      .replace(/\b(?:date\s+de\s+contact\s+beneficiar|profilul\s+de\s+activitate|func[țt]iuni\s+principale|categoria\s+de\s+importan[țt][ăa]|clasa\s+de\s+importan[țt][ăa])\b[\s\S]*$/i, "")
      .trim();
    const addressFromData = cleanAddress(normalize(data.adresa));
    const addressFromSource = cleanAddress(first(/(?:adresa|adres[ăa]\s+obiectivului)\s*[:\-]\s*([^\n]{8,220})/i));
    const resolvedAddress = (addressFromSource.length > addressFromData.length ? addressFromSource : addressFromData) || addressFromData || addressFromSource;
    return {
      identification: {
        denumireObiectiv: cleanName(normalize(data.denumire_obiectiv) || first(/denumirea\s+(?:obiectivului|investi[țt]iei)\s*[:\-]\s*([^\n]{4,180})/i)),
        beneficiar: cleanBeneficiary(normalize(data.beneficiar) || first(/(?:beneficiar|proprietar|investitor)\s*[:\-]\s*([^\n]{4,220})/i)),
        adresa: resolvedAddress
      },
      destination: {
        raw: normalize(data['funcțiuni'] || data.functiuni),
        tags: functionTags
      },
      category: {
        raw: normalize(data.categoria_importanta) || first(/categoria\s+de\s+importan(?:ț|t)ă\s*[:\-]\s*([^\n.]{2,120})/i),
        classRaw: normalize(data.clasa_importanta) || first(/clas[ăa]\s+de\s+importan(?:ț|t)ă\s*[:\-]\s*([^\n.]{2,120})/i)
      }
    };
  }

  function auditSemantic123Model(model) {
    const checks = [];
    const add = (field, value) => checks.push({ field, actual: value || '', status: value ? 'ok' : 'missing' });
    add('denumireObiectiv', model.identification?.denumireObiectiv);
    add('beneficiar', model.identification?.beneficiar);
    add('adresa', model.identification?.adresa);
    add('destination', model.destination?.raw || (model.destination?.tags || []).join(', '));
    add('category', model.category?.raw);
    return { ok: checks.every((c) => c.status === 'ok'), checks };
  }

  return { parseDimensionParts, deriveDimensionParts, buildSemantic14Model, auditSemantic14Model, buildSemantic123Model, auditSemantic123Model };
});
