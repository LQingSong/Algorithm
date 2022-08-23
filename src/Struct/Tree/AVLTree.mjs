import { Compare, defaultCompare } from "../Utils/index.mjs";
import { BinarySearchTree } from "./BinarySearchTree.mjs";
import { Node } from "./Node.mjs";

const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5,
};

/**
 * 自平衡二叉树（也是一种二叉搜索树）
 */
class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
  }

  // 计算一个节点的高度
  getNodeHeight(node) {
    if (node === null) {
      return -1;
    }
    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
  }

  // 计算一个节点的平衡因子
  getBalanceFactor(node) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  // LL 型 向右转 中为支，高位右转
  // node 是 平衡因子 绝对值 === 2
  // 最后返回平衡操作后的根节点 tmp
  rotationLL(node) {
    const tmp = node.left;
    node.left = tmp.right;
    tmp.right = node;
    return tmp;
  }

  // RR型 向左转 中为支，高位左转
  rotationRR(node) {
    const tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    return tmp;
  }

  // LR型
  rotationLR(node) {
    node.left = this.rotationRR(node.left); // 先 下位整体向左转 RR => 就变成了 LL型
    return this.rotationLL(node); // 遵循LL型的向右转
  }

  // RL 型
  rotatioRL(node) {
    node.right = this.rotationLL(node.right); // 先 下位整体向右转 LL => 就变成了 RR型
    return this.rotationRR(node); // 遵循RR型向左转
  }

  insert(key) {
    this.root = this.insertNode(this.root, key);
  }

  /**
   * AVL 插入节点：
   * 1. 插入节点
   * 2. 计算node平衡因子，找出平衡因子绝对值为2的node（不平衡的点）
   * 3. 再判断离插入key最近的不平衡子树是哪种情形：LL、RR、LR 或 RL,执行相应的旋转操作
   * 4. 最后返回平衡后的node
   * @param {*} node
   * @param {*} key
   * @returns
   */
  insertNode(node, key) {
    // 1. 先插入节点
    if (node === null) {
      return new Node(key);
    } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key);
    } else {
      return node; // 重复的键
    }

    // 2. 计算平衡因子
    const balanceFactor = this.getBalanceFactor(node);

    // 3. 再判断具体的类型
    // L
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      // 情形1 LL 确定是左子树不平衡
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        // 再判断是左子树的哪部分不平衡
        node = this.rotationLL(node); // LL 型 中为支，高位右转
      } else {
        // LR
        return this.rotationLR(node);
      }
    }
    // R
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      // R
      if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        node = this.rotationRR(node);
      } else {
        // L
        return this.rotatioRL(node);
      }
    }
    // 4.
    return node;
  }

  removeNode(node, key) {
    // 1. 先删除节点
    node = super.removeNode(node, key);
    // 删除节点后，要判断树是不是平衡的
    if (node === null) {
      return node; // 不需要进行平衡
    }
    // 2. 计算平衡因子, 找到平衡因子绝对值为 2 的node
    const balanceFactor = this.getBalanceFactor(node);
    // 3、L 平衡因子 === 2 左子树不平衡
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      // 计算左子树节点平衡因子 判断是哪种类型的不平衡
      const balanceFactorLeft = this.getBalanceFactor(node.left);
      // LL 型
      if (
        balanceFactorLeft === BalanceFactor.BALANCED ||
        balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return this.rotationLL(node);
      }
      // LR 型
      if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotationLR(node.left);
      }
    }
    // 平衡因子 得出 右子树不平衡 R
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      // 再计算 右子树的平衡因子
      const balanceFactorRight = this.getBalanceFactor(node.right);
      // RR
      if (
        balanceFactorRight === BalanceFactor.UNBALANCED_RIGHT ||
        balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return this.rotationRR(node);
      }
      // RL
      if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotatioRL(node.right);
      }
    }
    return node;
  }
}

export { AVLTree };
