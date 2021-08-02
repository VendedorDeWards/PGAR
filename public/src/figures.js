class Figure {
  constructor(x, y, style) {
    this.x = x;
    this.y = y;
    this.style = style;
  }
  setProperties() {
    stroke(...this.style.color);
    fill(...this.style.color);
    strokeWeight(this.style.strokeWeight);
  }
}

class Point extends Figure {
  constructor(x, y, style) {
    super(x, y, style);
  }

  display() {
    this.setProperties();

    point(this.x, this.y);
  }
}

class Cross extends Figure {
  constructor(x, y, size, style) {
    super(x, y, style);
    this.size = size;

    this.x1 = Math.round(this.x - size / 2);
    this.y1 = Math.round(this.y - size / 2);
    this.x2 = Math.round(this.x + size / 2);
    this.y2 = Math.round(this.y + size / 2);
  }

  display() {
    this.setProperties();

    line(this.x1, this.y1, this.x2, this.y2);
    line(this.x1, this.y2, this.x2, this.y1);
  }
}

class Line extends Figure {
  constructor(x1, y1, x2, y2, style) {
    super(x1, y1, style);
    this.x2 = x2;
    this.y2 = y2;
  }

  display() {
    this.setProperties();

    line(this.x, this.y, this.x2, this.y2);
  }
}

// TODO: implement vector from module and direction that has x2 and y2 and vector from x2 and y2 that has module and direction in same class

class Vector extends Figure {
  constructor(x, y, modulus, direction, arrowSide, style) {
    super(x, y, style);
    this.modulus = modulus;
    this.dir = degToRad(direction);
    this.arrowSide = arrowSide;

    this.arrowHeight = ((Math.tan(degToRad(60)) * this.arrowSide) / 2) * 1.4;

    this.x2 = this.x + Math.cos(this.dir) * (modulus - this.arrowHeight);
    this.y2 = this.y - Math.sin(this.dir) * (modulus - this.arrowHeight);

    this.triX1 = this.x2 + (Math.sin(this.dir) * this.arrowSide) / 2;
    this.triY1 = this.y2 + (Math.cos(this.dir) * this.arrowSide) / 2;

    this.triX2 = this.x2 - (Math.sin(this.dir) * this.arrowSide) / 2;
    this.triY2 = this.y2 - (Math.cos(this.dir) * this.arrowSide) / 2;

    this.triX3 = this.x2 + Math.cos(this.dir) * this.arrowHeight;
    this.triY3 = this.y2 - Math.sin(this.dir) * this.arrowHeight;
  }

  display() {
    this.setProperties();

    line(this.x, this.y, this.x2, this.y2);
    triangle(
      this.triX1,
      this.triY1,
      this.triX2,
      this.triY2,
      this.triX3,
      this.triY3
    );
  }
}

// Color pallete:
//https://coolors.co/a4036f-ff5a5f-048ba8-16db93-8de969-efea5a-ffc53a-f29e4c-99edcc-e8d6cb
