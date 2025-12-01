// import { graphData } from './sources.js';

var clickedNodes = [];
var nodesMap = new Map(); 
let isNodeActive = false;

document.addEventListener('nodeClickEvent', handleNodeClick);

function handleNodeClick(e) {
  let nodeID = e.detail.subject; 
  let clicked = e.detail.clicked;
  let position = e.detail.position; 

  if (clicked) {
    clickedNodes.push(nodeID);
    createText(nodeID, position); 
  } else {
    const index = clickedNodes.indexOf(nodeID);
    if (index > -1) {
      clickedNodes.splice(index, 1);
    }
    removeText(nodeID);
  }

  isNodeActive = clickedNodes.length > 0;
}

function createText(nodeID, position){
  if (nodesMap.has(nodeID)) return;

  const newElem = document.createElement('p');
  newElem.id = nodeID + 'text';
  newElem.textContent = nodeID;
  newElem.style.zIndex = '1';
  newElem.style.position = 'absolute';
  newElem.style.display = 'block'; 
  newElem.style.transform = 'translate(-50%, -50%)';
  document.body.appendChild(newElem);
  
  nodesMap.set(nodeID, { obj: newElem, pos: position }); 
}

function removeText(nodeID) {
  const entry = nodesMap.get(nodeID);
  if (entry) {
    document.body.removeChild(entry.obj);
    nodesMap.delete(nodeID);
  }
}


function updatePositionLoop() {
  if (isNodeActive) {
    nodesMap.forEach((entry, nodeID) => {
        entry.obj.style.top = `${entry.pos.y}px`;
        entry.obj.style.left = `${entry.pos.x}px`;
    });
  }

  requestAnimationFrame(updatePositionLoop);
}

requestAnimationFrame(updatePositionLoop);
