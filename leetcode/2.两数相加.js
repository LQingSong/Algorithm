/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (List1, List2) {
  let tag = 0;
  let current1 = List1,
    current2 = List2;
  let node = new ListNode();
  const resRoot = node;

  while (current1 || current2 || tag !== 0) {
    let computerValue = 0;

    if (current1 && current2) {
      computerValue = current1.val + current2.val + tag;
    } else if (current1) {
      computerValue = current1.val + tag;
    } else if (current2) {
      computerValue = current2.val + tag;
    } else if (tag !== 0) {
      const newNode = new ListNode(tag);
      node.next = newNode;
      return resRoot.next;
    }
    tag = computerValue >= 10 ? 1 : 0;
    const nodeValue = computerValue % 10;
    const newNode = new ListNode(nodeValue);
    node.next = newNode;

    current1 = current1?.next;
    current2 = current2?.next;
    node = newNode;
  }
  return resRoot.next;
};
// @lc code=end

// @after-stub-for-debug-begin
module.exports = addTwoNumbers;
// @after-stub-for-debug-end
