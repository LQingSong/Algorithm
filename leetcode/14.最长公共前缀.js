/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let res = "";
  for (let i = 0, len = strs.length; i < len; i++) {
    if (strs[i].length > 0) {
      res = strs[i];
      break;
    }
  }
  for (let i = 0, len = strs.length; i < len; i++) {
    if (res !== strs[i]) {
      const maxIndex = compare(res, strs[i]);
      res = res.slice(0, maxIndex);
    }
  }
  return res;
};

function compare(ref, sample) {
  let a = 0;
  while (a < ref.length && ref[a] === sample[a]) {
    a++;
  }
  return a;
}

// @lc code=end
