/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string}
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let res = [];
  let max = 0;
  for (const i of s) {
    const index = res.indexOf(i);
    if (index > -1) {
      res.splice(0, index + 1);
    }
    res.push(i);
    max = res.length > max ? res.length : max;
  }
  // string 不能用 forEach

  // for (let i = 0, len = s.length; i < len; i++) {
  //   const index = res.indexOf(s[i]);
  //   if (index > -1) {
  //     res = res.slice(0, index - 1);
  //   }
  //   res += s[i];
  // }
  return max;
};
// @lc code=end

// @after-stub-for-debug-begin
module.exports = lengthOfLongestSubstring;
// @after-stub-for-debug-end
