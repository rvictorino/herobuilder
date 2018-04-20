class HeroBuilder {

  constructor() {
    this.links = []
    this.nodes = []
    this.bounds = [createVector(0, 0), createVector(0,0)]
    this.nodes.push(new Node("Start",  width / 2, 50))
    this.calculateBounds()
  }

  addNode(text, x, y) {
    var node = new Node(text || `Node ${this.nodes.length+1}`,  x, y)
    node.color = this.getRandomColor()
    this.nodes.push(node)
    this.calculateBounds()
    return node
  }

  addLinkedNode(parentNode, nodeText, linkText, x, y) {
    var childNode = this.addNode(nodeText, x, y)
    var link = this.linkNodes(parentNode, childNode, linkText)
  }

  linkNodes(parentNode, childNode, linkText) {
    var link = new Link(linkText || `Link ${this.links.length+1}`, parentNode, childNode)
    this.links.push(link)
    childNode.linksFrom.push(link)
    parentNode.linksTo.push(link)
    return link
  }


  calculateBounds() {
    this.bounds[0].x = this.nodes.reduce( (a, b) => a.pos.x < b.pos.x ? a : b).pos.x - RADIUS
    this.bounds[1].x = this.nodes.reduce( (a, b) => a.pos.x > b.pos.x ? a : b).pos.x + RADIUS
    this.bounds[0].y = this.nodes.reduce( (a, b) => a.pos.y < b.pos.y ? a : b).pos.y - RADIUS
    this.bounds[1].y = this.nodes.reduce( (a, b) => a.pos.y > b.pos.y ? a : b).pos.y + RADIUS
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

  getHoveredNode() {
    for(var n of this.nodes) {
      if(n.withinBounds(mouseX, mouseY)) {
        return n
      }
    }
    return false
  }

  getHoveredLink() {
    for(var l of this.links) {
      if(l.withinBounds(mouseX, mouseY)) {
        return l
      }
    }
    return false
  }

  getRandomColor() { return color(`hsla(${map(floor(random(0, 10)), 0, 10, 0, 360)}, 85%, 50%, 1)`) }

  refresh() {

  }

  draw() {
    if(this.mouseOver()) {
      noFill()
      stroke(0, 255, 0)
      rect(this.bounds[0].x, this.bounds[0].y, this.bounds[1].x - this.bounds[0].x, this.bounds[1].y - this.bounds[0].y)
    }
    this.links.forEach(n => n.draw())
    this.nodes.forEach(n => n.draw())
  }
}
