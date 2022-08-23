/**
 * 选择排序
 *
 * 0 ~ n-1 找最小的数放到0位置
 * 1 ~ n-1 找最小的数放到1位置
 * 2 ~ n-1 找最小的数放到2位置
 * ...
 * i ~ n-1 找最小的数放到i位置
 *
 * 步骤:
 * 1. 找最小的数 minValue所在的位置
 * 2. minValue和i交换位置
 *
 * 时间复杂度：O(n²)
 * 空间复杂度：O(n)
 */
class Sort {
  static selectSort(arr) {
    if (!arr || arr.length < 2) {
      return;
    }
    const N = arr.length;
    for (let i = 0; i < N; i++) {
      let minValueIndex = i;
      for (let j = i + 1; j < N; j++) {
        minValueIndex = arr[j] < arr[minValueIndex] ? j : minValueIndex;
      }
      if (i !== minValueIndex) {
        this.swap(arr, i, minValueIndex);
      }
    }
  }
  static swap(arr, i, j) {
    const tmp = arr[j];
    arr[j] = arr[i];
    arr[i] = tmp;
  }
  static pintArr(arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
      //   process.stdout.write(arr[i]);
      // p.s.w只接受string类型的参数
      process.stdout.write(arr[i] + " ");
    }
    console.log();
  }
  static Console() {
    const arr = [6, 3, 4, 7, 2, 7, 5, 2];

    this.pintArr(arr);
    this.selectSort(arr);
    this.pintArr(arr);
  }
}

Sort.Console();
