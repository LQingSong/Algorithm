import { Dictionary } from "../Collection/Dictionary.mjs";
import { Queue } from "../Queue/Queue.mjs";

const Colors = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2,
};

/**
 * 以邻接表的形式来创建图
 */
class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected; // 默认是无向图
    this.vertices = [];
    // 以字典来存储邻接表
    this.adjList = new Dictionary();
  }

  addVertex(v) {
    // 判断顶点是否已经存在
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }

  addEdge(v, w) {
    // 如果邻接表中不存在顶点V
    if (!this.adjList.get(v)) {
      this.addVertex(v);
    }
    // 如果邻接表中不存在顶点w
    if (!this.adjList.get(w)) {
      this.addVertex(w);
    }
    // 将w放入 v 后边的列表
    this.adjList.get(v).push(w);

    // 无向图，就要在w的列表中追加v
    if (!this.isDirected) {
      this.adjList.get(w).push(v);
    }
  }

  // 返回所有的顶点
  getVertices() {
    return this.vertices;
  }

  // 返回邻接表
  getAdjList() {
    return this.adjList;
  }

  initializeColor(vertices) {
    const color = {};
    vertices.forEach((v) => {
      color[v] = Colors.WHITE;
    });
    return color;
  }

  breadthFirstSearch(startVertex, callback) {
    const color = this.initializeColor(this.vertices);

    const queue = new Queue(); // 1. 用队列来存储待访问和待探索的顶点
    queue.enqueue(startVertex); // 2. 将开始顶点入队

    // 如果队列非空，就说明顶点未访问完，继续访问
    while (!queue.isEmpty()) {
      const u = queue.dequeue(); // 3. 取出队列元素、出队

      color[u] = Colors.GREY; // 3.1 标记顶点u被访问

      const neighbors = this.adjList.get(u); // 3.2 获取出队元素的相邻顶点

      // 4. 将所有未被访问的顶点（颜色是白色的）入队
      for (let i = 0, len = neighbors.length; i < len; i++) {
        const w = neighbors[i];
        if (color[w] === Colors.WHITE) {
          color[w] = Colors.GREY;
          queue.enqueue(w);
        }
      }

      // 5. 该出队顶点所有的相邻顶点入队后，标记该顶点为完全被访问
      color[u] = Colors.BLACK; // 顶点u完全被访问
      if (callback) {
        callback(u);
      }
    }
  }

  depthFirstSearch(callback) {
    const color = this.initializeColor(this.vertices); // 记录所有顶点的颜色

    for (let i = 0, len = this.vertices.length; i < len; i++) {
      if (color[this.vertices[i]] === Colors.WHITE) {
        // 从第一个未被访问的节点作为第一个访问顶点
        this.depthFirstSearchVisit(this.vertices[i], color, this.adjList, callback);
      }
    }
  }

  depthFirstSearchVisit(v, color, adjList, callback) {
    color[v] = Colors.GREY; // 1. 标记访问过了
    if (callback) {
      callback(v);
    }
    const neighbors = adjList.get(v); // 2. 获取相邻顶点
    // 3. 递归访问没有被访问的相邻顶点
    for (let i = 0, len = neighbors.length; i < len; i++) {
      const w = neighbors[i];
      // 还未被访问
      if (color[w] === Colors.WHITE) {
        this.depthFirstSearchVisit(w, color, adjList, callback);
      }
    }
    // 4. 最后标记
    color[v] = Colors.BLACK; // 标记完全被探索过
  }

  toString() {
    let s = "";
    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} --> `;
      const neighbors = this.adjList.get(this.vertices[i]);
      for (let j = 0; j < neighbors.length; j++) {
        s += ` ${neighbors[j]}`;
      }
      s += "\n";
    }
    return s;
  }
}

export { Graph };
