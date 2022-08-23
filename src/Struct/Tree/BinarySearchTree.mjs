import { Compare, defaultCompare } from "../Utils/index.mjs";
import { Node } from "./Node.mjs";

/**
 * 二叉搜索树
 * 左子节点 < root <= 右子节点
 */
class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn; // 用来比较节点值
    this.root = null;
  }

  insert(key) {
    if (this.root === null) {
      // 1. 先判断树 root 是不是空，为空就创建一个树节点作为根节点
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  // 将节点插入除根节点以外的其它节点
  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // 左子树
      if (node.left === null) {
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else {
      // 右子树
      if (node.right === null) {
        node.right = new Node(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }

  // 查找一个key 是否存在
  search(key) {
    return this.searchNode(this.root, key);
  }

  searchNode(node, key) {
    if (node === null) {
      return false;
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key);
    } else {
      return true;
    }
  }

  // 中序遍历 从小到大的访问所有节点
  /**
   * 接收一个回调函数作为参数
   * @param {*} callback
   * 回调函数用来定义我们对遍历到的每个节点进行的操作 ==== 访问者模式
   */
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }

  inOrderTraverseNode(node, callback) {
    // 递归的基线条件，判断node是否不为null
    if (node !== null) {
      this.inOrderTraverseNode(node.left, callback); // 递归访问左子树
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback); // 递归访问右子树
    }
  }

  // 先序遍历
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }

  preOrderTraverseNode(node, callback) {
    if (node !== null) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }

  // 后序遍历
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }

  postOrderTraverseNode(node, callback) {
    if (node !== null) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }

  min() {
    return this.minNode(this.root);
  }
  // 递归遍历 找到最后一个左子节点
  minNode(node) {
    let current = node;
    while (current !== null && current.left !== null) {
      current = current.left;
    }
    return current;
  }

  max() {
    return this.maxNode(this.root);
  }

  maxNode(node) {
    let current = node;
    while (current !== null && current.right !== null) {
      current = current.right;
    }
    return current;
  }

  remove(key) {
    this.root = this.removeNode(this.root, key);
  }

  removeNode(node, key) {
    if (node === null) {
      return null;
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // 如果要找的键比当前节点的值小，就沿着左子树继续往下找
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      // 如果要找的键比当前节点的值大，就沿着右子树继续往下找
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      // key 等于 node.key，找到了要找的键，就要处理下面三种情况

      // 第一种情况 key是一个叶子节点时
      if (node.left === null && node.removeNode === null) {
        node = null;
        return node; // 父节点指向它的指针也会接收到这个值，这也就是为什么要在函数中返回节点的值
      }
      // 第二种情况 key 是一个仅有左子树或仅有右子树的一个节点，在这种情况下移除该节点，就需要将父节点指向它的子节点
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      // 第三种情况 key 拥有两个子节点 替换删除，最后删除aux这个叶节点
      // 移除有两个子节点的节点，需要执行四个步骤
      // 步骤1可以找前驱节点 maxNode(node.left) 也可以找后继节点minNode(node.right)
      const aux = this.minNode(node.right); // 步骤1：找到key右子树最小的节点; 因为节点有两个子节点，根据二叉搜索树的性质root<右子树，所以这个节点必存在node的右子树中；所以这一步操作找的是右子树中最小的节点
      node.key = aux.key; // 步骤2： 用右子树中最小的节点更新当前key节点的值
      node.right = this.removeNode(node.right, aux.key); // 步骤3： 然后再将右侧字数的那个最小节点（替换后的）移除
      return node; // 步骤四：向它的父节点返回更新后节点的引用
    }
  }

  toString() {
    const arr = [];
    const callback = (value) => arr.push(value);
    this.preOrderTraverse(callback);

    const deep = Math.floor(arr.length / 2);
    this.printTree(this.root, deep);
  }

  printTree(node, deep) {
    if (node !== null) {
      const SPACE = 5;
      const currentSpace = (deep - 1) * SPACE - Math.pow(2, deep - 1);
      for (let i = currentSpace - 1; i > 0; i--) {
        process.stdout.write("-");
      }
      process.stdout.write(node.key + "");
      deep--;
      this.printTree(node.left, deep);
      this.printTree(node.right, deep);
    }
  }
}

export { BinarySearchTree };
