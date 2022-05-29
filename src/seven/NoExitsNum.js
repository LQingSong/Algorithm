/**
 * 一个有序数组A，另一个无序数组B，请打印 B中所有 不在 A中的数。A数组的长度为N，B数组的长度为M。
 */
class NoExitsNum {
  /**
   * 暴力循环
   * @param {*} arrA
   * @param {*} arrB
   * @returns
   * 时间复杂度： O(M * N)
   */
  static f1(arrA, arrB) {
    let res = [];
    const N = arrA.length;
    const M = arrB.length;
    for (let i = 0; i < M; i++) {
      let exit = false;
      for (let j = 0; j < N; j++) {
        if (arrB[i] === arrA[j]) {
          exit = true;
          break;
        }
      }
      if (!exit) res.push(arrB[i]);
    }
    return res;
  }

  /**
   * 二分法
   * @param {*} arrA
   * @param {*} arrB
   * @returns
   * 时间复杂度： O(M*logN)
   */
  static f2(arrA, arrB) {
    const binarySearchExit = (arr, target) => {
      let l = 0;
      let r = arr.length - 1;
      while (l < r) {
        let mid = Math.floor(l + r) / 2;
        if (target < arr[mid]) {
          r = mid - 1;
        } else if (target === arr[mid]) {
          break;
        } else {
          l = mid + 1;
        }
      }
      return target;
    };

    let res = [];
    for (let i = 0, M = arrB.length; i < M; i++) {
      res.push(binarySearchExit(arrA, arrB[i]));
    }
    return res;
  }

  /**
   * arrB 先排序
   * 双指针
   * 时间复杂度 排序复杂度 + 双指针复杂度 =  O(m*logN) + O(N + M)
   * @param {*} arrA
   * @param {*} arrB
   */
  static f3(arrA, arrB) {
    let a = 0,
      b = 0;
    let res = [];
    while (arrA[a] && arrB[b]) {
      if (arrA[a] < arrB[b]) {
        a++;
      } else if (arrA[a] > arrB[b]) {
        b++;
      } else {
        res.push(arrB[b]);
        a++;
        b++;
      }
    }
    return res;
  }

  static print(a) {
    for (let i = 0; i < a.length; i++) {
      process.stdout.write(a[i] + " ");
    }
    console.log();
  }

  static Console() {
    const A = [1, 2, 4, 7, 9];
    const B = [3, 6, 9];
    this.print(this.f1(A, B));
    this.print(this.f3(A, B));
  }
}

NoExitsNum.Console();
