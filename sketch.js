//Medidas de los círculos base
const baseCircle = {
  sec: { x: 140, y: 250, radMin: 60, radMax: 180 },
  min: { x: 240, y: 190, radMin: 70, radMax: 200 },
  hour: { x: 130, y: 130, radMin: 75, radMax: 220 },
};

let luna, sol, clockFont, creditsFont;

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
  createCanvas(400, 400);
  loadImage("assets/luna.png", (img) => (luna = img));
  loadImage("assets/sol.png", (img) => (sol = img));
  loadFont("assets/ds-digi.ttf", (font) => (clockFont = font));
  loadFont("assets/Quicksand-Medium.ttf", (font) => (creditsFont = font));
}

function draw() {
  const hours = hour();
  const minutes = minute();
  const seconds = second();
  const mon = month();
  const day = isDayInBarcelona(hours, mon);

  background(day ? "DeepSkyBlue" : 0);
  fill(day ? "DeepSkyBlue": 0);
  stroke(day ? color(250, 250, 250, 40) : 40);

  // --- ANILLOS BASE ---
  noFill();
  strokeWeight(1.5);
  drawCircleBase(baseCircle.sec);
  drawCircleBase(baseCircle.min);
  drawCircleBase(baseCircle.hour);

  // --- SEGUNDOS ---
  stroke(day ? "gold" : "aqua");
  strokeWeight(3);
  circle(
    baseCircle.sec.x,
    baseCircle.sec.y,
    map(seconds, 0, 59, baseCircle.sec.radMin, baseCircle.sec.radMax)
  );

  // --- MINUTOS ---
  stroke(day ? "orangered" : "orange");
  circle(
    baseCircle.min.x,
    baseCircle.min.y,
    map(minutes, 0, 59, baseCircle.min.radMin, baseCircle.min.radMax)
  );

  // --- HORAS / ASTRO ---
  const astroDiameter = map( hours + minutes / 60 + seconds / 3600, 0, 24, baseCircle.hour.radMin, baseCircle.hour.radMax );
  const astro = day ? sol : luna;

  if (astro && astro.width > 0)
    {
      image( astro, baseCircle.hour.x - astroDiameter / 2, baseCircle.hour.y - astroDiameter / 2, astroDiameter, astroDiameter );   
    } else {
      noStroke();
      fill(255, 255, 255)
      circle(baseCircle.hour.x, baseCircle.hour.y, astroDiameter)
    }

  // --- RELOJ DIGITAL ---
  noStroke();
  fill(day ? "MidnightBlue" : 255);
  if (clockFont) textFont(clockFont, 35);
  textAlign(RIGHT, TOP); 
  text(
    nf(hours, 2) + ":" + nf(minutes, 2) + ":" + nf(seconds, 2),
    380,
    15
  );
}
