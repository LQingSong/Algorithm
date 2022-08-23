import { Node } from "./Node.mjs";

export const Colors = {
  RED: 0,
  BLACK: 1,
};

class RedBlackNode extends Node {
  constructor(key) {
    super(key);
    this.key = key;
    this.color = Colors.RED; // 节点颜色 默认插入节点是红色
    this.parent = null; // 指向父节点的引用，因为后面平衡的时候，需要更改祖先节点的颜色
  }

  isRed() {
    return this.color === Colors.RED;
  }
}

export { RedBlackNode };
