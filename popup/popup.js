//Iconos de los botones
const BUTTONS = {
  work: {
    name: "work",
    position: { x: 300, y: 340 },
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M96 176C96 149.5 117.5 128 144 128C170.5 128 192 149.5 192 176L192 288L448 288L448 176C448 149.5 469.5 128 496 128C522.5 128 544 149.5 544 176L544 192L560 192C586.5 192 608 213.5 608 240L608 288C625.7 288 640 302.3 640 320C640 337.7 625.7 352 608 352L608 400C608 426.5 586.5 448 560 448L544 448L544 464C544 490.5 522.5 512 496 512C469.5 512 448 490.5 448 464L448 352L192 352L192 464C192 490.5 170.5 512 144 512C117.5 512 96 490.5 96 464L96 448L80 448C53.5 448 32 426.5 32 400L32 352C14.3 352 0 337.7 0 320C0 302.3 14.3 288 32 288L32 240C32 213.5 53.5 192 80 192L96 192L96 176z"/></svg>',
    size: "big",
    action: () => {
      stopSession();
      selectSessionMode("work");
    },
  },
  rest: {
    name: "rest",
    position: { x: 340, y: 340 },
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M184 48C170.7 48 160 58.7 160 72C160 110.9 183.4 131.4 199.1 145.1L200.2 146.1C216.5 160.4 224 167.9 224 184C224 197.3 234.7 208 248 208C261.3 208 272 197.3 272 184C272 145.1 248.6 124.6 232.9 110.9L231.8 109.9C215.5 95.7 208 88.1 208 72C208 58.7 197.3 48 184 48zM128 256C110.3 256 96 270.3 96 288L96 480C96 533 139 576 192 576L384 576C425.8 576 461.4 549.3 474.5 512L480 512C550.7 512 608 454.7 608 384C608 313.3 550.7 256 480 256L128 256zM480 448L480 320C515.3 320 544 348.7 544 384C544 419.3 515.3 448 480 448zM320 72C320 58.7 309.3 48 296 48C282.7 48 272 58.7 272 72C272 110.9 295.4 131.4 311.1 145.1L312.2 146.1C328.5 160.4 336 167.9 336 184C336 197.3 346.7 208 360 208C373.3 208 384 197.3 384 184C384 145.1 360.6 124.6 344.9 110.9L343.8 109.9C327.5 95.7 320 88.1 320 72z"/></svg>',
    size: "big",
    action: () => {
      stopSession();
      selectSessionMode("rest");
    },
  },
  play: {
    name: "play",
    position: { x: 300, y: 380 },
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>',
    size: "little",
    action: () => {
      if (mode === "idle") return;
      if (paused) {
        resumeSession();
        return;
      }
      if (!running) {
        startSession(mode);
      }
    },
  },
  stop: {
    name: "stop",
    position: { x: 340, y: 380 },
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M160 96L480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160C96 124.7 124.7 96 160 96z"/></svg>',
    size: "little",
    action: () => stopSession(),
  },
  pause: {
    name: "pause",
    position: { x: 320, y: 380 },
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M176 96C149.5 96 128 117.5 128 144L128 496C128 522.5 149.5 544 176 544L240 544C266.5 544 288 522.5 288 496L288 144C288 117.5 266.5 96 240 96L176 96zM400 96C373.5 96 352 117.5 352 144L352 496C352 522.5 373.5 544 400 544L464 544C490.5 544 512 522.5 512 496L512 144C512 117.5 490.5 96 464 96L400 96z"/></svg>',
    size: "little",
    action: () => pauseSession(),
  },
  reload: {
    name: "reload",
    position: { x: 360, y: 380 },
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M552 256L408 256C398.3 256 389.5 250.2 385.8 241.2C382.1 232.2 384.1 221.9 391 215L437.7 168.3C362.4 109.7 253.4 115 184.2 184.2C109.2 259.2 109.2 380.7 184.2 455.7C259.2 530.7 380.7 530.7 455.7 455.7C463.9 447.5 471.2 438.8 477.6 429.6C487.7 415.1 507.7 411.6 522.2 421.7C536.7 431.8 540.2 451.8 530.1 466.3C521.6 478.5 511.9 490.1 501 501C401 601 238.9 601 139 501C39.1 401 39 239 139 139C233.3 44.7 382.7 39.4 483.3 122.8L535 71C541.9 64.1 552.2 62.1 561.2 65.8C570.2 69.5 576 78.3 576 88L576 232C576 245.3 565.3 256 552 256z"/></svg>',
    size: "little",
    action: () => resetSession(),
  },
};

//Medidas de los círculos base
const baseCircle = {
  sec: { x: 140, y: 250, radMin: 60, radMax: 180 },
  min: { x: 240, y: 190, radMin: 70, radMax: 200 },
  hour: { x: 130, y: 130, radMin: 75, radMax: 220 },
};

const COLORS = {
  day: {
    background: "DeepSkyBlue",
    stroke: [250, 250, 250, 40],
    mnStroke: "orangered",
    scStroke: "gold",
  },
  night: {
    background: 0,
    stroke: 40,
    mnStroke: "orange",
    scStroke: "aqua",
  },
};

//Tiempos hardcodeados
//TODO: que lo indique el usuario
const WORK_SECONDS = 25 * 60; //25 minutos
const REST_SECONDS = 5 * 60; //5 minutos

//Variables temporizador
let mode = "idle"; //"idle", "work", "rest"
let remainingSeconds = 0;
let excededSeconds = 0;
let duration = 0;
let targetEnd = 0; // en segundos totales (desde medianoche)
let paused = false;
let running = false;
let pausedAt = 0;
let exceededStart = 0; // declarar aquí
let alarmSound = null;
let alarmPlayed = false;

//Variables tiempo
let hours, minutes, seconds, totalSeconds;

//Variables reloj
let luna, sol, clockFont, creditsFont;

//Variables botones
let btnWork, btnRest, btnStop, btnPlay, btnPause, btnReload;
let allButtons = [];

//función que dibuja los círculos base cuando se la invoca
const drawCircleBase = (circle) => {
  for (let i = 7; i >= 1; i--) {
    const d = map(i, 1, 7, circle.radMin, circle.radMax);
    ellipse(circle.x, circle.y, d, d);
  }
};

/* Lo siguiente fue creado por IA generativa
 ** a la petición de detectar si es de día o de noche
 ** según en qué mes estamos y en qué hora
 ** en Barcelona */

// START IA Generate
//
// Devuelve ventana de día [startHour, endHourExclusive] para mes 1..12 (Barcelona aprox.)
const dayWindowForBarcelona = (mon) => {
  switch (mon) {
    case 1:
      return [8, 17]; // Ene: ~08–17
    case 2:
      return [7, 18]; // Feb: ~07–18
    case 3:
      return [7, 19]; // Mar: ~07–19
    case 4:
      return [7, 20]; // Abr: ~07–20
    case 5:
      return [6, 21]; // May: ~06–21
    case 6:
      return [6, 22]; // Jun: ~06–22 (solsticio aprox.)
    case 7:
      return [6, 22]; // Jul: ~06–22
    case 8:
      return [7, 21]; // Ago: ~07–21
    case 9:
      return [7, 20]; // Sep: ~07–20
    case 10:
      return [7, 19]; // Oct: ~07–19
    case 11:
      return [7, 18]; // Nov: ~07–18
    case 12:
      return [8, 17]; // Dic: ~08–17
    default:
      return [7, 19];
  }
};

// ¿Es de día ahora mismo en BCN según mes/hora?
const isDayInBarcelona = (h, mon) => {
  const [start, end] = dayWindowForBarcelona(mon);
  return h >= start && h < end;
};

// END IA Generate

function preload() {
  //https://pixabay.com/sound-effects/search/timer/
  // loadSound("assets/alarm.mp3", (sound) => (alarmSound = sound));
}

function setup() {
  createCanvas(400, 500);

  //carga nativa del audio
  alarmSound = new Audio("assets/alarm.mp3");

  btnWork = drawButton(BUTTONS.work);
  btnRest = drawButton(BUTTONS.rest);
  btnPlay = drawButton(BUTTONS.play);
  btnStop = drawButton(BUTTONS.stop);
  btnPause = drawButton(BUTTONS.pause);
  btnReload = drawButton(BUTTONS.reload);
  allButtons = [btnWork, btnRest, btnPlay, btnStop, btnPause, btnReload];

  loadImage("assets/luna.png", (img) => (luna = img));
  loadImage("assets/sol.png", (img) => (sol = img));
  loadFont("assets/ds-digi.ttf", (font) => (clockFont = font));
  loadFont("assets/Quicksand-Medium.ttf", (font) => (creditsFont = font));

  // Recuperar sesión anterior si existe
  restoreSavedSession();
}

function draw() {
  hours = hour();
  minutes = minute();
  seconds = second();
  totalSeconds = hours * 3600 + minutes * 60 + seconds;

  //--- DIBUJO RELOJ ---
  drawClock(baseCircle);
  updateButtonColors();

  //--- ACTUALIZACIÓN TEMPORIZADOR ---
  if (running && !paused && mode !== "idle") {
    remainingSeconds = targetEnd - totalSeconds;
    
    if (remainingSeconds <= 0 && !alarmPlayed) {
      alarmPlayed = true;
      // alarmSound?.play();
        alarmSound.play().catch(error => {
            console.log("El navegador bloqueó el audio hasta que el usuario interactúe:", error);
        });
      excededSeconds = 0;
      exceededStart = totalSeconds;
      // Guardar que se finalizó
      saveSavedSession();
    }
  }

  //--- DIBUJO TEMPORIZADOR ---
  fill(255);
  noStroke();
  textAlign(RIGHT, TOP);
  if (clockFont) textFont(clockFont, 50);
  remainingSeconds >= 0
    ? text(fmtMMSS(remainingSeconds), width - 117, 358)
    : text(
        fmtMMSS(mode == "rest" ? REST_SECONDS : WORK_SECONDS),
        width - 117,
        358
      );

  //--- DIBUJO TIEMPO FUERA DE PROGRAMA ---
  if (remainingSeconds < 0) {
    let isDay = isDayInBarcelona(hour(), month());
    excededSeconds = totalSeconds - exceededStart;
    fill(isDay ? COLORS.day.mnStroke : COLORS.night.mnStroke);
    noStroke();
    textAlign(RIGHT, TOP);
    if (clockFont) textFont(clockFont, 30);
    text(`${fmtMMSS(excededSeconds)}`, width - 240, 375);
  }
}

function updateButtonColors() {
  const isDay = isDayInBarcelona(hour(), month());
  const fillColor = isDay ? COLORS.day.mnStroke : COLORS.night.mnStroke;

  for (const btnObj of allButtons) {
    if (!btnObj) continue;
    const svg = btnObj.elt.querySelector("svg");
    if (svg) svg.style.fill = "white";
  }

  if (running && !paused && btnPlay) {
    btnPlay.elt.querySelector("svg").style.fill = fillColor;
  }

  if (paused && btnPause) {
    btnPause.elt.querySelector("svg").style.fill = fillColor;
  }

  if (mode === "work" && btnWork) {
    btnWork.elt.querySelector("svg").style.fill = fillColor;
  }

  if (mode === "rest" && btnRest) {
    btnRest.elt.querySelector("svg").style.fill = fillColor;
  }
}

// Detiene el audio de la alarma si está sonando
function killAudio() {
  if (alarmSound) {
    alarmSound.pause();
    alarmSound.currentTime = 0;
  }
}

function selectSessionMode(kind) {
  killAudio();
  if (mode === kind) return;
  mode = kind;
  duration = kind === "work" ? WORK_SECONDS : REST_SECONDS;
  remainingSeconds = duration;
  running = false;
  paused = false;
  alarmPlayed = false;
  saveSavedSession();
}

function startSession() {
  if (mode === "idle") return;
  paused = false;
  running = true;
  alarmPlayed = false;
  targetEnd = totalSeconds + duration;
  saveSavedSession();
}

function pauseSession() {
  if (mode === "idle" || !running) return;
  paused = true;
  running = false;
  pausedAt = totalSeconds;
  saveSavedSession();
}

function resumeSession() {
  if (mode === "idle" || !paused) return;
  const pausedDelta = totalSeconds - pausedAt;
  targetEnd += pausedDelta;
  paused = false;
  running = true;
  if (remainingSeconds <= 0) {
    remainingSeconds = 0;
    running = false;
    stopSession();
  }
  saveSavedSession();
}

function stopSession() {
  killAudio();
  paused = false;
  running = false;
  duration = mode === "work" ? WORK_SECONDS : REST_SECONDS;
  remainingSeconds = duration;
  targetEnd = 0;
  alarmPlayed = false;
  saveSavedSession();
}

function resetSession() {
  killAudio();
  if (mode === "idle") {
    return;
  }
  stopSession();
  mode = "idle";
  remainingSeconds = 0;
  duration = 0;
  alarmPlayed = false;
  localStorage.removeItem("timerSession");
}

// --- FUNCIONES DE PERSISTENCIA (localStorage) ---
function saveSavedSession() {
  const session = {
    mode,
    running,
    paused,
    targetEnd,
    duration,
    alarmPlayed,
    pausedAt,
    exceededStart,
    excededSeconds,
  };
  storeItem("timerSession", JSON.stringify(session));
}

function restoreSavedSession() {
  const saved = getItem("timerSession");
  if (saved) {
    try {
      const session = JSON.parse(saved);
      mode = session.mode || "idle";
      running = session.running || false;
      paused = session.paused || false;
      targetEnd = session.targetEnd || 0;
      duration = session.duration || 0;
      alarmPlayed = session.alarmPlayed || false;
      pausedAt = session.pausedAt || 0;
      exceededStart = session.exceededStart || 0;
      excededSeconds = session.excededSeconds || 0;
      remainingSeconds = session.duration || 0;
    } catch (e) {
      console.error("Error restaurando sesión:", e);
    }
  }
}

//formatea segundos a MM:SS
function fmtMMSS(totalSeconds) {
  const s = totalSeconds >= 0 ? totalSeconds : Math.abs(totalSeconds);
  const minutes = floor(s / 60);
  const seconds = s % 60;
  return nf(minutes, 2) + ":" + nf(seconds, 2);
}

function drawButton(btnInfo) {
  const btn = createButton("");
  btn.elt.innerHTML = btnInfo.icon;

  const svg = btn.elt.querySelector("svg");
  if (svg) {
    svg.classList.add("icon-button");
  }

  btn.class("control-button");
  btn.position(btnInfo.position.x, btnInfo.position.y);
  btnInfo.size === "big" ? btn.size(40, 40) : btn.size(20, 20);

  btn.elt.style.position = "absolute";
  btn.elt.style.zIndex = 1000;
  btn.elt.style.pointerEvents = "auto";

  btn.mousePressed(() => {
    btnInfo.action();
  });
  return btn;
}

function drawClock(base) {
  const mon = month();
  const day = isDayInBarcelona(hours, mon);

  background(day ? COLORS.day.background : COLORS.night.background);
  fill(day ? COLORS.day.background : COLORS.night.background);
  stroke(day ? COLORS.day.stroke : COLORS.night.stroke);

  // --- ANILLOS BASE ---
  noFill();
  strokeWeight(1.5);
  drawCircleBase(base.sec);
  drawCircleBase(base.min);
  drawCircleBase(base.hour);

  // --- SEGUNDOS ---
  stroke(day ? COLORS.day.scStroke : COLORS.night.scStroke);
  strokeWeight(3);
  circle(
    base.sec.x,
    base.sec.y,
    map(seconds, 0, 59, base.sec.radMin, base.sec.radMax)
  );

  // --- MINUTOS ---
  stroke(day ? COLORS.day.mnStroke : COLORS.night.mnStroke);
  circle(
    base.min.x,
    base.min.y,
    map(minutes, 0, 59, base.min.radMin, base.min.radMax)
  );

  // --- HORAS / ASTRO ---
  const astroDiameter = map(
    hours + minutes / 60 + seconds / 3600,
    0,
    24,
    base.hour.radMin,
    base.hour.radMax
  );
  const astro = day ? sol : luna;

  if (astro && astro.width > 0) {
    image(
      astro,
      base.hour.x - astroDiameter / 2,
      base.hour.y - astroDiameter / 2,
      astroDiameter,
      astroDiameter
    );
  } else {
    noStroke();
    fill(255, 255, 255);
    circle(base.hour.x, base.hour.y, astroDiameter);
  }

  // --- RELOJ DIGITAL ---
  noStroke();
  fill(day ? COLORS.night.background : COLORS.day.background);
  if (clockFont) textFont(clockFont, 35);
  textAlign(RIGHT, TOP);
  text(nf(hours, 2) + ":" + nf(minutes, 2) + ":" + nf(seconds, 2), 380, 15);
}