package two;

/**
 * Author: Lqs
 * Date: 2022/5/22 15:21
 * Description
 */
public class SelectionSort {
    public static void selectSort(int[] arr) {
        if (arr == null || arr.length < 2) {
            return;
        }

        // 0 ~ n-1
        // 1 ~ n-1
        // 2 ~ n-1
        int N = arr.length;
        for (int i = 0; i < N; i++) {
            int minValueIndex = i;
            // i 往后所有的数看一遍
            for (int j = i + 1; j < N; j++) {
                minValueIndex = arr[j] < arr[minValueIndex] ? j : minValueIndex;
            }
            // 把i和最小值位置的数交换，交换完以后最小值就交换到最小值位置
            swap(arr, i, minValueIndex);
        }
    }

    public static void swap(int[] arr, int i, int j) {
        int tmp = arr[j];
        arr[j] = arr[i];
        arr[i] = tmp;
    }

    public static void printArray(int[] arr) {
        for (int i = 0; i < arr.length; ++i) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        int[] arr = { 6, 3, 4, 7, 2, 7, 5, 2, 6 };

        printArray(arr);
        selectSort(arr);
        printArray(arr);
    }
}
