class Link {

  constructor(text, parentNode, childNode) {
    this.parentNode = parentNode
    this.childNode = childNode
    this.text = text || ""
    this.bounds = [createVector((parentNode.pos.x + childNode.pos.x) / 2 - 10, (parentNode.pos.y + childNode.pos.y) / 2 - 10),
      createVector((parentNode.pos.x + childNode.pos.x)/ 2 + 10, (parentNode.pos.y + childNode.pos.y) / 2 + 10)]
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
    line(this.parentNode.pos.x, this.parentNode.pos.y, this.childNode.pos.x, this.childNode.pos.y)
  }
}
