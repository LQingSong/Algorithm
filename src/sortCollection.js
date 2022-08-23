/**
 * 所有排序均实现为递增序列
 */

function swap(arr, i, j) {
  arr[i] ^= arr[j];
  arr[j] ^= arr[i];
  arr[i] ^= arr[j];
}

function randomArray(maxLen = 10, maxValue) {
  const arrLen = Math.ceil(Math.random() * maxLen);
  const arr = [];
  for (let i = 0; i < arrLen; i++) {
    arr.push(Math.round((Math.random() - 0.5) * 2 * maxValue));
  }
  return arr;
}

function checker(arr, sortFn) {
  const finalRes = Object.assign([], arr).sort((a, b) => a - b);
  const ans = sortFn(Object.assign([], arr));
  for (let i = 0, len = ans.length; i < len; i++) {
    if (finalRes[i] !== ans[i]) {
      console.log("ans is error, origin", arr);
      console.log("expect:", finalRes);
      console.log("your ans is:", ans);
      return;
    }
  }
  console.log("ans is true!!!", ans);
}

const originData = randomArray(10, 120);

// Bubble sort
function BubbleSort(arr) {
  if (!arr || arr.length < 2) {
    return arr;
  }
  const len = arr.length;
  let flag = false;
  for (let times = len - 1; times >= 0; times--) {
    for (let index = 1; index <= times; index++) {
      if (arr[index - 1] > arr[index]) {
        swap(arr, index - 1, index);
        flag = true; // 表示有换位
      }
    }
    if (!flag) break;
  }
  return arr;
}

// Insert sort
function InsertSort(arr) {
  if (!arr || arr.length < 2) {
    return arr;
  }

  for (let current = 1, len = arr.length; current < len; current++) {
    while (current - 1 >= 0 && arr[current - 1] > arr[current]) {
      swap(arr, current - 1, current);
      current--;
    }
  }
  return arr;
}

function InsertSort2(arr) {
  if (!arr || arr.length < 2) {
    return arr;
  }

  for (let current = 1, len = arr.length; current < len; current++) {
    for (let pre = current - 1; pre >= 0 && arr[pre] > arr[pre + 1]; pre--) {
      swap(arr, pre, pre + 1);
    }
  }
  return arr;
}

// Shell Sort
// 在 Insert Sort 的基础上增加增量的概念 gap = Math.floot(gap /= 2)
function ShellSort(arr) {
  if (!arr || arr.length < 2) {
    return arr;
  }
  for (let N = arr.length, gap = (N / 2) >>> 0; gap > 0; gap = (gap / 2) >>> 0) {
    for (let i = gap; i < N; i++) {
      let current = i;
      while (current - gap >= 0 && arr[current] < arr[current - gap]) {
        swap(arr, current - gap, current);
        current -= gap;
      }
    }
  }
  return arr;
}

// Select Sort
function SelectSort(arr) {
  if (!arr || arr.length < 2) {
    return arr;
  }

  for (let i = 0, len = arr.length; i < len; i++) {
    let minValueIndex = i;
    for (let j = i + 1; j < len; j++) {
      minValueIndex = arr[j] < arr[minValueIndex] ? j : minValueIndex;
    }
    if (minValueIndex !== i) {
      swap(arr, i, minValueIndex);
    }
  }
  return arr;
}

// Quick Sort
// 分治 找基准，先分后合
function QuickSort(arr) {
  if (!arr || arr.length < 2) return arr;
  const partition = (arr, L, R) => {
    if (L >= R) return;
    // 随机选择一个基准数 [L, R] [0, 5]
    const pivotIndex = Math.floor(Math.random() * (R - L + 1)) + L;
    // 切记不要跟自己交换
    if (pivotIndex != L) {
      swap(arr, pivotIndex, L);
    }
    const pivot = arr[L];
    let l = L;
    let r = R;
    while (l < r) {
      while (l < r && arr[r] >= pivot) {
        r--;
      }
      while (l < r && arr[l] <= pivot) {
        l++;
      }
      if (l != r) {
        swap(arr, l, r);
      }
    }
    if (L != l) {
      // L == l 说明只剩基准值了
      swap(arr, L, l);
    }
    return l;
  };
  const quick = (arr, L, R) => {
    if (L < R) {
      const index = partition(arr, L, R);
      quick(arr, L, index - 1);
      quick(arr, index + 1, R);
    }
  };
  quick(arr, 0, arr.length - 1);
  return arr;
}

// Heap Sort
function HeapSort(arr) {
  if (!arr || arr.length < 2) {
    return arr;
  }

  // 构造大根堆
  const buildHeap = (arr) => {
    for (let i = 0, len = arr.length; i < len; i++) {
      let index = i;
      // arr[i] 和 它的父节点(i-1) >> 1 作比较
      while (index > 0 && arr[index] > arr[Math.floor((index - 1) >> 1)]) {
        swap(arr, index, Math.floor((index - 1) >> 1));
        index = Math.floor((index - 1) >> 1);
      }
    }
  };

  const heapify = (arr, index, heapSize) => {
    let left = (index << 1) + 1;
    let root = index;
    while (left < heapSize) {
      let largest = left + 1 < heapSize && arr[left + 1] > arr[left] ? left + 1 : left;
      largest = arr[largest] > arr[root] ? largest : root;
      if (largest == root) break;
      swap(arr, largest, root);

      root = largest;
      left = (left << 1) + 1;
    }
  };
  // 1. 先将无序序列构造成堆
  buildHeap(arr);

  let heapSize = arr.length;

  while (heapSize > 1) {
    // 2. 交换堆顶和堆底的元素
    swap(arr, 0, --heapSize);
    // 3. 将剩下的元素重新调整为堆
    heapify(arr, 0, heapSize);
  }

  return arr;
}

// Count Sort
function CountSort(arr) {
  if (!arr || arr.length < 2) {
    return arr;
  }
  // 找出最大值, 以便确定创建多少的桶
  const len = arr.length;
  let arrMaxVal = arr[len - 1];
  for (let i = 0; i < len; i++) {
    arrMaxVal = arr[i] > arrMaxVal ? arr[i] : arrMaxVal;
  }

  const bucketArrLen = arrMaxVal + 1;
  const bucketArr = new Array(bucketArrLen).fill(0);

  // 计数
  for (let i = 0; i < len; i++) {
    bucketArr[arr[i]] += 1;
  }

  // 取出每个'桶'里的数
  let sortedIndex = 0;
  for (let i = 0; i < bucketArrLen; i++) {
    while (bucketArr[i]-- > 0) {
      arr[sortedIndex++] = i;
    }
  }
  return arr;
}

// Bucket Sort
function BucketSort(arr) {
  if (!arr || arr.length < 2) {
    return arr;
  }
  let bucket = [],
    res = [];

  // 建立桶的映射关系
  arr.forEach((value, key) => {
    if (!bucket[value]) {
      bucket[value] = [key];
    } else {
      bucket[value].push(key);
    }
  });

  // 遍历桶
  for (let i = 0; i < bucket.length; i++) {
    if (bucket[i]) {
      res.push(...bucket[i]);
    }
  }
  return res;
}

// checker(originData, HeapSort);

// const testArr = [24, 39, 103, -37, 105, -25, 105, -59, -25, 64, -36];
const testArr = [2, 3, 5, 6, 1];

BucketSort(testArr);
console.log(testArr);
