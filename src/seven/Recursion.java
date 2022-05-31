/**
 * Author: Liz
 * Date: 2022/5/29 15:20
 * Description
 */
public class Recursion {
    /**
     * Case1求最大值
     * @return
     * 用到了递归
     * O(n) = 2O(n / 2) + O(N^1)
     * 时间复杂度 O(N*logN)
     */
    public static int getMax(int[] arr) {
        return getMaxProcess(arr, 0, arr.length - 1);
    }
    public static int getMaxProcess(int[] arr, int L, int R) {
        // 递归结束条件，当只剩下一个数时，它就是最大值
        if(L == R) {
            return arr[L];
        }
        int mid = L + ((R-L)>>1);
        int maxLeft = getMaxProcess(arr, L, mid);
        int maxRight = getMaxProcess(arr, mid + 1, R);
        return Math.max(maxLeft, maxRight);
    }

    /**
     * case2 归并排序
     * 时间复杂度 O(N*logN)
     * 额外空间复杂度 O(N)
     */
    public static void mergeSort(int[] arr) {
        if(arr == null || arr.length < 2) return;
        sortProcess(arr, 0, arr.length-1);
    }
    public static void sortProcess(int[] arr, int L, int R) {
        if(L == R) {
            return;
        }
        int mid = L + ((R-L)>>1);
        sortProcess(arr, L, mid);
        sortProcess(arr, mid + 1, R);
        merge(arr, L, mid, R);
    }
    public static void merge(int[] arr, int L, int mid, int R) {
        int[] help = new int[R - L + 1];
        int i = 0;
        int p1 = L;
        int p2 = mid + 1;
        // p1 p2 都没越界
        while (p1 <= mid && p2 <= R) {
            help[i++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++];
        }
        // 判断哪个还没越界，将剩余的数拷贝进help数组
        while (p1 <= mid) {
            help[i++] = arr[p1++];
        }
        while (p2 <= R) {
            help[i++] = arr[p2++];
        }
        // 再将辅助数组拷贝回原数组
        for (int j = 0; j < help.length; j++) {
            arr[L+j] = help[j];
        }
    }

    /**
     * case3:小和问题
     *
     */
    public static int samllSum(int[] arr) {
        if (arr == null || arr.length < 2) return 0;
        return samllSumProcess(arr, 0, arr.length - 1);
    }
    public static int samllSumProcess(int[] arr, int L, int R) {
        if (L == R) return 0;
        int mid = L + ((R-L)>>1);
        return samllSumProcess(arr, L, mid) + samllSumProcess(arr, mid + 1, R)
                + samllSumMerge(arr, L, mid, R);
    }
    public static int samllSumMerge(int[] arr, int L, int mid, int R) {
        int[] help = new int[R - L + 1];
        int i = 0;
        int p1 = L;
        int p2 = mid + 1;
        int res = 0;
        while (p1 <= mid && p2 <= R) {
            res += arr[p1] < arr[p2] ? (R - p2 + 1) * arr[p1] : 0;
            help[i++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++];
        }
        while (p1 <= mid) {
            help[i++] = arr[p1++];
        }
        while (p2 <= R) {
            help[i++] = arr[p2++];
        }
        for (int j = 0; j < help.length; j++) {
            arr[L + j] = help[j];
        }
        return res;
    }
    // 对数器
    public static int[] generateArr(int maxSize, int maxValue) {
        int size = (int)((maxSize + 1) * Math.random()); // [1, maxsize]
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = (int)((maxValue + 1) * Math.random()) - (int)((maxValue + 1) * Math.random());
        }
        return arr;
    }

    public static int compartor(int[] arr) {
        int maxValue = -1;
        for (int i = 0, len = arr.length; i < len; i++) {
            if (arr[i] >= maxValue) {
                maxValue = arr[i];
            }
        }
        return maxValue;
    }

    public static void print(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + ",");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        int testTime = 1000;
        int maxSize = 100;
        int maxValue = 100;
        boolean success = true;
        int[] testArr = generateArr(maxSize, maxValue);
        for (int i = 0; i < testTime; i++) {
            if (getMax(testArr) != compartor(testArr)) {
                System.out.println("失败了");
                print(testArr);
                System.out.println("getMax:" + getMax(testArr));
                System.out.println("compartor:" + compartor(testArr));
            }
        }
        System.out.println(success ? "Nice!" : "Bad!");
        int[] arr = {2,1,0, 19,10,11,8};
        mergeSort(arr);
        print(arr);

        int[] arr3 = {1, 3, 4, 2, 5};
        System.out.println(samllSum(arr3));
    }
}
