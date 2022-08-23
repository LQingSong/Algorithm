import { Node } from "./Node.mjs";

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  append(element) {
    const node = new Node(element);

    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
  }

  insert(position, element) {
    if (position > -1 && position <= this.length + 1) {
      const node = new Node(element);
      let current = this.head;

      if (position === 0) {
        node.next = this.head;
        this.head = node;
      } else if (position === this.length - 1) {
        while (current.next) {
          current = current.next;
        }
        current.next = node;
      } else {
        let index = 0;
        while (current.next && index++ < position) {
          current = current.next;
        }
        node.next = current.next;
        current.next = node;
      }

      this.length++;
    }
  }

  remove(element) {
    const index = this.indexOf(element);
    this.removeAt(index);
  }

  removeAt(position) {
    if (position > -1 && position < this.length) {
      let current = this.head;
      if (position === 0) {
        this.head = current.next;
      } else {
        let index = 0;
        let prev = null;
        // 遍历找到position
        while (current && index++ < position) {
          prev = current;
          current = current.next;
        }
        prev.next = current.next;
      }
      this.length--;
      return current.element;
    }
    return undefined;
  }

  reverse() {
    let current = this.head;
    let prev = null;
    while (current) {
      let next = current.next; // 保留原先的next联系

      // 进行指针反转
      current.next = prev;
      prev = current;

      current = next; // 指向原先下一个
    }
    this.head = prev;
  }

  getElementAt(index) {
    let current = this.head;
    let i = 0;
    while (current && i++ < index) {
      current = current.next;
    }
    return current?.element || null;
  }

  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.length; i++, current = current.next) {
      if (current.element === element) {
        return i;
      }
    }
    return -1;
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }

  // 把linkedList对象转换成一个字符串
  toString() {
    let res = "";
    let current = this.head;
    while (current) {
      res += current.element;
      if (current.next) {
        res += " -> ";
      }
      current = current.next;
    }

    return res;
  }
}

export { LinkedList };
