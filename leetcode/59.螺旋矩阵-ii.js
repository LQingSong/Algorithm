/*
 * @lc app=leetcode.cn id=59 lang=javascript
 *
 * [59] 螺旋矩阵 II
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  let res = new Array(n).fill(0).map(() => new Array(n).fill(0)); // 二维矩阵
  let startX = 0,
    startY = 0; // 定义每次循环一个圈的起始位置
  let loop = Math.floor(n / 2); // 需要循环几个圈
  let mid = Math.floor(n / 2); // 矩阵中间位置，当n为奇数的时候需要对中间位置特殊赋值
  let count = 1; // 计数
  let offset = 1; // 每一圈循环都需要控制每条边遍历的长度 n - offset

  while (loop--) {
    let i = startX,
      j = startY;
    // 第一条边 1 -> 2
    for (; j < startY + n - offset; j++) {
      res[i][j] = count++;
    }
    // 第二条边 3 -> 4
    for (; i < startX + n - offset; i++) {
      res[i][j] = count++;
    }
    // 第三条边 5 -> 6
    for (; j > startY; j--) {
      res[i][j] = count++;
    }
    // 第四条边 7 -> 8
    for (; i > startX; i--) {
      res[i][j] = count++;
    }

    // 第一圈循环完，第二圈开始，startX 和 startY 都需要加1
    startX++;
    startY++;

    // offset 需要加2
    offset += 2;
  }
  // 最后如果n是奇数，需要对中间位置赋值
  if (n % 2 !== 0) {
    res[mid][mid] = count;
  }
  return res;
};
// @lc code=end
