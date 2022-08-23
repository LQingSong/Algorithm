/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  // 思考：
  // 1. 题目为什么要求返回移除后数组的新长度，而不是返回移除后的数组呢？
  // 2. 原地删除
  // 3. 元素的顺序可以改变

  // 另外一种双指针 交换的 方法，不过会改变元素的顺序

  // 最优解法：  双指针 换值 方法 fast 获取新数组中要的元素，慢指针把fast指针的值复制过来
  for (let fast = (slow = 0), len = nums.length; fast < len; fast++) {
    if (nums[fast] !== val) {
      nums[slow++] = nums[fast];
    }
  }
  return slow;
};
// @lc code=end
