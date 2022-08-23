import { AVLTree } from "./AVLTree.mjs";

const avl = new AVLTree();

avl.insert(50);
avl.insert(30);
avl.insert(70);
avl.insert(10);
avl.insert(40);
avl.insert(5);

const printNode = (value) => process.stdout.write(value + " ");
avl.inOrderTraverse(printNode);
