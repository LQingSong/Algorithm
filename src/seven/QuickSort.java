/**
 * Author: Liz
 * Date: 2022/5/29 17:44
 * Description
 */
public class QuickSort {
    public static void quickSort(int[] arr) {
        if(arr == null || arr.length < 2) return;
        quickSortProcess(arr, 0, arr.length - 1);
    }
    public static void quickSortProcess(int[] arr, int L, int R) {
        if (L < R) {
            // 随机[L, R]上一个位置和R位置交换
            swap(arr, L+(int)((R-L+1)*Math.random()), R);
            // [...|p0,p1|...]
            int[] p = partition(arr, L, R);
            quickSortProcess(arr, L, p[0] - 1);
            quickSortProcess(arr, p[1] + 1, R);
        }
    }
    // 以arr最后一个位置做划分，返回等于arr[R]的左边界和右边界
    public static int[] partition(int[] arr, int L , int R) {
        int less = L - 1;
        int more = R;
        while (L < more) {
            if(arr[L] < arr[R]) {
                swap(arr, ++less, L++);
            } else if(arr[L] > arr[R]) {
                swap(arr, --more, L);
            } else {
                L++;
            }
        }
        // R位置一开始不参与划分，最后让它归位
        // 荷兰问题那里是因为有一个num，所以more = R + 1;
        // 快排是直接拿最后一个数当成num,所以more = R;
        // 相比较荷兰问题省了一个变量num
        swap(arr, more, R);
        return new int[] { less + 1, more};
    }
    public static void swap(int[] arr, int i, int j) {
        arr[i] = arr[i] ^ arr[j];
        arr[j] = arr[j] ^ arr[i];
        arr[i] = arr[i] ^ arr[j];
    }
}
