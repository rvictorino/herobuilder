class Node {

  constructor(text, x, y) {
    this.text = text || ""
    this.pos = createVector(x, y)
    this.bounds = [createVector(x-10, y-10), createVector(x+10, y+10)]
    this.linksFrom = []
    this.linksTo = []
  }


  withinBounds(x, y) {
    return x > this.bounds[0].x
      && y > this.bounds[0].y
      && x < this.bounds[1].x
      && y < this.bounds[1].y
  }

  mouseOver() {
    return this.withinBounds(mouseX, mouseY)
  }

  draw() {
    if(this.mouseOver()) {
      noFill()
      stroke(255, 0, 0)
      rect(this.bounds[0].x, this.bounds[0].y, this.bounds[1].x - this.bounds[0].x, this.bounds[1].y - this.bounds[0].y)
      fill(0)
      noStroke()
      text(this.text, this.bounds[1].x, this.bounds[1].y, 100, 100)
    }
    stroke(0)
    fill(0)
    ellipse(this.pos.x, this.pos.y, 20)
  }

}
