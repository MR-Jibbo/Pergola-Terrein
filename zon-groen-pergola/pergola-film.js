/* ===== 01 · Script, chapters & helpers ===== */
(function (G) {
'use strict';

// Terrein: exact 14 x 90 m  (x = lengte, z = breedte). Eenheden = meters.
if (G.THREE && THREE.ColorManagement) THREE.ColorManagement.legacyMode = false; // hex-kleuren als sRGB
const SITE = { L: 90, W: 14 };

// Hoofdstukken (acht verplichte scènes)
const CHAPTERS = [
  'De huidige locatie', 'De huidige problemen', 'De vier functies', 'De kleine zon-pergola',
  'Van module naar ruimte', 'De grote pergola als buitenlokaal', 'Cijfers en voorbeelden', 'Ontdek het terrein'
];

/* Voice-over: elk beat = 1 zin of 2. Alleen feiten uit "Zon-groen pergola - concept".
   ch = hoofdstuk-index, cue = id waarop de regie reageert. */
const BEATS = [
  {"ch": 0, "cue": "open", "t": "Hoi! Ik ben student aan de HAN in Nijmegen, en ik neem je mee naar een plek die ik bijna elke dag zie: het terras boven de fietsenstalling.", "v": [0.08, 8.04], "s": [["Hoi!", 0.05, 0.44], ["Ik ben student aan de HAN in Nijmegen, en ik neem je mee naar een plek die ik bijna elke dag zie: het terras boven de fietsenstalling.", 0.9, 7.86]]},
  {"ch": 0, "cue": "terras", "t": "Het dak van de stalling is hier het terras. Het bestaat nu vooral uit tegels, met een paar picknicktafels en hier en daar een beetje groen.", "v": [8.54, 15.87], "s": [["Het dak van de stalling is hier het terras.", 0.05, 2.18], ["Het bestaat nu vooral uit tegels, met een paar picknicktafels en hier en daar een beetje groen.", 2.65, 7.23]]},
  {"ch": 0, "cue": "opdracht", "t": "Wij onderzoeken hoe deze plek beter gebruikt kan worden, voor biodiversiteit en als sociale ruimte voor studenten.", "v": [16.25, 22.63], "s": [["Wij onderzoeken hoe deze plek beter gebruikt kan worden, voor biodiversiteit en als sociale ruimte voor studenten.", 0.05, 6.29]]},
  {"ch": 1, "cue": "hitte", "t": "Kijk maar eens om je heen. Op warme dagen warmt al die bestrating flink op, en er is bijna geen schaduw.", "v": [23.12, 29.13], "s": [["Kijk maar eens om je heen.", 0.05, 0.88], ["Op warme dagen warmt al die bestrating flink op, en er is bijna geen schaduw.", 1.4, 5.91]]},
  {"ch": 1, "cue": "dak", "t": "En omdat we boven een fietsenstalling staan, is er niet veel mogelijk. Draagkracht, waterafvoer en waterdichting van het dak bepalen wat kan.", "v": [29.45, 37.56], "s": [["En omdat we boven een fietsenstalling staan, is er niet veel mogelijk.", 0.05, 3.16], ["Draagkracht, waterafvoer en waterdichting van het dak bepalen wat kan.", 3.69, 8.01]]},
  {"ch": 1, "cue": "licht", "t": "Dus geen zware bouwwerken en niets dat in het dak wordt geboord. Het moet licht zijn, en verplaatsbaar.", "v": [37.81, 43.78], "s": [["Dus geen zware bouwwerken en niets dat in het dak wordt geboord.", 0.05, 3.37], ["Het moet licht zijn, en verplaatsbaar.", 3.86, 5.87]]},
  {"ch": 2, "cue": "systeem", "t": "Een bijenhotel is één voorziening. Wij zochten een systeem. De zon-groene pergola draait om vier functies die elkaar versterken.", "v": [44.15, 51.9], "s": [["Een bijenhotel is één voorziening.", 0.05, 1.69], ["Wij zochten een systeem.", 2.2, 3.55], ["De zon-groene pergola draait om vier functies die elkaar versterken.", 4.04, 7.65]]},
  {"ch": 2, "cue": "f1", "t": "Eén: stroom opwekken. De panelen leveren stroom voor een laadpunt, sensoren en eventueel verlichting.", "v": [52.24, 58.56], "s": [["Eén: stroom opwekken.", 0.05, 1.48], ["De panelen leveren stroom voor een laadpunt, sensoren en eventueel verlichting.", 1.96, 6.21]]},
  {"ch": 2, "cue": "f2", "t": "Twee: schaduw en koeling. De panelen geven schaduw, en de klimplanten koelen door verdamping.", "v": [58.96, 64.62], "s": [["Twee: schaduw en koeling.", 0.05, 1.8], ["De panelen geven schaduw, en de klimplanten koelen door verdamping.", 2.27, 5.56]]},
  {"ch": 2, "cue": "f3", "t": "Drie: groen en leefgebied. Klimplanten bieden nectar, bladmassa en schuilplek voor insecten en vogels.", "v": [64.97, 71.66], "s": [["Drie: groen en leefgebied.", 0.05, 1.82], ["Klimplanten bieden nectar, bladmassa en schuilplek voor insecten en vogels.", 2.34, 6.59]]},
  {"ch": 2, "cue": "f4", "t": "En vier: leren en verblijven. Het is tegelijk een pauzeplek en een buitenlokaal.", "v": [72.02, 77.07], "s": [["En vier: leren en verblijven.", 0.05, 1.98], ["Het is tegelijk een pauzeplek en een buitenlokaal.", 2.39, 4.95]]},
  {"ch": 3, "cue": "reveal1", "t": "Zon voor de stroom, groen voor de beplanting. Zo ziet dat eruit, op precies deze plek.", "v": [77.37, 82.98], "s": [["Zon voor de stroom, groen voor de beplanting.", 0.05, 2.54], ["Zo ziet dat eruit, op precies deze plek.", 3.06, 5.5]]},
  {"ch": 3, "cue": "frame", "t": "Eén module is een open frame met zonnepanelen als dak.", "v": [83.31, 86.45], "s": [["Eén module is een open frame met zonnepanelen als dak.", 0.05, 3.04]]},
  {"ch": 3, "cue": "bakken", "t": "Klimplanten groeien langs de zijkanten, in plantenbakken op wielen of ballast. Het dak wordt dus niet doorboord.", "v": [86.74, 92.64], "s": [["Klimplanten groeien langs de zijkanten, in plantenbakken op wielen of ballast.", 0.05, 3.94], ["Het dak wordt dus niet doorboord.", 4.38, 5.8]]},
  {"ch": 3, "cue": "zit", "t": "Eronder staan banken en tafels, met een laadpunt voor laptop en telefoon. Een kleine accu vangt de piek op.", "v": [93.01, 99.08], "s": [["Eronder staan banken en tafels, met een laadpunt voor laptop en telefoon.", 0.05, 3.96], ["Een kleine accu vangt de piek op.", 4.38, 5.97]]},
  {"ch": 3, "cue": "regen", "t": "Regenwater van het paneeldak kan via een goot naar de bakken lopen. Dat beperkt het onderhoud.", "v": [99.39, 104.35], "s": [["Regenwater van het paneeldak kan via een goot naar de bakken lopen.", 0.05, 3.28], ["Dat beperkt het onderhoud.", 3.69, 4.86]]},
  {"ch": 3, "cue": "proef", "t": "Zo’n module is ook een mogelijke eerste proef: één module op het terras zetten, en meten wat die doet met schaduw, temperatuur en gebruik.", "v": [104.77, 112.59], "s": [["Zo’n module is ook een mogelijke eerste proef: één module op het terras zetten, en meten wat die doet met schaduw, temperatuur en gebruik.", 0.05, 7.72]]},
  {"ch": 4, "cue": "meer", "t": "Maar de pergola kan meer dan stroom opwekken. De modules zijn los, dus je kunt ze aan elkaar rijgen, tot een plek om te blijven.", "v": [112.94, 119.85], "s": [["Maar de pergola kan meer dan stroom opwekken.", 0.05, 2.17], ["De modules zijn los, dus je kunt ze aan elkaar rijgen, tot een plek om te blijven.", 2.6, 6.81]]},
  {"ch": 4, "cue": "reveal2", "t": "Kom mee. Zo ontstaat de grote zon-groene pergola: een open overkapping, opgebouwd uit meerdere modules.", "v": [120.15, 127.15], "s": [["Kom mee.", 0.05, 0.43], ["Zo ontstaat de grote zon-groene pergola: een open overkapping, opgebouwd uit meerdere modules.", 0.98, 6.9]]},
  {"ch": 5, "cue": "lokaal", "t": "Studenten gebruiken deze ruimte als pauzeplek, als studieplek en als buitenlokaal.", "v": [127.42, 132.2], "s": [["Studenten gebruiken deze ruimte als pauzeplek, als studieplek en als buitenlokaal.", 0.05, 4.68]]},
  {"ch": 5, "cue": "les", "t": "Een docent kan hier uitleg geven. Groepjes werken samen aan tafel, en anderen studeren zelfstandig, in de schaduw.", "v": [132.48, 139.09], "s": [["Een docent kan hier uitleg geven.", 0.05, 1.6], ["Groepjes werken samen aan tafel, en anderen studeren zelfstandig, in de schaduw.", 2.04, 6.51]]},
  {"ch": 5, "cue": "kiezen", "t": "", "v": null, "s": []},
  {"ch": 5, "cue": "lab", "t": "Een sensor voor temperatuur en bodemvocht kan zichtbaar maken wat de pergola doet. Zo past de plek bij een levend laboratorium en bij de BioBlitz-activiteiten van de HAN.", "v": [139.46, 148.75], "s": [["Een sensor voor temperatuur en bodemvocht kan zichtbaar maken wat de pergola doet.", 0.05, 4.21], ["Zo past de plek bij een levend laboratorium en bij de BioBlitz-activiteiten van de HAN.", 4.53, 9.2]]},
  {"ch": 5, "cue": "rood", "t": "In de avond kan laag, gedimd rood licht op zonnestroom branden.", "v": [149.2, 153.1], "s": [["In de avond kan laag, gedimd rood licht op zonnestroom branden.", 0.05, 3.8]]},
  {"ch": 6, "cue": "bestaat", "t": "Is dit realistisch? Een complete zon-groene pergola met zitplek en buitenlokaal vonden we niet. Maar alle onderdelen bestaan al.", "v": [153.48, 161.7], "s": [["Is dit realistisch?", 0.05, 1.09], ["Een complete zon-groene pergola met zitplek en buitenlokaal vonden we niet.", 1.79, 5.94], ["Maar alle onderdelen bestaan al.", 6.48, 8.12]]},
  {"ch": 6, "cue": "sydney", "t": "In Sydney staan 319 zonnepanelen boven meer dan 14.000 planten. Gemiddeld leverden ze 11,1 procent meer stroom dan op een gewoon dak, en het was tot 28 graden koeler op extreem hete dagen. Bron: UTS.", "v": [162.0, 176.65], "s": [["In Sydney staan 319 zonnepanelen boven meer dan 14.000 planten.", 0.05, 4.73], ["Gemiddeld leverden ze 11,1 procent meer stroom dan op een gewoon dak, en het was tot 28 graden koeler op extreem hete dagen.", 5.16, 12.84], ["Bron: UTS.", 13.35, 14.55]]},
  {"ch": 6, "cue": "kaart", "t": "Groningen mat tot 8 graden koeler onder groene pergola’s. In Praag bouwden studenten een zonnepergola voor twee laptops en vier telefoons. En in Utrecht en Madrid staan ze op daken.", "v": [176.81, 187.37], "s": [["Groningen mat tot 8 graden koeler onder groene pergola’s.", 0.05, 3.2], ["In Praag bouwden studenten een zonnepergola voor twee laptops en vier telefoons.", 3.61, 7.97], ["En in Utrecht en Madrid staan ze op daken.", 8.37, 10.46]]},
  {"ch": 6, "cue": "grenzen", "t": "Eerlijk is eerlijk: dit is een concept. Draagkracht, wind, elektra, kosten en beheer moeten nog worden getoetst.", "v": [187.64, 194.87], "s": [["Eerlijk is eerlijk: dit is een concept.", 0.05, 2.2], ["Draagkracht, wind, elektra, kosten en beheer moeten nog worden getoetst.", 2.6, 7.13]]},
  {"ch": 7, "cue": "einde", "t": "Dat was het. Zo kan het terras boven de fietsenstalling eruitzien. Nu ben jij aan de beurt: ontdek het terrein zelf.", "v": [195.31, 201.73], "s": [["Dat was het.", 0.05, 0.6], ["Zo kan het terras boven de fietsenstalling eruitzien.", 0.97, 3.46], ["Nu ben jij aan de beurt: ontdek het terrein zelf.", 3.88, 6.32]]}
];

const VO_CHARS = BEATS.reduce((a, b) => a + b.t.length, 0);

/* ---------- helpers ---------- */
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = t => { t = clamp(t); return t * t * (3 - 2 * t); };
const smoother = t => { t = clamp(t); return t * t * t * (t * (t * 6 - 15) + 10); };
const easeOut = t => 1 - Math.pow(1 - clamp(t), 3);
const easeInOut = t => { t = clamp(t); return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
const backOut = t => { t = clamp(t); const c1 = 1.4, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
const seg = (t, a, b) => clamp((t - a) / (b - a)); // 0..1 binnen [a,b]
const angDiff = (a, b) => { let d = (b - a) % (Math.PI * 2); if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; return d; };
const lerpAng = (a, b, t) => a + angDiff(a, b) * t;
// deterministische random
function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

G.PF = G.PF || {};
Object.assign(G.PF, { SITE, CHAPTERS, BEATS, VO_CHARS, clamp, lerp, smooth, smoother, easeOut, easeInOut, backOut, seg, angDiff, lerpAng, rng });
})(window);
/* ===== 02 · World: terras 14x90 m, fietsenstalling, witte polygon-maquette ===== */
(function (G) {
'use strict';
const PF = G.PF, THREE = G.THREE;
const { SITE, rng, clamp, smooth } = PF;

const COL = {
  sky: 0xeef1f6, sun: 0xfff0d8, tile: 0xd9d3c8, terracotta: 0xd9a692, concrete: 0xa9b8ae, concreteDk: 0x7f9186,
  parapet: 0xf2efe9, wood: 0xb78556, woodDk: 0x8a5e3a, steel: 0x5b6670, panel: 0x1f3a63, panelHi: 0x3f6aa8,
  green1: 0x4f8a5c, green2: 0x6aa56a, green3: 0x3c7450, soil: 0x6b5443, white: 0xf6f6f4
};
PF.COL = COL;
PF.SUN_DIR = new THREE.Vector3(-0.42, 0.78, 0.46).normalize(); // richting naar de zon

/* polygon-offset: lagen die vlak op elkaar liggen krijgen een vaste volgorde, zodat ze op afstand niet flikkeren */
function POFF(m, k) { m.polygonOffset = true; m.polygonOffsetFactor = k; m.polygonOffsetUnits = k; return m; }
function canvasTex(w, h, draw, rep) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.anisotropy = 8;
  if (rep) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep[0], rep[1]); }
  return t;
}
PF.canvasTex = canvasTex;

/* ---- landschap (heightfield + gebakken polygonschaduw) ---- */
function buildLandscape() {
  const S = 760, N = 52, BASE = -4.25;
  const r = rng(7);
  const grid = []; for (let i = 0; i <= 32; i++) { grid[i] = []; for (let j = 0; j <= 32; j++) grid[i][j] = r(); }
  const vnoise = (x, z, sc) => {
    x = x / sc + 16; z = z / sc + 16; const xi = Math.floor(x), zi = Math.floor(z), fx = x - xi, fz = z - zi;
    const a = grid[((xi % 32) + 32) % 32][((zi % 32) + 32) % 32], b = grid[(((xi + 1) % 32) + 32) % 32][((zi % 32) + 32) % 32];
    const c = grid[((xi % 32) + 32) % 32][(((zi + 1) % 32) + 32) % 32], d = grid[(((xi + 1) % 32) + 32) % 32][(((zi + 1) % 32) + 32) % 32];
    const sx = fx * fx * (3 - 2 * fx), sz = fz * fz * (3 - 2 * fz);
    return (a + (b - a) * sx) * (1 - sz) + (c + (d - c) * sx) * sz;
  };
  const hf = (x, z) => {
    const d = Math.max(Math.abs(x) - 58, Math.abs(z) - 22, 0);
    const k = smooth(d / 90);
    const n = vnoise(x, z, 95) * 1.0 + vnoise(x + 40, z - 10, 38) * 0.45 + Math.abs(vnoise(x - 70, z + 33, 60) - .5) * 0.9;
    return BASE + k * (n * 46 - 8) + smooth(d / 14) * 2.2;
  };
  const g = new THREE.PlaneGeometry(S, S, N, N); g.rotateX(-Math.PI / 2);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    // lichte jitter zodat vlakken hoekig en onregelmatig worden
    const x = p.getX(i), z = p.getZ(i);
    const edge = Math.abs(x) > S / 2 - 1 || Math.abs(z) > S / 2 - 1;
    const jx = edge ? 0 : (r() - .5) * 6, jz = edge ? 0 : (r() - .5) * 6;
    p.setX(i, x + jx); p.setZ(i, z + jz);
    p.setY(i, hf(x + jx, z + jz));
  }
  const ng = g.toNonIndexed(); ng.computeVertexNormals();
  const pos = ng.attributes.position, nor = ng.attributes.normal, col = new Float32Array(pos.count * 3);
  const L = PF.SUN_DIR, tmp = new THREE.Vector3();
  const mix = (a, b, t) => a + (b - a) * t;
  for (let f = 0; f < pos.count; f += 3) {
    const cx = (pos.getX(f) + pos.getX(f + 1) + pos.getX(f + 2)) / 3, cy = (pos.getY(f) + pos.getY(f + 1) + pos.getY(f + 2)) / 3, cz = (pos.getZ(f) + pos.getZ(f + 1) + pos.getZ(f + 2)) / 3;
    tmp.set(nor.getX(f), nor.getY(f), nor.getZ(f));
    const lam = tmp.dot(L);
    // werpschaduw: marcheer richting zon over het heightfield
    let blocked = 0; for (let s = 1; s <= 28; s++) { const d = s * 7; if (hf(cx + L.x * d, cz + L.z * d) > cy + L.y * d - 0.4) { blocked = 1; break; } }
    const j = (r() - .5) * 0.035;
    let v;
    if (blocked) v = lam < 0.12 && r() < 0.3 ? 0.26 : mix(0.42, 0.58, r());
    else if (lam < 0.02) v = mix(0.50, 0.68, clamp(lam + 0.5));
    else v = mix(0.84, 1.0, clamp(lam * 1.25));
    v = clamp(v + j, .3, 1);
    const lin = Math.pow(v, 2.2); for (let k = 0; k < 3; k++) { col[(f + k) * 3] = lin * 0.985; col[(f + k) * 3 + 1] = lin * 0.99; col[(f + k) * 3 + 2] = Math.min(1, lin * 1.0 + (1 - v) * 0.03); }
  }
  ng.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const m = new THREE.Mesh(ng, new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false }));
  m.frustumCulled = false;
  return { mesh: m, hf };
}

/* ---- kleine bouwstenen ---- */
const matCache = {};
function mat(color, o) { const k = color + JSON.stringify(o || {}); return matCache[k] || (matCache[k] = new THREE.MeshStandardMaterial(Object.assign({ color, roughness: .85, metalness: 0 }, o || {}))); }
PF.mat = mat;
function box(w, h, d, m, x, y, z, parent) { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; if (parent) parent.add(o); return o; }
PF.box = box;

function buildTree(r, scale) {
  const g = new THREE.Group();
  box(1.5, .7, 1.5, mat(COL.white, { roughness: .9 }), 0, .35, 0, g);
  box(1.3, .08, 1.3, mat(COL.soil), 0, .72, 0, g);
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(.07, .12, 2.2, 6), mat(COL.woodDk)); trunk.position.y = 1.8; trunk.castShadow = true; g.add(trunk);
  const crown = new THREE.Group(); crown.position.y = 3.0; g.add(crown);
  [[0, .2, 0, 1.15, COL.green1], [.5, -.1, .2, .8, COL.green2], [-.45, -.05, -.3, .85, COL.green3], [.1, .85, -.1, .7, COL.green2]].forEach(a => {
    const s = new THREE.Mesh(new THREE.IcosahedronGeometry(a[3], 1), new THREE.MeshStandardMaterial({ color: a[4], roughness: .9, flatShading: true }));
    s.position.set(a[0], a[1], a[2]); s.castShadow = true; crown.add(s);
  });
  g.scale.setScalar(scale || 1); g.userData.crown = crown; g.userData.ph = r() * 6.28;
  return g;
}
PF.buildTree = buildTree;

function buildPicnic() {
  const g = new THREE.Group(), wd = mat(COL.wood), wk = mat(COL.woodDk);
  box(2.2, .07, .8, wd, 0, .76, 0, g);
  box(2.2, .06, .3, wd, 0, .46, 1.0, g); box(2.2, .06, .3, wd, 0, .46, -1.0, g);
  [-.8, .8].forEach(x => { box(.07, .78, .07, wk, x, .38, .15, g); box(.07, .78, .07, wk, x, .38, -.15, g);
    box(.07, .46, .07, wk, x, .23, .95, g); box(.07, .46, .07, wk, x, .23, -.95, g); box(.07, .07, 2.0, wk, x, .3, 0, g); });
  return g;
}
PF.buildPicnic = buildPicnic;

function buildBench(len) {
  const g = new THREE.Group(); len = len || 1.8;
  box(len, .06, .38, mat(COL.wood), 0, .46, 0, g); box(len, .05, .1, mat(COL.steel), 0, .41, 0, g);
  [-1, 1].forEach(s => box(.06, .42, .3, mat(COL.steel), s * (len / 2 - .15), .21, 0, g));
  return g;
}
PF.buildBench = buildBench;

/* ---- hele wereld ---- */
function createWorld() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(COL.sky); scene.userData.sky = COL.sky;
  scene.fog = new THREE.Fog(COL.sky, 230, 900);

  // licht: één consistente zon + zachte hemel
  const hemi = new THREE.HemisphereLight(0xeaf1ff, 0xd4ccbd, 0.85); scene.add(hemi);
  const sun = new THREE.DirectionalLight(COL.sun, 1.75);
  sun.position.copy(PF.SUN_DIR).multiplyScalar(110); sun.target.position.set(0, 0, 0);
  sun.castShadow = true; sun.shadow.mapSize.set(4096, 4096);
  const sc = sun.shadow.camera; sc.left = -68; sc.right = 68; sc.top = 36; sc.bottom = -36; sc.near = 20; sc.far = 260;
  sun.shadow.bias = -0.00035; sun.shadow.normalBias = 0.05;
  scene.add(sun); scene.add(sun.target);

  const land = buildLandscape(); scene.add(land.mesh);

  const site = new THREE.Group(); scene.add(site);
  const colliders = []; // {x0,x1,z0,z1,top}
  const addCol = (x0, x1, z0, z1, top) => colliders.push({ x0, x1, z0, z1, top });

  // sokkel (model-plint) + fietsenstalling
  box(SITE.L + 4, 1.5, SITE.W + 4, mat(0xe9e8e4, { roughness: .95 }), 0, -3.5, 0, site).castShadow = false;
  const facade = canvasTex(2048, 256, (c, w, h) => {
    c.fillStyle = '#a9b8ae'; c.fillRect(0, 0, w, h);
    const bays = 15, bw = w / bays;
    for (let i = 0; i < bays; i++) {
      const x = i * bw;
      c.fillStyle = '#7f9186'; c.fillRect(x, 0, 14, h);
      c.fillStyle = '#2f3b3a'; c.fillRect(x + 22, 62, bw - 44, h - 62);
      c.fillStyle = '#55665f'; c.fillRect(x + 22, 62, bw - 44, 14);
      c.strokeStyle = '#c8d3cc'; c.lineWidth = 4; c.lineCap = 'round';
      for (let b = 0; b < 5; b++) { const bx = x + 40 + b * ((bw - 80) / 4.4); const by = h - 22;
        c.beginPath(); c.arc(bx, by - 18, 18, 0, 6.3); c.stroke(); c.beginPath(); c.arc(bx + 40, by - 18, 18, 0, 6.3); c.stroke();
        c.beginPath(); c.moveTo(bx, by - 18); c.lineTo(bx + 18, by - 52); c.lineTo(bx + 40, by - 18); c.moveTo(bx + 18, by - 52); c.lineTo(bx + 28, by - 56); c.stroke(); }
    }
    c.fillStyle = '#e4ebe6'; c.fillRect(0, 0, w, 26);
  });
  const sideMat = new THREE.MeshStandardMaterial({ color: 0xffffff, map: facade, roughness: .95 });
  const wallMat = mat(COL.concrete, { roughness: .95 });
  const shelter = new THREE.Mesh(new THREE.BoxGeometry(SITE.L, 4.0, SITE.W), [wallMat, wallMat, wallMat, wallMat, sideMat, sideMat]);
  shelter.position.set(0, -2.2, 0); shelter.receiveShadow = true; shelter.castShadow = true; site.add(shelter);
  // dakrand (dikte van de vloer)
  const slabMat = mat(0xcfcac0); POFF(slabMat, 3); box(SITE.L + .04, .4, SITE.W + .04, slabMat, 0, -.2, 0, site);

  // betegeling bovenop
  const tileTex = canvasTex(512, 512, (c, w, h) => {
    const r = rng(3); c.fillStyle = '#d6d0c5'; c.fillRect(0, 0, w, h);
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { const v = 205 + r() * 18; c.fillStyle = `rgb(${v},${v - 5},${v - 14})`; c.fillRect(i * 128 + 2, j * 128 + 2, 124, 124); }
  }, [SITE.L / 2.4, SITE.W / 2.4]);
  const topMat = new THREE.MeshStandardMaterial({ map: tileTex, roughness: .92 }); POFF(topMat, -1);
  const top = new THREE.Mesh(new THREE.PlaneGeometry(SITE.L, SITE.W), topMat);
  top.rotation.x = -Math.PI / 2; top.position.y = .002; top.receiveShadow = true; site.add(top);
  // terracotta looplijn + randen
  const stripMat = mat(COL.terracotta, { roughness: .9 }); POFF(stripMat, -2);
  const strip = new THREE.Mesh(new THREE.PlaneGeometry(SITE.L, .9), stripMat);
  strip.rotation.x = -Math.PI / 2; strip.position.set(0, .01, -2.9); strip.receiveShadow = true; site.add(strip);
  const strip2 = strip.clone(); strip2.scale.y = .35; strip2.position.set(0, .011, 4.9); site.add(strip2);
  // lage dakrand (parapet) rondom
  const pm = mat(COL.parapet);
  box(SITE.L + .6, .38, .3, pm, 0, .19, SITE.W / 2 - .15, site); box(SITE.L + .6, .38, .3, pm, 0, .19, -SITE.W / 2 + .15, site);
  box(.3, .38, SITE.W - .6, pm, SITE.L / 2 - .15, .19, 0, site); box(.3, .38, SITE.W - .6, pm, -SITE.L / 2 + .15, .19, 0, site);

  // bestaande inrichting: picknicktafels
  const oldTables = [];
  [[-38, -1.6, 0.2], [-31, 2.6, -0.15], [-17, 0.4, 0.1], [7, -1.8, 0.1], [12, 2.9, -0.2], [41, -.9, 0.3]
  ].forEach(a => {
    const t = buildPicnic(); t.position.set(a[0], 0, a[1]); t.rotation.y = a[2]; site.add(t); oldTables.push(t);
    addCol(a[0] - 1.2, a[0] + 1.2, a[1] - 1.3, a[1] + 1.3, .8);
  });
  // banken langs de rand
  [[-42, 6.0], [-14, -6.0], [8, 6.0], [38, -6.0], [-26, 6.2], [42, 6.0]].forEach((a, i) => { const b = buildBench(1.9); b.position.set(a[0], 0, a[1]); site.add(b); addCol(a[0] - .95, a[0] + .95, a[1] - .2, a[1] + .2, .5); });
  // bomen in bakken
  const trees = [];
  const rt = rng(21);
  [[-43, -5], [-37, -5.3], [-27, -5.4], [-14.5, -5.3], [-8, -5.2], [3.0, -5.3], [13.8, -5.4], [40, 5.2], [43.5, -4.6], [-21.5, -5.4]
  ].forEach(a => {
    const t = buildTree(rt, .95 + rt() * .3); t.position.set(a[0], 0, a[1]); site.add(t); trees.push(t); addCol(a[0] - .8, a[0] + .8, a[1] - .8, a[1] + .8, .72);
  });
  // lichtmasten (bestaande terreinverlichting)
  const poles = [];
  [[-40, -6.3], [-24, -6.3], [-8, -6.3], [8, -6.3], [24, -6.3], [40, -6.3], [-32, -6.3], [-16, -6.3], [0, -6.3], [16, -6.3], [32, -6.3]].forEach(a => {
    const p = new THREE.Group(); box(.08, 4.2, .08, mat(COL.steel), 0, 2.1, 0, p); box(.5, .08, .2, mat(0xdcdcd8), 0, 4.2, 0, p); p.position.set(a[0], 0, a[1]); site.add(p); poles.push(p);
    addCol(a[0] - .1, a[0] + .1, a[1] - .1, a[1] + .1, 5); });

  // warme hitte-overlay (scène 2) + hittelijnen
  const heatMat = new THREE.MeshBasicMaterial({ color: 0xffb066, transparent: true, opacity: 0, depthWrite: false }); POFF(heatMat, -4);
  const heat = new THREE.Mesh(new THREE.PlaneGeometry(SITE.L, SITE.W), heatMat); heat.rotation.x = -Math.PI / 2; heat.position.y = .03; heat.renderOrder = 2; site.add(heat);
  const waveTex = canvasTex(64, 256, (c, w, h) => { const g = c.createLinearGradient(0, h, 0, 0); g.addColorStop(0, 'rgba(255,170,90,0)'); g.addColorStop(.4, 'rgba(255,170,90,.55)'); g.addColorStop(1, 'rgba(255,170,90,0)'); c.fillStyle = g; c.fillRect(w * .35, 0, w * .3, h); });
  const waves = [];
  const rw = rng(55);
  for (let i = 0; i < 70; i++) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(.5, 3.2), new THREE.MeshBasicMaterial({ map: waveTex, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }));
    m.userData = { x: -45 + rw() * 90, z: -6 + rw() * 12, ph: rw() * 6.28, sp: .35 + rw() * .4 }; m.renderOrder = 3; site.add(m); waves.push(m);
  }

  const world = {
    THREE, scene, sun, hemi, site, land, colliders, addCol, oldTables, trees, poles, heat, waves, heatLevel: 0, faceCam: null,
    bounds: { x: SITE.L / 2 - .55, z: SITE.W / 2 - .55 },
    groundAt() { return 0; },
    setHeat(v) { this.heatLevel = v; heatMat.opacity = .13 * v; },
    update(t, dt, cam) {
      trees.forEach(tr => { const c = tr.userData.crown; const ph = tr.userData.ph; c.rotation.z = Math.sin(t * .9 + ph) * .018; c.rotation.x = Math.sin(t * .7 + ph * 1.7) * .014; c.scale.setScalar(1 + Math.sin(t * 1.3 + ph) * .008); });
      const hv = this.heatLevel;
      for (let i = 0; i < waves.length; i++) {
        const w = waves[i], u = w.userData, k = (t * u.sp + u.ph) % 1;
        w.visible = hv > .01;
        if (w.visible) {
          w.position.set(u.x + Math.sin(t * 1.3 + u.ph) * .25, .2 + k * 2.2 + 1.2, u.z);
          w.material.opacity = hv * Math.sin(k * Math.PI) * .55;
          w.scale.set(1, 1, 1); if (cam) w.rotation.y = Math.atan2(cam.position.x - w.position.x, cam.position.z - w.position.z);
        }
      }
    }
  };
  return world;
}
PF.createWorld = createWorld;
})(window);
/* ===== 03 · Zon-groen pergola: modules, opbouw-animatie en effecten ===== */
(function (G) {
'use strict';
const PF = G.PF, THREE = G.THREE;
const { COL, mat, box, rng, clamp, seg, easeOut, easeInOut, backOut, smooth, canvasTex } = PF;

const MW = 4.8, MD = 3.6, H = 2.9; // modulemaat (ontwerpkeuze, geen documentfeit)
PF.MOD = { W: MW, D: MD, H };

let panelTex = null, panelGeo = null, frameMat = null, leafGeo = null;
function sharedAssets() {
  if (panelGeo) return;
  panelTex = canvasTex(128, 192, (c, w, h) => {
    const g = c.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#2a4f86'); g.addColorStop(1, '#182f57'); c.fillStyle = g; c.fillRect(0, 0, w, h);
    c.strokeStyle = 'rgba(190,210,240,.55)'; c.lineWidth = 1.4;
    for (let i = 1; i < 6; i++) { c.beginPath(); c.moveTo(i * w / 6, 0); c.lineTo(i * w / 6, h); c.stroke(); }
    for (let j = 1; j < 10; j++) { c.beginPath(); c.moveTo(0, j * h / 10); c.lineTo(w, j * h / 10); c.stroke(); }
    c.strokeStyle = 'rgba(230,238,250,.9)'; c.lineWidth = 5; c.strokeRect(2, 2, w - 4, h - 4);
  });
  panelGeo = new THREE.BoxGeometry(1.04, .05, 1.62);
  frameMat = mat(0xcfd6dd, { roughness: .45, metalness: .5 });
  leafGeo = new THREE.IcosahedronGeometry(.085, 0); leafGeo.scale(1.2, .55, 1);
}

const WOOD = () => mat(0x8c6a4c, { roughness: .8 });
const WOODL = () => mat(0xb89a78, { roughness: .8 });

/* ---------- onderdelen die een animatie krijgen ---------- */
function Mod(P, i, j) {
  const m = { i, j, parts: [], g: new THREE.Group(), leafSets: [], wheels: [], lights: [], panels: [] };
  m.g.position.set((i - (P.nx - 1) / 2) * MW, 0, (j - (P.nz - 1) / 2) * MD);
  P.group.add(m.g);
  m.part = (obj, a, b, kind, o) => {
    obj.userData.rest = { p: obj.position.clone(), s: obj.scale.clone(), r: obj.rotation.clone() };
    m.parts.push({ obj, a, b, kind, o: o || {} }); (obj.parent || m.g).add(obj); return obj;
  };
  return m;
}

function applyPart(pt, q) {
  const o = pt.obj, u = seg(q, pt.a, pt.b), r = o.userData.rest;
  o.visible = q > pt.a;
  if (u <= 0) return;
  o.position.copy(r.p); o.scale.copy(r.s); o.rotation.copy(r.r);
  switch (pt.kind) {
    case 'rise': o.scale.y = r.s.y * Math.max(.001, easeOut(u)); break;
    case 'grow': o.scale.copy(r.s).multiplyScalar(Math.max(.001, backOut(u))); break;
    case 'drop': { const e = easeOut(u); o.position.y = r.p.y + (1 - e) * pt.o.h; o.rotation.z = r.r.z + (1 - e) * (pt.o.tilt || 0); o.rotation.x = r.r.x + (1 - e) * (pt.o.tiltX || 0); break; }
    case 'slide': { const e = easeOut(u), d = (1 - e) * pt.o.d; o.position.x = r.p.x + pt.o.dx * d; o.position.y = r.p.y + (pt.o.dy || 0) * d; o.position.z = r.p.z + pt.o.dz * d;
      if (pt.o.roll && o.userData.wheels) o.userData.wheels.forEach(w => { w.rotation.z = -(d * (pt.o.dx || pt.o.dz) ) / .09; }); break; }
    case 'draw': o.scale.x = r.s.x * Math.max(.001, easeOut(u)); break;
    case 'vine': o.scale.y = r.s.y * Math.max(.001, easeInOut(u)); break;
  }
}

/* ---------- een volledige pergola (nx × nz modules) ---------- */
function createPergola(world, opt) {
  sharedAssets();
  const nx = opt.nx, nz = opt.nz;
  const P = { world, nx, nz, group: new THREE.Group(), mods: [], progress: 0, name: opt.name || 'pergola' };
  P.group.position.set(opt.cx, 0, opt.cz); world.site.add(P.group);
  const W = nx * MW, D = nz * MD; P.size = { W, D };
  P.footprint = { x0: opt.cx - W / 2, x1: opt.cx + W / 2, z0: opt.cz - D / 2, z1: opt.cz + D / 2 };
  P.center = new THREE.Vector3(opt.cx, 0, opt.cz);
  const wood = WOOD(), woodL = WOODL(), steel = mat(COL.steel, { roughness: .6, metalness: .3 });
  const rnd = rng(opt.seed || 9);
  const interior = (a, b) => a > 0 && a < nx && b > 0 && b < nz && (a % 2 === 1 && opt.skipInterior);
  const vineList = [], bees = [], flies = [], panelList = [], planters = [], tables = [], flows = [];
  const mods = P.mods;

  for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) mods.push(Mod(P, i, j));
  const modAt = (i, j) => mods[j * nx + i];
  const nodeLocal = (mi, mj, a, b) => new THREE.Vector3((a - .5) * MW, 0, (b - .5) * MD); // a,b ∈ {0,1}

  mods.forEach(m => {
    const { i, j } = m, last = i === nx - 1, lastR = j === nz - 1;
    const seq = (m.i + m.j * nx);
    // lokale tijdschaal per module — golf van links naar rechts
    m.t0 = seq * (nx * nz > 1 ? 0.085 : 0); m.span = nx * nz > 1 ? 1 - (nx * nz - 1) * 0.085 : 1;

    // --- ballast + palen
    const nodes = [[0, 0]]; if (last) nodes.push([1, 0]); if (lastR) nodes.push([0, 1]); if (last && lastR) nodes.push([1, 1]);
    nodes.push();
    const own = [[0, 0]]; if (last) own.push([1, 0]); if (lastR) own.push([0, 1]); if (last && lastR) own.push([1, 1]);
    own.forEach((n, k) => {
      const gi = i + n[0], gj = j + n[1];
      if (interior(gi, gj)) return;
      const pos = nodeLocal(i, j, n[0], n[1]);
      const ballast = new THREE.Group(); ballast.position.copy(pos);
      box(.55, .2, .55, mat(0xbfbdb7, { roughness: .95 }), 0, .1, 0, ballast);
      m.part(ballast, 0.02, .12, 'grow');
      const post = new THREE.Group(); post.position.copy(pos); post.position.y = .2;
      box(.15, H - .24, .15, wood, 0, (H - .24) / 2, 0, post);
      m.part(post, .08 + k * .025, .3 + k * .025, 'rise');
      world.addCol(opt.cx + m.g.position.x + pos.x - .2, opt.cx + m.g.position.x + pos.x + .2, opt.cz + m.g.position.z + pos.z - .2, opt.cx + m.g.position.x + pos.x + .2 + 0, 99);
      // (collider z-max fix hieronder)
      world.colliders[world.colliders.length - 1].z1 = opt.cz + m.g.position.z + pos.z + .2;
    });

    // --- liggers (balken) — eigendom per module om duplicaten te vermijden
    const beam = (x0, z0, x1, z1, a, b, dir) => {
      const L = Math.hypot(x1 - x0, z1 - z0), g = new THREE.Group(); g.position.set((x0 + x1) / 2, H - .1, (z0 + z1) / 2);
      const xb = Math.abs(x1 - x0) > 0, par = (i + j) & 1; // naastliggende liggers net anders van maat: geen vlakken die samenvallen (flikkeren)
      box(xb ? L + .23 : .17 + .012 * par, xb ? .2 + .012 * par : .176 + .012 * par, xb ? .17 + .012 * par : L + .23, wood, 0, 0, 0, g);
      m.part(g, a, b, 'slide', { dx: dir[0], dz: dir[1], dy: .25, d: 1.4 });
    };
    beam(-MW / 2, -MD / 2, MW / 2, -MD / 2, .28, .42, [0, -1]);
    if (lastR) beam(-MW / 2, MD / 2, MW / 2, MD / 2, .3, .44, [0, 1]);
    beam(-MW / 2, -MD / 2, -MW / 2, MD / 2, .3, .44, [-1, 0]);
    if (last) beam(MW / 2, -MD / 2, MW / 2, MD / 2, .32, .46, [1, 0]);
    // dwarsbalken (rafters) langs z, voor de panelen
    for (let k = 0; k < (last ? 5 : 4); k++) {
      const x = -MW / 2 + k * (MW / 4);
      const g = new THREE.Group(); g.position.set(x, H + .02, 0);
      box(.08, .07, MD, woodL, 0, 0, 0, g);
      m.part(g, .4 + k * .015, .52 + k * .015, 'drop', { h: .9 });
    }

    // --- zonnepanelen (2 rijen × 4, met ruimte ertussen voor licht)
    let pi = 0;
    for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) {
      const g = new THREE.Group(); g.position.set(-MW / 2 + MW / 8 + c * MW / 4, H + .1, -MD / 4 + r * MD / 2);
      const pm = new THREE.MeshStandardMaterial({ map: panelTex, color: 0xffffff, roughness: .32, metalness: .2, emissive: 0x3d6fc4, emissiveIntensity: 0 });
      const pl = new THREE.Mesh(panelGeo, [frameMat, frameMat, pm, frameMat, frameMat, frameMat]); pl.castShadow = pl.receiveShadow = true; pl.rotation.x = .09; pl.userData.mat = pm; g.add(pl);
      m.part(g, .52 + pi * .04, .64 + pi * .04, 'drop', { h: 2.2, tilt: (c % 2 ? 1 : -1) * .35, tiltX: .15 });
      m.panels.push(pm); panelList.push({ mat: pm, idx: panelList.length, x: i * MW + g.position.x, mod: seq }); pi++;
    }

    // --- plantenbakken op wielen met klimplanten (op de buitenrand)
    const edgeNodes = []; // [a,b, uitwaaierrichting dx,dz]
    if (j === 0) { edgeNodes.push([0, 0, 0, -1]); if (last) edgeNodes.push([1, 0, 0, -1]); }
    if (lastR) { edgeNodes.push([0, 1, 0, 1]); if (last) edgeNodes.push([1, 1, 0, 1]); }
    if (i === 0) { if (nz > 1 || true) { /* hoeken zijn al gedekt */ } }
    edgeNodes.forEach((en, k) => {
      const base = nodeLocal(i, j, en[0], en[1]);
      const pg = new THREE.Group(); pg.position.set(base.x + (en[0] ? .15 : -.15), 0, base.z + en[3] * .5);
      box(.95, .46, .48, mat(0x8fa596, { roughness: .8 }), 0, .34, 0, pg);
      box(.82, .05, .36, mat(COL.soil), 0, .59, 0, pg);
      pg.userData.wheels = [];
      [[-.38, -.2], [.38, -.2], [-.38, .2], [.38, .2]].forEach(w => { const wh = new THREE.Mesh(new THREE.CylinderGeometry(.09, .09, .05, 10), mat(0x2d3336)); wh.rotation.x = Math.PI / 2; wh.position.set(w[0], .09, w[1]); wh.castShadow = true; pg.add(wh); pg.userData.wheels.push(wh); });
      m.part(pg, .6 + k * .03, .76 + k * .03, 'slide', { dx: 0, dz: en[3], d: 1.8, roll: false });
      const gx = opt.cx + m.g.position.x + pg.position.x, gz = opt.cz + m.g.position.z + pg.position.z;
      world.addCol(gx - .5, gx + .5, gz - .26, gz + .26, .62);
      planters.push(pg);
      // klimplant
      const vg = new THREE.Group(); vg.position.set(base.x, .55, base.z + en[3] * .12);
      const pts = []; for (let s = 0; s <= 18; s++) { const t = s / 18, a = t * 9 + rnd() * .3; pts.push(new THREE.Vector3(Math.cos(a) * .11, t * (H - .55), Math.sin(a) * .11)); }
      const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 70, .018, 5), mat(0x2f6b3c, { roughness: .85 })); tube.castShadow = true; vg.add(tube);
      const NL = 46, inst = new THREE.InstancedMesh(leafGeo, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .85, flatShading: true }), NL); inst.castShadow = true; inst.frustumCulled = false;
      const leaves = [];
      for (let s = 0; s < NL; s++) {
        const t = .06 + (s / NL) * .94, a = t * 9 + rnd() * 1.2, rr = .12 + rnd() * .1;
        let px = Math.cos(a) * rr, py = t * (H - .55), pz = Math.sin(a) * rr;
        if (s > NL - 14) { // hangende bladeren langs de balk (zoals in het concept)
          const f = (s - (NL - 14)) / 14; px = (en[0] ? -1 : 1) * f * 1.5 + (rnd() - .5) * .2; pz = en[3] * -(rnd() * .25) + (rnd() - .5) * .15; py = H - .55 - rnd() * .28; leaves.push({ px, py, pz, f: .82 + f * .16, sc: .9 + rnd() * .7 }); continue;
        }
        leaves.push({ px, py, pz, f: t, sc: .8 + rnd() * .9 });
      }
      leaves.forEach((l, s) => inst.setColorAt(s, new THREE.Color().setHSL(.31 + rnd() * .05, .5 + rnd() * .15, .2 + rnd() * .12)));
      vg.add(inst); m.leafSets.push({ inst, leaves, vg });
      // struikjes in de bak
      const bush = new THREE.Mesh(new THREE.IcosahedronGeometry(.28, 1), new THREE.MeshStandardMaterial({ color: COL.green2, roughness: .9, flatShading: true })); bush.scale.set(1.5, .7, .9); bush.position.set(0, .22, 0); bush.castShadow = true; pg.add(bush);
      m.part(vg, .74, .98, 'vine', {}); vineList.push({ vg, base: vg.position.clone(), mod: m });
    });

    // --- meubilair onder de pergola
    (opt.furn ? opt.furn(i, j) : [{ k: 'table', x: 0, z: 0, r: 0 }]).forEach((f, k) => {
      const g = new THREE.Group(); g.position.set(f.x, 0, f.z); g.rotation.y = f.r || 0;
      if (f.k === 'table') {
        const T = PF.buildPicnic(); T.scale.set(f.len || 1, 1, 1); g.add(T);
        // laadpunt (stekkerdoos + led) op tafelrand
        const lp = new THREE.Group(); lp.position.set(.75 * (f.len || 1), .8, .38); box(.2, .05, .08, mat(0x2b3033), 0, 0, 0, lp);
        const led = new THREE.Mesh(new THREE.SphereGeometry(.018, 8, 8), new THREE.MeshBasicMaterial({ color: 0x3df08a })); led.position.set(.07, .03, 0); lp.add(led); m.lights.push(led); g.add(lp);
        world.addCol(opt.cx + m.g.position.x + f.x - 1.3, opt.cx + m.g.position.x + f.x + 1.3, opt.cz + m.g.position.z + f.z - 1.4, opt.cz + m.g.position.z + f.z + 1.4, .8);
        tables.push(g);
      } else if (f.k === 'bench') { g.add(PF.buildBench(f.len || 1.8)); world.addCol(opt.cx + m.g.position.x + f.x - 1, opt.cx + m.g.position.x + f.x + 1, opt.cz + m.g.position.z + f.z - .3, opt.cz + m.g.position.z + f.z + .3, .5); }
      else if (f.k === 'seat') { box(.5, .06, .5, mat(COL.wood), 0, .45, 0, g); box(.06, .45, .06, mat(COL.steel), 0, .22, 0, g); box(.5, .4, .06, mat(COL.wood), 0, .7, -.24, g); }
      m.part(g, .66 + k * .035, .8 + k * .035, 'rise');
      (P.furn = P.furn || []).push({ g, mod: m, k: f.k, base: { x: f.x, z: f.z, r: f.r || 0 }, alt: f.alt || null });
    });

    // --- accu (rechtsachter), geleiding omhoog (geel), goot (voorzijde), sensor
    const acc = new THREE.Group(); const ap = nodeLocal(i, j, 1, 0); acc.position.set(ap.x + .55, 0, ap.z + .05);
    const accuTex = canvasTex(512, 256, (c, w, h) => { c.fillStyle = '#2f6b3f'; c.fillRect(0, 0, w, h); c.fillStyle = '#e9b23a'; c.fillRect(0, 0, w, 26); c.fillRect(0, h - 26, w, 26); c.fillStyle = '#ffffff'; c.font = '800 138px "DM Sans", Arial, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('ACCU', w / 2, h / 2 + 4); });
    box(.5, .34, .3, new THREE.MeshStandardMaterial({ map: accuTex, roughness: .6 }), 0, .17, 0, acc);
    m.part(acc, .8, .9, 'grow');
    const cab = new THREE.Group(); cab.position.set(ap.x + .09, .2, ap.z); box(.03, H - .2, .03, mat(0xe9a400, { roughness: .6, emissive: 0x3a2800 }), 0, (H - .2) / 2, 0, cab);
    m.part(cab, .78, .9, 'rise');
    if (lastR || true) {
      const gu = new THREE.Group(); gu.position.set(-MW / 2, H - .02, MD / 2 + .02); box(MW, .06, .08, mat(0x8d9aa3, { roughness: .5, metalness: .4 }), MW / 2, 0, 0, gu);
      m.part(gu, .74, .88, 'draw');
    }
    if ((opt.sensors || []).some(q => q[0] === m.i && q[1] === m.j)) {
      const s = new THREE.Group(); const sp = nodeLocal(i, j, 0, 0); s.position.set(sp.x + .09, 1.7, sp.z + .12);
      box(.12, .16, .07, mat(0xf2f2ee), 0, 0, 0, s); const dot = new THREE.Mesh(new THREE.SphereGeometry(.014, 8, 8), new THREE.MeshBasicMaterial({ color: 0x57d2ff })); dot.position.set(0, .05, .045); s.add(dot); m.lights.push(dot); box(.01, .12, .01, mat(0x666), .04, .13, 0, s);
      m.part(s, .9, .96, 'grow'); m.sensor = s;
    }
    // rood avondlicht
    const lamp = new THREE.Group(); lamp.position.set(0, H - .1, 0); box(.01, .5, .01, mat(0x222), 0, -.25, 0, lamp);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(.09, 12, 12), new THREE.MeshBasicMaterial({ color: 0x3a1210 })); bulb.position.y = -.55; lamp.add(bulb);
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: canvasTex(64, 64, (c, w, h) => { const g = c.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, 'rgba(255,60,40,.9)'); g.addColorStop(.35, 'rgba(255,50,30,.28)'); g.addColorStop(1, 'rgba(255,40,20,0)'); c.fillStyle = g; c.fillRect(0, 0, w, h); }), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 }));
    halo.scale.setScalar(1.9); halo.position.y = -.55; lamp.add(halo); m.part(lamp, .92, .98, 'grow'); m.bulb = bulb; m.halo = halo;
  });

  /* ---- eigenschappen: schaduw-aanduiding, regen, energiestroom, insecten ---- */
  // zonnestralen (energie) — dunne gloeiende banen langs de zonrichting naar de panelen
  const rayMat = new THREE.MeshBasicMaterial({ color: 0xffd36b, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
  const rays = new THREE.Group(); P.group.add(rays);
  const rr = rng(4);
  for (let k = 0; k < 14; k++) { const m2 = new THREE.Mesh(new THREE.PlaneGeometry(.09, 9), rayMat); const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), PF.SUN_DIR); m2.quaternion.copy(q);
    m2.position.set((rr() - .5) * (W - .8), H + 4.6 * PF.SUN_DIR.y, (rr() - .5) * (D - .6)).addScaledVector(PF.SUN_DIR, 0); m2.position.addScaledVector(PF.SUN_DIR, 0); m2.userData.ph = rr() * 6; rays.add(m2); }
  // regen
  const NR = 160, rain = new THREE.InstancedMesh(new THREE.BoxGeometry(.012, .42, .012), new THREE.MeshBasicMaterial({ color: 0x6aa8e8, transparent: true, opacity: .8 }), NR);
  rain.frustumCulled = false; rain.visible = false; P.group.add(rain);
  const rdat = []; for (let k = 0; k < NR; k++) rdat.push({ x: (rr() - .5) * (W + 1.5), z: (rr() - .5) * (D + 1.5), y: rr() * 7, v: 9 + rr() * 4 });
  // druppels langs goot -> bak
  const NDr = 40, drops = new THREE.InstancedMesh(new THREE.SphereGeometry(.035, 6, 6), new THREE.MeshBasicMaterial({ color: 0x57b4ff }), NDr); drops.visible = false; drops.frustumCulled = false; P.group.add(drops);
  // energiepulsen
  const NE = 10, pulses = new THREE.InstancedMesh(new THREE.SphereGeometry(.04, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffd44a, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false }), NE * Math.max(1, nx * nz)); pulses.visible = false; pulses.frustumCulled = false; P.group.add(pulses);
  // insecten
  const beeG = new THREE.SphereGeometry(.03, 8, 6), beeM = new THREE.MeshBasicMaterial({ color: 0xf2b705 });
  for (let k = 0; k < 8 * nx * nz; k++) { const b = new THREE.Mesh(beeG, beeM); b.userData = { cx: (rr() - .5) * (W + 1), cz: (rr() < .5 ? -1 : 1) * (D / 2 + .4), cy: 1 + rr() * 1.6, ph: rr() * 6, sp: .8 + rr() * .9, a: .5 + rr() * .6 }; b.visible = false; P.group.add(b); bees.push(b); }
  const wingMat = new THREE.MeshBasicMaterial({ color: 0xffa34d, side: THREE.DoubleSide });
  for (let k = 0; k < 4 * nx * nz; k++) { const g = new THREE.Group(); const w1 = new THREE.Mesh(new THREE.PlaneGeometry(.1, .08), new THREE.MeshBasicMaterial({ color: k % 2 ? 0xffa34d : 0xf6f6f0, side: THREE.DoubleSide })), w2 = w1.clone(); w1.position.x = -.05; w2.position.x = .05; g.add(w1, w2); g.userData = { w1, w2, cx: (rr() - .5) * W, cz: (rr() - .5) * D * 1.3, cy: 1.2 + rr() * 1.2, ph: rr() * 6, sp: .5 + rr() * .5 }; g.visible = false; P.group.add(g); flies.push(g); }
  // koele-zone onder de pergola
  const coolTex = canvasTex(64, 64, (c, w, h) => { const g = c.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, 'rgba(90,170,255,.55)'); g.addColorStop(1, 'rgba(90,170,255,0)'); c.fillStyle = g; c.fillRect(0, 0, w, h); });
  const cool = new THREE.Mesh(new THREE.PlaneGeometry(W + 2, D + 2), new THREE.MeshBasicMaterial({ map: coolTex, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })); cool.rotation.x = -Math.PI / 2; cool.position.y = .05; P.group.add(cool);

  // grondmarkering (blauwdruk) vóór de opbouw
  const marks = new THREE.Group(); P.group.add(marks);
  const lineM = new THREE.MeshBasicMaterial({ color: 0xe9a400, transparent: true, opacity: 0, depthWrite: false });
  const edges = [[0, -D / 2, W, .08], [0, D / 2, W, .08], [-W / 2, 0, .08, D], [W / 2, 0, .08, D]];
  edges.forEach(e => { const l = new THREE.Mesh(new THREE.PlaneGeometry(e[2], e[3]), lineM); l.rotation.x = -Math.PI / 2; l.position.set(e[0], .045, e[1]); marks.add(l); });
  P.marks = marks; P.markMat = lineM;

  const fx = { rays: 0, rain: 0, energy: 0, life: 0, cool: 0, red: 0, glint: -1, sensor: 0 };
  P.fx = fx; P.mods = mods;
  P.setProgress = function (p) {
    P.progress = p;
    mods.forEach(m => { const q = clamp((p - m.t0) / m.span); m.q = q; m.parts.forEach(pt => applyPart(pt, q));
      m.leafSets.forEach(ls => { const u = seg(q, .74, .98); const dummy = PF._d || (PF._d = new THREE.Object3D()); ls.leaves.forEach((l, s) => {
        const g = easeOut(seg(u, l.f * .8, l.f * .8 + .25)); dummy.position.set(l.px, l.py * (1), l.pz); dummy.rotation.set(l.f * 3, l.f * 7, l.f * 2); dummy.scale.setScalar(Math.max(.0001, l.sc * g)); dummy.updateMatrix(); ls.inst.setMatrixAt(s, dummy.matrix); });
        ls.inst.instanceMatrix.needsUpdate = true; ls.vg.scale.y = 1; // bladeren volgen de ranken niet-uniform: niet schalen
        ls.vg.children[0].scale.y = Math.max(.001, easeInOut(u)); ls.vg.userData.rest && (ls.vg.scale.y = 1); }); });
    const mk = seg(p, 0, .08) * (1 - seg(p, .2, .42)); P.markMat.opacity = mk * .9; marks.visible = mk > .01;
    marks.scale.set(1 + (1 - easeOut(seg(p, 0, .08))) * .03, 1, 1 + (1 - easeOut(seg(p, 0, .08))) * .03);
    P.group.visible = p > 0.001;
  };
  P.setFx = function (o) { Object.assign(fx, o); };
  P.layout = 0;
  P.setLayout = function (k) { // schuif meubilair (studenten kiezen zelf de opstelling)
    P.layout = k; (P.furn || []).forEach(f => { if (!f.alt) return; const r = f.g.userData.rest; r.p.x = f.base.x + (f.alt.x - f.base.x) * k; r.p.z = f.base.z + (f.alt.z - f.base.z) * k; r.r.y = f.base.r + (f.alt.r - f.base.r) * k; });
    P.setProgress(P.progress);
  };
  const dm = PF._d || (PF._d = new THREE.Object3D());
  P.update = function (t, dt) {
    const showRays = fx.rays > .01; rays.visible = showRays; rayMat.opacity = fx.rays * .16;
    if (showRays) rays.children.forEach(r => { r.material === rayMat && (r.scale.y = 1); const k = .6 + .4 * Math.sin(t * 1.6 + r.userData.ph); r.scale.x = k; r.position.y += 0; });
    rain.visible = fx.rain > .01;
    if (rain.visible) { for (let k = 0; k < NR; k++) { const d = rdat[k]; d.y -= d.v * dt; if (d.y < 0) { d.y = 7; d.x = (Math.random() - .5) * (W + 1.5); d.z = (Math.random() - .5) * (D + 1.5); } const onRoof = Math.abs(d.x) < W / 2 && Math.abs(d.z) < D / 2; const yy = onRoof && d.y < H + .12 ? -99 : d.y; dm.position.set(d.x, yy, d.z); dm.rotation.set(0, 0, -.12); dm.scale.setScalar(k < NR * fx.rain ? 1 : 0.0001); dm.updateMatrix(); rain.setMatrixAt(k, dm.matrix); } rain.instanceMatrix.needsUpdate = true; }
    // druppels: langs de goot naar een bak
    drops.visible = fx.rain > .01 && P.progress > .9;
    if (drops.visible) { const m0 = mods[0]; for (let k = 0; k < NDr; k++) { const u = ((t * .38 + k / NDr) % 1); const gx = -W / 2 + u * W * .9, onGutter = u < .75; const x = gx, y = onGutter ? H - .02 - u * .1 : H - .1 - (u - .75) / .25 * (H - .65), z = D / 2 + .05; dm.position.set(onGutter ? x : -W / 2 + .75 * W * .9, y, z); dm.rotation.set(0, 0, 0); dm.scale.setScalar(onGutter ? .7 : 1); dm.updateMatrix(); drops.setMatrixAt(k, dm.matrix); } drops.instanceMatrix.needsUpdate = true; }
    // energie: pulsen van paneel naar accu + laadpunt
    pulses.visible = fx.energy > .01 && P.progress > .8;
    if (pulses.visible) { let idx = 0; mods.forEach(m => { const ax = m.g.position.x + MW / 2 + .09, az = m.g.position.z - MD / 2; for (let k = 0; k < NE; k++) { const u = ((t * .5 + k / NE) % 1); dm.rotation.set(0, 0, 0); dm.position.set(u < .25 ? m.g.position.x + (MW / 2 + .09) * (u / .25) * 1 : ax, H + .1 - Math.max(0, (u - .25) / .75) * (H - .2), az); if (u < .25) dm.position.set(m.g.position.x + ((u / .25) - .5) * MW * .9, H + .14, az + 0); dm.scale.setScalar(fx.energy); dm.updateMatrix(); pulses.setMatrixAt(idx++, dm.matrix); } }); pulses.instanceMatrix.needsUpdate = true; pulses.count = idx; }
    mods.forEach(m => { m.lights.forEach((l, k) => { l.material.opacity = 1; l.scale.setScalar(m.q > .85 ? 1 + .35 * Math.sin(t * 5 + k) * fx.sensor : 1); });
      if (m.bulb) { m.bulb.material.color.setRGB(.25 + fx.red * .75, .08 + fx.red * .05, .06 + fx.red * .04); m.halo.material.opacity = fx.red; m.halo.scale.setScalar(1.6 + fx.red * .5 + Math.sin(t * 2) * .05 * fx.red); } });
    // glint: golf over de panelen
    const xr = fx.xray || 0; panelList.forEach(pn => { pn.mat.transparent = xr > .01; pn.mat.opacity = 1 - .88 * xr; pn.mat.depthWrite = xr < .05; let g = 0; if (fx.glint >= 0) { const d = fx.glint * (nx * MW + 6) - 3 - (pn.x + (nx * MW) / 2 - MW / 2) ; g = Math.exp(-d * d / 1.6); } pn.mat.emissiveIntensity = g * .9 + fx.rays * .08; });
    cool.visible = fx.cool > .01; cool.material.opacity = fx.cool * (.55 + .12 * Math.sin(t * 2));
    bees.forEach((b, k) => { const u = b.userData; b.visible = fx.life > .01 && k < bees.length * fx.life && P.progress > .9; if (!b.visible) return; const a = t * u.sp + u.ph; b.position.set(u.cx + Math.sin(a) * u.a * 1.4, u.cy + Math.sin(a * 2.1) * .15, u.cz + Math.sin(a * 2) * u.a * .6); });
    flies.forEach((f, k) => { const u = f.userData; f.visible = fx.life > .01 && k < flies.length * fx.life && P.progress > .9; if (!f.visible) return; const a = t * u.sp + u.ph; f.position.set(u.cx + Math.sin(a) * 1.2, u.cy + Math.sin(a * 1.7) * .3, u.cz + Math.cos(a * .8) * .9); f.rotation.y = a + Math.PI / 2; const fl = Math.sin(t * 22 + k) * .9; u.w1.rotation.z = fl; u.w2.rotation.z = -fl; });
  };
  P.panelCount = panelList.length;
  P.setProgress(0);
  return P;
}
PF.createPergola = createPergola;
})(window);
/* ===== 04 · De student: gestileerd 3D-personage met procedurele animatie ===== */
(function (G) {
'use strict';
const PF = G.PF, THREE = G.THREE;
const { clamp, lerp, smooth, easeOut } = PF;
const V3 = THREE.Vector3, Q = THREE.Quaternion;

const M = (c, r) => new THREE.MeshStandardMaterial({ color: c, roughness: r == null ? .75 : r });
function cap(r, len, m, par, x, y, z) { const o = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 5, 10), m); o.position.set(x || 0, y || 0, z || 0); o.castShadow = true; par && par.add(o); return o; }
function sph(r, m, par, x, y, z, sx, sy, sz) { const o = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), m); o.position.set(x || 0, y || 0, z || 0); o.scale.set(sx || 1, sy || 1, sz || 1); o.castShadow = true; par && par.add(o); return o; }
// kritisch gedempte veer (follow-through / secundaire beweging)
function spring(s, target, k, dt) { const c = 2 * Math.sqrt(k); s.v += (k * (target - s.x) - c * s.v) * dt; s.x += s.v * dt; return s.x; }
const SP = () => ({ x: 0, v: 0 });

function createStudent(o) {
  o = o || {};
  const skin = M(o.skin || 0xe3b08a, .8), hoodie = M(o.hoodie || 0xe0a526, .9), jeans = M(o.jeans || 0x2c3e5e, .9), shoe = M(0xf4f2ee, .7), sole = M(0x30343a, .8), hair = M(o.hair || 0x4b3426, .9), pack = M(o.pack || 0x333c46, .9);
  const root = new THREE.Group(), hips = new THREE.Group(); root.add(hips); hips.position.y = .93;
  const S = { root, hips, t: 0, phase: 0, sp: { lean: SP(), armR: SP(), armL: SP(), elbR: SP(), elbL: SP(), head: SP(), headY: SP() }, blink: 0, nextBlink: 2, mouth: 0 };

  // romp
  const torso = new THREE.Group(); hips.add(torso);
  cap(.17, .1, jeans, hips, 0, -.05, 0).scale.set(1.05, .78, .8);
  const chest = cap(.19, .26, hoodie, torso, 0, .3, 0); chest.scale.set(1.08, 1, .8);
  cap(.16, .1, hoodie, torso, 0, .12, 0).scale.set(1.0, 1, .85);
  const hem = sph(.215, hoodie, torso, 0, .07, 0, 1.0, .5, .78);
  const bp = new THREE.Group(); bp.position.set(0, .33, -.2); torso.add(bp); const pk = new THREE.Mesh(new THREE.BoxGeometry(.3, .38, .14), pack); pk.castShadow = true; bp.add(pk); // rugzak
  const strapL = new THREE.Mesh(new THREE.BoxGeometry(.04, .3, .02), M(0x242b33)); strapL.position.set(-.1, .35, .12); torso.add(strapL); const strapR = strapL.clone(); strapR.position.x = .1; torso.add(strapR);
  // nek + hoofd (iets groter dan realistisch: zacht gestileerd)
  const neck = cap(.055, .06, skin, torso, 0, .62, 0);
  const head = new THREE.Group(); head.position.set(0, .8, 0); torso.add(head);
  const skull = sph(.145, skin, head, 0, .05, 0, 1, 1.08, 1.02);
  sph(.03, skin, head, 0, .02, .152, 1, .9, 1).scale.z = 1.1; // neus
  sph(.02, M(0xd99c78), head, -.138, .02, 0, .5, 1, 1); sph(.02, M(0xd99c78), head, .138, .02, 0, .5, 1, 1);
  // haar
  const hr = new THREE.Mesh(new THREE.SphereGeometry(.153, 18, 12, 0, Math.PI * 2, 0, Math.PI * .52), hair); hr.position.set(0, .075, -.012); hr.rotation.x = -.18; hr.scale.set(1.02, 1.08, 1.06); hr.castShadow = true; head.add(hr);
  const fringe = new THREE.Mesh(new THREE.BoxGeometry(.2, .05, .06), hair); fringe.position.set(.01, .15, .11); fringe.rotation.set(.35, 0, -.08); head.add(fringe);
  // ogen, wenkbrauwen, mond
  const eyes = new THREE.Group(); head.add(eyes); const eyeL = [], pup = [];
  [-1, 1].forEach(s => { const e = new THREE.Group(); e.position.set(s * .052, .07, .128); const w = sph(.026, M(0xffffff, .3), e, 0, 0, 0, 1, 1.1, .6); const p = sph(.0145, M(0x25201c, .3), e, 0, 0, .014, 1, 1, .6); eyes.add(e); eyeL.push(e); pup.push(p); });
  const brows = []; [-1, 1].forEach(s => { const b = new THREE.Mesh(new THREE.BoxGeometry(.05, .01, .012), hair); b.position.set(s * .054, .115, .14); b.rotation.z = -s * .08; head.add(b); brows.push(b); });
  const mouth = new THREE.Group(); mouth.position.set(0, -.04, .138); head.add(mouth);
  const lip = new THREE.Mesh(new THREE.TorusGeometry(.03, .006, 6, 16, Math.PI), M(0xa4524a, .6)); lip.rotation.z = Math.PI; lip.position.y = .008; mouth.add(lip);
  const maw = sph(.026, M(0x2a1212, .5), mouth, 0, -.003, -.01, 1, .12, .5); S.maw = maw;
  const cheekM = M(0xf0a493, .9); [-1, 1].forEach(s => { const c = sph(.022, cheekM, head, s * .09, -.015, .115, 1, .7, .3); c.material = cheekM; c.material.transparent = true; c.material.opacity = .45; });

  // armen (schouder-pivot -> elbow-pivot)
  function arm(s) {
    const sh = new THREE.Group(); sh.position.set(s * .245, .52, 0); torso.add(sh);
    sph(.075, hoodie, sh, 0, 0, 0);
    const up = cap(.055, .2, hoodie, sh, 0, -.17, 0);
    const el = new THREE.Group(); el.position.set(0, -.33, 0); sh.add(el);
    cap(.05, .17, hoodie, el, 0, -.13, 0); sph(.06, skin, el, 0, -.31, 0, 1, 1.15, .8);
    sph(.052, hoodie, el, 0, 0, 0);
    return { sh, el };
  }
  const A = { R: arm(1), L: arm(-1) };
  // benen
  function leg(s) {
    const hp = new THREE.Group(); hp.position.set(s * .095, -.08, 0); hips.add(hp);
    cap(.085, .26, jeans, hp, 0, -.24, 0);
    const kn = new THREE.Group(); kn.position.set(0, -.46, 0); hp.add(kn);
    cap(.07, .26, jeans, kn, 0, -.24, 0);
    const ak = new THREE.Group(); ak.position.set(0, -.47, 0); kn.add(ak);
    const ft = new THREE.Mesh(new THREE.BoxGeometry(.11, .075, .27), shoe); ft.position.set(0, -.02, .06); ft.castShadow = true; ak.add(ft);
    const so = new THREE.Mesh(new THREE.BoxGeometry(.115, .03, .28), sole); so.position.set(0, -.065, .06); ak.add(so);
    return { hp, kn, ak, so };
  }
  const Lg = { R: leg(1), L: leg(-1) };
  const _inv = new THREE.Matrix4(), _v = new THREE.Vector3(), SOLE = [[-.058, -.015, -.14], [.058, -.015, -.14], [-.058, -.015, .14], [.058, -.015, .14]];
  function soleMinY() { root.updateMatrixWorld(true); _inv.copy(root.matrixWorld).invert(); let m = 1e9; ['R', 'L'].forEach(k => { const so = Lg[k].so; SOLE.forEach(c => { _v.set(c[0], c[1], c[2]).applyMatrix4(so.matrixWorld).applyMatrix4(_inv); if (_v.y < m) m = _v.y; }); }); return m; }

  if (o.lite) { eyes.visible = false; brows.forEach(b => b.visible = false); fringe.visible = false; maw.visible = false; lip.visible = false; }
  root.traverse(n => { if (n.isMesh) { n.castShadow = true; n.receiveShadow = false; } });
  const sc = o.scale || 1; root.scale.setScalar(sc);
  S.height = 1.78 * sc;
  S.headPos = () => head.getWorldPosition(new V3());

  const tmpV = new V3(), tmpQ = new Q(), tmpQ2 = new Q(), qRest = new Q();
  const down = new V3(0, -1, 0);

  /* st: {speed, talk, pointAt, pointW, lookAt, lookW, gesture, gestW, pose, expr, seated amount} */
  S.update = function (t, dt, st) {
    st = st || {}; S.t = t; dt = Math.min(dt, .05);
    const speed = st.speed || 0, walkW = clamp(speed / 1.2, 0, 1.2), talk = st.talk || 0, pose = st.pose || 'stand';
    const sitW = pose === 'sit' || pose === 'type' ? 1 : 0, sitK = S.sitK = lerp(S.sitK || 0, sitW, 1 - Math.exp(-dt * 7));
    // cyclus gekoppeld aan afgelegde afstand (voet-glijden voorkomen): 1 cyclus = 1.45 m
    S.phase += speed * dt / 1.45 * Math.PI * 2;
    const ph = S.phase, w = clamp(walkW, 0, 1), swing = Math.sin(ph), swing2 = Math.sin(ph + Math.PI);
    const idleB = Math.sin(t * 1.7 + (o.seed || 0)) * .5 + .5;
    // heupen/romp
    hips.position.y = lerp(.93, .62, sitK) - Math.abs(Math.cos(ph)) * .035 * w + idleB * .004;
    hips.position.z = lerp(0, -.0, sitK);
    hips.rotation.y = Math.sin(ph) * .09 * w; hips.rotation.z = Math.sin(ph) * .025 * w;
    const lean = spring(S.sp.lean, .06 * w + (talk > .05 ? .015 : 0) + (st.leanIn || 0), 60, dt);
    torso.rotation.x = lean * (1 - sitK * .3); torso.rotation.y = -Math.sin(ph) * .12 * w; torso.rotation.z = -Math.sin(ph) * .02 * w;
    // benen
    const idle = 1 - w;
    [['R', swing], ['L', swing2]].forEach(([k, sw]) => {
      const L = Lg[k];
      let thigh = sw * .62 * w, knee = Math.max(0, Math.sin((k === 'R' ? ph : ph + Math.PI) - 1.5)) * 1.05 * w + .04, foot = -Math.max(0, sw) * .1 * w;
      thigh = lerp(thigh, -1.52, sitK); knee = lerp(knee, 1.5, sitK); foot = lerp(foot, 0, sitK);
      L.hp.rotation.x = thigh + (k === 'R' ? .02 : -.02) * idle; L.kn.rotation.x = knee; L.ak.rotation.x = foot + (sitK > .5 ? 0 : 0);
      L.hp.rotation.z = (k === 'R' ? -1 : 1) * (.03 + sitK * .05);
    });
    // voeten echt op de vloer: laagste zool raakt y = 0 (niet bij zitten: daar bepaalt de bank de hoogte)
    { const mn = soleMinY(); const lift = -mn * (1 - sitK); if (Math.abs(lift) < .6) hips.position.y += lift; }
    // armen: basis = pendelen of zwaaien
    const bp0 = { R: swing2 * .5 * w, L: swing * .5 * w };
    const talkB = talk * (Math.sin(t * 9.1) * .6 + Math.sin(t * 5.3) * .4);
    ['R', 'L'].forEach(k => {
      const a = A[k], sgn = k === 'R' ? 1 : -1, sh = a.sh, el = a.el;
      // rust/pendel
      let rx = bp0[k] * .9 - .06, rz = sgn * (.1 + .02 * idleB), ex = -.16 - Math.abs(bp0[k]) * .5 - w * .15;
      // 'open handpalm' uitlegbaar: onderarmen omhoog en iets naar buiten
      const gw = st.gesture === 'open' ? (st.gestW == null ? 1 : st.gestW) : 0;
      if (gw > 0) { rx = lerp(rx, -.55 + talkB * .12 + Math.sin(t * 1.3 + sgn) * .06, gw); rz = lerp(rz, sgn * (.28 + talkB * .06), gw); ex = lerp(ex, -1.05 + talkB * .25, gw); }
      // typen / zitten: handen naar voren
      if (pose === 'type') { rx = lerp(rx, -.85, sitK); rz = lerp(rz, sgn * .1, sitK); ex = lerp(ex, -.85 + Math.sin(t * 14 + sgn) * .06, sitK); }
      else if (pose === 'sit') { rx = lerp(rx, -.5, sitK); ex = lerp(ex, -1.0, sitK); }
      if (pose === 'raise' && k === 'R') { rx = -2.75; rz = .12 + Math.sin(t * 7) * .22; ex = -.25 + Math.sin(t * 7 + 1) * .2; }
      const sx = spring(S.sp['arm' + k], rx, 70, dt), ex2 = spring(S.sp['elb' + k], ex, 55, dt);
      sh.quaternion.setFromEuler(new THREE.Euler(sx, 0, rz)); el.rotation.x = ex2;
      // wijzen (rechterarm) — richting target in romp-ruimte
      if (k === 'R' && st.pointAt && (st.pointW || 0) > .001) {
        torso.updateWorldMatrix(true, false);
        tmpV.copy(st.pointAt); torso.worldToLocal(tmpV); tmpV.sub(sh.position).normalize();
        tmpQ.setFromUnitVectors(down, tmpV); const pw = clamp(st.pointW);
        tmpQ2.copy(sh.quaternion); sh.quaternion.copy(tmpQ2.slerp(tmpQ, smooth(pw)));
        el.rotation.x = lerp(el.rotation.x, -.12, pw);
      }
    });
    // hoofd: kijkt naar target (met vertraging), praat-bobbing
    let hy = Math.sin(t * .6 + (o.seed || 0)) * .05, hx = Math.sin(t * .8) * .02 + (talk * (Math.sin(t * 6.7) * .03));
    if (st.lookAt && (st.lookW || 0) > .001) {
      head.updateWorldMatrix(true, false); tmpV.copy(st.lookAt); const loc = torso.worldToLocal(tmpV.clone()); loc.sub(head.position);
      const yaw = clamp(Math.atan2(loc.x, loc.z), -1.15, 1.15), pit = clamp(-Math.atan2(loc.y, Math.hypot(loc.x, loc.z)), -.5, .55);
      hy = lerp(hy, yaw, clamp(st.lookW)); hx = lerp(hx, pit, clamp(st.lookW));
    }
    head.rotation.y = spring(S.sp.headY, hy, 38, dt); head.rotation.x = spring(S.sp.head, hx + (st.nod ? Math.sin(t * 10) * .06 : 0), 52, dt);
    head.rotation.z = Math.sin(t * .9) * .015 + (talk > .05 ? Math.sin(t * 3.1) * .02 : 0);
    // ogen: knipperen + pupil volgt kijkrichting licht
    S.nextBlink -= dt; if (S.nextBlink < 0) { S.blink = 1; S.nextBlink = 2 + Math.random() * 3.2; }
    S.blink = Math.max(0, S.blink - dt * 8); const bl = Math.sin(S.blink * Math.PI);
    eyeL.forEach(e => e.scale.y = 1 - bl * .92);
    // mond: syllaben-enveloppe + glimlach
    const sy = (st.level != null && talk > .05) ? clamp(st.level * 1.35, 0, 1) * (.78 + .22 * Math.abs(Math.sin(t * 9.7))) : talk * (Math.abs(Math.sin(t * 11.3)) * .6 + Math.abs(Math.sin(t * 7.1 + 1.3)) * .4);
    S.mouth += (sy - S.mouth) * (1 - Math.exp(-dt * 30));
    const smile = st.smile == null ? .5 : st.smile;
    maw.scale.set(1 + S.mouth * .1 + smile * .1, .1 + S.mouth * 1.25, .5); maw.position.y = -.003 - S.mouth * .006;
    lip.scale.set(1 + smile * .15, .5 + smile * .9, 1); lip.rotation.z = Math.PI + (smile - .5) * .0; lip.position.y = .008 + smile * .006 - S.mouth * .008;
    brows.forEach((b, i) => { b.position.y = .115 + (st.brow || 0) * .014 + talk * Math.max(0, Math.sin(t * 2.4 + i)) * .004; });
  };
  S.setColors = (c) => { if (c.hoodie) hoodie.color.setHex(c.hoodie); if (c.hair) hair.color.setHex(c.hair); if (c.jeans) jeans.color.setHex(c.jeans); };
  return S;
}
PF.createStudent = createStudent;
})(window);
/* ===== 05 · Stage: 3D-typografie, functie-tokens, dak-doorsnede, kaart ===== */
(function (G) {
'use strict';
const PF = G.PF, THREE = G.THREE;
const { COL, mat, box, canvasTex, clamp, seg, easeOut, backOut, easeInOut, smooth } = PF;

const FONT_D = '"Bricolage Grotesque","DM Sans",system-ui,-apple-system,"Segoe UI",sans-serif';
const FONT_B = '"DM Sans",system-ui,-apple-system,"Segoe UI",sans-serif';

/* ---------- labels (billboards in de 3D-wereld) ---------- */
function rrect(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
// card: witte plaquette met titel (+ optioneel badge-nummer en subregel). height = wereldhoogte in meters
function makeLabel(o) {
  const title = o.text, sub = o.sub || '', badge = o.badge, S = 3;
  const tf = `700 ${46 * S}px ${FONT_D}`, sf = `500 ${28 * S}px ${FONT_B}`;
  const m = document.createElement('canvas').getContext('2d'); m.font = tf; const tw = m.measureText(title).width; m.font = sf; const sw = sub ? m.measureText(sub).width : 0;
  const pad = 30 * S, bw = badge ? 64 * S : 0, W = Math.ceil(Math.max(tw, sw) + pad * 2 + (badge ? bw + 14 * S : 0)), Hh = Math.ceil((sub ? 112 : 78) * S + 10 * S);
  const c = document.createElement('canvas'); c.width = W + 16 * S; c.height = Hh + 16 * S; const x = c.getContext('2d');
  x.translate(8 * S, 4 * S);
  x.shadowColor = 'rgba(30,40,50,.22)'; x.shadowBlur = 14 * S; x.shadowOffsetY = 5 * S;
  x.fillStyle = o.bg || '#fffdf8'; rrect(x, 0, 0, W, Hh - 8 * S, 22 * S); x.fill(); x.shadowColor = 'transparent';
  let tx = pad;
  if (badge) { x.fillStyle = o.accent || '#e9a400'; x.beginPath(); x.arc(pad + 26 * S, (Hh - 8 * S) / 2, 26 * S, 0, 6.3); x.fill(); x.fillStyle = '#1b1a17'; x.font = `800 ${32 * S}px ${FONT_D}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(badge), pad + 26 * S, (Hh - 8 * S) / 2 + 2 * S); tx = pad + bw + 14 * S - 8 * S; }
  x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = o.fg || '#1b1a17'; x.font = tf; x.fillText(title, tx, sub ? 40 * S : (Hh - 8 * S) / 2 + 2 * S);
  if (sub) { x.fillStyle = o.subfg || '#4a4f55'; x.font = sf; x.fillText(sub, tx, 82 * S); }
  const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.anisotropy = 8;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, depthTest: false, opacity: 0 })); // labels altijd bovenop: nooit achter balken of figuren verstopt
  const hgt = o.h || .5; sp.userData.base = new THREE.Vector3(hgt * c.width / c.height, hgt, 1); sp.scale.copy(sp.userData.base).multiplyScalar(.001); sp.visible = false;
  sp.renderOrder = 10; sp.center.set(.5, .0);
  return sp;
}
// grote typografie (cijfers) zonder kaart
function makeBig(o) {
  const S = 2, nf = `800 ${150 * S}px ${FONT_D}`, lf = `600 ${40 * S}px ${FONT_B}`, sf = `500 ${26 * S}px ${FONT_B}`;
  const m = document.createElement('canvas').getContext('2d'); m.font = nf; const nw = m.measureText(o.num).width; m.font = lf; const lw = m.measureText(o.label).width;
  const W = Math.ceil(Math.max(nw, lw) + 70 * S), Hh = (o.src ? 270 : 232) * S; const c = document.createElement('canvas'); c.width = W; c.height = Hh; const x = c.getContext('2d');
  x.fillStyle = 'rgba(255,255,255,.0)'; x.fillRect(0, 0, W, Hh);
  x.shadowColor = 'rgba(255,255,255,.9)'; x.shadowBlur = 18 * S;
  x.fillStyle = o.hl || '#f2b705'; x.globalAlpha = .55; x.fillRect(24 * S, 150 * S, nw + 12 * S, 34 * S); x.globalAlpha = 1;
  x.shadowColor = 'transparent'; x.textBaseline = 'alphabetic'; x.fillStyle = '#17181a'; x.font = nf; x.fillText(o.num, 30 * S, 150 * S);
  x.font = lf; x.fillStyle = '#2b3036'; x.fillText(o.label, 32 * S, 208 * S);
  if (o.src) { x.font = sf; x.fillStyle = '#5b636b'; x.fillText(o.src, 32 * S, 250 * S); }
  const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.anisotropy = 4;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, depthTest: false, opacity: 0 }));
  const hgt = o.h || 1.4; sp.userData.base = new THREE.Vector3(hgt * c.width / c.height, hgt, 1); sp.scale.copy(sp.userData.base).multiplyScalar(.001); sp.visible = false; sp.renderOrder = 10; sp.center.set(.5, 0);
  return sp;
}
// toon/verberg met pop-animatie  u: 0..1
const _lp = new THREE.Vector3();
// minimale schermgrootte: labels die ver weg staan worden meegeschaald zodat ze leesbaar blijven (max. 2,4×)
function labelBoost(sp) { const cam = PF.labelCam; if (!cam) return 1; sp.getWorldPosition(_lp); const d = _lp.distanceTo(cam.position); const need = d * .075 * (cam.fov / 40); return Math.min(3.4, Math.max(1, need / sp.userData.base.y)); }
function popLabel(sp, u) { const a = clamp(u); sp.visible = a > .001; if (!sp.visible) return; const k = backOut(a) * labelBoost(sp); sp.scale.set(sp.userData.base.x * k, sp.userData.base.y * k, 1); sp.material.opacity = smooth(a * 1.6); }
PF.makeLabel = makeLabel; PF.makeBig = makeBig; PF.popLabel = popLabel;

/* ---------- zon-sprite aan de hemel ---------- */
function makeSun() {
  const t = canvasTex(256, 256, (c, w, h) => { const g = c.createRadialGradient(128, 128, 0, 128, 128, 128); g.addColorStop(0, 'rgba(255,255,240,1)'); g.addColorStop(.08, 'rgba(255,244,205,.95)'); g.addColorStop(.25, 'rgba(255,225,160,.35)'); g.addColorStop(1, 'rgba(255,210,140,0)'); c.fillStyle = g; c.fillRect(0, 0, w, h); });
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false, toneMapped: false })); s.scale.setScalar(150); s.position.copy(PF.SUN_DIR).multiplyScalar(560); s.renderOrder = -1; return s;
}
PF.makeSun = makeSun;

/* ---------- vier functies: tokens ---------- */
function plinth() { const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.CylinderGeometry(.95, 1.05, .16, 36), mat(0xfdfcf8, { roughness: .6 })); b.position.y = .08; b.castShadow = b.receiveShadow = true; g.add(b);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(.97, .025, 8, 48), new THREE.MeshBasicMaterial({ color: 0xe9a400 })); ring.rotation.x = Math.PI / 2; ring.position.y = .17; g.add(ring); return g; }
function miniPanel(w, d) { const m = new THREE.Mesh(new THREE.BoxGeometry(w, .05, d), [mat(0xcfd6dd, { metalness: .4 }), mat(0xcfd6dd), new THREE.MeshStandardMaterial({ color: 0x24457d, roughness: .3, metalness: .2 }), mat(0xcfd6dd), mat(0xcfd6dd), mat(0xcfd6dd)]); m.castShadow = true; return m; }
function tokenGlyph(k) {
  const g = new THREE.Group(), anim = {};
  if (k === 1) {
    const p = miniPanel(1.3, .86); p.position.set(0, .75, 0); p.rotation.set(.45, 0, 0); g.add(p);
    const sun = new THREE.Mesh(new THREE.SphereGeometry(.2, 20, 14), new THREE.MeshBasicMaterial({ color: 0xffc83a })); sun.position.set(-.55, 1.55, -.2); g.add(sun); anim.sun = sun;
    const rays = new THREE.Group(); rays.position.copy(sun.position); for (let i = 0; i < 8; i++) { const r = new THREE.Mesh(new THREE.BoxGeometry(.05, .2, .03), new THREE.MeshBasicMaterial({ color: 0xffc83a })); r.position.set(Math.cos(i * .785) * .38, Math.sin(i * .785) * .38, 0); r.rotation.z = i * .785 - Math.PI / 2; rays.add(r); } g.add(rays); anim.rays = rays;
    const sh = new THREE.Shape(); [[.08, .5], [-.1, 0], [.02, 0], [-.08, -.5], [.14, .08], [.02, .08], [.14, .5]].forEach((q, i) => i ? sh.lineTo(q[0], q[1]) : sh.moveTo(q[0], q[1]));
    const bolt = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: .06, bevelEnabled: false }), new THREE.MeshStandardMaterial({ color: 0xffb300, emissive: 0x7a4a00, roughness: .5 })); bolt.scale.setScalar(.95); bolt.position.set(.65, .5, 0); g.add(bolt); anim.bolt = bolt;
  } else if (k === 2) {
    const p = miniPanel(1.4, 1.0); p.position.y = 1.35; g.add(p);
    [[-.62, -.4], [.62, -.4], [-.62, .4], [.62, .4]].forEach(a => { const s = box(.05, 1.3, .05, mat(0x8c6a4c), a[0], .75, a[1], g); });
    const sh = new THREE.Mesh(new THREE.CircleGeometry(.78, 28), new THREE.MeshBasicMaterial({ color: 0x31465f, transparent: true, opacity: .28 })); sh.rotation.x = -Math.PI / 2; sh.position.y = .19; g.add(sh);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(.45, .03, 8, 36), new THREE.MeshBasicMaterial({ color: 0x57b4ff, transparent: true, opacity: .8 })); ring.rotation.x = Math.PI / 2; ring.position.y = .5; g.add(ring); anim.ring = ring;
    for (let i = 0; i < 3; i++) { const d = new THREE.Mesh(new THREE.SphereGeometry(.05, 8, 8), new THREE.MeshBasicMaterial({ color: 0x57b4ff })); d.position.set(-.3 + i * .3, .6, 0); g.add(d); (anim.drops = anim.drops || []).push(d); }
  } else if (k === 3) {
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(.03, .05, 1.1, 6), mat(0x2f6b3c)); stem.position.y = .75; g.add(stem);
    const lm = new THREE.MeshStandardMaterial({ color: 0x4f9c5c, roughness: .8, flatShading: true });
    for (let i = 0; i < 7; i++) { const l = new THREE.Mesh(new THREE.IcosahedronGeometry(.2, 0), lm); l.scale.set(1.3, .35, .8); const a = i * 2.4; l.position.set(Math.cos(a) * .22, .45 + i * .14, Math.sin(a) * .22); l.rotation.set(0, -a, .4); g.add(l); }
    const fl = new THREE.Mesh(new THREE.SphereGeometry(.14, 12, 10), new THREE.MeshStandardMaterial({ color: 0xf3c14a, emissive: 0x5c4200 })); fl.position.y = 1.4; g.add(fl);
    const bee = new THREE.Group(); const bb = new THREE.Mesh(new THREE.SphereGeometry(.07, 10, 8), new THREE.MeshBasicMaterial({ color: 0xf2b705 })); bb.scale.set(1.4, 1, 1); bee.add(bb); const st = new THREE.Mesh(new THREE.BoxGeometry(.03, .1, .1), new THREE.MeshBasicMaterial({ color: 0x222 })); bee.add(st); g.add(bee); anim.bee = bee;
  } else {
    const t = PF.buildPicnic(); t.scale.setScalar(.45); t.position.y = .16; g.add(t);
    const bk = box(.34, .05, .24, mat(0xe9a400), 0, .6, 0, g); const bk2 = box(.34, .05, .24, mat(0x4f8a5c), 0, .65, 0, g); bk.rotation.y = .3; bk2.rotation.y = -.15;
    const lp = box(.4, .02, .28, mat(0xcfd6dd, { metalness: .4 }), .25, .62, .15, g); const sc = box(.4, .26, .02, mat(0x2b3033), .25, .75, .03, g); sc.rotation.x = -.2; anim.book = bk;
  }
  return { g, anim };
}
function makeToken(k) {
  const root = new THREE.Group(), base = plinth(), gl = tokenGlyph(k); root.add(base); const inner = new THREE.Group(); inner.add(gl.g); inner.position.y = .16; root.add(inner);
  root.userData = { inner, anim: gl.anim, k };
  root.traverse(n => { if (n.isMesh) n.castShadow = true; }); root.visible = false;
  return root;
}
function updateToken(tk, t, u, active) {
  const a = clamp(u); tk.visible = a > .001; if (!tk.visible) return;
  const k = backOut(a); tk.scale.setScalar(Math.max(.001, k)); const d = tk.userData;
  d.inner.rotation.y = Math.sin(t * .6 + d.k) * .45 + t * (active ? .35 : .08); d.inner.position.y = .16 + (active ? .08 + Math.sin(t * 2) * .04 : 0);
  const an = d.anim; if (an.rays) { an.rays.rotation.z = t * .6; an.sun.scale.setScalar(1 + .06 * Math.sin(t * 3)); an.bolt.scale.setScalar(.95 + (active ? .12 * Math.sin(t * 5) : 0)); }
  if (an.ring) { an.ring.scale.setScalar(1 + .25 * Math.sin(t * 2.2)); an.drops.forEach((q, i) => q.position.y = .5 + ((t * .5 + i * .33) % 1) * .6); }
  if (an.bee) { an.bee.position.set(Math.cos(t * 2.2) * .55, 1.1 + Math.sin(t * 3) * .1, Math.sin(t * 2.2) * .55); an.bee.rotation.y = -t * 2.2; }
}
PF.makeToken = makeToken; PF.updateToken = updateToken;

/* ---------- dak-doorsnede (draagkracht / waterafvoer / waterdichting) ---------- */
function makeRoofSample() {
  const g = new THREE.Group(), L = 3.6, Dp = 2.4;
  const defs = [['tegels', 0xd9d3c8, .2], ['membraan', 0x2d3236, .06], ['vloer', 0xb4b8b2, .34]];
  const layers = defs.map((d, i) => { const m = box(L, d[2], Dp, mat(d[1], { roughness: .9 }), 0, 0, 0, g); return m; });
  const pipe = new THREE.Mesh(new THREE.CylinderGeometry(.09, .09, 1.1, 12), mat(0x7e8b94, { metalness: .3, roughness: .5 })); pipe.position.set(L / 2 - .3, -.3, 0); g.add(pipe);
  const arrows = []; for (let i = 0; i < 3; i++) { const a = new THREE.Group(); const sh = new THREE.Mesh(new THREE.CylinderGeometry(.09, .09, .7, 10), new THREE.MeshStandardMaterial({ color: 0xe9503a, emissive: 0x4a1208 })); sh.position.y = .35; const hd = new THREE.Mesh(new THREE.ConeGeometry(.22, .36, 12), sh.material); hd.rotation.x = Math.PI; hd.position.y = -.1; a.add(sh, hd); a.position.set(-1.2 + i * 1.2, 2.4, 0); g.add(a); arrows.push(a); }
  const NDr = 28, drops = new THREE.InstancedMesh(new THREE.SphereGeometry(.05, 8, 8), new THREE.MeshBasicMaterial({ color: 0x57b4ff }), NDr); drops.frustumCulled = false; g.add(drops);
  g.userData = { layers, arrows, drops, NDr, pipe, L, Dp }; g.traverse(n => { if (n.isMesh) n.castShadow = n.receiveShadow = true; }); g.visible = false;
  return g;
}
const _o = new THREE.Object3D();
function updateRoofSample(s, t, ex, vis) { // ex: 0 = gestapeld, 1 = uiteengetrokken; vis: 0..1
  const d = s.userData; s.visible = vis > .001; if (!s.visible) return; s.scale.setScalar(Math.max(.001, backOut(vis)));
  const e = easeInOut(ex), h = [.36 + .1 + e * 1.35, .26 + e * .75, .17 + e * .15 - 0.0];
  d.layers[0].position.y = h[0]; d.layers[1].position.y = .17 + .06 + e * .7; d.layers[2].position.y = .17 * 1;
  d.layers[0].position.y = .17 + .06 * 2 + .1 + e * 1.45; d.layers[1].position.y = .17 + .13 + e * .72; d.layers[2].position.y = .17;
  d.arrows.forEach((a, i) => { const k = seg(ex, .3 + i * .08, .6 + i * .08); a.visible = k > 0; a.position.y = 2.7 - Math.sin(t * 3 + i) * .08 - (1 - easeOut(k)) * .8; a.scale.setScalar(.001 + backOut(k)); });
  d.drops.visible = ex > .35; if (d.drops.visible) for (let i = 0; i < d.NDr; i++) { const u = (t * .3 + i / d.NDr) % 1; _o.position.set(-d.L / 2 + .3 + u * (d.L - .6), .17 + .13 + e * .72 + .05 + Math.sin(u * 20) * .01, -.9 + ((i * 37) % 19) / 19 * 1.8); if (u > .9) _o.position.y -= (u - .9) * 6; _o.scale.setScalar(1); _o.updateMatrix(); d.drops.setMatrixAt(i, _o.matrix); } d.drops.instanceMatrix.needsUpdate = true;
}
PF.makeRoofSample = makeRoofSample; PF.updateRoofSample = updateRoofSample;

/* ---------- kaart (Europa als witte maquette) ---------- */
const EU = [[-9.5, 37], [-9.5, 43.2], [-1.8, 43.4], [-1.2, 46], [-4.7, 48.4], [-1.5, 48.7], [-1.3, 49.6], [1.5, 50.2], [2.5, 51.1], [4.5, 52.3], [5, 53.4], [8.7, 53.9], [8.5, 55.5], [8.2, 57], [10.5, 57.7], [10.5, 56], [11, 54.7], [14, 54], [18.5, 54.8], [21, 55.5], [21, 57.5], [24, 58], [24, 59.5], [29, 60], [30, 56], [31, 52], [30, 48], [28, 45], [25, 44], [22, 41], [20, 40], [19, 42], [14, 45.5], [13.5, 44], [16, 41.5], [18.5, 40.2], [16, 38], [15.7, 40], [12, 41.8], [10, 43.5], [8, 44], [6.5, 43], [3.2, 43.3], [3, 42], [0, 39], [-.5, 38], [-2, 36.8], [-5.5, 36], [-7, 37]];
const PINS = [
  { name: 'Groningen', sub: 'Leaf of Groningen · tot 8 °C koeler', lon: 6.6, lat: 53.2, dx: -.2, dy: 1.7 },
  { name: 'Utrecht', sub: 'Zonnepergola De Syp · op een dak', lon: 5.1, lat: 52.1, dx: -1.2, dy: .9 },
  { name: 'Praag', sub: 'Studenten: 2 laptops + 4 telefoons', lon: 14.4, lat: 50.1, dx: 1.0, dy: 1.5 },
  { name: 'Madrid', sub: 'PV-pergola met rustplek op kantoordak', lon: -3.7, lat: 40.4, dx: 0, dy: 1.3 }
];
function makeMap() {
  const g = new THREE.Group(), K = .24, proj = (lon, lat) => [(lon - 8) * Math.cos(50 * Math.PI / 180) * K, (lat - 47.5) * K];
  const sh = new THREE.Shape(); EU.forEach((p, i) => { const q = proj(p[0], p[1]); i ? sh.lineTo(q[0], q[1]) : sh.moveTo(q[0], q[1]); });
  const geo = new THREE.ExtrudeGeometry(sh, { depth: .22, bevelEnabled: true, bevelSize: .03, bevelThickness: .03, bevelSegments: 1 }); geo.rotateX(-Math.PI / 2);
  const slab = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0xf4f3ef, roughness: .95, flatShading: true })); slab.castShadow = slab.receiveShadow = true; g.add(slab);
  const base = new THREE.Mesh(geo.clone(), new THREE.MeshStandardMaterial({ color: 0xcfd3d6, roughness: 1 })); base.scale.set(1.05, .35, 1.05); base.position.set(0, -.12, 0); g.add(base);
  const pins = PINS.map(p => { const q = proj(p.lon, p.lat); const pg = new THREE.Group(); pg.position.set(q[0], .24, -q[1]);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(.015, .015, 1, 6), new THREE.MeshBasicMaterial({ color: 0x1b1a17 })); stem.position.y = .5; const head = new THREE.Mesh(new THREE.SphereGeometry(.09, 14, 10), new THREE.MeshStandardMaterial({ color: 0xe9a400, emissive: 0x6a4700 })); head.position.y = 1.0;
    pg.add(stem, head); const lab = makeLabel({ text: p.name, sub: p.sub, h: .5 }); lab.position.set(0, 1.12, 0); pg.add(lab); pg.userData = { lab, head, stem }; g.add(pg); return pg; });
  g.userData = { pins }; g.visible = false; return g;
}
PF.makeMap = makeMap;
})(window);
/* ===== 06 · Stage-opbouw: wereld, pergola's, personages, tijdlijn, padberekening ===== */
(function (G) {
'use strict';
const PF = G.PF, THREE = G.THREE;
const { BEATS, clamp, lerp, smooth, seg } = PF;

const CX_SMALL = -2, CX_BIG = 26;
PF.LAYOUT = { small: { cx: CX_SMALL, cz: 0 }, big: { cx: CX_BIG, cz: 0 } };

/* ---- tijdlijn uit spreektekst ---- */
const SILENT = { 21: 5.0 }; // beats zonder voice-over (stil beeldmoment)
const LEAD = { 0: 3.6, 4: .6, 11: 2.4, 18: 2.4, 28: .9 };
const TAIL = { 0: .4, 3: 1.0, 11: 5.6, 12: 1.2, 13: .8, 14: .6, 15: 1.0, 16: 1.0, 18: 10.5, 19: .8, 21: 2.2, 23: 2.6, 25: 1.4, 26: 1.2, 27: 1.2, 28: 3.6 };
function buildTimeline() {
  const start = [], dur = [], lead = [], spk = []; let t = 0;
  BEATS.forEach((b, i) => { const l = LEAD[i] == null ? .45 : LEAD[i]; const sp = b.v ? Math.round((b.v[1] - b.v[0]) * 100) / 100 : (SILENT[i] || 4.5); const tl = TAIL[i] == null ? .55 : TAIL[i];
    start.push(t); lead.push(l); spk.push(sp); dur.push(l + sp + tl); t += l + sp + tl; });
  return { start, dur, lead, spk, total: t };
}

/* ---- student-pad: knooppunten -> gladde pad-tabel (positie, snelheid, koers) ---- */
// nodes: [tijd, x, z, faceX?, faceZ?] oplopend in tijd
function buildTrack(nodes, total) {
  const HZ = 60, n = Math.ceil(total * HZ) + 2;
  // 1) booglengte s(t): constante snelheid per segment
  const segs = []; let S = 0; const s0 = [];
  for (let i = 0; i < nodes.length - 1; i++) { const a = nodes[i], b = nodes[i + 1]; const d = Math.hypot(b[1] - a[1], b[2] - a[2]); segs.push({ t0: a[0], t1: b[0], d, S0: S, a, b }); S += d; }
  const raw = new Float32Array(n); let si = 0;
  for (let k = 0; k < n; k++) { const t = k / HZ; while (si < segs.length - 1 && t > segs[si].t1) si++; const sg = segs[si]; if (!sg) { raw[k] = 0; continue; }
    if (t <= sg.t0) raw[k] = sg.S0; else if (t >= sg.t1) raw[k] = sg.S0 + sg.d; else raw[k] = sg.S0 + sg.d * (t - sg.t0) / (sg.t1 - sg.t0); }
  // 2) gladmaken (versnellen/vertragen): twee keer boxcar-filter van 0.7 s
  const W = Math.round(.7 * HZ); let cur = raw;
  for (let pass = 0; pass < 2; pass++) { const out = new Float32Array(n); for (let k = 0; k < n; k++) { let sum = 0, c = 0; for (let j = -W; j <= W; j++) { const q = Math.min(n - 1, Math.max(0, k + j)); sum += cur[q]; c++; } out[k] = sum / c; } cur = out; }
  const sArr = cur;
  // 3) polyline-positie bij s
  const cum = [0]; segs.forEach(sg => cum.push(cum[cum.length - 1] + sg.d));
  const posAt = s => { s = clamp(s, 0, cum[cum.length - 1]); let i = 0; while (i < segs.length - 1 && s > cum[i + 1]) i++; const sg = segs[i]; const u = sg.d > 1e-6 ? (s - cum[i]) / sg.d : 0; return [lerp(sg.a[1], sg.b[1], u), lerp(sg.a[2], sg.b[2], u), sg]; };
  // faceTarget bij stilstand: laatste knoop met face-waarde vóór t
  const faceAt = t => { let f = null; for (let i = 0; i < nodes.length; i++) { if (nodes[i][0] <= t + .001) { if (nodes[i][3] != null) f = [nodes[i][3], nodes[i][4]]; else if (nodes[i][3] === null) f = null; } else break; } return f; };
  const X = new Float32Array(n), Z = new Float32Array(n), SP = new Float32Array(n), HD = new Float32Array(n), SS = sArr;
  let hd = 0, inited = false;
  for (let k = 0; k < n; k++) {
    const p = posAt(sArr[k]); X[k] = p[0]; Z[k] = p[1];
    const sp = k > 0 ? (sArr[k] - sArr[k - 1]) * HZ : 0; SP[k] = k > 0 ? SP[k - 1] * .6 + sp * .4 : 0;
    let target = hd; const sg = p[2];
    if (SP[k] > .25 && sg && sg.d > .01) target = Math.atan2(sg.b[1] - sg.a[1], sg.b[2] - sg.a[2]);
    else { const f = faceAt(k / HZ); if (f) target = Math.atan2(f[0] - X[k], f[1] - Z[k]); else if (sg && sg.d > .01 && !inited) target = Math.atan2(sg.b[1] - sg.a[1], sg.b[2] - sg.a[2]); }
    if (!inited) { hd = target; inited = true; }
    const dA = PF.angDiff(hd, target); hd += dA * (1 - Math.exp(-(SP[k] > .25 ? 7 : 4.2) / HZ)); HD[k] = hd;
  }
  return { HZ, n, at(t) { const f = clamp(t * HZ, 0, n - 1.001), k = Math.floor(f), u = f - k; return { x: lerp(X[k], X[k + 1], u), z: lerp(Z[k], Z[k + 1], u), speed: lerp(SP[k], SP[k + 1], u), s: lerp(SS[k], SS[k + 1], u), h: PF.lerpAng(HD[k], HD[k + 1], u) }; } };
}

/* ---- stage ---- */
function createStage(renderer, opt) {
  opt = opt || {};
  const world = PF.createWorld(), scene = world.scene;
  const cam = new THREE.PerspectiveCamera(40, 16 / 9, .1, 2000); scene.add(cam); PF.labelCam = cam;
  const sunSprite = PF.makeSun(); scene.add(sunSprite);

  // pergola's (afmetingen module = ontwerpkeuze)
  const small = PF.createPergola(world, { nx: 1, nz: 1, cx: CX_SMALL, cz: 0, seed: 11, sensors: [[0, 0]], furn: () => [{ k: 'table', x: 0, z: 0, r: 0 }] });
  const bigAlt = (i, j) => (i === 0 || i === 3) ? { x: (i === 0 ? .5 : -.5), z: j ? -.3 : .3, r: Math.PI / 2 } : { x: 0, z: j ? .45 : -.45, r: 0 };
  const big = PF.createPergola(world, { nx: 4, nz: 2, cx: CX_BIG, cz: 0, seed: 5, skipInterior: true, sensors: [[2, 0], [0, 1]],
    furn: (i, j) => [{ k: 'table', x: 0, z: 0, r: 0, alt: bigAlt(i, j) }] });

  // gids (de student) + extra's
  const guide = PF.createStudent({ hoodie: 0xe0a526, hair: 0x4b3426, seed: 1 }); guide.root.visible = false; world.site.add(guide.root);
  const extras = []; // {s, kind, ...}
  const mk = (o) => { const s = PF.createStudent(Object.assign({ lite: true }, o)); s.root.visible = false; world.site.add(s.root); return s; };
  const palette = [[0x3f7d6e, 0x2a2a2a], [0xc65d4a, 0x7a5a2f], [0x5b7fb5, 0x1f1a17], [0xe7e0d2, 0x5c3b25], [0x8a6fb0, 0x3a2a20], [0x6c8f4d, 0x8a6a3a], [0xd18a3b, 0x1f1a17], [0x51657a, 0x6b4a2a], [0xb55a7a, 0x2d2118], [0x40908f, 0x7c5b36]];
  // ambient (scène 1–6): zittend aan tafel, pratend, wandelend
  const amb = [
    { role: 'sit', x: -17.45, z: 1.55, h: Math.PI, pal: 0, pose: 'type' }, { role: 'sit', x: -16.5, z: -.75, h: 0, pal: 1, pose: 'sit' },
    { role: 'talkA', x: -27.4, z: -3.3, h: 1.3, pal: 2 }, { role: 'talkB', x: -26.0, z: -3.0, h: -1.8, pal: 3 },
    { role: 'walk', pal: 4 }, { role: 'sit', x: 7.4, z: -.9, h: Math.PI, pal: 5, pose: 'type' }
  ];
  amb.forEach(a => { const p = palette[a.pal]; const s = mk({ hoodie: p[0], hair: p[1], seed: a.pal * 3 + 1 }); a.s = s; extras.push(a); });
  // klas (scène 6): zitplaatsen aan tafels, mee-schuivend met de tafels
  const klas = []; const seats = [[0, 0, 1, -.5], [0, 0, 1, .5], [1, 0, -1, -.4], [1, 0, -1, .5], [1, 1, 1, 0], [2, 1, -1, -.5], [2, 1, -1, .4], [2, 0, 1, .2], [3, 0, -1, .4], [3, 1, 1, -.3]];
  seats.forEach((q, idx) => { const p = palette[(idx + 2) % palette.length]; const s = mk({ hoodie: p[0], hair: p[1], seed: idx + 7 }); klas.push({ s, i: q[0], j: q[1], side: q[2], ox: q[3], pose: idx % 3 === 1 ? 'type' : 'sit' }); });
  const teacher = mk({ hoodie: 0x2f4c5e, hair: 0x8a8a8a, jeans: 0x3d3a36, seed: 40, lite: false }); teacher.root.visible = false;

  const tl = buildTimeline();
  return { THREE, world, scene, cam, renderer, sunSprite, small, big, guide, extras, klas, teacher, tl, track: null, opt,
    B: (i, f) => tl.start[i] + tl.dur[i] * (f == null ? 0 : f),
    // tijd van het begin van het gesproken deel
    S: (i, f) => tl.start[i] + tl.lead[i] + tl.spk[i] * (f == null ? 0 : f),
    beatAt(T) { let i = tl.start.length - 1; while (i > 0 && T < tl.start[i]) i--; return i; } };
}
PF.createStage = createStage; PF.buildTrack = buildTrack; PF.buildTimeline = buildTimeline;
})(window);
/* ===== 07 · Regie: camera, student, props en effecten per beat ===== */
(function (G) {
'use strict';
const PF = G.PF, THREE = G.THREE;
const { clamp, lerp, smooth, smoother, easeOut, easeInOut, backOut, seg, BEATS } = PF;
const L3 = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
const win = (f, f0, f1, r) => { r = r || .07; return smooth(seg(f, f0, f0 + r)) * (1 - smooth(seg(f, f1 - r, f1))); };
const orb = (cx, cz, r, a) => [cx + Math.sin(a) * r, cz + Math.cos(a) * r];
const V = (a) => new THREE.Vector3(a[0], a[1], a[2]);

const TK = { x: [-24, -19.5, -15, -10.5], y: 1.95, z: -1.2 };
const SAMPLE = { x: -23, z: 4.1 };
const STAT = [[1.5, 3.1, 1.8], [7.5, 3.1, 1.8], [13.5, 3.1, 1.8], [19.5, 3.1, 1.8]], STAT_F = [.2, .34, .52, .74];
const MAPP = [10, 3.0, -1.5];
const SP = PF.LAYOUT.small, BP = PF.LAYOUT.big;
const SMALLC = [SP.cx, 0, 0], BIGC = [BP.cx, 0, 0];

/* knooppunten student-pad [tijd, x, z, faceX, faceZ] — tijd via ST.B(i,f) */
function nodes(ST) {
  const B = ST.B, S = ST.S;
  return [
    [B(0, 0), -48, 2.4], [B(0, .46), -48, 2.4], [B(0, .92), -40.2, 2.3],
    [B(1, .0), -40.2, 2.3, -38, 4], [B(1, .5), -36.4, 3.0], [B(1, 1), -36.4, 3.0, -36, 12],
    [B(2, 1), -36.4, 3.0, -30, 12],
    [B(3, .08), -36.4, 3.0], [B(3, .75), -29.4, 1.5], [B(3, 1), -29.4, 1.5, SAMPLE.x, SAMPLE.z],
    [B(4, .0), -29.4, 1.5], [B(4, .3), -26.2, 2.0, SAMPLE.x, SAMPLE.z], [B(4, 1), -26.2, 2.0, SAMPLE.x, SAMPLE.z],
    [B(5, .5), -26.2, 2.0], [B(5, .98), -22.5, 3.8], [B(6, .5), -21.5, 3.8, TK.x[0], TK.z],
    [B(7, .0), -21.5, 3.8, TK.x[0], TK.z], [B(7, .3), -21.5, 3.8, TK.x[0], TK.z],
    [B(8, .0), -21.5, 3.8], [B(8, .34), -17, 3.8, TK.x[1], TK.z], [B(9, .0), -17, 3.8], [B(9, .34), -12.5, 3.8, TK.x[2], TK.z],
    [B(10, .0), -12.5, 3.8], [B(10, .34), -8, 3.8, TK.x[3], TK.z],
    [B(11, .0), -8, 3.8, SMALLC[0], 0], [B(11, 1), -8, 3.8, SMALLC[0], 0],
    [B(12, .0), -8, 3.8], [B(12, .22), -6.4, 1.2], [B(12, .55), -3.8, .25, SMALLC[0] + 4, 0], [B(12, 1), -3.8, .25, SMALLC[0] + 3, 0],
    [B(13, .0), -3.8, .25], [B(13, .22), -5.7, .6], [B(13, .5), -5.9, 2.9, SMALLC[0] - 2.55, 2.3], [B(13, 1), -5.9, 2.9, SMALLC[0] - 2.55, 2.3],
    [B(14, .0), -5.9, 2.9], [B(14, .2), -5.9, .5], [B(14, .35), -3.6, .5], [B(14, .45), -3.4, 1.28], [B(14, .6), -2.5, 1.28, -2.5, 0], [B(14, 1), -2.5, 1.28, -2.5, 0],
    [B(15, .0), -2.5, 1.28, -2.5, 0], [B(15, .22), -3.5, 1.28], [B(15, .38), -3.7, .3, SMALLC[0] - 2, 3], [B(15, 1), -3.7, .3, SMALLC[0] - 1, 3],
    [B(16, .0), -3.7, .3], [B(16, .3), -6.4, 1.3], [B(16, .5), -7.8, 3.3, SMALLC[0], 0], [B(16, 1), -7.8, 3.3, SMALLC[0], 0],
    [B(17, .0), -7.8, 3.3], [B(17, .95), 9.8, 3.8], [B(18, .0), 9.8, 3.8, BIGC[0], 0], [B(18, 1), 9.8, 3.8, BIGC[0], 0],
    [B(19, .0), 9.8, 3.8], [B(19, .2), 14.5, 3.0], [B(19, .45), 16.0, .55], [B(19, .8), 21.8, .45, 30, .4], [B(19, 1), 21.8, .45, 25, 2],
    [B(20, .0), 21.8, .45], [B(20, .3), 24.2, .45, 30.8, .4], [B(20, 1), 24.2, .45, 30.8, .4],
    [B(21, 1), 24.2, .45, 26, 6],
    [B(22, .0), 24.2, .45], [B(22, .35), 24.2, .4, 26.1, -3.6], [B(22, 1), 24.2, .4, 26.1, -3.6],
    [B(23, .0), 24.2, .4], [B(23, .45), 22.3, 1.2], [B(23, .65), 22.3, 5.2, 26, 0], [B(23, 1), 22.3, 5.2, 26, 0],
    [B(24, .0), 22.3, 5.2], [B(24, .6), 13, 5.0, 26, 0], [B(25, .0), 13, 5.0, 8.6, 1.8], [B(26, 1), 13, 5.0, 7.5, -1.4],
    [B(27, .0), 13, 5.0], [B(27, .5), 13, 5.0, 26, 0], [B(27, 1), 13, 5.0, 26, 0],
    [B(28, 0), 13, 5.0], [B(28, .45), 2.5, 4.4, -8, 6], [B(28, 1), 2.5, 4.4, -8, 6], [B(28, 1) + 600, 2.5, 4.4, -8, 6]
  ].sort((a, b) => a[0] - b[0]);
}

function createChoreo(ST) {
  const W = ST.world, scene = ST.scene, cam = ST.cam, guide = ST.guide, small = ST.small, big = ST.big, B = ST.B, S = ST.S, tl = ST.tl;
  const C = { cam: new THREE.Vector3(), look: new THREE.Vector3(), fov: 40, ready: false };
  let props = null; const tmp = new THREE.Vector3();

  C.init = function () {
    ST.track = PF.buildTrack(nodes(ST), tl.total + 700);
    const P = props = { tokens: [], tokLabels: [], chips: [], roofLabels: [], stat: [], tags: [], locks: [], meters: [], dataLab: [] };
    // functie-tokens + labels
    const names = ['Stroom opwekken', 'Schaduw en koeling', 'Groen en leefgebied', 'Leren en verblijven'];
    for (let k = 0; k < 4; k++) { const t = PF.makeToken(k + 1); t.position.set(TK.x[k], TK.y, TK.z); scene.add(t); P.tokens.push(t);
      const l = PF.makeLabel({ text: names[k], badge: k + 1, h: .62 }); l.position.set(TK.x[k], TK.y + 2.45, TK.z); scene.add(l); P.tokLabels.push(l); }
    // dakdoorsnede
    P.roof = PF.makeRoofSample(); P.roof.position.set(SAMPLE.x, 0, SAMPLE.z); P.roof.rotation.y = .25; scene.add(P.roof);
    const rl = [['Draagkracht', 'Gewicht van het dak', -1.25, 3.55], ['Waterdichting', 'Moet dicht blijven', 0, 1.65], ['Waterafvoer', 'Regenwater moet weg', 1.5, .9]];
    rl.forEach(r => { const l = PF.makeLabel({ text: r[0], sub: r[1], h: .66, accent: '#e9503a' }); l.position.set(SAMPLE.x + r[2], r[3], SAMPLE.z + 0); scene.add(l); P.roofLabels.push(l); });
    ['Geen boren', 'Licht', 'Verplaatsbaar'].forEach((tx, i) => { const l = PF.makeLabel({ text: tx, h: .55, accent: '#e9a400' }); l.position.set(SAMPLE.x - 3.0 + i * 3.0, 2.5, SAMPLE.z + .5); scene.add(l); P.chips.push(l); });
    // hitte-label
    P.heatLab = PF.makeLabel({ text: 'Geen schaduw', sub: 'De tegels warmen op', h: .66, accent: '#e9503a' }); P.heatLab.position.set(-30.5, 2.7, 1.2); scene.add(P.heatLab);
    P.facadeLab = PF.makeLabel({ text: 'Fietsenstalling', sub: 'Het dak is het terras', h: .62 }); P.facadeLab.position.set(-34.2, 1.4, 6.9); scene.add(P.facadeLab);
    // proef-meters (scène 4)
    ['Schaduw', 'Temperatuur', 'Gebruik'].forEach((tx, i) => { const l = PF.makeLabel({ text: tx, sub: 'meten', h: .6 }); l.position.set(SMALLC[0] - 3.2 + i * 3.2, 4.1 + (i % 2) * .5, 2.6); scene.add(l); P.meters.push(l); });
    // sensor-labels (scène 6)
    [['Temperatuur', ''], ['Bodemvocht', ''], ['BioBlitz · HAN', 'levend laboratorium']].forEach((q, i) => { const l = PF.makeLabel({ text: q[0], sub: q[1], h: .42, accent: '#57b4ff' }); scene.add(l); P.dataLab.push(l); });
    // statistieken (UTS Sydney)
    [['319', 'zonnepanelen', ''], ['14.000+', 'inheemse planten', ''], ['11,1%', 'meer stroom dan een gewoon dak', ''], ['28 °C', 'koeler op extreem hete dagen', 'UTS · Sydney · zomer 2025']].forEach((q, i) => {
      const s = PF.makeBig({ num: q[0], label: q[1], src: q[2], h: i === 3 ? 1.75 : 1.5, hl: i % 2 ? '#7fbf7a' : '#f2b705' }); s.position.set(...STAT[i]); scene.add(s); P.stat.push(s); });
    // kaart
    P.map = PF.makeMap(); P.map.position.set(...MAPP); P.map.scale.setScalar(.001); scene.add(P.map);
    // 'nog te toetsen' tags
    ['Draagkracht', 'Wind en kantelrisico', 'Elektra en brandveiligheid', 'Kosten', 'Beheer'].forEach((tx, i) => { const l = PF.makeLabel({ text: tx, sub: 'nog te toetsen', h: .85, bg: '#f4f2ea', accent: '#c9c4b8' }); l.position.set(BIGC[0] - 8.4 + i * 4.2, 3.7 + (i % 2) * 1.75, 1.6); scene.add(l); P.tags.push(l); });
    P.concept = PF.makeBig({ num: 'Concept', label: 'nog niet getoetst op draagkracht, kosten en beheer', h: 2.0, hl: '#e9a400' }); P.concept.position.set(BIGC[0], 7.3, 3.5); scene.add(P.concept);
    // slotjes (vastzetten)
    for (let k = 0; k < 8; k++) { const g = new THREE.Group(); const body = new THREE.Mesh(new THREE.BoxGeometry(.34, .26, .12), new THREE.MeshStandardMaterial({ color: 0xe9a400, roughness: .4, metalness: .3 })); const sh = new THREE.Mesh(new THREE.TorusGeometry(.1, .03, 8, 16, Math.PI), new THREE.MeshStandardMaterial({ color: 0xcfd6dd, metalness: .6, roughness: .3 })); sh.position.y = .13; g.add(body, sh); g.visible = false; scene.add(g); P.locks.push(g); }
    C.ready = true;
  };

  // ---- uitgangspunten per beat: student-gebaren ----
  const HEADY = 1.55;
  function stuState(T, i, f, c) {
    const st = { speed: c.speed, talk: c.talk, level: c.level, gesture: 'none', gestW: 0, pointAt: null, pointW: 0, lookAt: null, lookW: 0, pose: 'stand', smile: .6, brow: 0, leanIn: 0 };
    const look = (w, x, y, z) => { if (w > st.lookW) { st.lookAt = V([x, y, z]); st.lookW = w; } };
    const point = (w, x, y, z) => { st.pointAt = V([x, y, z]); st.pointW = w; look(Math.max(w, .8) * (w > .02 ? 1 : 0), x, y, z); };
    const open = (w) => { st.gesture = 'open'; st.gestW = w; };
    const camP = cam.position; const toCam = (w) => look(w, camP.x, camP.y, camP.z);
    const sx = c.x, sz = c.z;
    switch (i) {
      case 0: open(win(f, .55, .97)); toCam(win(f, .45, 1)); break;
      case 1: point(win(f, .66, .97), sx + 1.4, -1.8, 8.8); st.brow = 1; break;
      case 2: open(win(f, .1, .92)); toCam(win(f, 0, .5)); look(win(f, .55, 1) * .9, sx + 9, 1.2, sz - 1); break;
      case 3: look(win(f, .0, .3) * 1.0, sx - 28, 24, sz + 30); look(win(f, .4, 1) * .8, sx + 3, 0, sz + 1.5); open(win(f, .42, .85)); st.brow = win(f, .05, .3); break;
      case 4: point(win(f, .22, .82), SAMPLE.x, .7, SAMPLE.z); break;
      case 5: open(win(f, .1, .5)); toCam(win(f, .05, .5)); break;
      case 6: open(win(f, .1, .9)); look(win(f, .25, 1), -17, 2.4, -1.2); break;
      case 7: case 8: case 9: case 10: { const k = i - 7; open(win(f, .35, .92)); look(win(f, .0, 1), TK.x[k], 2.4, TK.z); st.brow = win(f, .35, .7); break; }
      case 11: point(win(f, .16, .5), SMALLC[0], .3, 0); look(win(f, .5, 1), SMALLC[0], 2, 0); open(win(f, .6, .95)); break;
      case 12: look(win(f, .6, .92), SMALLC[0], 3.0, .5); open(win(f, .4, .9)); break;
      case 13: point(win(f, .5, .96), SMALLC[0] - 2.55, .75, 2.3); break;
      case 14: if (f > .62) { st.pose = f > .7 ? 'type' : 'sit'; } look(win(f, .5, 1) * .9, -1.6, .85, 0); break;
      case 15: open(win(f, .42, .95)); look(win(f, .4, .9), SMALLC[0], 3.2, 1.8); st.brow = win(f, .45, .85); break;
      case 16: open(win(f, .3, .9)); toCam(win(f, .5, .9)); look(win(f, .0, .45), SMALLC[0], 2.3, 0); break;
      case 17: look(win(f, .55, .95), cam.position.x, cam.position.y, cam.position.z); break;
      case 18: point(win(f, .1, .6, .1), BIGC[0], .6, 0); look(win(f, .6, 1) * .7, BIGC[0], 2, 0); open(win(f, .7, .98)); break;
      case 19: open(win(f, .42, .93)); look(win(f, .35, 1), 25, 1.3, -1.5); break;
      case 20: open(win(f, .05, .6)); look(win(f, .05, 1), 30.8, 1.5, .4); break;
      case 21: open(win(f, .55, .9)); look(win(f, .0, .9) * .9, 26, .8, 0); break;
      case 22: point(win(f, .22, .7), 26.1, 1.7, -3.5); break;
      case 23: look(win(f, .1, .9), 22.3, 3.0, 0); open(win(f, .5, .9)); break;
      case 24: open(win(f, .4, .9)); toCam(win(f, .3, .9)); break;
      case 25: { const k = clamp(Math.floor(f * 4.3)); const q = [.22, .36, .55, .78].map(v => v - .02); let ix = -1; q.forEach((v, n) => { if (f > v) ix = n; }); if (ix >= 0) point(win(f, q[ix], Math.min(1, q[ix] + .2)) * .95, STAT[ix][0], STAT[ix][1] - .3, STAT[ix][2]); else look(.5, STAT[0][0], 3, 1.8); break; }
      case 26: { let ix = -1; [.12, .3, .5, .68].forEach((v, n) => { if (f > v) ix = n; }); if (ix >= 0) point(win(f, [.12, .3, .5, .68][ix], [.12, .3, .5, .68][ix] + .18) * .9, MAPP[0], MAPP[1] + 1, MAPP[2]); break; }
      case 27: open(win(f, .5, .95)); toCam(win(f, .4, .95)); st.brow = win(f, .5, .8) * .6; break;
      case 28: toCam(win(f, .0, 1)); if (f > .08 && f < .5) { st.pose = 'raise'; } else if (f > .5) { open(win(f, .55, 1)); } break;
    }
    return st;
  }

  /* ---- cameravoorstellingen: [pos, look, fov] ---- */
  const SH = [];
  const aerial = [-118, 58, 92];
  SH[0] = (u, c) => { const e = smoother(u); const p = L3(aerial, [c.x + 3.6, 3.2, c.z + 11.5], e); const l = L3([-8, -3, 0], [c.x + 1, 1.35, c.z], smooth(seg(u, .25, 1))); return [p, l, lerp(32, 42, e)]; };
  SH[1] = (u, c) => { const e = smoother(seg(u, .52, .97)); const track = [c.x + 4.2, 1.6, c.z + 5.8]; const out = [c.x + 5.5, 1.9, 21]; return [L3(track, out, e), L3([c.x + 1, 1.3, c.z], [c.x + .8, 1.3, 4.0], e), lerp(40, 36, e)]; };
  SH[2] = (u, c) => { const a = lerp(.6, -.55, easeInOut(u)); const o = orb(c.x, c.z, 6.6, a); return [[o[0], 1.55 + easeInOut(u) * 1.4, o[1]], [c.x + .5, 1.35, c.z], 38]; };
  SH[3] = (u, c) => { const e = smoother(seg(u, .2, .9)); const p = L3([c.x - 3.2, .6, c.z + 3.0], [c.x + 3.2, 1.3 + e * 1.5, c.z + 6.6], e); const sunL = [c.x - 30, 28, c.z + 34]; const l = L3(L3(sunL, [c.x + 2, 1.2, c.z], smooth(seg(u, .12, .5))), [c.x + 6, .3, c.z], smooth(seg(u, .55, 1)) * .0); return [p, l, lerp(50, 40, e)]; };
  SH[4] = (u, c) => { const e = smoother(u); const a = lerp(-1.0, .5, e), r = lerp(10.5, 8.0, e); const o = orb(SAMPLE.x, SAMPLE.z, r, a); const p = [o[0], lerp(1.9, 2.6, e), o[1]]; const l = [SAMPLE.x, lerp(1.0, 1.7, e), SAMPLE.z]; return [p, l, lerp(42, 40, e)]; };
  SH[5] = (u, c) => { const e = smoother(u); const a = lerp(.5, 1.25, e), r = lerp(8.0, 10.5, e); const o = orb(SAMPLE.x, SAMPLE.z, r, a); return [[o[0], lerp(2.6, 2.8, e), o[1]], L3([SAMPLE.x, 1.7, SAMPLE.z], [c.x + 1, 1.5, c.z - 1], e), 40]; };
  SH[6] = (u, c) => { const e = smoother(u); return [L3([-30, 1.5, 11], [-22, 2.2, 10.5], e), L3([-20, 2.0, 0.5], [-19, 2.1, .8], e), lerp(50, 46, e)]; };
  [7, 8, 9, 10].forEach((i, k) => { SH[i] = (u, c) => { const e = smoother(seg(u, 0, .45)); const e2 = easeInOut(u); const px = lerp(k ? TK.x[k - 1] + 1.3 : -23, TK.x[k] + 1.3, e); return [[px, lerp(2.4, 2.1, e2), lerp(10.2, 8.4, e2)], [lerp(k ? TK.x[k - 1] + 1.1 : -22, TK.x[k] + 1.1, e), 2.0, 1.4], lerp(48, 44, e2)]; }; });
  const asmP = (T, t0, d) => seg(T, t0, t0 + d);
  SH[11] = (u, c) => { const p = c.pS; const a = lerp(-1.2, .55, smoother(seg(u, .08, 1))), r = lerp(12.5, 8.5, smoother(u)); const o = orb(SMALLC[0], 0, r, a); return [[o[0], lerp(1.1, 3.9, smoother(u)), o[1]], [SMALLC[0], lerp(.9, 1.9, smoother(u)), 0], lerp(42, 36, smoother(u))]; };
  SH[12] = (u, c) => { const e = smoother(seg(u, .0, .9)); const P0 = [-8, 3.1, 7.5], P1 = [5.0, 1.8, 6.5], P2 = [2.8, 1.15, .9]; const a = L3(P0, P1, e), b = L3(P1, P2, e); const p = L3(a, b, e); return [p, L3([SMALLC[0], 1.3, 0], [SMALLC[0] - 1.6, 2.95, .3], smoother(seg(u, .3, .9))), lerp(40, 52, e)]; };
  SH[13] = (u, c) => { const e = smoother(u); const p = [lerp(3.0, -9.6, e), lerp(.9, 1.6, e), lerp(7.4, 7.0, e)]; return [p, [SMALLC[0] - 2.55, lerp(.7, 1.9, smooth(seg(u, .2, .95))), 2.4], lerp(44, 40, e)]; };
  SH[14] = (u, c) => { const e = smoother(seg(u, 0, .5)), e2 = smoother(seg(u, .5, 1)); const p = L3(L3([-8, 1.9, 4.4], [-.6, 1.55, 3.1], e), [2.9, 1.7, -.4], e2); const l = L3(L3([-4, 1.1, 1.0], [-2, .95, .3], e), [1.0, 1.0, -1.6], e2); return [p, l, 42]; };
  SH[15] = (u, c) => { const e = smoother(u); const a = lerp(-.95, .75, e), r = lerp(8.5, 7.2, e); const o = orb(SMALLC[0], 0, r, a); return [[o[0], lerp(2.2, 3.4, e), o[1]], [SMALLC[0], 2.6, 1.2], 40]; };
  SH[16] = (u, c) => { const e = smoother(u); const a = lerp(.75, 1.7, e), r = lerp(10, 15, e); const o = orb(SMALLC[0], 0, r, a); return [[o[0], lerp(3.4, 6.0, e), o[1]], [SMALLC[0] + 1, 1.8, 0], lerp(40, 36, e)]; };
  SH[17] = (u, c) => { const e = smoother(u); const p = L3([c.x + 3.0, 2.3, c.z + 7.2], [c.x + 5.5, 2.9, c.z + 9.5], e); return [p, [c.x + 3.0 + e * 4, 1.3, c.z - .5], 42]; };
  SH[18] = (u, c) => { const e = smoother(seg(u, 0, .98)); const a = lerp(-1.45, .35, e), r = lerp(36, 33, e); const o = orb(BIGC[0], 0, r, a); const behind = [c.x - 4.5, 1.9, c.z + 3.2]; const pOrb = [o[0], lerp(2.0, 15, smoother(seg(u, .08, 1))), o[1]]; const w = smoother(seg(u, 0, .22)); return [L3(behind, pOrb, w), L3([c.x + 6, 1.8, c.z - 1], [BIGC[0], 1.4, 0], w), lerp(46, 36, e)]; };
  SH[19] = (u, c) => { const e = smoother(u); return [L3([11.5, 1.65, 6.4], [23.5, 1.3, 6.2], e), [lerp(17, 25, e), 1.2, -.6], lerp(52, 56, e)]; };
  SH[20] = (u, c) => { const e = smoother(u); return [L3([16, 1.5, 6.0], [30.8, 1.8, 5.2], e), [lerp(22, 30.8, e), 1.3, .4], lerp(54, 46, e)]; };
  SH[21] = (u, c) => { const e = smoother(seg(u, 0, .35)); return [L3([30.8, 4.5, 9], [BIGC[0] + 1 - u * 2, 25, 6.5 - u * 2], e), L3([26, 1.2, 0], [BIGC[0], 0, -.4], e), lerp(48, 44, e)]; };
  SH[22] = (u, c) => { const sp = c.sensor; const e = smoother(u); return [L3([sp[0] - 5.0, 3.0, sp[2] + 6.5], [sp[0] - 1.4, 2.5, sp[2] + 4.5], e), [sp[0], 2.1, sp[2]], lerp(40, 38, e)]; };
  SH[23] = (u, c) => { const e = smoother(u); return [L3([15.5, 1.0, 3.3], [35.5, 1.6, 4.9], e), [lerp(21, 29, e), 2.4, -.5], lerp(58, 52, e)]; };
  SH[24] = (u, c) => { const e = smoother(u); const a = lerp(.75, -.35, e), r = lerp(52, 56, e); const o = orb(10, 0, r, a); return [[o[0], lerp(13, 22, e), o[1]], [10, 1.2, 0], 36]; };
  SH[25] = (u, c) => { let lx = STAT[0][0]; for (let k = 1; k < 4; k++) lx = lerp(lx, STAT[k][0], smoother(seg(u, STAT_F[k] - .08, STAT_F[k] + .12))); return [[lx - 1.2, 2.9, 10.5], [lx, 3.0, 1.8], 46]; };
  SH[26] = (u, c) => { const e = smoother(u); const a = lerp(.55, -.45, e), r = lerp(10.5, 8.6, e); const o = orb(MAPP[0], MAPP[2], r, a); return [[o[0], lerp(4.2, 4.9, e), o[1]], [MAPP[0], MAPP[1] + .5, MAPP[2]], 42]; };
  SH[27] = (u, c) => { const e = smoother(u); return [L3([BIGC[0] + 7, 4.8, 24], [BIGC[0] - 7, 4.2, 20], e), [BIGC[0], 4.6, 0], lerp(46, 50, e)]; };
  const EXPLORE = { pos: [-13, 1.7, 0.9], look: [12, 2.4, 0.2] };
  C.explore = EXPLORE;
  SH[28] = (u, c) => { const e1 = smoother(seg(u, 0, .55)), e2 = smoother(seg(u, .5, 1)); const a = L3([c.x + 2.8, 1.8, c.z + 5], [-62, 36, 54], e1); return [L3(a, EXPLORE.pos, e2), L3(L3([c.x, 1.4, c.z], [0, 0, 0], e1), EXPLORE.look, e2), lerp(42, 54, e2) + 0 * e1]; };

  /* ---- hoofd-update ---- */
  const dm = new THREE.Object3D();
  C.apply = function (T, dt, ctx) {
    ctx = ctx || {};
    const i = ST.beatAt(T), f = clamp((T - tl.start[i]) / tl.dur[i]); const c0 = ST.track.at(T);
    const speaking = ctx.speaking != null ? ctx.speaking : (T >= S(i, 0) && T <= S(i, 1) + .2);
    C.talk += ((speaking ? 1 : 0) - C.talk) * (1 - Math.exp(-dt * 12));
    C.lvl = ctx.level != null ? ctx.level : null;
    const tIn = T - tl.start[i];
    // --- progressies
    const tA1 = B(11, .1), tA2 = B(18, .08), D1 = 13.5, D2 = 19.5;
    const pS = seg(T, tA1, tA1 + D1), pB = seg(T, tA2, tA2 + D2);
    const heat = smooth(seg(T, B(3, .1), B(3, .5))) * (1 - smooth(seg(T, B(4, .1), B(4, .6))));
    W.setHeat(heat);
    // --- student
    guide.root.visible = T >= B(0, .0);
    const c = { x: c0.x, z: c0.z, speed: c0.speed, talk: C.talk, level: C.lvl, pS, sensor: C.sensorPos || [26, 1.7, -3.5] };
    let sit = (i === 14 && f > .62 && f < 1) || (i === 15 && f < .2);
    const stP = stuState(T, i, f, c); if (sit) stP.pose = (i === 15 && f < .2) ? 'sit' : stP.pose === 'type' ? 'type' : 'sit';
    guide.root.position.set(c0.x, 0, c0.z); guide.root.rotation.y = c0.h;
    guide.phase = c0.s / 1.45 * Math.PI * 2; // voetplaatsing gekoppeld aan afgelegde weg
    const savedPhase = guide.phase; guide.update(T, dt, Object.assign(stP, { speed: sit ? 0 : c0.speed }));
    guide.phase = savedPhase;
    // --- schaduw/hitte/overig
    const P = props;
    // tokens
    P.tokens.forEach((t, k) => { const u = seg(T, B(6, .2 + k * .14), B(6, .2 + k * .14) + 1.1) * (1 - smooth(seg(T, B(11, .05), B(11, .4)))); PF.updateToken(t, T, u, i === 7 + k); const lu = seg(T, k === 0 ? B(7, .15) : B(7 + k, .08), (k === 0 ? B(7, .15) : B(7 + k, .08)) + .8) * (1 - smooth(seg(T, B(11, .0), B(11, .25)))); PF.popLabel(P.tokLabels[k], lu); P.tokLabels[k].position.y = TK.y + 2.45 + Math.sin(T * 1.6 + k) * .06; });
    // dak-doorsnede
    const rv = smooth(seg(T, B(4, .02), B(4, .2))) * (1 - smooth(seg(T, B(5, .7), B(5, .95))));
    const rx = smooth(seg(T, B(4, .2), B(4, .6))) * (1 - smooth(seg(T, B(5, .3), B(5, .6))));
    PF.updateRoofSample(P.roof, T, rx, rv);
    P.roofLabels.forEach((l, k) => { PF.popLabel(l, seg(T, B(4, .34 + k * .17), B(4, .34 + k * .17) + .7) * (1 - smooth(seg(T, B(5, .0), B(5, .2))))); });
    P.chips.forEach((l, k) => PF.popLabel(l, seg(T, B(5, .12 + k * .22), B(5, .12 + k * .22) + .6) * (1 - smooth(seg(T, B(5, .85), B(6, .1))))));
    PF.popLabel(P.heatLab, seg(T, B(3, .38), B(3, .38) + .7) * (1 - smooth(seg(T, B(4, .02), B(4, .2))))); P.heatLab.position.x = c0.x + 3.6; P.heatLab.position.z = c0.z - 1.2;
    PF.popLabel(P.facadeLab, seg(T, B(1, .62), B(1, .62) + .7) * (1 - smooth(seg(T, B(2, .0), B(2, .2)))));
    // pergola's
    if (Math.abs(small.progress - pS) > 1e-5) small.setProgress(pS);
    if (Math.abs(big.progress - pB) > 1e-5) big.setProgress(pB);
    const lay = easeInOut(seg(T, B(21, .12), B(21, .5))) * (1 - easeInOut(seg(T, B(21, .72), B(22, .1))));
    if (Math.abs(big.layout - lay) > 1e-4) big.setLayout(lay);
    const gl = (t0) => { const d = (T - t0) / 3.2; return d < 0 || d > 1.15 ? -1 : d; };
    small.setFx({ rays: win(T, B(12, .15), B(13, .6), 1.5) * .9 + win(T, B(15, .0), B(15, .2), 1) * 0, cool: win(T, B(12, .3), B(16, .6), 2.2), energy: win(T, B(14, .12), B(15, .06), 1.2), life: smooth(seg(T, B(13, .3), B(13, .8))) * (1 - smooth(seg(T, B(16, .6), B(17, .2)))), rain: win(T, B(15, .08), B(15, .9), 1.1) * .9, sensor: win(T, B(16, .1), B(17, .1), 1), glint: gl(tA1 + D1 - .6), red: 0 });
    const redk = win(T, B(23, .2), B(23, .98), 1.4);
    big.setFx({ xray: win(T, B(21, .04), B(21, .9), .14), rays: win(T, B(19, .2), B(21, .0), 2) * .6, cool: win(T, B(19, .0), B(24, .0), 3), energy: win(T, B(19, .3), B(22, .2), 2) * .7, life: smooth(seg(T, B(19, .0), B(19, .6))) * (1 - smooth(seg(T, B(25, .0), B(25, .5)))), rain: 0, sensor: win(T, B(22, .1), B(23, .05), 1), glint: gl(tA2 + D2 - .6), red: redk });
    small.update(T, dt); big.update(T, dt); W.update(T, dt, cam);
    // dusk
    const dusk = win(T, B(23, .08), B(23, .96), 1.6);
    const dk = smooth(dusk); W.sun.intensity = lerp(1.75, .08, dk); W.hemi.intensity = lerp(.85, .55, dk); W.hemi.color.setHex(0xeaf1ff).lerp(new THREE.Color(0x7d8bc0), dk);
    W.scene.background.setHex(PF.COL.sky).lerp(new THREE.Color(0x2c3558), dk); W.scene.fog.color.copy(W.scene.background);
    W.land.mesh.material.color.setRGB(lerp(1, .22, dk), lerp(1, .26, dk), lerp(1, .42, dk)); ST.sunSprite.material.opacity = 1 - dk;
    W.poles.forEach(p => { });
    // extras (ambient + klas)
    updateExtras(T, dt, i, f);
    // data-labels bij sensor
    const sw = ST.big.mods.find(m => m.sensor); let sp = null; if (sw) { sw.sensor.getWorldPosition(tmp); sp = [tmp.x, tmp.y, tmp.z]; C.sensorPos = sp; }
    P.dataLab.forEach((l, k) => { if (sp) l.position.set(sp[0] + (k - 1) * 1.45, sp[1] + .35 + (k === 1 ? .5 : 0) + Math.sin(T * 1.4 + k) * .05, sp[2] + .6); PF.popLabel(l, seg(T, B(22, .26 + k * .15), B(22, .26 + k * .15) + .7) * (1 - smooth(seg(T, B(23, .0), B(23, .2))))); });
    // stats
    const stT = STAT_F.map(v => B(25, v));
    P.stat.forEach((s, k) => { const nxt = k < 3 ? B(25, STAT_F[k + 1] - .02) : B(26, .0); PF.popLabel(s, seg(T, stT[k], stT[k] + .7) * (1 - smooth(seg(T, nxt, nxt + (k < 3 ? .9 : 1.2))))); s.position.y = STAT[k][1] + Math.sin(T * 1.2 + k) * .06; });
    // kaart
    const mapU = seg(T, B(26, .0), B(26, .12)) * (1 - smooth(seg(T, B(27, .0), B(27, .3))));
    P.map.visible = mapU > .001; if (P.map.visible) { P.map.scale.setScalar(Math.max(.001, backOut(mapU)) * 1.25); P.map.rotation.y = Math.sin(T * .3) * .08; }
    P.map.userData.pins.forEach((pg, k) => { const PT = [.12, .3, .5, .68], u = seg(T, B(26, PT[k]), B(26, PT[k]) + .6), lu = u * (k < 3 ? 1 - smooth(seg(T, B(26, PT[k + 1] - .03), B(26, PT[k + 1] + .08))) : 1); pg.visible = u > .001; pg.scale.setScalar(Math.max(.001, backOut(u))); pg.userData.lab.userData && PF.popLabel(pg.userData.lab, lu); pg.userData.head.position.y = 1.0 + Math.sin(T * 3 + k) * .03; });
    // tags + concept
    P.tags.forEach((l, k) => { PF.popLabel(l, seg(T, B(27, .16 + k * .12), B(27, .16 + k * .12) + .6) * (1 - smooth(seg(T, B(28, .0), B(28, .25))))); l.position.y = 3.7 + (k % 2) * 1.75 + Math.sin(T * 1.3 + k) * .05; });
    PF.popLabel(P.concept, seg(T, B(27, .62), B(27, .62) + .8) * (1 - smooth(seg(T, B(28, .0), B(28, .25)))));
    // slotjes
    const lockU = seg(T, B(21, .62), B(21, .62) + 1.3);
    P.locks.forEach((g, k) => { const fr = big.furn && big.furn[k]; const u = clamp(lockU * 1.6 - k * .08) * (1 - smooth(seg(T, B(22, .0), B(22, .2)))); g.visible = !!fr && u > .001; if (!g.visible) return; fr.g.getWorldPosition(tmp); g.position.set(tmp.x, 1.9, tmp.z); g.scale.setScalar(Math.max(.001, backOut(u))); g.rotation.y = Math.sin(T * 1.5 + k) * .2; });
    // --- camera
    const shot = SH[i](f + Math.max(0, (tIn - tl.dur[i]) / tl.dur[i]) * 0, c);
    let cs = shot; const blendT = 1.9;
    if (i > 0 && tIn < blendT) { const pv = SH[i - 1](1, c); const w = smoother(tIn / blendT); cs = [L3(pv[0], shot[0], w), L3(pv[1], shot[1], w), lerp(pv[2], shot[2], w)]; }
    // houd 'u' voor stilstaande holds licht in beweging (drift) zodat de camera nooit statisch is
    const dr = Math.sin(T * .35) * .12, dr2 = Math.cos(T * .27) * .08;
    const target = new THREE.Vector3(cs[0][0] + dr, Math.max(.45, cs[0][1] + dr2 * .5), cs[0][2] + dr2), look = new THREE.Vector3(cs[1][0], cs[1][1], cs[1][2]);
    if (!C.ready2 || ctx.snap) { C.cam.copy(target); C.look.copy(look); C.fov = cs[2]; C.ready2 = true; }
    else { const k1 = 1 - Math.exp(-dt * 7), k2 = 1 - Math.exp(-dt * 9); C.cam.lerp(target, k1); C.look.lerp(look, k2); C.fov += (cs[2] - C.fov) * (1 - Math.exp(-dt * 4)); }
    cam.position.copy(C.cam).add(tmp.set(Math.sin(T * 1.1) * .012, Math.sin(T * 1.7) * .014, Math.cos(T * .9) * .01)); cam.lookAt(C.look);
    if (Math.abs(cam.fov - C.fov) > .01) { cam.fov = C.fov; cam.updateProjectionMatrix(); }
    ST.sunSprite.position.copy(cam.position).addScaledVector(PF.SUN_DIR, 560);
    return { beat: i, f, speaking };
  };
  C.talk = 0;

  /* ---- extra's ---- */
  function updateExtras(T, dt, bi, bf) {
    ST.extras.forEach((a, k) => { const s = a.s; s.root.visible = T > B(0, .5); if (!s.root.visible) return; const st = { talk: 0, pose: 'stand', speed: 0, gesture: 'none' };
      if (a.role === 'sit') { s.root.position.set(a.x, 0, a.z); s.root.rotation.y = a.h; st.pose = a.pose; st.talk = Math.sin(T * .31 + k * 2) > .75 ? .5 : 0; }
      else if (a.role === 'talkA' || a.role === 'talkB') { const A = a.role === 'talkA'; s.root.position.set(a.x, 0, a.z); s.root.rotation.y = a.h; const turn = Math.sin(T * .45 + (A ? 0 : 3.1)) > 0; st.talk = turn ? .8 : 0; st.gesture = turn ? 'open' : 'none'; st.gestW = .8; }
      else if (a.role === 'walk') { const Lw = 16, ph = (T * 1.05) % (2 * Lw), fw = ph < Lw, x = -44 + (fw ? ph : 2 * Lw - ph); s.root.position.set(x, 0, 5.3); s.root.rotation.y = fw ? Math.PI / 2 : -Math.PI / 2; st.speed = 1.05; s.phase = (fw ? ph : 2 * Lw - ph + 7) / 1.45 * Math.PI * 2; const sp2 = s.phase; s.update(T, dt, st); s.phase = sp2; return; }
      s.update(T, dt, st); });
    // klas
    const u0 = ST.big.progress, show = u0 > .93;
    const apT = B(19, 0);
    ST.klas.forEach((q, k) => { const s = q.s; const fr = ST.big.furn && ST.big.furn.find(x => x.mod.i === q.i && x.mod.j === q.j); const u = seg(T, apT + k * .22, apT + k * .22 + .9); s.root.visible = show && u > .001 && !!fr; if (!s.root.visible) return;
      const g = fr.g, m = fr.mod, r = g.rotation.y; const tx = ST.big.group.position.x + m.g.position.x + g.position.x, tz = ST.big.group.position.z + m.g.position.z + g.position.z;
      const ox = q.ox, oz = q.side * 1.0; const wx = tx + Math.cos(r) * ox + Math.sin(r) * oz, wz = tz - Math.sin(r) * ox + Math.cos(r) * oz;
      s.root.position.set(wx, 0, wz); s.root.rotation.y = Math.atan2(tx - wx, tz - wz); s.root.scale.setScalar(Math.max(.001, backOut(u)) * 1); const typing = q.pose === 'type';
      const talking = Math.sin(T * .33 + k * 1.9) > .55 && !typing;
      s.update(T, dt, { pose: typing ? 'type' : 'sit', talk: talking ? .6 : 0, gesture: talking ? 'open' : 'none', gestW: .5, speed: 0 }); });
    const th = ST.teacher; th.root.visible = show && seg(T, apT + 1.0, apT + 1.8) > 0; if (th.root.visible) { th.root.position.set(30.8, 0, .4); th.root.rotation.y = -Math.PI / 2 + Math.sin(T * .4) * .25; th.root.scale.setScalar(Math.max(.001, backOut(seg(T, apT + 1.0, apT + 1.8)))); const tk = T > B(20, .0) && T < B(21, .1); th.update(T, dt, { talk: tk ? .8 : (Math.sin(T * .3) > .5 ? .4 : 0), gesture: 'open', gestW: tk ? 1 : .5, lookAt: V([24, 1.3, 1.2]), lookW: .8, speed: 0 }); }
  }
  C.SH = SH; C.TK = TK; C.SAMPLE = SAMPLE; C.stuState = stuState;
  return C;
}
PF.createChoreo = createChoreo;
})(window);
/* ===== 08 · Geluidsontwerp (procedureel, WebAudio): muziek, omgeving, voetstappen, opbouw ===== */
(function (G) {
'use strict';
const PF = G.PF;
const clamp = PF.clamp;

function createAudio() {
  const A = { ctx: null, muted: false, ok: false, vol: 1, nextNote: 0, chordIdx: 0, nextChord: 0, nextBird: 3, lastStep: 0, lastAsm: -1, swellDone: {}, _rnd: PF.rng(99) };
  A.init = function () {
    if (A.ctx) { if (A.ctx.state === 'suspended') A.ctx.resume(); return; }
    const AC = G.AudioContext || G.webkitAudioContext; if (!AC) return;
    try {
      const ctx = A.ctx = new AC();
      A.master = ctx.createGain(); A.master.gain.value = 0; A.master.connect(ctx.destination);
      const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -18; comp.ratio.value = 3; comp.connect(A.master); A.bus = comp;
      A.music = ctx.createGain(); A.music.gain.value = .13; A.music.connect(comp);
      A.amb = ctx.createGain(); A.amb.gain.value = .5; A.amb.connect(comp);
      A.sfx = ctx.createGain(); A.sfx.gain.value = .55; A.sfx.connect(comp);
      A.voiceG = ctx.createGain(); A.voiceG.gain.value = 1.25; A.voiceG.connect(comp);
      // ruis-buffer
      const len = ctx.sampleRate * 2, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0); for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1; A.noise = buf;
      // wind (continue)
      const wn = ctx.createBufferSource(); wn.buffer = buf; wn.loop = true; const wf = ctx.createBiquadFilter(); wf.type = 'lowpass'; wf.frequency.value = 420; wf.Q.value = .5; A.windG = ctx.createGain(); A.windG.gain.value = .05; wn.connect(wf); wf.connect(A.windG); A.windG.connect(A.amb); wn.start(); A.windF = wf;
      // regen (ruis hoog)
      const rn = ctx.createBufferSource(); rn.buffer = buf; rn.loop = true; const rf = ctx.createBiquadFilter(); rf.type = 'highpass'; rf.frequency.value = 3200; A.rainG = ctx.createGain(); A.rainG.gain.value = 0; rn.connect(rf); rf.connect(A.rainG); A.rainG.connect(A.amb); rn.start();
      A.master.gain.linearRampToValueAtTime(A.muted ? 0 : 1, ctx.currentTime + 1.5);
      A.ok = true; A.nextNote = ctx.currentTime + .3; A.nextChord = ctx.currentTime;
    } catch (e) { A.ok = false; }
  };
  A.setMuted = function (m) { A.muted = m; if (A.ctx) A.master.gain.setTargetAtTime(m ? 0 : 1, A.ctx.currentTime, .15); };
  const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
  const CH = [[48, 55, 59, 64], [45, 52, 57, 60], [41, 48, 52, 57], [43, 50, 55, 59]]; // Cmaj7 · Am7 · Fmaj7 · G6-ish
  const PENTA = [72, 74, 76, 79, 81, 84];
  function tone(t, f, dur, type, gain, dest, att, lp) {
    const c = A.ctx, o = c.createOscillator(), g = c.createGain(); o.type = type; o.frequency.value = f; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + (att || .02)); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    let n = o; if (lp) { const fl = c.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = lp; o.connect(fl); n = fl; } n.connect(g); g.connect(dest); o.start(t); o.stop(t + dur + .05);
  }
  function burst(t, dur, freq, q, gain, dest, type) {
    const c = A.ctx, s = c.createBufferSource(); s.buffer = A.noise; const f = c.createBiquadFilter(); f.type = type || 'bandpass'; f.frequency.value = freq; f.Q.value = q || 1; const g = c.createGain(); g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(.0001, t + dur); s.connect(f); f.connect(g); g.connect(dest); s.start(t, Math.random()); s.stop(t + dur + .02);
  }
  A.step = function (speed) { if (!A.ok) return; const t = A.ctx.currentTime; if (t - A.lastStep < .18) return; A.lastStep = t; burst(t, .09, 650 + Math.random() * 250, 1.4, .13 * clamp(speed / 1.3, .4, 1.4), A.sfx); tone(t, 90, .09, 'sine', .08, A.sfx); };
  A.thunk = function (k) { if (!A.ok) return; const t = A.ctx.currentTime, f = 180 + (k % 5) * 22; const o = A.ctx.createOscillator(), g = A.ctx.createGain(); o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f * .45, t + .14); g.gain.setValueAtTime(.2, t); g.gain.exponentialRampToValueAtTime(.0001, t + .18); o.connect(g); g.connect(A.sfx); o.start(t); o.stop(t + .2); burst(t, .05, 2200, 2, .06, A.sfx); };
  A.chime = function () { if (!A.ok) return; const t = A.ctx.currentTime; [79, 83, 86, 91].forEach((m, i) => tone(t + i * .09, mtof(m), 1.6, 'sine', .07, A.sfx)); };
  A.blip = function () { if (!A.ok) return; const t = A.ctx.currentTime; tone(t, mtof(84), .28, 'sine', .06, A.sfx, .005); tone(t + .07, mtof(91), .45, 'sine', .05, A.sfx, .005); };
  A.swell = function (dur) { if (!A.ok) return; const c = A.ctx, t = c.currentTime; [48, 55, 60, 64, 67, 72].forEach((m, i) => { const o = c.createOscillator(), g = c.createGain(), f = c.createBiquadFilter(); o.type = 'sawtooth'; o.frequency.value = mtof(m); f.type = 'lowpass'; f.frequency.setValueAtTime(300, t); f.frequency.exponentialRampToValueAtTime(2600, t + dur * .8); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.032, t + dur * .75); g.gain.exponentialRampToValueAtTime(.0001, t + dur * 1.25); o.connect(f); f.connect(g); g.connect(A.music); o.start(t); o.stop(t + dur * 1.3); }); burst(t, dur, 800, .6, .05, A.music, 'highpass'); };
  A.whoosh = function () { if (!A.ok) return; const t = A.ctx.currentTime; const s = A.ctx.createBufferSource(); s.buffer = A.noise; const f = A.ctx.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = .7; f.frequency.setValueAtTime(400, t); f.frequency.exponentialRampToValueAtTime(2400, t + .6); const g = A.ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.08, t + .25); g.gain.exponentialRampToValueAtTime(.0001, t + .9); s.connect(f); f.connect(g); g.connect(A.sfx); s.start(t); s.stop(t + 1); };
  // elke frame: st = {mode, speaking, rain, dusk, walking(speed), stepEdge, asmProg, active}
  A.update = function (st) {
    if (!A.ok) return; const c = A.ctx, t = c.currentTime; if (c.state === 'suspended') return;
    A.music.gain.setTargetAtTime(st.speaking ? .06 : .13, t, .5); A.windG.gain.setTargetAtTime(.04 + .02 * Math.sin(t * .13), t, .5); A.rainG.gain.setTargetAtTime(.1 * (st.rain || 0), t, .3);
    // generatieve muziek: pad per 7s + zachte pentatonische pluck
    while (A.nextChord < t + .2) { const ch = CH[A.chordIdx++ % 4]; ch.forEach((m, i) => { tone(A.nextChord + i * .05, mtof(m), 8.2, i < 2 ? 'sine' : 'triangle', i < 2 ? .07 : .035, A.music, 1.6, 1200); }); A.nextChord += 7.4; }
    while (A.nextNote < t + .2) { const m = PENTA[Math.floor(A._rnd() * PENTA.length)]; if (A._rnd() < .62) tone(A.nextNote, mtof(m), 1.8, 'sine', .035 * (st.dusk ? 1.3 : 1), A.music, .01, 3000); A.nextNote += .925; }
    // vogels (overdag)
    if (t > A.nextBird) { A.nextBird = t + 2.5 + Math.random() * 5; if ((st.dusk || 0) < .5) { const f0 = 2600 + Math.random() * 1400, n = 2 + Math.floor(Math.random() * 3); for (let i = 0; i < n; i++) { const o = c.createOscillator(), g = c.createGain(), tt = t + i * .11; o.frequency.setValueAtTime(f0, tt); o.frequency.exponentialRampToValueAtTime(f0 * (1.2 + Math.random() * .3), tt + .07); g.gain.setValueAtTime(0, tt); g.gain.linearRampToValueAtTime(.018, tt + .01); g.gain.exponentialRampToValueAtTime(.0001, tt + .09); o.connect(g); g.connect(A.amb); o.start(tt); o.stop(tt + .1); } } }
    if (st.stepEdge) A.step(st.speed || 1);
  };
  return A;
}
PF.createAudio = createAudio;
})(window);
/* ===== 09 · Player: film-afspelen, spraaksynchronisatie, interactieve verkenning, API ===== */
(function (G) {
'use strict';
const PF = G.PF, THREE = G.THREE;
const { clamp, lerp, smooth, seg } = PF;

PF.create = function (opts) {
  const canvas = opts.canvas, root = opts.root, onState = opts.onState || function () {};
  const isTouch = ('ontouchstart' in G) || (navigator.maxTouchPoints || 0) > 0;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', alpha: false });
  renderer.outputEncoding = THREE.sRGBEncoding; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = .95;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  let pr = Math.min(G.devicePixelRatio || 1, isTouch ? 1.5 : 2); renderer.setPixelRatio(pr);

  const S = { phase: 'loading', paused: false, T: 0, chapter: 0, chapterName: '', subtitle: '', muted: false, cc: true, locked: false, menu: false, progress: 0, fps: 60, voice: 'timed', touch: isTouch, error: '', speaking: false, hint: '', focusId: null, infoId: null, audioState: 'idle', audioProg: 0, audioNote: '', seen: [], nPoints: (PF.POINTS || []).length };
  let ST, C, A = PF.createAudio(), tl, total = 0, Pts = null;
  let wall = 0, T = 0, last = 0, raf = 0, disposed = false, frame = 0, lastEmit = 0, lastJson = '';
  let spoken = [], speechActive = false, speechBeat = -1, speechStarted = false, speechT0 = 0, utter = null, waitWall = 0;
  let voice = null, cps = 13, rate = 1, mode = 'loading', endWall = 0, lastBeat = -1;
  let asmLast = [0, 0], glintOn = [false, false], swellDone = {}, stepSign = 0;

  function emit(force) {
    const now = performance.now(); if (!force && now - lastEmit < 90) return;
    const j = JSON.stringify([S.phase, S.paused, Math.round(S.T * 4), S.chapter, S.subtitle, S.muted, S.cc, S.locked, S.menu, S.voice, Math.round(S.fps / 5), S.error, S.hint, S.focusId, S.infoId, S.audioState, Math.round(S.audioProg * 40), S.audioNote, S.seen.length]);
    if (!force && j === lastJson) return; lastJson = j; lastEmit = now; onState(Object.assign({}, S));
  }

  /* ---------- voice-over (opgenomen audio, per beat afgespeeld) ---------- */
  let vbytes = null, vbuf = null, vsrc = null, vstart = 0, vbeat = -1, venv = null, voiceFetch = null, starting = false;
  const ENV_HZ = 50;
  const vurls = [].concat(opts.voiceUrl || []);
  const fetchBytes = u => fetch(u).then(r => { if (!r.ok) throw new Error('voice ' + r.status); return r.arrayBuffer(); });
  function loadVoiceBytes() { if (!vurls.length) return Promise.resolve(); return fetchBytes(vurls[0]).then(b => { vbytes = b; }).catch(() => { vbytes = null; }); }
  const decode = b => new Promise((res, rej) => { const p = A.ctx.decodeAudioData(b.slice(0), res, rej); if (p && p.catch) p.catch(rej); });
  async function prepareVoice() {
    if (vbuf || !A.ok) return;
    try { if (voiceFetch) await voiceFetch; } catch (e) {}
    for (let k = 0; k < vurls.length && !vbuf; k++) { try { const b = k === 0 ? vbytes : await fetchBytes(vurls[k]); if (b) vbuf = await decode(b); } catch (e) { vbuf = null; } }
    if (!vbuf) { S.voice = 'timed'; return; }
    try {
      const d = vbuf.getChannelData(0), W = Math.max(1, Math.round(vbuf.sampleRate / ENV_HZ)), n = Math.floor(d.length / W), env = new Float32Array(n);
      for (let k = 0; k < n; k++) { let sum = 0; for (let j = k * W; j < (k + 1) * W; j++) sum += d[j] * d[j]; env[k] = Math.sqrt(sum / W); }
      const sorted = Float32Array.from(env).sort(), ref = Math.max(1e-4, sorted[Math.floor(n * .93)]);
      for (let k = 0; k < n; k++) env[k] = Math.min(1, Math.max(0, (env[k] / ref - .06) / .94));
      venv = env; S.voice = 'nl';
    } catch (e) { vbuf = null; S.voice = 'timed'; }
  }
  function stopVoice() { if (vsrc) { try { vsrc.onended = null; vsrc.stop(); } catch (e) {} try { vsrc.disconnect(); } catch (e) {} } vsrc = null; vbeat = -1; }
  function cancelSpeech() { stopVoice(); }
  function playBeat(i, offset) {
    stopVoice(); const b = PF.BEATS[i]; if (!vbuf || !b.v || !A.ok) return;
    const dur = (b.v[1] - b.v[0]) - offset; if (dur <= .05) return;
    const src = A.ctx.createBufferSource(); src.buffer = vbuf; src.connect(A.voiceG);
    const t0 = A.ctx.currentTime + .03; src.start(t0, b.v[0] + offset, dur); vsrc = src; vbeat = i; vstart = t0 - offset;
    src.onended = () => { if (vsrc === src) { vsrc = null; vbeat = -1; } };
  }
  const voiceEl = () => (vsrc && A.ok ? A.ctx.currentTime - vstart : -1); // seconden binnen het stemfragment van de huidige beat

  /* ---------- informatiepunten: paneel + gesproken uitleg (browserstem, per zin) ---------- */
  let ttsVoice = null; const TTS = { gen: 0, parts: [], idx: 0, done: 0, len: 0, within: 0, t0: 0, reqT: 0, started: false };
  function pickTts() {
    if (!('speechSynthesis' in G)) { ttsVoice = null; return; } const vs = speechSynthesis.getVoices() || []; const nl = vs.filter(v => /^nl([-_]|$)/i.test(v.lang));
    if (!nl.length) { ttsVoice = null; return; } const pref = ['xander', 'frank', 'maarten', 'google nederlands', 'male', 'claire', 'ellen', 'colette'];
    ttsVoice = nl.find(v => pref.some(p => v.name.toLowerCase().includes(p))) || nl[0];
  }
  if ('speechSynthesis' in G) { pickTts(); try { speechSynthesis.addEventListener('voiceschanged', pickTts); } catch (e) { speechSynthesis.onvoiceschanged = pickTts; } }
  let api_audioPlay, api_audioPause, api_audioReplay;
  const curPoint = () => (S.infoId && Pts && Pts.byId[S.infoId] ? Pts.byId[S.infoId].p : null);
  /* opgenomen uitleg (bestand per punt); valt terug op de browserstem als het bestand niet te laden is */
  let aEl = null, aFb = false, aMode = 'tts', aUrls = [], aIdx = 0, aReq = 0;
  const FERR = 'De gesproken uitleg kon niet worden afgespeeld. Lees de tekst hierboven.';
  function fileSources(p) { const m = (opts.pointAudio || {})[p.id]; if (!m) return []; const types = ['audio/mp4; codecs="mp4a.40.2"', 'audio/webm; codecs="opus"']; let t; try { t = new Audio(); } catch (e) { return []; } return m.filter((u, i) => u && (!t.canPlayType || t.canPlayType(types[i] || types[0]) !== '')); }
  function fileStop() { if (aEl) { try { aEl.onended = aEl.onerror = aEl.onplaying = null; aEl.pause(); aEl.removeAttribute('src'); aEl.load(); } catch (e) {} } }
  function fileLoad(gen) {
    if (aIdx >= aUrls.length) { if (ttsVoice) { aMode = 'tts'; aFb = true; S.audioNote = ''; ttsFrom(0); } else { S.audioState = 'error'; S.audioNote = FERR; emit(true); } return; }
    fileStop(); if (!aEl) aEl = new Audio(); const el = aEl; el.preload = 'auto'; el.muted = !!S.muted; el.src = aUrls[aIdx]; aReq = performance.now();
    el.onended = () => { if (gen !== TTS.gen) return; S.audioState = 'done'; S.audioProg = 1; emit(true); };
    el.onerror = () => { if (gen !== TTS.gen) return; aIdx++; fileLoad(gen); };
    try { const pr = el.play(); if (pr && pr.catch) pr.catch(e => { if (gen !== TTS.gen) return; if (e && e.name === 'AbortError') return; aIdx++; fileLoad(gen); }); } catch (e) { aIdx++; fileLoad(gen); }
  }
  function stopAudio() { TTS.gen++; fileStop(); try { speechSynthesis.cancel(); } catch (e) {} S.audioState = 'idle'; S.audioProg = 0; S.audioNote = ''; TTS.idx = 0; TTS.done = 0; TTS.within = 0; TTS.started = false; }
  function ttsNext() {
    if (S.audioState !== 'playing') return; const gen = TTS.gen;
    if (TTS.idx >= TTS.parts.length) { S.audioState = 'done'; S.audioProg = 1; emit(true); return; }
    const text = TTS.parts[TTS.idx]; const u = new SpeechSynthesisUtterance(text); u.lang = ttsVoice.lang; u.voice = ttsVoice; u.rate = 1; u.pitch = 1; u.volume = S.muted ? 0 : 1;
    TTS.within = 0; TTS.started = false; TTS.reqT = performance.now();
    u.onstart = () => { if (gen !== TTS.gen) return; TTS.started = true; TTS.t0 = performance.now(); };
    u.onboundary = e => { if (gen !== TTS.gen) return; TTS.within = Math.max(TTS.within, e.charIndex || 0); };
    u.onend = () => { if (gen !== TTS.gen) return; TTS.done += text.length + 1; TTS.idx++; TTS.within = 0; ttsNext(); };
    u.onerror = e => { if (gen !== TTS.gen) return; if (e && (e.error === 'canceled' || e.error === 'interrupted')) return; S.audioState = 'error'; S.audioNote = 'De gesproken uitleg kon niet worden afgespeeld. Lees de tekst hierboven.'; emit(true); };
    try { speechSynthesis.speak(u); } catch (er) { S.audioState = 'error'; S.audioNote = 'De gesproken uitleg kon niet worden afgespeeld. Lees de tekst hierboven.'; emit(true); }
  }
  function ttsFrom(from) {
    const p = curPoint(); if (!p) return; TTS.gen++; try { speechSynthesis.cancel(); } catch (e) {}
    TTS.parts = p.say.split(/(?<=[.!?])\s+/).map(x => x.trim()).filter(Boolean); TTS.len = p.say.length; TTS.idx = 0; TTS.done = 0; S.audioState = 'playing'; ttsNext(); emit(true);
  }
  function startAudio(from) {
    const p = curPoint(); if (!p) return; if (!ttsVoice) pickTts();
    if (aMode === 'file' && from && aEl && aEl.src) { const gen = ++TTS.gen; S.audioState = 'playing'; S.audioNote = S.muted ? 'Het geluid staat uit.' : ''; aEl.muted = !!S.muted; aEl.onended = () => { if (gen !== TTS.gen) return; S.audioState = 'done'; S.audioProg = 1; emit(true); }; aEl.onerror = () => { if (gen !== TTS.gen) return; aIdx++; fileLoad(gen); }; try { const pr = aEl.play(); if (pr && pr.catch) pr.catch(() => {}); } catch (e) {} emit(true); return; }
    const urls = aFb ? [] : fileSources(p);
    if (urls.length) { aUrls = urls; aIdx = 0; aMode = 'file'; TTS.gen++; try { speechSynthesis.cancel(); } catch (e) {} S.audioState = 'playing'; S.audioNote = S.muted ? 'Het geluid staat uit.' : ''; S.audioProg = 0; fileLoad(TTS.gen); emit(true); return; }
    aMode = 'tts';
    if (!ttsVoice) { S.audioState = 'unavailable'; S.audioNote = 'Op dit apparaat is geen Nederlandse stem gevonden. Lees de tekst hierboven.'; emit(true); return; }
    TTS.gen++; try { speechSynthesis.cancel(); } catch (e) {}
    if (!from) { TTS.parts = p.say.split(/(?<=[.!?])\s+/).map(x => x.trim()).filter(Boolean); TTS.len = p.say.length; TTS.idx = 0; TTS.done = 0; }
    S.audioState = 'playing'; S.audioNote = S.muted ? 'Het geluid staat uit.' : ''; if (A.ok && A.ctx && A.ctx.state === 'suspended') A.ctx.resume(); ttsNext(); emit(true);
  }
  api_audioPlay = function () { if (!S.infoId) return; if (S.audioState === 'paused') startAudio(true); else if (S.audioState !== 'playing') startAudio(false); };
  api_audioPause = function () { if (S.audioState !== 'playing') return; if (aMode === 'file' && aEl) { try { aEl.pause(); } catch (e) {} S.audioState = 'paused'; emit(true); return; } TTS.gen++; try { speechSynthesis.cancel(); } catch (e) {} S.audioState = 'paused'; emit(true); };
  api_audioReplay = function () { if (!S.infoId) return; startAudio(false); };
  function openPoint(id) {
    if (!Pts || !Pts.byId[id] || mode !== 'explore') return;
    stopAudio(); aFb = false; S.infoId = id; if (S.seen.indexOf(id) < 0) S.seen = S.seen.concat(id); Pts.markSeen(id); A.blip && A.blip(); S.menu = false;
    if (!isTouch) unlock(); emit(true);
    startAudio(false); // uitleg gestart door E, klik of tik: voice-over start meteen
  }
  function closePoint() { if (!S.infoId) return; stopAudio(); S.infoId = null; emit(true); root.focus && root.focus(); if (!isTouch) lock(); }

  /* ---------- init ---------- */
  const api = {};
  api.init = async function () {
    voiceFetch = loadVoiceBytes();
    try {
      try { await Promise.race([Promise.all([document.fonts.load('700 40px "Bricolage Grotesque"'), document.fonts.load('500 24px "DM Sans"')]), new Promise(r => setTimeout(r, 1800))]); } catch (e) {}
      ST = PF.createStage(renderer); C = PF.createChoreo(ST); C.init(); Pts = PF.createPoints(ST.world.site); tl = ST.tl; total = tl.total; S.total = total;
      if (isTouch) { ST.world.sun.shadow.mapSize.set(2048, 2048); }
      api.resize(); mode = 'intro'; S.phase = 'intro'; last = performance.now(); raf = requestAnimationFrame(loop); emit(true);
    } catch (e) { S.error = String(e && e.stack || e); S.phase = 'error'; emit(true); throw e; }
  };

  /* ---------- besturing van de film ---------- */
  api.start = async function () { if (starting) return; starting = true; A.init(); if (A.ok) A.setMuted(S.muted); root.focus && root.focus(); try { await prepareVoice(); } catch (e) {} starting = false; api.restart(); };
  api.restart = function () { cancelSpeech(); if (S.infoId || S.audioState !== 'idle') { stopAudio(); S.infoId = null; } if (Pts) Pts.setVisible(false); try { if (A.ctx && A.ctx.state === 'suspended') A.ctx.resume(); } catch (e) {} spoken = []; T = 0; S.T = 0; S.paused = false; mode = 'film'; S.phase = 'film'; S.menu = false; swellDone = {}; asmLast = [0, 0]; glintOn = [false, false]; lastBeat = -1; C.ready2 = false; unlock(); emit(true); };
  api.pause = function () { if (mode !== 'film') return; S.paused = true; try { A.ctx && A.ctx.suspend(); } catch (e) {} emit(true); };
  api.resume = function () { if (mode !== 'film') return; S.paused = false; try { A.ctx && A.ctx.resume(); } catch (e) {} emit(true); };
  api.togglePause = function () { S.paused ? api.resume() : api.pause(); };
  api.setMuted = function (m) { S.muted = !!m; A.setMuted(S.muted); if (aEl) aEl.muted = S.muted; emit(true); };
  api.toggleCaptions = function () { S.cc = !S.cc; emit(true); };
  api.seek = function (t) { cancelSpeech(); T = clamp(t, 0, total - .01); spoken = []; for (let i = 0; i < ST.beatAt(T); i++) spoken[i] = true; mode = 'film'; S.phase = 'film'; C.ready2 = false; };
  api.skipToEnd = function () { cancelSpeech(); T = total + .01; finishFilm(); };

  function finishFilm() { cancelSpeech(); mode = 'ended'; S.phase = 'ended'; S.subtitle = ''; S.paused = false; endWall = 0; emit(true); }
  api.explore = function () { A.init(); cancelSpeech(); try { if (A.ctx && A.ctx.state === 'suspended') A.ctx.resume(); } catch (e) {} initPlayer(); mode = 'explore'; S.phase = 'explore'; S.subtitle = ''; S.menu = false; S.hint = ''; stopAudio(); S.infoId = null; if (Pts) Pts.setVisible(true); emit(true); root.focus && root.focus(); lock(); };
  api.backToFilm = function () { unlock(); stopAudio(); S.infoId = null; if (Pts) Pts.setVisible(false); api.restart(); };
  api.openPoint = id => openPoint(id); api.closePoint = () => closePoint(); api.audioPlay = () => api_audioPlay(); api.audioPause = () => api_audioPause(); api.audioReplay = () => api_audioReplay();
  api.openFocus = () => { if (S.focusId) openPoint(S.focusId); };
  api.tapAt = (cx, cy) => { if (mode !== 'explore' || !Pts || S.menu) return false; const r = canvas.getBoundingClientRect(); const id = Pts.pick(ST.cam, ((cx - r.left) / r.width) * 2 - 1, -(((cy - r.top) / r.height) * 2 - 1)); if (id) { openPoint(id); return true; } return false; };
  api.resumeExplore = function () { S.menu = false; emit(true); root.focus && root.focus(); lock(); };

  /* ---------- verkennen: eerste-persoons besturing ---------- */
  const P = { x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, yaw: 0, pitch: 0, ground: true, walk: 0, bob: 0 };
  const keys = {}; let touchMove = [0, 0], touchSprint = false, wantJump = false, dragLook = false, lockOK = false;
  function initPlayer() { const e = C.explore; P.x = e.pos[0]; P.z = e.pos[2]; P.y = 0; P.vx = P.vz = P.vy = 0; P.yaw = Math.atan2(-(e.look[0] - e.pos[0]), -(e.look[2] - e.pos[2])); P.pitch = Math.atan2(e.look[1] - e.pos[1], Math.hypot(e.look[0] - e.pos[0], e.look[2] - e.pos[2])); P.ground = true; }
  function lock() { if (isTouch) return; try { const r = canvas.requestPointerLock && canvas.requestPointerLock(); if (r && r.catch) r.catch(() => {}); } catch (e) {} }
  function unlock() { try { if (document.pointerLockElement) document.exitPointerLock(); } catch (e) {} }
  api.lock = lock;
  document.addEventListener('pointerlockchange', () => { const l = document.pointerLockElement === canvas; lockOK = lockOK || l; S.locked = l; if (!l && mode === 'explore' && !isTouch && lockOK && !S.infoId) { S.menu = true; } emit(true); });
  document.addEventListener('pointerlockerror', () => { lockOK = false; S.locked = false; emit(true); });
  const look = (dx, dy) => { P.yaw -= dx * .0022; P.pitch = clamp(P.pitch - dy * .0022, -1.45, 1.45); };
  canvas.addEventListener('mousemove', e => { if (mode !== 'explore' || S.menu) return; if (S.locked) look(e.movementX || 0, e.movementY || 0); else if (dragLook && e.buttons) look(e.movementX || 0, e.movementY || 0); });
  let downXY = null;
  canvas.addEventListener('mousedown', e => { if (mode !== 'explore') return; root.focus && root.focus(); if (S.menu) return; if (S.locked && S.focusId) { openPoint(S.focusId); return; } downXY = [e.clientX, e.clientY]; if (!S.locked && !isTouch) { dragLook = true; lock(); } });
  canvas.addEventListener('mouseup', e => { dragLook = false; if (downXY && !S.locked && mode === 'explore' && Math.hypot(e.clientX - downXY[0], e.clientY - downXY[1]) < 5) api.tapAt(e.clientX, e.clientY); downXY = null; });
  api.addLook = (dx, dy) => { if (mode === 'explore') look(dx * 1.4, dy * 1.4); };
  api.setMove = (x, y) => { touchMove = [x, y]; }; api.setSprint = b => { touchSprint = !!b; }; api.jump = () => { wantJump = true; };
  root.addEventListener('keydown', e => {
    const onBtn = e.target && e.target.tagName === 'BUTTON' && (e.code === 'Space' || e.code === 'Enter');
    if (mode === 'film' && (e.code === 'Space') && !onBtn) { e.preventDefault(); api.togglePause(); return; }
    if (mode !== 'explore') return;
    if (onBtn) return;
    if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ShiftLeft', 'ShiftRight', 'Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
    if (e.code === 'Escape' && S.infoId) { e.preventDefault(); closePoint(); return; }
    if (e.code === 'KeyE' && !S.menu) { e.preventDefault(); if (!e.repeat) { if (S.infoId) closePoint(); else if (S.focusId) openPoint(S.focusId); } return; }
    keys[e.code] = true; if (e.code === 'Space') wantJump = true;
    if (e.code === 'Escape') { if (!S.locked) { S.menu = !S.menu; if (!S.menu) lock(); emit(true); } }
  });
  root.addEventListener('keyup', e => { keys[e.code] = false; });
  root.addEventListener('blur', () => { for (const k in keys) keys[k] = false; });

  const RAD = .34, STEP = .22;
  function resolve(px, pz, py) { // botsing met objecten (XZ-cirkel tegen AABB) + vloerhoogte
    let ground = 0; const cols = ST.world.colliders;
    for (let k = 0; k < cols.length; k++) { const c = cols[k]; const cx = clamp(px, c.x0, c.x1), cz = clamp(pz, c.z0, c.z1), dx = px - cx, dz = pz - cz, d2 = dx * dx + dz * dz;
      const inside = px > c.x0 - .05 && px < c.x1 + .05 && pz > c.z0 - .05 && pz < c.z1 + .05;
      if (c.top < 90 && inside && py >= c.top - STEP) ground = Math.max(ground, c.top);
      if (py >= c.top - .02 && c.top < 90) continue; // staat erboven
      if (d2 < RAD * RAD) { if (d2 > 1e-6) { const d = Math.sqrt(d2), push = (RAD - d); px += dx / d * push; pz += dz / d * push; } else { // midden in de box: kies kortste uitweg
          const l = px - c.x0, r = c.x1 - px, t = pz - c.z0, b = c.z1 - pz, m = Math.min(l, r, t, b); if (m === l) px = c.x0 - RAD; else if (m === r) px = c.x1 + RAD; else if (m === t) pz = c.z0 - RAD; else pz = c.z1 + RAD; } } }
    const bx = ST.world.bounds.x - RAD * .5 + .4, bz = ST.world.bounds.z - RAD * .5 + .4; px = clamp(px, -bx, bx); pz = clamp(pz, -bz, bz);
    return [px, pz, ground];
  }
  function stepPlayer(dt) {
    let fx = 0, fz = 0;
    if (keys.KeyW || keys.ArrowUp) fz += 1; if (keys.KeyS || keys.ArrowDown) fz -= 1; if (keys.KeyD || keys.ArrowRight) fx += 1; if (keys.KeyA || keys.ArrowLeft) fx -= 1;
    fx += touchMove[0]; fz += -touchMove[1]; const mag = Math.hypot(fx, fz); if (mag > 1) { fx /= mag; fz /= mag; }
    const sprint = keys.ShiftLeft || keys.ShiftRight || touchSprint, spd = (sprint ? 7.2 : 4.2) * (S.menu ? 0 : 1);
    const sy = Math.sin(P.yaw), cy = Math.cos(P.yaw);
    const tx = (fx * cy - fz * sy) * spd, tz = (-fx * sy - fz * cy) * spd; // vooruit = (-sin, -cos)
    const k = 1 - Math.exp(-dt * (P.ground ? 11 : 2.5)); P.vx += (tx - P.vx) * k; P.vz += (tz - P.vz) * k;
    if (wantJump && P.ground && !S.menu) { P.vy = 7.3; P.ground = false; } wantJump = false;
    P.vy -= 22 * dt;
    const n = 3; for (let s = 0; s < n; s++) { const h = dt / n; let nx = P.x + P.vx * h, nz = P.z + P.vz * h, ny = P.y + P.vy * h; const r = resolve(nx, nz, P.y); nx = r[0]; nz = r[1];
      if (ny <= r[2]) { ny = r[2]; if (P.vy < 0) P.vy = 0; P.ground = true; } else if (P.y > r[2] + .001 || P.vy > 0) P.ground = false; P.x = nx; P.z = nz; P.y = ny; }
    const sp = Math.hypot(P.vx, P.vz); P.walk += sp * dt * (sprint ? .62 : .75); if (P.ground) P.bob = lerp(P.bob, Math.sin(P.walk * 6.4) * .028 * clamp(sp / 4), .3); else P.bob *= .9;
    if (P.y < -.5) { P.y = 0; P.vy = 0; } // vangnet: nooit door de vloer vallen
    return sp;
  }

  /* ---------- hoofdlus ---------- */
  let fpsAcc = 0, fpsN = 0, slow = 0, qStage = 0;
  function loop(now) {
    if (disposed) return; raf = requestAnimationFrame(loop);
    let dt = (now - last) / 1000; last = now; if (dt > .1) dt = .1; if (dt <= 0) return; wall += dt; frame++;
    fpsAcc += dt; fpsN++; if (fpsAcc > .5) { S.fps = fpsN / fpsAcc; fpsAcc = 0; fpsN = 0; if (S.fps < 26) { slow++; } else slow = Math.max(0, slow - 1); if (slow > 3 && qStage < 4) { qStage++; slow = 0; pr = Math.max(.55, pr * .82); renderer.setPixelRatio(pr); api.resize(); if (qStage === 2) { const sh = ST.world.sun.shadow; sh.mapSize.set(2048, 2048); if (sh.map) { sh.map.dispose(); sh.map = null; } } } }
    let ctxA = { speaking: false, rain: 0, dusk: 0, stepEdge: false, speed: 0 };
    if (mode === 'film') {
      if (!S.paused) {
        T += dt; let bi = ST.beatAt(T); const bt = PF.BEATS[bi];
        if (bt.v && !spoken[bi] && T >= ST.S(bi, 0)) { spoken[bi] = true; playBeat(bi, Math.max(0, T - ST.S(bi, 0))); }
        const el = voiceEl();
        if (vsrc && vbeat === bi && el > .04) { // de audioklok bepaalt het ritme zolang de stem spreekt
          const target = ST.S(bi, 0) + el, err = target - T; if (Math.abs(err) > .3) T = target; else T += err * Math.min(1, dt * 6);
        }
        if (T >= total) { T = total; finishFilm(); }
      }
      S.T = T; const i2 = ST.beatAt(T); S.chapter = PF.BEATS[i2].ch; S.chapterName = PF.CHAPTERS[S.chapter]; S.progress = T / total;
      const bt2 = PF.BEATS[i2], el2 = T - ST.S(i2, 0); let spk = false, sub = '', lvl = null;
      if (bt2.v) { const ss = bt2.s; let k = -1; for (let j = 0; j < ss.length; j++) if (el2 >= ss[j][1] - .12) k = j;
        if (k >= 0 && el2 <= ss[ss.length - 1][2] + .9) sub = ss[k][0];
        for (let j = 0; j < ss.length; j++) if (el2 >= ss[j][1] - .05 && el2 <= ss[j][2] + .12) spk = true;
        if (venv && spk) { const idx = Math.floor((bt2.v[0] + Math.max(0, el2)) * ENV_HZ); lvl = venv[Math.min(venv.length - 1, Math.max(0, idx))]; } else if (spk) lvl = null; }
      S.subtitle = S.cc ? sub : '';
      if (i2 !== lastBeat) { lastBeat = i2; if (i2 === 11 || i2 === 18) {} }
      if (S.paused) lvl = 0; ctxA.speaking = spk; ctxA.level = lvl; S.speaking = spk;
    } else { endWall += dt; }
    const Tw = mode === 'film' ? T : total + wall;
    const out = C.apply(Tw, dt, { speaking: mode === 'film' ? ctxA.speaking : false, level: mode === 'film' ? ctxA.level : null, snap: !C.ready2 });
    // --- modi die de camera overnemen
    const cam = ST.cam;
    if (mode === 'intro') { const a = -.55 + wall * .035; cam.position.set(8 + Math.sin(a) * 92, 31 + Math.sin(wall * .2) * 2, Math.cos(a) * 92); cam.lookAt(8, 3, 0); cam.fov = 32; }
    else if (mode === 'explore') {
      const sp = stepPlayer(dt); S.hint = '';
      cam.position.set(P.x, P.y + 1.68 + P.bob, P.z); cam.rotation.order = 'YXZ'; cam.rotation.set(P.pitch, P.yaw, 0); cam.fov = 62; ctxA.stepEdge = false;
      if (Pts) { const fid = Pts.update(dt, cam, wall, S.infoId); if (fid !== S.focusId) { S.focusId = fid; } }
      if (S.audioState === 'playing' && aMode === 'file') { if (aEl && aEl.duration > 0) S.audioProg = Math.min(.995, aEl.currentTime / aEl.duration); if (aEl && aEl.currentTime === 0 && performance.now() - aReq > 9000) { const g = ++TTS.gen; aIdx++; aReq = performance.now(); fileLoad(g); } }
      else if (S.audioState === 'playing') { const within = Math.max(TTS.within, TTS.started ? Math.min((TTS.parts[TTS.idx] || '').length, (performance.now() - TTS.t0) / 1000 * 14.5) : 0); S.audioProg = Math.min(.995, (TTS.done + within) / Math.max(1, TTS.len));
        if (!TTS.started && performance.now() - TTS.reqT > 4500) { stopAudio(); S.audioState = 'error'; S.audioNote = 'De gesproken uitleg kon niet worden afgespeeld. Lees de tekst hierboven.'; emit(true); } }
      ctxA.speaking = S.audioState === 'playing';
      if (P.ground && sp > 1) { const sg = Math.sign(Math.sin(P.walk * 6.4)); if (sg !== stepSign && sg !== 0) { stepSign = sg; ctxA.stepEdge = true; ctxA.speed = sp; } }
    }
    // portret: houd horizontale beeldhoek
    const asp = cam.aspect; if (asp < 1.45) { const base = cam.fov; cam.fov = 2 * Math.atan(Math.tan(base * Math.PI / 360) * Math.min(2.2, 1.45 / asp)) * 180 / Math.PI; }
    cam.updateProjectionMatrix(); if (asp < 1.45) { /* fov wordt elke frame opnieuw uit de regie gezet */ }
    // --- geluid
    if (mode === 'film' && !S.paused) {
      const fr = ST.small.progress, fb = ST.big.progress; const kS = Math.floor(fr * 46), kB = Math.floor(fb * 60);
      if (fr > .06 && fr < .97 && kS !== asmLast[0]) { A.thunk(kS); } if (fb > .04 && fb < .97 && kB !== asmLast[1]) { A.thunk(kB); } asmLast = [kS, kB];
      if (T > ST.B(11, .08) && !swellDone.a) { swellDone.a = 1; A.swell(9); } if (T > ST.B(18, .06) && !swellDone.b) { swellDone.b = 1; A.swell(12); }
      if (fr >= .96 && !glintOn[0]) { glintOn[0] = true; A.chime(); } if (fb >= .96 && !glintOn[1]) { glintOn[1] = true; A.chime(); }
      const g = ST.guide, sgn = Math.sign(Math.sin(g.phase)); if (ST.track.at(T).speed > .35 && sgn !== stepSign && sgn !== 0) { stepSign = sgn; ctxA.stepEdge = true; ctxA.speed = ST.track.at(T).speed; }
      ctxA.rain = ST.small.fx.rain || 0; ctxA.dusk = ST.big.fx.red || 0;
    }
    A.update(ctxA);
    renderer.render(ST.scene, ST.cam);
    emit(false);
  }

  api.resize = function () { const w = Math.max(2, root.clientWidth || canvas.clientWidth || 800), h = Math.max(2, root.clientHeight || canvas.clientHeight || 450); renderer.setSize(w, h, false); if (ST) { ST.cam.aspect = w / h; ST.cam.updateProjectionMatrix(); } };
  api.dispose = function () { disposed = true; cancelAnimationFrame(raf); cancelSpeech(); try { renderer.dispose(); } catch (e) {} };
  api.debug = { get S() { return S; }, get ST() { return ST; }, get C() { return C; }, get T() { return T; }, set T(v) { T = v; }, get mode() { return mode; }, total: () => total, P, renderer, seek: (t) => api.seek(t), setMode: m => { mode = m; }, step: (dt) => { return; } };
  api.state = () => Object.assign({}, S);
  return api;
};
})(window);
/* ===== 10 · Informatiepunten (verkenmodus): centrale data + bolletjes in de 3D-scène ===== */
(function (G) {
'use strict';
const PF = G.PF, THREE = G.THREE;
const { clamp, lerp, smooth } = PF;

/* Bron: "Zon-groen pergola – concept" (PDF, 14 pagina's), kortweg DOC. Alle inhoud komt daaruit; paginanummers staan per punt.
   Per punt: id, cat, title, pos (bolletje), anchor (waar de verbindingslijn naartoe wijst), status (optioneel),
   text (geschreven uitleg), fact (aanvullend feit, optioneel), note (opmerking over het model, optioneel),
   say (volledige gesproken tekst), src (bronverwijzingen). Een punt verplaatsen of verwijderen = alleen dit object aanpassen. */
const DOC = 'Zon-groen pergola – concept';
const POINTS = [
  { id: 'terras', cat: 'De plek', title: 'Het terras nu',
    pos: [7.0, 1.95, -1.8], anchor: [7.0, .86, -1.8],
    text: 'Het terras bestaat nu grotendeels uit bestrating met enkele picknicktafels en warmt op warme dagen sterk op. Het ligt boven een fietsenstalling, dus draagkracht, waterafvoer en waterdichting beperken wat mogelijk is.',
    fact: 'Doel van het project: biodiversiteit en sociale ruimte voor studenten.',
    say: 'Dit is de plek waar het om draait: het terras boven de fietsenstalling. Het bestaat nu vooral uit tegels, met een paar picknicktafels, en op warme dagen warmt het hier sterk op. Omdat we boven een fietsenstalling staan, bepalen draagkracht, waterafvoer en waterdichting van het dak wat er mogelijk is. Daarom past een lichte, modulaire constructie die niet in het dak verankerd hoeft te worden.',
    src: [DOC + ', p. 1 (plek en doel)', DOC + ', p. 3 (waarom past het hier)'] },

  { id: 'module', cat: 'Het concept', title: 'Eén module',
    pos: [-5.3, 2.7, 2.5], anchor: [-4.4, 2.3, 1.8],
    text: 'De pergola is een open overkapping, opgebouwd uit losse modules. Elke module heeft een frame met zonnepanelen bovenop, klimplanten in verrijdbare plantenbakken langs de zijkanten en meubilair eronder.',
    fact: 'Eerste stap: één module op het terras zetten en meten wat die doet met schaduw, temperatuur en gebruik.',
    note: 'De afmetingen van de module in dit 3D-model zijn een ontwerpkeuze voor de visualisatie en staan niet in het document.',
    say: 'Dit is één module. Een module is een open frame met zonnepanelen bovenop, klimplanten in verrijdbare plantenbakken langs de zijkanten en meubilair eronder. De hele pergola bestaat uit zulke losse modules. We beginnen met een proef: één module op het terras zetten, op wielen of ballast, en meten wat die doet met schaduw, temperatuur en gebruik.',
    src: [DOC + ', p. 1 (wat is het)', DOC + ', p. 6 (stap 1: proef)'] },

  { id: 'zonnedak', cat: 'Energie', title: 'Het zonnedak',
    pos: [-2.0, 2.55, -1.1], anchor: [-2.0, 3.02, -1.1],
    text: 'Zonnepanelen vormen het dak. Met ruimte tussen de panelen of lichtdoorlatende panelen valt er genoeg licht naar beneden voor de planten. Bij een volledig groen dak onder zonnepanelen in Sydney leverden de panelen gemiddeld 11,1% meer stroom dan op een gewoon dak. Dat is een groter groen oppervlak dan wij kunnen aanleggen, dus verwacht hier een kleiner effect.',
    fact: 'Rekenvoorbeeld, geen offerte: acht panelen van ongeveer 400 Wp zijn samen 3,2 kWp. Dat geeft in Nederland grofweg 2.700 tot 2.900 kWh per jaar, uitgaand van 850 tot 900 kWh per kWp.',
    say: 'Boven je hoofd zie je het zonnedak. De zonnepanelen vormen het dak van de pergola. Er zit ruimte tussen de panelen, of we gebruiken lichtdoorlatende panelen, zodat er genoeg licht naar beneden valt voor de planten. In Sydney leverden panelen boven een volledig groen dak gemiddeld 11,1 procent meer stroom dan op een gewoon dak. Maar dat groene oppervlak is groter dan wij kunnen aanleggen, dus verwacht hier een kleiner effect. Ons eigen cijfer is alleen een rekenvoorbeeld: acht panelen van ongeveer 400 wattpiek, samen 3,2 kilowattpiek, geven in Nederland grofweg 2.700 tot 2.900 kilowattuur per jaar.',
    src: [DOC + ', p. 2 (zonnedak)', DOC + ', p. 5 (stroom opwekken, indicatie; Sydney)', DOC + ', p. 8 (UTS, First Building, Bradfield City)'] },

  { id: 'accu', cat: 'Energie', title: 'Laadpunt en accu',
    pos: [0.95, 1.4, -1.75], anchor: [0.95, .36, -1.75],
    text: 'Zonnestroom voedt een laadpunt voor laptop en telefoon, het rode licht en eventueel sensoren. Een kleine accu vangt de piek op. Terugleveren aan het gebouw is een alternatief dat nog open staat.',
    fact: 'Voorbeeld: op de CZU-campus in Praag levert het zonnesysteem van een studentenpergola genoeg stroom voor twee laptops en vier telefoons tegelijk.',
    say: 'Hier zie je de accu. De panelen leveren stroom voor het laadpunt, waar je je laptop en telefoon kunt opladen, voor het rode licht en eventueel voor sensoren. Een kleine accu vangt de piek op. Of we stroom ook mogen terugleveren aan het gebouw, staat nog open. Als voorbeeld: op de campus van de CZU in Praag levert het zonnesysteem van een studentenpergola genoeg stroom voor twee laptops en vier telefoons tegelijk.',
    src: [DOC + ', p. 2 (zit- en leerplek)', DOC + ', p. 5 (stroom opwekken)', DOC + ', p. 10 (CZU Praag)'] },

  { id: 'groen', cat: 'Groen en leefgebied', title: 'Groene zijkanten',
    pos: [1.5, 2.5, 2.7], anchor: [0.4, 1.7, 1.95],
    text: 'Klimplanten groeien langs het frame en onder de balk. Ze geven schaduw, verdamping en nectar of schuilplek voor insecten en vogels. Volgens een klimplantenlijst van de gemeente Vorst (Brussel) zijn klimop, wilde kamperfoelie en bosrank inheemse klimmers die nectar of onderdak bieden.',
    fact: 'Alleen een pergola is nog geen volwaardig leefgebied: combineer hem met bloemrijke beplanting en dood hout in de omgeving.',
    say: 'Dit zijn de groene zijkanten. Klimplanten groeien langs het frame en onder de balk. Ze geven schaduw, verdamping en nectar of schuilplek voor insecten en vogels. Volgens een lijst van de gemeente Vorst bij Brussel zijn klimop, wilde kamperfoelie en bosrank inheemse klimmers die nectar of onderdak bieden. Eerlijk is eerlijk: alleen een pergola is nog geen volwaardig leefgebied. Combineer hem met bloemrijke beplanting en dood hout in de omgeving.',
    src: [DOC + ', p. 2 (groene zijkanten)', DOC + ', p. 3 (biodiversiteit)', DOC + ', p. 5 (groen en leefgebied; lijst gemeente Vorst)'] },

  { id: 'verrijdbaar', cat: 'Constructie', title: 'Op wielen, dan vastzetten',
    pos: [15.5, 1.5, -4.5], anchor: [16.25, .66, -4.1],
    text: 'Plantenbakken en modules staan op wielen of ballast, zonder het dak te doorboren. Studenten bepalen de opstelling. Daarna wordt alles vastgezet.',
    fact: 'Drie stappen: 1) proef met één module, 2) studenten richten in, 3) vastzetten nadat draagkracht, wind en beheer zijn getoetst.',
    say: 'Kijk onder de plantenbak: wielen. De plantenbakken en modules staan op wielen of ballast, zodat het dak niet wordt doorboord. We werken in drie stappen. Eerst een proef met één module. Dan schuiven studenten bakken en meubels rond en kiezen wat werkt. En pas daarna wordt de opstelling vastgezet, nadat draagkracht, wind en beheer zijn getoetst. In Madrid en Utrecht staan pergola’s op een dak die laten zien dat zo’n bouwwijze bestaat. Of het hier kan, is nog niet berekend.',
    src: [DOC + ', p. 2 (verrijdbaar)', DOC + ', p. 3 (draagkracht van het dak; Madrid, De Syp)', DOC + ', p. 6 (verrijdbaar, dan vastzetten)'] },

  { id: 'schaduw', cat: 'Schaduw en koeling', title: 'Schaduw en koeling',
    pos: [21.2, 2.5, 0.0], anchor: [21.2, 3.0, 0.0],
    text: 'De panelen geven harde schaduw boven de zitplek. De klimplanten koelen daarnaast door verdamping. Bij proefopstellingen van groene pergola’s in Groningen was het onder de pergola’s tot 8 °C koeler dan in de open lucht.',
    fact: 'Het koelend effect op dit terras moet nog gemeten worden.',
    say: 'Hier sta je in de schaduw. De panelen geven harde schaduw boven de zitplek, en de klimplanten koelen daarnaast door verdamping. Bij proefopstellingen van groene pergola’s in Groningen was het onder de pergola’s tot 8 graden koeler dan in de open lucht. Of dat hier ook zo uitpakt, weten we nog niet. Dat effect moet nog gemeten worden.',
    src: [DOC + ', p. 3 (hitte en klimaatadaptatie)', DOC + ', p. 4 (duurzaamheidsmaatregel)', DOC + ', p. 5 (schaduw en koeling)', DOC + ', p. 11 (Leaf of Groningen)'] },

  { id: 'grote', cat: 'Het concept', title: 'De grote pergola',
    pos: [26.0, 3.55, 4.3], anchor: [26.0, 3.0, 3.6],
    text: 'De grote pergola is dezelfde bouwsteen als de kleine: een open overkapping, opgebouwd uit losse modules, met meubilair eronder. Hoe de ruimte wordt ingericht, bepalen studenten zelf.',
    note: 'Het document beschrijft losse modules. Een kleine en een grote opstelling, en het aantal modules, zijn een ontwerpkeuze in dit 3D-model en staan niet in het document.',
    say: 'Dit is de grote zon-groene pergola. Het is dezelfde bouwsteen als de kleine: een open overkapping, opgebouwd uit losse modules, met meubilair eronder. Hoe je de ruimte inricht, bepalen studenten zelf. Zij kiezen de opstelling, en pas daarna wordt alles vastgezet.',
    src: [DOC + ', p. 1 (wat is het)', DOC + ', p. 2 (verrijdbaar)'] },

  { id: 'lokaal', cat: 'Gebruik', title: 'Het buitenlokaal',
    pos: [28.4, 2.3, 1.8], anchor: [28.4, .95, 1.8],
    text: 'Studenten gebruiken de ruimte als pauzeplek, studieplek en buitenlokaal: een beschutte plek om te studeren, te lunchen en elkaar te ontmoeten. Banken en tafels staan klaar voor een klas of projectgroep.',
    fact: 'De sociale waarde is alleen sterk als studenten echt invloed hebben op ontwerp en gebruik.',
    say: 'Hier zie je het buitenlokaal. Banken en tafels voor een klas of projectgroep, in de schaduw. Studenten gebruiken de plek als pauzeplek, als studieplek en als buitenlokaal: een beschutte plek om te studeren, te lunchen en elkaar te ontmoeten. Er is wel een voorwaarde: de sociale waarde is alleen sterk als studenten echt invloed hebben op het ontwerp en het gebruik.',
    src: [DOC + ', p. 1 (wat is het)', DOC + ', p. 2 (zit- en leerplek)', DOC + ', p. 3 (sociale ontwikkeling)', DOC + ', p. 4 (sociale verbetering)'] },

  { id: 'sensor', cat: 'Onderzoek', title: 'De sensor',
    pos: [26.1, 2.2, -4.2], anchor: [26.09, 1.75, -3.5],
    text: 'Een sensor voor temperatuur en bodemvocht kan zichtbaar maken wat de pergola doet. Zo sluit de plek aan op het idee van een levend laboratorium en op de BioBlitz-activiteiten van de HAN.',
    fact: 'In het Groningse onderzoek maten sensoren onder de prototypes temperatuur, luchtvochtigheid en licht, naast een open referentie.',
    say: 'Dit kastje is de sensor. Een sensor voor temperatuur en bodemvocht kan zichtbaar maken wat de pergola doet. Zo past de plek bij het idee van een levend laboratorium en bij de BioBlitz-activiteiten van de HAN. In Groningen deden ze iets vergelijkbaars: daar maten sensoren onder de prototypes temperatuur, luchtvochtigheid en licht, naast een open referentie.',
    src: [DOC + ', p. 5 (leren en verblijven)', DOC + ', p. 11 (Leaf of Groningen)'] },

  { id: 'rood', cat: 'Verlichting', title: 'Rood licht in de avond', status: 'Nog te verifiëren',
    pos: [33.5, 2.8, 1.0], anchor: [33.2, 2.3, 1.8],
    text: 'In de avond zou laag, gedimd rood licht op zonnestroom kunnen branden. Onderzoek van NIOO-KNAW en Wageningen University liet zien dat rood licht de activiteit van lichtschuwe vleermuizen niet verminderde, terwijl wit en groen licht dat wel deden. Rood licht is dus minder verstorend, niet onschadelijk.',
    fact: 'Of dit iets toevoegt, hangt af van de bestaande terreinverlichting. Dat vragen we aan de opdrachtgever.',
    say: 'Dit rode lampje hoort bij een idee dat nog geverifieerd moet worden. In de avond zou laag, gedimd rood licht op zonnestroom kunnen branden. Onderzoek van NIOO-KNAW en Wageningen University liet zien dat rood licht de activiteit van lichtschuwe vleermuizen niet verminderde, terwijl wit en groen licht dat wel deden. Rood licht is dus minder verstorend, maar niet onschadelijk. Of dit iets toevoegt, hangt af van de bestaande terreinverlichting, en dat vragen we aan de opdrachtgever.',
    src: [DOC + ', p. 2 (rood licht in de avond)', DOC + ', p. 6 (rood licht, nog te verifiëren)', DOC + ', p. 14 (vraag 1 aan de opdrachtgever)'] },

  { id: 'frame', cat: 'Constructie', title: 'Het frame: nog te toetsen', status: 'Nog te toetsen',
    pos: [36.6, 2.2, 4.3], anchor: [35.6, 1.7, 3.6],
    text: 'Dit is een lichte, modulaire constructie die niet in het dak verankerd hoeft te worden. Of het dak dit aankan, is nog niet berekend: draagkracht, waterafvoer en waterdichting moeten worden beoordeeld, en een verrijdbare constructie moet bij storm stabiel blijven.',
    fact: 'Ook nog niet onderzocht: kosten. Verder te toetsen: elektra en brandveiligheid, licht voor de planten, beheer en eigenaar, vandalisme en diefstal.',
    say: 'Dit is het frame, de dragende constructie. Het is een lichte, modulaire constructie die niet in het dak verankerd hoeft te worden. Maar eerlijk is eerlijk: het is nog niet berekend of het dak dit aankan. Draagkracht, waterafvoer en waterdichting moeten worden beoordeeld door Huisvesting of een constructeur. Een verrijdbare constructie moet bij storm stabiel blijven, bijvoorbeeld met ballast of vergrendelde wielen. En de kosten zijn nog niet onderzocht.',
    src: [DOC + ', p. 3 (draagkracht van het dak)', DOC + ', p. 13 (wat nog getoetst moet worden)'] }
];

const SAY_CHARS = POINTS.reduce((a, p) => a + p.say.length, 0);
PF.POINTS = POINTS; PF.POINT_SAY_CHARS = SAY_CHARS; PF.POINT_LIMIT = 6671;

/* ---------- bolletjes in de 3D-scène ---------- */
PF.createPoints = function (parent) {
  const root = new THREE.Group(); root.name = 'infopunten'; root.visible = false; parent.add(root);
  const tex = {
    halo: PF.canvasTex(128, 128, (c, w, h) => { const g = c.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, 'rgba(255,214,110,.75)'); g.addColorStop(.3, 'rgba(255,200,90,.2)'); g.addColorStop(1, 'rgba(255,200,90,0)'); c.fillStyle = g; c.fillRect(0, 0, w, h); }),
    ring: PF.canvasTex(256, 256, (c, w, h) => { c.strokeStyle = 'rgba(255,255,255,.95)'; c.lineWidth = 5; c.beginPath(); c.arc(128, 128, 112, 0, Math.PI * 2); c.stroke(); }),
    icon: PF.canvasTex(64, 64, (c, w, h) => { c.fillStyle = '#1d2a24'; c.font = 'bold 40px "Bricolage Grotesque", Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('i', 32, 36); })
  };
  const coreGeo = new THREE.SphereGeometry(.125, 20, 14), dotGeo = new THREE.SphereGeometry(.035, 8, 6), hitGeo = new THREE.SphereGeometry(.5, 8, 6);
  const CY = new THREE.Color(0xe9b23a), CG = new THREE.Color(0x7fb685);
  const items = POINTS.map((p, k) => {
    const g = new THREE.Group(); g.position.set(p.pos[0], p.pos[1], p.pos[2]); root.add(g);
    const coreMat = new THREE.MeshStandardMaterial({ color: CY, emissive: 0xc98d12, emissiveIntensity: .55, roughness: .45, flatShading: true });
    const core = new THREE.Mesh(coreGeo, coreMat); g.add(core);
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex.halo, transparent: true, depthWrite: false, opacity: .8 })); halo.scale.setScalar(.9); g.add(halo);
    const ring = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex.ring, transparent: true, depthWrite: false, opacity: 0, color: 0xffe9a8 })); g.add(ring);
    const icon = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex.icon, transparent: true, depthWrite: false })); icon.scale.setScalar(.22); g.add(icon);
    const hit = new THREE.Mesh(hitGeo, new THREE.MeshBasicMaterial({ visible: false })); hit.userData.pointId = p.id; g.add(hit);
    // dunne verbindingslijn naar het onderdeel
    const lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(p.pos[0], p.pos[1], p.pos[2]), new THREE.Vector3(p.anchor[0], p.anchor[1], p.anchor[2])]);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xf6e6b4, transparent: true, opacity: .7 });
    const line = new THREE.Line(lg, lineMat); root.add(line);
    const dot = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({ color: 0xf6e6b4 })); dot.position.set(p.anchor[0], p.anchor[1], p.anchor[2]); root.add(dot);
    return { p, k, g, core, coreMat, halo, ring, icon, hit, line, lineMat, dot, s: 1, seen: false, pop: 0, glow: 0, d: 99 };
  });
  const byId = {}; items.forEach(it => byId[it.p.id] = it);
  const v = new THREE.Vector3(), fwd = new THREE.Vector3(), tmp = new THREE.Vector3();
  const ray = new THREE.Raycaster(); const hitMeshes = items.map(it => it.hit);
  let focusId = null;
  const api = { root, items, byId,
    setVisible(b) { root.visible = !!b; },
    markSeen(id) { const it = byId[id]; if (it) { it.seen = true; it.pop = 1; } },
    pulse(id) { const it = byId[id]; if (it) it.pop = 1; },
    reset() { items.forEach(it => { it.seen = false; }); focusId = null; },
    /* elke frame: cam = camera; open = id van het geopende punt (of null) */
    update(dt, cam, t, openId) {
      if (!root.visible) return null;
      cam.getWorldDirection(fwd); let best = null, bestScore = 1e9;
      items.forEach(it => {
        v.copy(it.g.position).sub(cam.position); const d = v.length(); it.d = d; v.divideScalar(Math.max(d, 1e-4)); const cosA = clamp(v.dot(fwd), -1, 1), ang = Math.acos(cosA);
        // schaal: veraf iets groter zodat ze zichtbaar blijven, dichtbij rustig
        const far = clamp((d - 4) / 22, 0, 1), near = 1 - clamp((d - 2) / 6, 0, 1);
        const target = lerp(1, 2.0, far) * (1 + .22 * near);
        it.s += (target - it.s) * (1 - Math.exp(-dt * 6));
        const inView = cosA > .5;
        const aimed = d < 8 && ang < .24; // ~14°
        const close = d < 3 && ang < .95;
        let score = 1e9; if (inView && (aimed || close)) score = ang + d * .012 - (aimed ? .3 : 0);
        if (score < bestScore) { bestScore = score; best = it; }
        it.pop = Math.max(0, it.pop - dt * 2.2);
      });
      focusId = best ? best.p.id : null;
      items.forEach(it => {
        const f = it === best ? 1 : 0; it.glow += (f - it.glow) * (1 - Math.exp(-dt * 8));
        const open = it.p.id === openId;
        const pulse = 1 + .07 * Math.sin(t * 2.3 + it.k * 1.7), bob = Math.sin(t * 1.3 + it.k * 2.1) * .06;
        const sc = it.s * (pulse + it.glow * .22 + it.pop * .35 + (open ? .15 : 0));
        it.core.scale.setScalar(sc); it.core.position.y = bob;
        it.coreMat.color.copy(it.seen ? CG : CY); it.coreMat.emissive.setHex(it.seen ? 0x3f7d4a : 0xc98d12); it.coreMat.emissiveIntensity = .5 + it.glow * .5 + it.pop * .6;
        const far = clamp((it.d - 6) / 24, 0, 1);
        it.halo.scale.setScalar(sc * (2.3 + it.glow * .7)); it.halo.position.y = bob; const nf = clamp((it.d - 1.8) / 3.2, 0, 1), nfs = nf * nf * (3 - 2 * nf); it.halo.material.opacity = ((.22 + it.glow * .3) * (1 - far * .35) + it.pop * .2) * nfs;
        const rp = ((t * (.45 + it.glow * .35) + it.k * .31) % 1); it.ring.position.y = bob; it.ring.scale.setScalar(sc * (1.1 + rp * 1.4)); it.ring.material.opacity = (1 - rp) * (.22 + it.glow * .45) * (it.seen ? .5 : 1) * nfs;
        // 'i' altijd vóór de bol, naar de camera gericht
        tmp.copy(cam.position).sub(it.g.position).normalize().multiplyScalar(.15 * sc); it.icon.position.copy(tmp); it.icon.position.y += bob; it.icon.scale.setScalar(.15 * sc);
        it.icon.material.opacity = it.seen ? .0 : 1;
        it.hit.scale.setScalar(Math.max(.5, it.s * .75));
        it.lineMat.opacity = (.28 + it.glow * .55 + (open ? .25 : 0)) * (1 - far * .4);
      });
      return focusId;
    },
    /* ndc ∈ [-1,1]: geeft id van het geraakte bolletje */
    pick(cam, nx, ny) { ray.setFromCamera({ x: nx, y: ny }, cam); ray.far = 40; const h = ray.intersectObjects(hitMeshes, false); return h.length ? h[0].object.userData.pointId : null; },
    get focus() { return focusId; }
  };
  return api;
};
})(window);
