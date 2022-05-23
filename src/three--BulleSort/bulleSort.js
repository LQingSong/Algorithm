/**
 * 冒泡排序
 *
 * 0 ~ N-1 相邻两个数之间比较大小，交换位置，大的放后面，最大的数就冒泡到N-1的位置
 * 0 ~ N-2 第二大的数冒泡到N-2的位置
 * 0 ~ N-3 第三大的数冒泡到N-3的位置
 * ...
 * 0 ~ i   第i大的数冒泡到N-i的位置
 *
 * 最外层循环控制一共需要N层冒泡才可以排完
 * 内层循环控制两两相邻数之间比较交换
 *
 * 时间复杂度：O(n²)
 * 空间复杂度：O(n) swap函数创建tmp对象
 */
class BulleSort {
  static bulleSort(arr) {
    if (!arr || arr.length < 2) return;

    const N = arr.length;
    // 0 ~ N-1
    // 0 ~ N-2
    // 0 ~ end
    for (let end = N - 1; end >= 0; end--) {
      // 0 ~ end 上 交换
      // 0 1、 1 2、 2 3、 ... end-1 end
      for (let second = 1; second <= end; second++) {
        if (arr[second - 1] > arr[second]) {
          this.swap(arr, second - 1, second);
        }
      }
    }
  }

  static swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  static print(arr) {
    arr.forEach((item) => {
      process.stdout.write(item + " ");
    });
    console.log();
  }

  static Console() {
    const arr = [6, 3, 4, 7, 2, 7, 5, 2];

    this.print(arr);
    this.bulleSort(arr);
    this.print(arr);
  }
}

BulleSort.Console();
