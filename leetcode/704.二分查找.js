/*
 * @lc app=leetcode.cn id=704 lang=javascript
 *
 * [704] 二分查找
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0;
  // 1. 定义target在[left, right]左闭右闭的空间, 每次查找在左闭右闭的区间内
  // 左闭右闭 right = nums.length
  //   let right = nums.length - 1;
  // 左闭右闭 用 <=
  //   while (left <= right) {
  //     const middle = left + ((right - left) >> 1);
  //     if (nums[middle] > target) {
  //       right = middle - 1; // 左闭右闭 right = middle - 1
  //     } else if (nums[middle] < target) {
  //       left = middle + 1; // 左闭右闭 left = middle + 1
  //     } else {
  //       return middle;
  //     }
  //   }

  // 2. 定义target在一个[left, right) 左闭右开的区间，每次查找在左闭右开的区间去查找
  // 左闭右开， right = nums.length
  let right = nums.length;
  // 左闭右开，用 <
  while (left < right) {
    const middle = left + ((right - left) >> 1);
    if (nums[middle] > target) {
      right = middle; // 左闭右开 right = middle
    } else if (nums[middle] < target) {
      left = middle + 1; // 左闭右开[left, right) left = middle + 1
    } else {
      return middle;
    }
  }
  return -1;
};
// @lc code=end
