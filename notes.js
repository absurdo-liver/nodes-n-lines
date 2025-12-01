
// import { graphData } from './sources.js';

const test = document.createElement('p');
test.id = 'test1';
test.textContent = 'testing';
test.style.zIndex = '1';
test.style.position = 'absolute';
test.style.display = 'none';
document.body.appendChild(test);

var mousePos = {
  x: 0,
  y: 0
};

var clickedNodes = [];
let isNodeActive = false;

document.addEventListener('nodeClickEvent', handleNodeClick);
window.addEventListener('mousemove', handleMouseMove);

function handleNodeClick(e) {
  let nodeID = e.detail.subject; 
  let clicked = e.detail.clicked;

  if (clicked) {
    clickedNodes.push({ id: nodeID, clicked: clicked });
  } else {
    for (let i = 0; i < clickedNodes.length; i++) {
      if (clickedNodes[i].id === nodeID) {
        clickedNodes.splice(i, 1);
        break;
      }
    }
  }

  isNodeActive = clickedNodes.length > 0;
  if (isNodeActive) {
    test.style.display = 'block';
  } else {
    test.style.display = 'none';
  }
}

function handleMouseMove(e) {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
}

function updatePositionLoop() {
  if (isNodeActive) {
    test.style.top = `${mousePos.y}px`;
    test.style.left = `${mousePos.x}px`;
  }

  requestAnimationFrame(updatePositionLoop);
}

requestAnimationFrame(updatePositionLoop);
