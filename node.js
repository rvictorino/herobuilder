class Node {

  constructor(text, x, y) {
    this.text = text || ""
    this.pos = createVector(x, y)
    this.bounds = [createVector(x-RADIUS, y-RADIUS), createVector(x+RADIUS, y+RADIUS)]
    this.linksFrom = []
    this.linksTo = []
    this.color = color(0)
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
    noStroke()
    fill(this.color)
    ellipse(this.pos.x, this.pos.y, RADIUS * 2)

    if(this.mouseOver()) {
      noFill()
      stroke(255, 0, 0)
      rect(this.bounds[0].x, this.bounds[0].y, this.bounds[1].x - this.bounds[0].x, this.bounds[1].y - this.bounds[0].y)
      fill(0)
      noStroke()
      text(this.text, this.bounds[1].x, this.bounds[1].y, 100, 100)
    }
  }

}
