import { RedBlackTree } from "./RedBlackTree.mjs";
const rbt = new RedBlackTree();
rbt.insert(50);
rbt.insert(70);
rbt.insert(49);
rbt.insert(9);
rbt.insert(10);
rbt.insert(30);
rbt.insert(48);
rbt.insert(72);
rbt.insert(73);
rbt.insert(76);
rbt.insert(1);
rbt.insert(7);

const printNode = (value) => process.stdout.write(value + " ");
// 中序
console.log(rbt.inOrderTraverse(printNode));
// 前序
console.log(rbt.preOrderTraverse(printNode));
// 后序
console.log(rbt.postOrderTraverse(printNode));
console.log("----------------------");
rbt.remove(48);
console.log(rbt.inOrderTraverse(printNode));
// 前序
console.log(rbt.preOrderTraverse(printNode));
// 后序
console.log(rbt.postOrderTraverse(printNode));
