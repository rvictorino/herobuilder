class HeroBuilder {

  constructor() {
    this.links = []
    this.nodes = []
    this.bounds = [createVector(0, 0), createVector(0,0)]
    this.nodes.push(new Node("Start",  width / 2, 50))
    this.calculateBounds()
  }

  addNode(text) {
    this.nodes.push(new Node(text || `Node ${this.nodes.length+1}`,  mouseX, mouseY))
    this.calculateBounds()
  }

  addLinkedNode(parentNode, nodeText, linkText) {
    var childNode = new Node(nodeText || `Node ${this.nodes.length+1}`, mouseX, mouseY)
    var link = new Link(linkText || `Link ${this.links.length+1}`, parentNode, childNode)
    childNode.linkFrom.push(link)
    parentNode.linkTo.push(link)
    this.links.push(link)
    this.nodes.push(childNode)
    this.calculateBounds()
  }

  LinkNodes(parentNode, childNode, linkText) {
    var link = new Link(linkText || `Link ${this.links.length+1}`, parentNode, childNode)
    this.links.push(link)
    childNode.linkFrom.push(link)
    parentNode.linkTo.push(link)
  }


  calculateBounds() {
    this.bounds[0].x = this.nodes.reduce( (a, b) => a.pos.x < b.pos.x ? a : b).pos.x - 10
    this.bounds[1].x = this.nodes.reduce( (a, b) => a.pos.x > b.pos.x ? a : b).pos.x + 10
    this.bounds[0].y = this.nodes.reduce( (a, b) => a.pos.y < b.pos.y ? a : b).pos.y - 10
    this.bounds[1].y = this.nodes.reduce( (a, b) => a.pos.y > b.pos.y ? a : b).pos.y + 10
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

  refresh() {

  }

  draw() {
    if(this.mouseOver()) {
      noFill()
      stroke(0, 255, 0)
      rect(this.bounds[0].x, this.bounds[0].y, this.bounds[1].x - this.bounds[0].x, this.bounds[1].y - this.bounds[0].y)
    }
    this.nodes.forEach(n => n.draw())
    this.links.forEach(n => n.draw())
  }
}
