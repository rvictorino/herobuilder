let heroBuilder
let originNode, destNode, originX, originY

function setup() {
  createCanvas(400, 400)

  heroBuilder = new HeroBuilder()
}


function draw() {
  background(255)

  if(originNode) {
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
  destNode = heroBuilder.getHoveredNode()

  if(mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height || heroBuilder.getHoveredLink()) {
    originNode = false
    return
  }

  if(originNode && destNode && originNode != destNode) {
    // dragged from one node to another
    var linkText = prompt("Enter Link text")
    if(linkText)
      heroBuilder.LinkNodes(originNode, destNode, linkText)
  } else if(originNode && !destNode) {
    // dragged from one node to nowhere
    var linkText
    var nodeText = prompt("Enter Node text")
    if(nodeText)
      linkText = prompt("Enter Link text")
    if(linkText)
      heroBuilder.addLinkedNode(originNode,nodeText, linkText)
  } else if(!originNode && !destNode && originX == mouseX && originY == mouseY) {
    // empty click
    var nodeText = prompt("Enter Node text")
    if(nodeText)
      heroBuilder.addNode(nodeText)
  }
  originNode = false
}


function mouseClicked() {
  var link = heroBuilder.getHoveredLink()
  if(link) {
    link.text = prompt("Enter Link text")
  }
}
