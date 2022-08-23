import { Queue } from "./Queue.mjs";

const queue = new Queue();
queue.enqueue("b");
queue.enqueue("c");
queue.enqueue("d");
queue.enqueue("a");

console.log(queue.toString());
