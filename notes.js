import { nodesTextData as defaultNodesTextData } from './sources.js'; 

var activeNodeId = null; 

const notesContainer = document.createElement('div');
notesContainer.id = 'notes-container';
notesContainer.style.position = 'absolute';
notesContainer.style.bottom = '20px';
notesContainer.style.right = '20px';
notesContainer.style.width = '300px';
notesContainer.style.height = '200px';
notesContainer.style.backgroundColor = 'white';
notesContainer.style.border = '1px solid #ccc';
notesContainer.style.padding = '10px';
notesContainer.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
notesContainer.style.display = 'none'; 
document.body.appendChild(notesContainer);

const notesHeader = document.createElement('h4');
notesHeader.id = 'notes-header';
notesHeader.textContent = 'Notes for Node: ';
notesContainer.appendChild(notesHeader);

const notesTextarea = document.createElement('textarea');
notesTextarea.id = 'notes-textarea';
notesTextarea.style.width = '100%';
notesTextarea.style.height = 'calc(100% - 40px)'; 
notesTextarea.style.resize = 'none';
notesTextarea.placeholder = 'Type your notes here...';
notesTextarea.addEventListener('input', saveNote); 
notesContainer.appendChild(notesTextarea);


function initializeNotesStorage() {
    Object.keys(defaultNodesTextData).forEach(nodeId => {
        const storageKey = `node-notes-${nodeId}`;
        if (localStorage.getItem(storageKey) === null) {
            localStorage.setItem(storageKey, defaultNodesTextData[nodeId]);
        }
    });
}
initializeNotesStorage();


document.addEventListener('nodeClickEvent', handleNodeClick);

function handleNodeClick(e) {
  let nodeID = e.detail.subject; 
  let clicked = e.detail.clicked;

  if (clicked) {
    activeNodeId = nodeID; 
    notesHeader.textContent = `Notes for Node: ${nodeID}`;
    loadNote(nodeID);
    notesContainer.style.display = 'block'; 
    notesTextarea.focus(); 
  } else {
    if (activeNodeId === nodeID) {
        saveNote();
        notesContainer.style.display = 'none';
        activeNodeId = null;
    }
  }
}

function saveNote() {
    if (activeNodeId) {
        const noteContent = notesTextarea.value;
        localStorage.setItem(`node-notes-${activeNodeId}`, noteContent);
    }
}

function loadNote(nodeID) {
    const savedNote = localStorage.getItem(`node-notes-${nodeID}`);
    notesTextarea.value = savedNote || ''; 
}
