let BUTTON_HEIGHT = 0;
const BG_COLOR = [0];
const FG_COLOR = [255, 255, 255];

let style = {
  strokeWeight: 5,
  color: [255, 255, 255],
};

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
  OBJECTS.buttons = Button.createButtons(BUTTONQTY);
}

let degI = 0;
const OBJECTS = {
  points: [],
  crosses: [],
  lines: [],
  vectors: [],
  buttons: [],
  texts: [],
};

function setup() {
  BUTTON_HEIGHT = windowHeight / 10;
  let cnv = createCanvas(windowWidth, windowHeight);
  OBJECTS.buttons = Button.createButtons(BUTTONQTY);

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
  if (key === "S") {
    saveCanvas("pgar-untitled", "jpg");
  }

  // Change strokeweight Keys: 1-9 Codes: 49-58

  if ("1".charCodeAt(0) <= keyCode <= "9".charCodeAt(0)) {
    style.strokeWeight = 2.5 * (keyCode - "1".charCodeAt(0) + 1);
  }
  /* console.log(`Key: ${key}\nKey code: ${keyCode}`); */
}

function draw() {
  background(BG_COLOR);

  strokeWeight(style.strokeWeight);

  OBJECTS.points.forEach((p) => {
    p.display();
  });
  OBJECTS.crosses.forEach((c) => {
    c.display();
  });
  OBJECTS.lines.forEach((l) => {
    l.display();
  });
  OBJECTS.vectors.forEach((v) => {
    v.display();
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
      OBJECTS.points.push(new Point(mouseX, mouseY, { ...style }));
      break;
    case 1:
      OBJECTS.crosses.push(new Cross(mouseX, mouseY, 10, { ...style }));
      break;
    case 2:
      OBJECTS.lines.push(
        new Line(mouseX, mouseY, mouseX + 30, mouseY + 30, { ...style })
      );
      break;
    case 3:
      const modulus = parseFloat(prompt("modulus"));
      const direction = parseFloat(prompt("direction"));
      if (
        !modulus ||
        !direction ||
        typeof modulus !== "number" ||
        typeof direction !== "number"
      ) {
        alert("Fail!");
        console.log(modulus, direction);
        return false;
      }
      OBJECTS.vectors.push(
        new Vector(mouseX, mouseY, modulus, direction, 5, { ...style })
      );
      break;
  }
  HISTORY.push(selectedTool);
  /* console.log(OBJECTS); */
  return false;
}
