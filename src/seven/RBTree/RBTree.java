package RBTree;

/**
 * Author: Liz
 * Date: 2022/8/12 11:44
 * Description
 */
public class RBTree {
    private static final boolean RED = false;
    private static final boolean BLACK = true;

    private RBNode root;

    public RBNode getRoot() {
        return root;
    }

    private void leftRotation(RBNode p) {
        if (p != null) {
            RBNode pr = p.right;
            pr.parent = p.parent;
            pr.left = p;
            p.parent = pr;
            if (p.parent == null) {
                root = pr;
            } else if(p.parent.left == p) {
                p.parent.left = pr;
            } else {
                p.parent.right = pr;
            }
            if (pr.left != null) {
                p.left = pr.left;
            }
        }
    }

    private void rightRotation(RBNode p) {
    }

    static class RBNode<K extends Comparable<K>, V> {
        private RBNode parent;

        private RBNode left;

        private RBNode right;

        private boolean color;

        private K key;

        private V value;

        public RBNode() {
        }

        public RBNode(RBNode parent, RBNode left, RBNode right, boolean color, K key, V value) {
            this.parent = parent;
            this.left = left;
            this.right = right;
            this.color = color;
            this.key = key;
            this.value = value;
        }

        public RBNode(K key, V value, RBNode parent) {
            this.parent = parent;
            this.key = key;
            this.value = value;
        }

        public RBNode getParent() {
            return parent;
        }

        public void setParent(RBNode parent) {
            this.parent = parent;
        }

        public RBNode getLeft() {
            return left;
        }

        public void setLeft(RBNode left) {
            this.left = left;
        }

        public RBNode getRight() {
            return right;
        }

        public void setRight(RBNode right) {
            this.right = right;
        }

        public boolean isColor() {
            return color;
        }

        public void setColor(boolean color) {
            this.color = color;
        }

        public K getKey() {
            return key;
        }

        public void setKey(K key) {
            this.key = key;
        }

        public V getValue() {
            return value;
        }

        public void setValue(V value) {
            this.value = value;
        }
    }
}
