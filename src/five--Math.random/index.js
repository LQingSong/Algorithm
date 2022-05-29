class Ramdom {
  static Console() {
    const testTimes = 100000;
    let count = 0;
    for (let i = 0; i < testTimes; ++i) {
      if (Math.random() < 0.35) {
        count++;
      }
    }

    // 等概率
    count = 0;
    for (let i = 0; i < testTimes; i++) {
      if (Math.random() * 8 < 4) {
        count++;
      }
    }
    console.log(count / testTimes);
    console.log(4 / 8);
    console.log("======================");
    const k = 9;
    // const ans = Number.parseInt(Math.random() * k); // [0, k-1];
    const arr = new Array(9).fill(null);

    for (let i = 0; i < testTimes; i++) {
      const ans = Number.parseInt(Math.random() * k); // [0, k-1];
      arr[ans]++;
    }
    for (let i = 0; i < k; i++) {
      console.log(i + "这个数，出现了" + arr[i] + "次");
    }
    console.log("==============");
    const q = 0.14;
    let times = 0;
    for (let i = 0; i < testTimes; i++) {
      if (this.xToPower2() < q) {
        times++;
      }
    }
    console.log(times / testTimes);
    console.log(Math.pow(q, 2));

    console.log("=============");
    const w = 0.3;
    let wTimes = 0;
    for (let i = 0; i < testTimes; i++) {
      if (this.minPower() < w) {
        wTimes++;
      }
    }
    console.log(wTimes / testTimes);
    console.log(1 - Math.pow(1 - w, 2));

    console.log("===========");
    count = 0;
    for (let i = 0; i < testTimes; i++) {
      if (this.f2() === 0) {
        count++;
      }
    }
    console.log(count / testTimes);
  }

  static xToPower2() {
    return Math.max(Math.random(), Math.random());
  }

  static minPower() {
    return Math.min(Math.random(), Math.random());
  }

  /**
   *
   * @returns [1, 5]
   */
  static fn() {
    return Number.parseInt(Math.random() * 5) + 1;
  }
  /**
   * 将fn转成了等概率[0, 1]
   * @returns
   */
  static f2() {
    let ans = 0;
    do {
      ans = this.fn();
    } while (ans === 3);
    return ans < 3 ? 0 : 1;
  }
}

Ramdom.Console();
