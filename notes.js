// import { graphData } from './sources.js';

var clickedNodes = [];
var nodesMap = new Map();
let isNodeActive = false;

document.addEventListener('nodeClickEvent', handleNodeClick);
document.addEventListener('graphUpdateEvent', handleGraphUpdate);

function handleNodeClick(e) {
  let nodeID = e.detail.subject; 
  let clicked = e.detail.clicked;
  let position = e.detail.position; 

  if (clicked) {
    if (!nodesMap.has(nodeID)) {
       clickedNodes.push(nodeID); 
       createText(nodeID, position);
    }
  } else {
    const index = clickedNodes.indexOf(nodeID);
    if (index > -1) {
      clickedNodes.splice(index, 1);
    }
    removeText(nodeID);
  }

  isNodeActive = clickedNodes.length > 0;
}

function handleGraphUpdate(e) {
    const updatedPositions = e.detail.positions;
    
    updatedPositions.forEach(pos => {
        const entry = nodesMap.get(pos.id);
        if (entry) {
            entry.pos.x = pos.x;
            entry.pos.y = pos.y;
        }
    });
}


function createText(nodeID, position){
  const newElem = document.createElement('p');
  newElem.id = nodeID + 'text';
  newElem.textContent = nodeID;
  newElem.style.zIndex = '1';
  newElem.style.position = 'absolute';
  newElem.style.display = 'block';
  newElem.style.transform = 'translate(-200%, -200%)';
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
    nodesMap.forEach((entry) => {
        entry.obj.style.top = `${entry.pos.y}px`;
        entry.obj.style.left = `${entry.pos.x}px`;
    });
  }

  requestAnimationFrame(updatePositionLoop);
}

requestAnimationFrame(updatePositionLoop);
