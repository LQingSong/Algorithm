class _Node {
  _next = null;
  val: Number;
  constructor(val: Number) {
    this.val = val;
  }
}

/**
 * 反转单链表
 * @param head
 * @returns
 */
function reverseLinked(head: _Node) {
  let pre = new _Node(null);
  let next = new _Node(null);

  while (head != null) {
    next = head._next;
    head._next = pre;
    pre = head;
    head = next;
  }
  return pre;
}

const n1 = new _Node(1);
console.log(n1);

const n2 = new _Node(2);
n1._next = n2;
const n3 = new _Node(3);
n2._next = n3;

const linked = reverseLinked(n1);
console.log(linked);
