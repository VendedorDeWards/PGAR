const BG_COLOR = [0];
const FG_COLOR = [255, 255, 255];
let BUTTON_HEIGHT;
let currentStrokeWeight = 5;

const HISTORY = [];
const HISTORY_REF = {
  0: "points",
  1: "crosses",
  2: "lines",
  3: "vectors",
};

const tools = {
  0: "point",
  1: "cross",
  2: "line",
  3: "vector",
};
const BUTTONQTY = Object.keys(tools).length;

let selectedTool = 0; // tools = 0: point, 1: cross, 2: line, 3: vector

function windowResized() {
  BUTTON_HEIGHT = windowHeight / 10;
  resizeCanvas(windowWidth, windowHeight);
  OBJECTS.buttons = createButtons(BUTTONQTY);
}

let degI = 0;
const OBJECTS = {
  points: [], // [{x, y}]
  crosses: [], // [{x, y, size}]
  lines: [], // [{x1, y1, x2, y2}]
  vectors: [], // [{x1, y1, x2, y2}]
  // TODO: Change to [{x1, y1, x2, y2}], create vectorFromModuleDirection() (Vector.fromMD() or Vector.from()) ??
  buttons: [], // [Button]
  texts: [], // [{str, x, y}]
};

// TODO: BETTER IMPLEMENTATION! BUT EVEN BETTER WITH CLASSES!, NEXT UP

/* const OBJECTS = {
  points: { drawMethod: point, instances: [] },
  crosses: { drawMethod: drawCross, instances: [] },
  lines: { drawMethod: line, instances: [] },
  vectors: { drawMethod: drawVector, instances: [] },
}; */

function setup() {
  BUTTON_HEIGHT = windowHeight / 10;
  createCanvas(windowWidth, windowHeight);
  OBJECTS.buttons = createButtons(BUTTONQTY);

  background(...BG_COLOR);
  stroke(...FG_COLOR);
}

function keyPressed() {
  const key = String.fromCharCode(keyCode);

  // Undo Key: Z Code: 90
  if (key === "Z") {
    if (HISTORY.length) {
      const toolToDelete = HISTORY_REF[HISTORY.pop()];
      OBJECTS[toolToDelete].pop();
    }
  }

  // Change strokeweight Keys: 1-5 Codes: 49-54

  if (key === "1") {
    currentStrokeWeight = 2.5;
  }
  if (key === "2") {
    currentStrokeWeight = 5;
  }
  if (key === "3") {
    currentStrokeWeight = 7.5;
  }
  if (key === "4") {
    currentStrokeWeight = 10;
  }
  /* console.log(`Key: ${key}\nKey code: ${keyCode}`); */
}

function draw() {
  background(BG_COLOR);

  strokeWeight(currentStrokeWeight);
  /* -------- */

  drawVector(...[width / 2, (height - 50) / 2], height / 4, degI);
  degI++;

  // OBJECTS.entries = [['points', {drawMethod: point, instances: [[2, 3], [3, 5]]}]]
  /* OBJECTS.entries.forEach((type) => {}); */

  OBJECTS.points.forEach((p) => {
    point(p.x, p.y);
  });
  OBJECTS.crosses.forEach((c) => {
    drawCross(c.x, c.y, c.size);
  });
  OBJECTS.lines.forEach((l) => {
    line(l.x1, l.y1, l.x2, l.y2);
  });
  OBJECTS.vectors.forEach((v) => {
    drawVector(v.x, v.y, v.m, v.d);
  });
  OBJECTS.buttons.forEach((button) => {
    button.display();
  });
}

function mousePressed() {
  if (mouseY > height - BUTTON_HEIGHT) {
    if (mouseX < width / BUTTONQTY) {
      selectedTool = 0;
    } else if (mouseX < (width / BUTTONQTY) * 2) {
      selectedTool = 1;
    } else if (mouseX < (width / BUTTONQTY) * 3) {
      selectedTool = 2;
    } else if (mouseX < (width / BUTTONQTY) * 4) {
      selectedTool = 3;
    }

    return false;
  }
  // tools = 0: point, 1: cross, 2: line, 3: vector
  switch (selectedTool) {
    case 0:
      OBJECTS.points.push({ x: mouseX, y: mouseY });
      break;
    case 1:
      OBJECTS.crosses.push({ x: mouseX, y: mouseY, size: random(20) + 10 });
      break;
    case 2:
      OBJECTS.lines.push({
        x1: mouseX,
        y1: mouseY,
        x2: mouseX + 20,
        y2: mouseY + 20,
      });
      break;
    case 3:
      const modulus = prompt("modulus");
      const direction = prompt("direction");
      OBJECTS.vectors.push({ x: mouseX, y: mouseY, m: modulus, d: direction });
      break;
  }
  HISTORY.push(selectedTool);
  return false;
}

/* ---------------------- */

function giveAlert() {}

function createButtons(qty) {
  const colors = [
    [164, 3, 111],
    [4, 139, 168],
    [22, 219, 147],
    [239, 234, 90],
    [242, 158, 76],
  ]; // https://coolors.co/a4036f-048ba8-16db93-efea5a-f29e4c

  let res = [];

  for (let i = 0; i < qty; i++) {
    res.push(
      new Button(
        (width / qty) * i,
        height - BUTTON_HEIGHT,
        width / qty,
        BUTTON_HEIGHT,
        colors[i]
      )
    );
  }
  return res;
}

function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function drawCross(xPos, yPos, size) {
  const x1 = Math.round(xPos - size / 2);
  const x2 = Math.round(xPos + size / 2);
  const y1 = Math.round(yPos - size / 2);
  const y2 = Math.round(yPos + size / 2);

  line(x1, y1, x2, y2);

  line(x1, y2, x2, y1);
}

/* function drawCircle(xPos, yPos, size) {
  circle(xPos, yPos, size);
} */

/* 
function dV(x1, y1, x2, y2) {

}

function dVFM(xPos, yPos, modulus, direction) */

function drawVector(xPos, yPos, modulus, direction) {
  const arrowSide = 5;
  const arrowHeight = ((Math.tan(degToRad(60)) * arrowSide) / 2) * 1.4;
  const dir = degToRad(direction);
  /* const x2 = xPos + Math.cos(dir) * modulus;
  const y2 = yPos - Math.sin(dir) * modulus; */
  const x2 = xPos + Math.cos(dir) * (modulus - arrowHeight);
  const y2 = yPos - Math.sin(dir) * (modulus - arrowHeight);
  const triX1 = x2 + (Math.sin(dir) * arrowSide) / 2;
  const triY1 = y2 + (Math.cos(dir) * arrowSide) / 2;

  const triX2 = x2 - (Math.sin(dir) * arrowSide) / 2;
  const triY2 = y2 - (Math.cos(dir) * arrowSide) / 2;

  const triX3 = x2 + Math.cos(dir) * arrowHeight;
  const triY3 = y2 - Math.sin(dir) * arrowHeight;

  line(xPos, yPos, x2, y2);
  triangle(triX1, triY1, triX2, triY2, triX3, triY3);
}

class Button {
  constructor(x1, y1, w, h, color) {
    this.x1 = x1;
    this.y1 = y1;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  display() {
    stroke(...this.color);
    fill(...this.color);
    strokeWeight(0);
    rect(this.x1, this.y1, this.w, this.h);
  }
}
