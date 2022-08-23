/*
 * @lc app=leetcode.cn id=209 lang=javascript
 *
 * [209] 长度最小的子数组
 */

// @lc code=start
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  // 在正数数组中选出连续的数和 >= target的最少元素数组

  // 最优解：滑动窗口
  let result = Math.max;
  let sum = 0; // 子数组求和
  let i = 0; // 滑动窗口的起始位置
  // j 是滑动窗口的结束位置
  for (let j = 0, len = nums.length; j < len; j++) {
    sum += nums[j];
    // 当窗口内和 >= target时，就要考虑缩小窗口的大小
    while (sum >= target) {
      const subLength = j - i + 1; // 此时滑动窗口的大小
      result = result < subLength ? result : subLength;
      sum -= nums[i++]; // 不断调整窗口大小，sum减去相应的值，滑动窗口的起始位置向前移动
    }
  }
  return result === Math.max ? 0 : result; // 返回0就表示没找到
};
// @lc code=end
