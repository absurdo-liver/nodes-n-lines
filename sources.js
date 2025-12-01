export const graphData = {
    nodes: [
        { id: "A", clicked: false, unclicked: true }, 
        { id: "B", clicked: false, unclicked: true }, 
        { id: "C", clicked: false, unclicked: true }, 
        { id: "D", clicked: false, unclicked: true }, 
        { id: "E", clicked: false, unclicked: true },
        { id: "F", clicked: false, unclicked: true }, 
        { id: "G", clicked: false, unclicked: true }, 
        { id: "H", clicked: false, unclicked: true }, 
        { id: "I", clicked: false, unclicked: true }, 
        { id: "J", clicked: false, unclicked: true }
    ],
    links: [
        { source: "A", target: "B" }, { source: "B", target: "C" },
        { source: "C", target: "D" }, { source: "D", target: "E" },
        { source: "E", target: "A" }, { source: "F", target: "G" },
        { source: "G", target: "H" }, { source: "H", target: "I" },
        { source: "I", target: "J" }, { source: "J", target: "F" },
        { source: "A", target: "J" }
    ]
};
