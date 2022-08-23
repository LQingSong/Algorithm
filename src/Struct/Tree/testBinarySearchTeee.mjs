import { BinarySearchTree } from "./BinarySearchTree.mjs";

const bst = new BinarySearchTree();
bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(20);
bst.insert(12);
bst.insert(14);
bst.insert(18);
bst.insert(25);
bst.insert(6);

const printNode = (value) => process.stdout.write(value + " ");
// 中序遍历
console.log("中序遍历");
bst.inOrderTraverse(printNode);
console.log("\n先序遍历");
// 先序遍历
bst.preOrderTraverse(printNode);
console.log("\n后序遍历");
bst.postOrderTraverse(printNode);

console.log("25 是否存在", bst.search(25));
console.log("32 是否存在", bst.search(32));
bst.remove(15);
bst.inOrderTraverse(printNode);

console.log();
console.log("========Display Tree======");
bst.toString();
