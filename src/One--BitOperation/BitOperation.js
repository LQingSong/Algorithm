/**
 * 位运算
 * 计算机底层所有运算均是二进制的
 *
 * JS只有Number一种数字类型，是53位的 正数 2的53次方-1；负数 -(2的53次方-1)
 *
 * 以Java int 32位为例
 * 正数(0 ~ 2的31次方 - 1)
 * 负数（-1 ~ -2的32次方）
 * 最高位以 0 表示正数 1表示负数
 * 负数的二进制 = 正数的反码 + 1， 这样定义的原因是可以使底层 正数和负数运算可以走一套逻辑
 *
 * 二进制                                                十进制
 * 0000 0000 0000 0000 0000 0000 0000 0001     =>         1
 * 1111 1111 1111 1111 1111 1111 1111 1110 （补码） + 1
 * 1111 1111 1111 1111 1111 1111 1111 1111     =>        -1
 *
 * 位运算 & | ^ !
 *
 * 通过 ^ 异或位运算交换 a和b两个数的值
 *
 * 左移 <<
 * 右移 >>
 *
 * 0 取反是 ~1
 */
class BitOPeration {
  /**
   * print bit 打印二进制
   * 通过 & 与位运算 num & 1 << i 保留 是1的位
   * @param {*} num
   */
  static print(num) {
    for (let i = 31; i >= 0; i--) {
      process.stdout.write((num & (1 << i)) === 0 ? "0" : "1");
      if (i % 4 === 0) {
        process.stdout.write(" ");
      }
    }
  }

  static Console() {
    //   console.log("js number max:", Number.MAX_SAFE_INTEGER);
    /**
     * 打印二进制
     */
    // const a = 2;
    // this.print(a);
    /**
     * 异或位运算交换a和b的值
     */
    // let a = 1;
    // let b = 2;
    // a = a ^ b;
    // b = b ^ a;
    // a = a ^ b;
    // console.log(a);
    // console.log(b);
    /**
     * 正数取反 加 1 = 负数
     */
    // const a = 5;
    // const d = ~a + 1;
    // console.log(d);
  }
}

BitOPeration.Console();
