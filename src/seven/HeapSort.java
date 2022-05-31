/**
 * Author: Liz
 * Date: 2022/5/29 18:47
 * Description
 */
public class HeapSort {

    public static void heapSort(int[] arr) {
        if (arr == null || arr.length < 2) return;
        // 先形成一个大根堆
        for (int i = 0; i < arr.length; i++) {
            heapInsert(arr, i); // 插入i，形成大根堆
        }
        int heapSize = arr.length;
        // 2. 交换堆顶和堆低的数
        swap(arr, 0, --heapSize);
        // 3. 经历heapify重新形成大根堆，再循环2和3
        // 直到整个堆都排序完
        while (heapSize > 0) {
            // 形成大根堆
            heapify(arr, 0, heapSize);
            // 交换
            swap(arr, 0, --heapSize);
        }
    }

    public static void heapInsert(int[] arr, int index) {
        // arr[0] == arr[(0-1)/2] 就不用while了
        while (arr[index] > arr[(index - 1)>>1]) {
            swap(arr, index, ((index-1)>>1)); // 交换index和root
            // 继续比较 index 和root的值
            index = (index - 1) >> 1;
        }
    }

    /**
     * 如果大根堆中某个节点的值变了
     */
    public static void heapify(int[] arr, int index, int heapSize) {
        int left = index << 1 + 1;
        // 没有越界，有左孩子
        while (left < heapSize) {
            // 比较左右孩子，得到大的那个下标
            int largest = left + 1 < heapSize && arr[left + 1] > arr[left] ? left + 1 : left;
            // 再判断root(index) 和 largest哪个大
            largest = arr[largest] > arr[index] ? largest : index;
            // 当largest == index 一样时，说明当前的root比它的子节点都大，就不再往下循环了
            if(largest == index) break;
            // 交换 root 和 largest，得到大根堆
            swap(arr, largest, index);
            // 继续向下看子节点是否比root大
            left = index << 1 + 1;
        }
    }

    public static void swap(int[] arr, int i, int j) {
        arr[i] ^= arr[j];
        arr[j] ^= arr[i];
        arr[i] ^= arr[j];
    }
}
