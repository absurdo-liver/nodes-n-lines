
import { graphData } from './sources.js';

const graphContainer = document.getElementById("graph-container");

var customisation = {
  forceBehaviourCenter: 1,
}

let width = graphContainer.clientWidth;
let height = graphContainer.clientHeight || 400;

let svg, simulation, link, node, labels;


const render = () => {
  drawD3Graph(graphData.nodes, graphData.links);
};

function handleNodeClick(event, d) {
  d.clicked = !d.clicked;
  d.unclicked = !d.unclicked;

  console.log("Node clicked:", d.id);
  console.log(`Status: clicked=${d.clicked}, unclicked=${d.unclicked}`);
  
  d3.select(event.currentTarget).attr("fill", d.clicked ? "red" : "steelblue");
  exportEvent('nodeClickEvent', d)
}

function exportEvent(event, subject){
  const newEvent = new CustomEvent(event, {
    detail: {
      subject: subject,
      clicked: subject.clicked
    }
  });
  document.dispatchEvent(newEvent);
}


function handleResize() {
    width = graphContainer.clientWidth;
    height = graphContainer.clientHeight || 400;

    if (svg) {
        svg.attr("width", width).attr("height", height);
    }
    
    if (simulation) {
        simulation.force("center", d3.forceCenter(width / 2, height / 2));
        simulation.alpha(1).restart();
    }
}

window.addEventListener('resize', handleResize);


function drawD3Graph(nodesData, linksData) {
    graphContainer.innerHTML = '';
    
    svg = d3.select(graphContainer)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    if(customisation.forceBehaviourCenter){
        simulation = d3.forceSimulation(nodesData)
          .force("link", d3.forceLink(linksData).id(d => d.id).distance(100).strength(0.7)) 
          .force("charge", d3.forceManyBody().strength(-200)) 
          .force("center", d3.forceCenter(width / 2, height / 2))
          .force("forceX", d3.forceX(width / 2).strength(0.05))
          .force("forceY", d3.forceY(height / 2).strength(0.05))
          .on("tick", ticked);
    } else {
      simulation = d3.forceSimulation(nodesData)
          .force("link", d3.forceLink(linksData).id(d => d.id).distance(100).strength(0.7)) 
          .force("charge", d3.forceManyBody().strength(-200))
          .force("forceX", d3.forceX(width / 2).strength(0.05))
          .force("forceY", d3.forceY(height / 2).strength(0.05))
          .on("tick", ticked);
    }
    link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(linksData)
      .join("line");

    node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodesData)
      .join("circle")
        .attr("r", 10)
        .attr("fill", "steelblue")
        .on('click', handleNodeClick) 
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    labels = svg.append("g")
        .attr("class", "labels")
      .selectAll("text")
      .data(nodesData)
      .enter().append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .text(d => d.id)
        .style("pointer-events", "none");


    function ticked() {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
            
        labels
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    }

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null; 
      d.fy = null;
    }
}

render();

