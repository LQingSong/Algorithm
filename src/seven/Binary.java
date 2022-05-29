import java.util.Arrays;

/**
 * Author: Liz
 * Date: 2022/5/27 17:40
 * Description
 * 二分法
 */

public class Binary {

    /**
     * Case1: 在一个有序数组中，找某个数是否存在
     */
    public static boolean binaryCase1(int[] arr, int target) {
        if(arr == null || arr.length == 0) return false;

        int l = 0;
        int r = arr.length - 1;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (arr[mid] == target) {
                return true;
            } else if (arr[mid] < target) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return false;
    }

    /**
     * case2:
     * 在一个有序数组中，找>=某个数最左侧的位置
     * 3 5 6 6 7 9  target 6
     * return 2 >= 6的最左侧位置是下标2
     * 用直接for循环查找的方式最坏的情况是O(N)的
     * 因为是有序，用二分查找就能达到O(logN)
     */
    // O(N)的方式做比较器
    public static int noLessThan(int[] arr, int target) {
        if (arr == null || arr.length == 0) return -1;
        for(int i = 0, len = arr.length; i < len; i++ ) {
            if(arr[i] >= target) {
                return i;
            }
        }
        return -1;
    }

    public static int binaryNoLessThan(int[] arr, int target) {
        if (arr == null || arr.length == 0) return -1;
        int L = 0;
        int R = arr.length - 1;
        int res = -1;
        while (L <= R) {
            int mid = L + ((R- L)>>1);
            // arr[mid] >= target的时候还要继续二分，因为有可能重复的数字
            if (arr[mid] >= target) {
                res = mid;
                R = mid - 1;
            } else if(arr[mid] < target) {
                L = mid + 1;
            }
        }
        return  res;
    }

    // 对数器
    public static int[] generateArr(int maxSize, int maxValue) {
        int[] arr = new int[(int)((maxSize + 1) * Math.random())];
        for (int i = 0, len = arr.length; i < len; i++) {
            arr[i] = (int)((maxValue + 1)*Math.random()) - (int)((maxValue + 1) * Math.random());
        }
        return arr;
    }
    public static boolean comparator(int[] arr, int target) {
        for (int i = 0, len = arr.length; i < len; i++) {
            if (arr[i] == target) {
                return true;
            }
        }
        return false;
    }

    public static void printArr(int[] arr) {
        for (int i = 0, len = arr.length; i < len; i++) {
            System.out.print(arr[i] + ",");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 6, 7, 9};
        int testTime = 1000;
        int maxSize = 300;
        int maxValue = 300;
        boolean success = true;
        for (int i = 0; i < testTime; i++) {
            int[] testArr = generateArr(maxSize, maxValue);
            Arrays.sort(testArr);
            int target = (int)((maxValue + 1) * Math.random()) - (int)((maxValue + 1) * Math.random());
            if(binaryCase1(testArr, target) != comparator(testArr, target)){
                System.out.println("Case1失败了");
                System.out.println(binaryCase1(testArr, target));
                System.out.println(comparator(testArr, target));
                System.out.println(target);
                printArr(testArr);
                success = false;
                break;
            }
            if (binaryNoLessThan(testArr, target) != noLessThan(testArr, target)) {
                System.out.println("Case2失败了:");
                success = false;
                System.out.println("target: " + target);
                System.out.println(noLessThan(testArr, target));
                System.out.println(binaryNoLessThan(testArr, target));
                printArr(testArr);
                break;
            }
        }
        System.out.println(success ? "Nice!" : "Bad!");
        System.out.println(binaryNoLessThan(arr, 3));
        System.out.println(noLessThan(arr, 3));
        // System.out.println(comparator(arr,3) == binaryCase1(arr, 3));
    }
}
