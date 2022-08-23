import { Compare, defaultCompare } from "../Utils/index.mjs";
import { BinarySearchTree } from "./BinarySearchTree.mjs";
import { Colors, RedBlackNode } from "./ReadBlackNode.mjs";

/**
 * 红黑树 二叉搜索树
 * 1. 每个节点不是红的就是黑的
 * 2. 树的根节点都是黑的，叶子节点和null 都是黑
 * 3. 如果一个节点是红的，那么它的两个子节点都是黑的
 * 4. 不能有两个相邻的红节点，一个红节点不能有红的父节点或子节点; RED的父节点必定是Black
 * 5. 从给定的节点到它的后代节点的所有路径包含相同数量的黑色节点
 *
 * 默认插入的节点是红的
 */
class RedBlackTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
  }

  insert(key) {
    if (this.root === null) {
      // 根节点 黑色
      this.root = new RedBlackNode(key);
      this.root.color = Colors.BLACK;
    } else {
      const node = this.insertNode(this.root, key);
      this.fixTreeProperties(node);
    }
  }

  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // 插入左子树
      if (node.left === null) {
        node.left = new RedBlackNode(key);
        node.left.parent = node;
        return node.left;
      } else {
        return this.insertNode(node.left, key);
      }
    } else if (node.right === null) {
      // 插入右子树
      node.right = new RedBlackNode(key);
      node.right.parent = node;
      return node.right;
    } else {
      return this.insertNode(node.right, key);
    }
  }

  /**
   * 1. 先判断父节点是不是红色
   * 2. 再判断父节点在哪一侧
   * 3. 判断叔节点是什么颜色
   *  3.1 叔节点是红色，只需填色操作
   *  3.2 叔节点是黑色，需要 判断旋转类型 + 填色
   * 4. 最后保证根节点是黑色
   * @param {*} node
   */
  fixTreeProperties(node) {
    // AVL 的左右深度差1， 条件严格苛刻
    // 红黑树放宽了 平衡 的条件，只要 左右深度差1倍以内都是 '平衡的'
    // 树的搜索依赖于树的深度，如果有N个节点，二叉树的深度为 logN；
    // 红黑树假设有a个R节点和b个B节点，红黑树红节点最大能影响树的深度就是2倍（红黑交替出现），b个黑色节点的深度为logB，最差情况红黑树的深度2logB => O(logN),2是常数倍项，所以红黑树最终的时间复杂度依旧是O(logN)
    // 验证 node 的父节点是否是红色，以及这个节点是否不是黑色
    while (node && node.parent && node.parent.isRed() && node.isRed()) {
      let parent = node.parent;
      const grandParent = parent.parent;

      // 情形A: 父节点是左侧子节点
      if (grandParent && grandParent.left === parent) {
        const uncle = grandParent.right;

        // 情形1A:叔节点是红色 只需要重新填色 改变祖父节点、父节点、叔节点的颜色
        if (uncle && uncle.isRed()) {
          grandParent.color = Colors.RED;
          parent.color = Colors.BLACK;
          uncle.color = Colors.BLACK;
          node = grandParent; // 填色完后，将当前节点的引用指向祖父节点，进而继续检查树是否有其它冲突
        } else {
          // 叔节点颜色是黑色时，需要进行两次旋转操作 先情形2A，然后情形3A
          // 情形2A: 节点是右侧子节点 --- 左旋转 （LR型）
          if (node === parent.right) {
            this.rotationRR(parent);
            node = parent;
            parent = node.parent;
          }
          // 情形3A: 节点是左侧子节点 --- 右旋转 （LL型）
          this.rotationLL(grandParent);
          parent.color = Colors.BLACK;
          grandParent.color = Colors.RED;
          node = parent;
        }
      }
      // 情形B: 父节点是右侧子节点
      else {
        const uncle = grandParent.left;
        // 情形1B: 叔节点是红色 只需要重新填色
        if (uncle && uncle.isRed()) {
          grandParent.color = Colors.RED;
          parent.color = Colors.BLACK;
          uncle.color = Colors.BLACK;
          node = grandParent;
        } else {
          // 情形2B: 节点是左侧子节点 --- 右旋转 （RL型）
          if (node === parent.left) {
            this.rotationLL(parent);
            node = parent;
            parent = node.parent;
          }
          // 情形3B: 节点是右侧子节点 --- 左旋转 （RR型）
          this.rotationRR(grandParent);
          parent.color = Colors.BLACK;
          grandParent.color = Colors.RED;
          node = parent;
        }
      }
    }
    this.root.color = Colors.BLACK; // 保证根节点是黑色
  }

  // 红黑树的删除 比较复杂
  // 删除红节点对红黑树没有影响
  /**
   * 节点有三种可能： 叶子节点、单边节点、双边节点
   * 红黑树节点有两种颜色： 红色R & 黑色B
   * 节点和颜色的组合就有6种，其中红色单边的情况不可能
   * 组合1：被删除节点是红色叶子节点，直接删除即可
   * 组合2：被删除节点是黑色叶子节点，要考虑多种情形
   * 组合4：被删除的节点是黑色单边节点，直接删除,并用它的子节点替代
   * 组合5：被删除的节点是红色双边节点，找后继节点替代（在它的右子树中最小值），
   *   5.1：删除替代后的叶子节点，如果此时删除的节点是红色，就是组合1的情况，直接删除
   *   5.2：删除替代后的叶子节点，如果此时删除的节点是黑色，就是组合2的情况
   * 组合6：被删除的节点是黑色双边节点，找后继节点替代，
   *
   * 2-3-4树
   */
  remove(key) {
    // 先根据key找到对应的节点
    const node = super.search(key);
    if (node === null) {
      return null;
    }
    // 把删除节点原来的值 保存下来
    const oldValue = node.key;
    // 删除节点的方法
    this.removeNode(node);
    return oldValue;
  }

  /**
   * 删除节点
   * 1. 删除叶子节点
   * @param {*} node
   */
  removeNode(node) {}

  // 红黑树 只使用了 LL 和 RR 旋转 满足了它的四种情形的旋转
  // LL 型
  rotationLL(node) {
    const tmp = node.left;
    node.left = tmp.right;

    if (tmp.right && tmp.right.key) {
      tmp.right.parent = node; //
    }
    tmp.parent = node.parent;

    if (!node.parent) {
      this.root = tmp;
    } else {
      if (node === node.parent.left) {
        node.parent.left = tmp;
      } else {
        node.parent.right = tmp;
      }
    }

    tmp.right = node;
    node.parent = tmp;
  }

  rotationRR(node) {
    const tmp = node.right;
    node.right = tmp.left;

    if (tmp.left && tmp.left.key) {
      tmp.left.parent = node;
    }
    tmp.parent = node.parent;

    if (!node.parent) {
      this.root = tmp;
    } else {
      if (node === node.parent.left) {
        node.parent.left = tmp;
      } else {
        node.parent.right = tmp;
      }
    }

    tmp.left = node;
    node.parent = tmp;
  }
}

export { RedBlackTree };
