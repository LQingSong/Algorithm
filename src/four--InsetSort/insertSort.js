/**
 * 插入排序
 *
 * 0 ~ 0 一个数时必定有序
 * 0 ~ 1 0到1位置，在1位置左边有数，如果左边的数比当前1位置的数大，就把1位置和左边的数交换位置，完成0~1排序
 * 0 ~ 2 在2的位置，左边有数，如果左边的数大于当前2位置的数，就把2位置和1位置交换；如果交换完，还是有坐边的数且左边的数还大，就继续交换
 * ...
 * 0 ~ N-1 直到排完N个数
 *
 * end在变化，所以用第一层循环控制N个数的插入排序
 * 内层while循环，检查左边的数是否都比右边的数小，一个一个的比较做交换，直到左边没数为止
 *
 * 时间复杂度: O(N²)
 * 空间复杂度：O(N²)
 *
 */
class InsertSort {
  static insertSort(arr) {
    if (!arr || arr.length < 2) return;

    const N = arr.length;
    // 0 ~ 1  如果1比0位置的数小，交换
    // 0 ~ 2  如果2比前面1位置的数小，交换；如果1位置比0位置小，再交换
    // 0 ~ N-1
    for (let end = 1; end < N; end++) {
      let curNumIndex = end;

      // 左边有数，并且左边的数比当前数大，就交换
      while (curNumIndex - 1 >= 0 && arr[curNumIndex - 1] > arr[curNumIndex]) {
        this.swap(arr, curNumIndex - 1, curNumIndex);
        curNumIndex--;
      }
    }
  }

  static insertSortFor(arr) {
    if (!arr || arr.length < 2) return;

    const N = arr.length;

    for (let end = 1; end < N; end++) {
      // pre 是当前位置的前一个位置 pre >=0 前一个存在（没有越界） 并且 前一个数大于前一个数的后一个数，就将这两个数交换，pre--
      for (let pre = end - 1; pre >= 0 && arr[pre] > arr[pre + 1]; pre--) {
        this.swap(arr, pre, pre + 1);
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
    this.insertSortFor(arr);
    this.print(arr);
  }
}

InsertSort.Console();
