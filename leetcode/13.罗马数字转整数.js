/*
 * @lc app=leetcode.cn id=13 lang=javascript
 *
 * [13] 罗马数字转整数
 */

// @lc code=start
/**
 * 就是根据题意简单做就行，只需要判断罗马数字大小，如果后面的数比前面一个大，就需要做减法
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  const map = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let res = map[s[0]];
  for (let i = 1, len = s.length; i < len; i++) {
    if (map[s[i]] > map[s[i - 1]]) {
      res += map[s[i]] - map[s[i - 1]] - map[s[i - 1]];
    } else {
      res += map[s[i]];
    }
  }
  return res;
};
// @lc code=end
