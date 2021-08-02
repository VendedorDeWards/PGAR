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

let selectedTool = 0; // tools = 0: point, 1: cross, 2: line, 3: vector

function windowResized() {
  /* resizeCanvas(windowWidth, windowHeight); */
}

let degI = 0;
const OBJECTS = {
  points: [],
  crosses: [],
  lines: [],
  vectors: [],
  texts: [],
};

function setup() {
  /* let cnv = createCanvas(windowWidth, windowHeight); */
  let cnv = createCanvas((windowWidth / 4) * 3, windowHeight);
  cnv.parent(document.getElementById("sketch"));

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

  if (49 <= keyCode && keyCode <= 58) {
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
}

function mousePressed() {
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height)
    return false;
  /* console.log(mouseX, mouseY); */
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
      const modulus = parseFloat(prompt("Modulus:"));
      const direction = parseFloat(prompt("Direction:"));
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

document.getElementById("selectPoint").onclick = () => {
  selectedTool = 0;
};
document.getElementById("selectCross").onclick = () => {
  selectedTool = 1;
};
document.getElementById("selectLine").onclick = () => {
  selectedTool = 2;
};
document.getElementById("selectVector").onclick = () => {
  selectedTool = 3;
};
