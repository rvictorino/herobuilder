let heroBuilder
let originNode, destNode, originX, originY, mouseMoved
const RADIUS = 15

function setup() {
  createCanvas(windowWidth, windowHeight)
  strokeWeight(4)

  heroBuilder = new HeroBuilder()
}


function draw() {
  background(255)

  if(originNode) {
    stroke(51)
    h = heroBuilder.getHoveredNode()
    if(h)
      stroke(h.color)
    line(originNode.pos.x, originNode.pos.y, mouseX, mouseY)
  }

  heroBuilder.draw()
}

function mousePressed() {
  originNode = heroBuilder.getHoveredNode()
  originX = mouseX
  originY = mouseY
}
function mouseReleased() {

  var clickedX = mouseX
  var clickedY = mouseY

  destNode = heroBuilder.getHoveredNode()

  mouseMoved = false
  if(originX != mouseX || originY != mouseY) {
    mouseMoved = true
  }
  var mouseOutOfCanvas = mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height
  if(!mouseMoved || mouseOutOfCanvas || heroBuilder.getHoveredLink() || !originNode || originNode == destNode) {
    originNode = false
    return
  }

  if(destNode) {
    // dragged from one node to another
    var linkText = prompt("Enter Link text")
    if(linkText)
      heroBuilder.linkNodes(originNode, destNode, linkText)
  } else {
    // dragged from one node to nowhere
    var linkText
    var nodeText = prompt("Enter Node text")
    if(nodeText)
      linkText = prompt("Enter Link text")
    if(linkText)
      heroBuilder.addLinkedNode(originNode,nodeText, linkText, clickedX, clickedY)
  }

  originNode = false
}


function mouseClicked() {

  var clickedX = mouseX
  var clickedY = mouseY

  if(mouseMoved)
    return
  var link = heroBuilder.getHoveredLink()
  var node = heroBuilder.getHoveredNode()
  if(link) {
    var linkText = prompt("Enter Link text")
    if(linkText)
    link.text = linkText
  } else if(node) {
    var nodeText = prompt("Enter Node text")
    if(nodeText)
      node.text = nodeText
  } else {
    var nodeText = prompt("Enter Node text")
    if(nodeText)
      heroBuilder.addNode(nodeText, clickedX, clickedY)
  }
  originNode = false
}
