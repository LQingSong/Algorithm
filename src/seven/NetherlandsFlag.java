/**
 * Author: Liz
 * Date: 2022/5/29 17:28
 * Description
 */
public class NetherlandsFlag {
    /**
     * 荷兰国旗问题
     * 时间复杂度 O(n)
     * 额外空间复杂度 O(1)
     */
    public static int[] partition(int[] arr, int L, int R, int num) {
        int less = L - 1;
        int more = R + 1;
        while (L < more) {
            if (arr[L] < num) {
                // 当前数和less下一个位置交换，当前数++
                swap(arr, ++less, L++);
            } else if (arr[L] > num) {
                // 当前数和more区域的前一个位置交换，当前数不动
                swap(arr, --more, L);
            } else {
                // 相等时，当前数++
                L++;
            }
        }
        // 返回了等于区域的左边界和右边界
        return new int[] {less+1, more - 1};
    }
    public static void swap(int[] arr, int i, int j) {
        arr[i] = arr[i] ^ arr[j];
        arr[j] = arr[j] ^ arr[i];
        arr[i] = arr[j] ^ arr[i];
    }
}
