//Medidas de los círculos base
const baseCircle = {
  sec: { x: 160, y: 270, radMin: 60, radMax: 180 },
  min: { x: 260, y: 210, radMin: 70, radMax: 200 },
  hour: { x: 150, y: 150, radMin: 75, radMax: 220 },
};

let luna, sol, clockFont, creditsFont;

//función que dibuja los círculos base cuando se la invoca
const drawCircleBase = (circle, scale) => {
  for (let i = 7; i >= 1; i--) {
    const d = map(i, 1, 7, circle.radMin, circle.radMax) * scale;
    ellipse(circle.x * scale, circle.y * scale, d, d);
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
    case 1: return [8, 17]; // Ene: ~08–17 
    case 2: return [7, 18]; // Feb: ~07–18 
    case 3: return [7, 19]; // Mar: ~07–19 
    case 4: return [7, 20]; // Abr: ~07–20 
    case 5: return [6, 21]; // May: ~06–21 
    case 6: return [6, 22]; // Jun: ~06–22 (solsticio aprox.) 
    case 7: return [6, 22]; // Jul: ~06–22 
    case 8: return [7, 21]; // Ago: ~07–21 
    case 9: return [7, 20]; // Sep: ~07–20 
    case 10: return [7, 19]; // Oct: ~07–19 
    case 11: return [7, 18]; // Nov: ~07–18 
    case 12: return [8, 17]; // Dic: ~08–17 
    default: return [7, 19]; 
  } 
}

// ¿Es de día ahora mismo en BCN según mes/hora?
const isDayInBarcelona = (h, mon) => {
  const [start, end] = dayWindowForBarcelona(mon);
  return h >= start && h < end;
};

// END IA Generate

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadImage("assets/luna.png", (img) => (luna = img));
  loadImage("assets/sol.png", (img) => (sol = img));
  loadFont("assets/ds-digi.ttf", (font) => (clockFont = font));
  loadFont("assets/Quicksand-Medium.ttf", (font) => (creditsFont = font));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  const hours = hour();
  const minutes = minute();
  const seconds = second();
  const mon = month();
  const day = isDayInBarcelona(hours, mon);

  // escala respecto al diseño base 400×400
  const scale = min(width / 400, height / 400);

  background(day ? "DeepSkyBlue" : 0);
  fill(day ? "DeepSkyBlue": 0);
  stroke(day ? color(250, 250, 250, 40) : 40);

  // Anillos base
  noFill();
  strokeWeight(1.5 * scale);
  drawCircleBase(baseCircle.sec, scale);
  drawCircleBase(baseCircle.min, scale);
  drawCircleBase(baseCircle.hour, scale);

  // Segundos
  stroke(day ? "gold" : "aqua");
  strokeWeight(3 * scale);
  circle(
    baseCircle.sec.x * scale,
    baseCircle.sec.y * scale,
    map(seconds, 0, 59, baseCircle.sec.radMin, baseCircle.sec.radMax) * scale
  );

  // Minutos
  stroke(day ? "orangered" : "orange");
  circle(
    baseCircle.min.x * scale,
    baseCircle.min.y * scale,
    map(minutes, 0, 59, baseCircle.min.radMin, baseCircle.min.radMax) * scale
  );

  // Astro (escala horas)
  const astroDiameter = map( hours + minutes / 60 + seconds / 3600, 0, 24, baseCircle.hour.radMin, baseCircle.hour.radMax ) * scale;
  const astro = day ? sol : luna;

  if (astro)
    {
      image( astro, baseCircle.hour.x * scale - astroDiameter / 2, baseCircle.hour.y * scale - astroDiameter / 2, astroDiameter, astroDiameter );   
    } else {
      noStroke();
      fill(255, 255, 255)
      circle(baseCircle.hour.x * scale, baseCircle.hour.y * scale, astroDiameter)
    }

  // Reloj de refuerzo
  noStroke();
  fill(day ? "MidnightBlue" : 255);
  if (clockFont) textFont(clockFont, 35 * scale);
  textAlign(RIGHT); 
  text(
    nf(hours, 2) + ":" + nf(minutes, 2) + ":" + nf(seconds, 2),
    360 * scale,
    380 * scale
  );

  //Título y créditos
  text("Time Rings", 360 * scale, 50 * scale);
  if(creditsFont) textFont(creditsFont, 16 * scale);
  text("Esther Lecina", 360 * scale, 70 * scale);

  // Cita Freepik
  if (creditsFont) textFont(creditsFont, 8 * scale);
  noStroke();
  fill(day ? "MidnightBlue" : 200);
  textAlign(LEFT, BOTTOM);
  text("Sun and Moon icons designed by Freepik", 10 * scale, (400 - 25) * scale);
}
