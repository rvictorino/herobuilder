class Link {

  constructor(text, parentNode, childNode) {
    this.parentNode = parentNode
    this.childNode = childNode
    this.text = text || ""
    this.bounds = [createVector((parentNode.pos.x + childNode.pos.x) / 2 - RADIUS, (parentNode.pos.y + childNode.pos.y) / 2 - RADIUS),
      createVector((parentNode.pos.x + childNode.pos.x)/ 2 + RADIUS, (parentNode.pos.y + childNode.pos.y) / 2 + RADIUS)]
    this.pos = this.calculatePoints()
  }

  withinBounds(x, y) {
    return x > this.bounds[0].x
      && y > this.bounds[0].y
      && x < this.bounds[1].x
      && y < this.bounds[1].y
  }

  calculatePoints() {
    // angleMode(RADIANS)
    // var theta1 = this.parentNode.pos.angleBetween(this.childNode.pos)
    // var theta2 = this.childNode.pos.angleBetween(this.parentNode.pos)
    // console.log(theta1)
    // var point1 = createVector(this.parentNode.pos.x + RADIUS * cos(theta1), this.parentNode.pos.y + RADIUS * sin(theta1))
    // var point2 = createVector(this.childNode.pos.x + RADIUS * cos(theta2), this.childNode.pos.y + RADIUS * sin(theta2))
    // return [point1, point2]
  }

  mouseOver() {
    return this.withinBounds(mouseX, mouseY)
  }


  draw() {
    noFill()
    stroke(this.childNode.color)
    line(this.parentNode.pos.x, this.parentNode.pos.y, this.childNode.pos.x, this.childNode.pos.y)

    // ellipse(this.pos[1].x, this.pos[1].y, 5)

    if(this.mouseOver()) {
      stroke(255, 0, 0)
      rect(this.bounds[0].x, this.bounds[0].y, this.bounds[1].x - this.bounds[0].x, this.bounds[1].y - this.bounds[0].y)

      fill(0)
      noStroke()
      text(this.text, this.bounds[1].x, this.bounds[1].y, 100, 100)
    }
  }
}
