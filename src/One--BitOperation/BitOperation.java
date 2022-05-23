/**
 * Author: Lqs
 * Date: 2022/5/22 14:59
 * Description
 */
public class BitOperation {
    static void print(int num) {
        for (int i = 31; i >= 0; i--) {
            System.out.print((num & (1 << i)) == 0 ? '0' : '1');
        }
        System.out.println();
    }

    public static void main(String[] args) {

        int a = Integer.MIN_VALUE;
        int b = ~a;
        print(a);
        print(b);
        System.out.println(b);

    }
}
