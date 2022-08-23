import { Graph } from "./Graph.mjs";

const graph = new Graph();
const vertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

vertices.forEach((item) => {
  graph.addVertex(item);
});

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "H");
graph.addEdge("D", "G");
graph.addEdge("E", "I");

console.log(graph.toString());

console.log("DFS");
const printVertex = (value) => console.log("Visited vertex: " + value);
graph.depthFirstSearch(printVertex);

console.log("================");
console.log("BFS");
graph.breadthFirstSearch(vertices[0], printVertex);
