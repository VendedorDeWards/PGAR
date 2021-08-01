/* 

// TODO: Future implementation?? inheritance
class Figure {
  constructor(displayMethod, displayProps) {

  }

  display() {

  }
}
 */

class Point {
  constructor(x, y, style) {
    this.x = x;
    this.y = y;
    this.style = style;
  }

  display() {
    stroke(...this.style.color);
    fill(...this.style.color);
    strokeWeight(this.style.strokeWeight);
    point(this.x, this.y);
  }
}

class Cross {
  constructor(x, y, size, style) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.style = style;

    this.x1 = Math.round(x - size / 2);
    this.y1 = Math.round(y - size / 2);
    this.x2 = Math.round(x + size / 2);
    this.y2 = Math.round(y + size / 2);
  }

  display() {
    stroke(...this.style.color);
    fill(...this.style.color);
    strokeWeight(this.style.strokeWeight);

    line(this.x1, this.y1, this.x2, this.y2);
    line(this.x1, this.y2, this.x2, this.y1);
  }
}

class Line {
  constructor(x1, y1, x2, y2, style) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.style = style;
  }

  display() {
    stroke(...this.style.color);
    fill(...this.style.color);
    strokeWeight(this.style.strokeWeight);

    line(this.x1, this.y1, this.x2, this.y2);
  }
}

// TODO: implement vector from module and direction that has x2 and y2 and vector from x2 and y2 that has module and direction in same class

class Vector {
  constructor(x, y, modulus, direction, arrowSide, style) {
    this.x = x;
    this.y = y;
    this.modulus = modulus;
    this.dir = degToRad(direction);
    this.arrowSide = arrowSide;
    this.style = style;

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
    stroke(...this.style.color);
    fill(...this.style.color);
    strokeWeight(this.style.strokeWeight);

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

class Button {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  display() {
    stroke(...this.color);
    fill(...this.color);
    strokeWeight(0);
    rect(this.x, this.y, this.w, this.h);
  }

  static createButtons(qty) {
    const colors = [
      [164, 3, 111],
      [4, 139, 168],
      [22, 219, 147],
      [239, 234, 90],
      [242, 158, 76],
    ]; // https://coolors.co/a4036f-048ba8-16db93-efea5a-f29e4c
    //https://coolors.co/a4036f-ff5a5f-048ba8-16db93-8de969-efea5a-ffc53a-f29e4c-99edcc-e8d6cb

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
}
