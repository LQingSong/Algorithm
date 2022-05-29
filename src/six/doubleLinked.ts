class DoubleNode {
  pre = null;
  last = null;
  val: Number;
  constructor(val: Number) {
    this.val = val;
  }
}

const dn1 = new DoubleNode(1);
const dn2 = new DoubleNode(2);
dn1.last = dn2;
dn2.pre = dn1;
const dn3 = new DoubleNode(3);
dn2.last = dn3;
dn3.pre = dn2;

function reverseDLinked(head: DoubleNode) {
  let pre = new DoubleNode(null);
  let next = new DoubleNode(null);

  while (head != null) {
    next = head.last;
    head.pre = next;
    head.last = pre;
    pre = head;
    head = next;
  }
  return pre;
}
console.log("反转前:", dn1);
console.log("反转后:", reverseDLinked(dn1));
