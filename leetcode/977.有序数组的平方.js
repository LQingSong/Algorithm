/*
 * @lc app=leetcode.cn id=977 lang=javascript
 *
 * [977] 有序数组的平方
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  // 将递增整数(负、正)数组每个数平方，并且最终数组也是递增顺序
  // 不使用库函数

  // 最佳解法：双指针（左右指针）
  let res = [];
  const len = nums.length;
  let currentTimes = len;
  // 一次只能一个指针，要么left、要么right
  for (let left = 0, right = len - 1; left <= right; ) {
    currentTimes--;
    if (Math.abs(nums[left]) > Math.abs(nums[right])) {
      res[currentTimes] = nums[left++] ** 2;
    } else {
      res[currentTimes] = nums[right--] ** 2;
    }
  }
  return res;
};
// @lc code=end
