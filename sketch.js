//Medidas de los círculos base
const baseCircle = {
  sec: { x: 140, y: 250, radMin: 60, radMax: 180 },
  min: { x: 240, y: 190, radMin: 70, radMax: 200 },
  hour: { x: 130, y: 130, radMin: 75, radMax: 220 },
};

const COLORS = {
  dayBackground: "DeepSkyBlue",
  nightBackground: 0,
  dayStroke: [250, 250, 250, 40],
  nightStroke: 40,
};


let luna, sol, clockFont, creditsFont;
let btnTarea, btnDescanso, btnDetener;

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

function setup() {
  createCanvas(400, 400);

  // Crear botones de control
  btnTarea = createButton("Iniciar tarea");
  btnDescanso = createButton("Iniciar descanso");
  btnDetener = createButton("Detener");

  btnTarea.position(20, height - 40);
  btnDescanso.position(150, height - 40);
  btnDetener.position(300, height - 40);

  btnTarea.style("background", "#000");
  btnDescanso.style("background", "#000");
  btnDetener.style("background", "#000");
  btnTarea.style("color", "white");
  btnDescanso.style("color", "white");
  btnDetener.style("color", "white");

  btnTarea.mousePressed(() => console.log("⏳ Iniciar tarea"));
  btnDescanso.mousePressed(() => console.log("☕ Iniciar descanso"));
  btnDetener.mousePressed(() => console.log("🛑 Detener"));

  loadImage("assets/luna.png", (img) => (luna = img));
  loadImage("assets/sol.png", (img) => (sol = img));
  loadFont("assets/ds-digi.ttf", (font) => (clockFont = font));
  loadFont("assets/Quicksand-Medium.ttf", (font) => (creditsFont = font));
}

function draw() {
  drawClock(baseCircle);
}

function drawClock(base) {
  const hours = hour();
  const minutes = minute();
  const seconds = second();
  const mon = month();
  const day = isDayInBarcelona(hours, mon);

  background(day ? COLORS.dayBackground : COLORS.nightBackground);
  fill(day ? COLORS.dayBackground : COLORS.nightBackground);
  stroke(day ? COLORS.dayStroke : COLORS.nightStroke);

  // --- ANILLOS BASE ---
  noFill();
  strokeWeight(1.5);
  drawCircleBase(base.sec);
  drawCircleBase(base.min);
  drawCircleBase(base.hour);

  // --- SEGUNDOS ---
  stroke(day ? "gold" : "aqua");
  strokeWeight(3);
  circle(
    base.sec.x,
    base.sec.y,
    map(seconds, 0, 59, base.sec.radMin, base.sec.radMax)
  );

  // --- MINUTOS ---
  stroke(day ? "orangered" : "orange");
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
  fill(day ? COLORS.nightBackground : COLORS.dayBackground);
  if (clockFont) textFont(clockFont, 35);
  textAlign(RIGHT, TOP);
  text(nf(hours, 2) + ":" + nf(minutes, 2) + ":" + nf(seconds, 2), 380, 15);
}
