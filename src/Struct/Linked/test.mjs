/**
 * 这里先简单用一下 node.js 对 原生ES模块的支持，正式项目里还是得用webpack、vite等
 * node --experimental-modules target.mjs
 * 使用这个方式的前提是文件的后缀都得是mjs
 */

import { LinkedList } from "./LinkedList.mjs";

const linkedList = new LinkedList();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.append(4);
linkedList.append(5);
linkedList.insert(0, 6);
linkedList.insert(7, 7);
console.log(linkedList.size());
console.log(linkedList.toString());
linkedList.removeAt(0);
console.log(linkedList.getElementAt(2));
console.log(linkedList.getElementAt(8));
linkedList.remove(7);
console.log(linkedList.toString());
console.log("1 indexOf", linkedList.indexOf(1));
linkedList.reverse();
console.log("reverse:", linkedList.toString());
