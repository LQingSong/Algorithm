### 数组

- 数组的静态方法

  - Array.isArray() 可以用来检测一个对象是否是数组
  - Array.from() 通过可迭代对象创建一个数组

- includes() 查找是否存在某个元素，存在返回 true，否则返回 false
- indexOf() & lastIndexOf() 匹配第一个 & 匹配最后一个，找到了返回对应的索引，没找到返回 -1

- toString() 返回数组的字符串形式，去掉[]
- valueOf() 返回原数组

- splice & slice 都能截取数组，splice 改变原数组，slice 不改变原数组(创建一个新数组)

  - splice(start, count) 截取下标[start, start+count] slice(start, end) 截取下标[start, end);
  - splice 还可以添加元素 splice(start, count, a, b, c,...) 移除[start, start+count]之后再添加[a,b,c,...]

- push() & pop() 尾部插入 & 尾部删除
- unshift() & shift() 头部插入 & 头部删除

- 不生成新数组的迭代器方法,直接影响原数组

  - forEach(), 该方法接收一个函数作为参数，对数组中的每个元素使用该函数;
  - every(), 该方法接收一个返回值为布尔类型的函数，对数组中的每个元素使用该函数，如果所有的元素均返回 true，则该方法返回 true;
  - some(), 该方法接收一个返回值为布尔类型的函数，对数组中的每个元素使用该函数，只要有一个元素返回 true，则该方法返回 true;
  - reduce(), 该方法接收一个函数作为参数，返回一个值；该方法会从一个累加值开始，不断对累加值和数组中的后续元素调用该函数，直到数组中的最后一个元素，最后返回得到的累加值；
    - reduceRight(), 和 reduce 功能一样，但是是从右到左执行。

- 生成新数组的迭代器方法，不影响原数组

  - map(), 和 forEach() 有点像, 该方法接收一个函数作为参数，对数组中的每个元素使用该函数，两者的区别是 map()返回一个新的数组，该数组的元素是对原有元素应用该函数得到的结果；
  - filter(), 和 every() 类似，该方法接收一个返回值为布尔类型的函数，和 every()不同的是当对数组中的所有元素应用该函数，结果均为 true 时，该方法并不返回 true，而是返回一个新数组，该数组包含应用该函数后结果为 true 的元素;

- 数组拷贝

  - 方法 1：点扩展运算符 const newArray = [...oldArray]
  - 方法 2：Array.from()
  - 方法 3：slice(), const newArray = oldArray.slice()
    **在 js 中，所有标准的内置对象拷贝操作,如 点扩展运算符，数组中的 concat()、slice()、from() 以及 Object.assign() 都属 Shallow copy 浅拷贝** - 在浅拷贝中，如果是将一个值赋值给数组的元素 array[i]，而不是去改变数组元素的属性时, 此时原数组不会改变

    ```js
    let ingredients_list = ["noodles", { list: ["eggs", "flour", "water"] }, { list2: ["apple", "cat"] }];
    let ingredients_list_copy = Array.from(ingredients_list);

    // change
    ingredients_list_copy[1].list = ["rice flour", "water"];
    console.log(ingredients_list);
    // not change
    ingredients_list_copy[2] = { list2: ["cat", "dog"] };
    console.log(ingredients_list[2]);
    ```

- 数组扁平化

  - 方法 1： array.flat(Infinity)
  - 方法 2: const flattenDeep = (array) => Array.isArray(array) ? array.reduce((pre, cur) => [...pre, ...flattenDeep(cur)], []) : [array];
  - 方法 3: 使用栈结构

  ```JS
  const flattenDeep = (array) => {
    const reuslt = [];
    // 拷贝数组 模拟栈
    const stack = [...array];
    while (stack.length !== 0) {
      // pop() 末尾'栈顶' 元素
      const val = stack.pop();
      if (Array.isArray(val)) {
        // 如果val还是一个数组的话，就继续压栈
        stack.push(...val);
      } else {
        // 使用头插法，还原val在数组中所在的位置
        reuslt.unshift(val);
      }
    }

    return reuslt;
  };
  ```

- 数组去重

  - 方法 1：Set: Array.from(new Set(array)) 或者 [...new Set(array)]，利用 Set 结构的特性
  - 方法 2：循环 or 迭代器：for、forEach、reduce 用法都是一样的，先 sort() 排序，插到一个新数组，然后跟新数组的前一个比较

  ```JS
  const unique_arr_reduce = (array) =>
  array.sort().reduce((acc, cur) => {
    if (acc.length === 0 || acc[acc.length - 1] !== cur) {
      acc.push(cur);
    }
    return acc;
  }, []);
  ```

  - 方法 3：filter() 搭配 indexOf()： 匹配过滤第一个存在的 item

  ```js
  const unique_arr_filter = (array) => {
    return array.filter((item, index, array) => {
      return array.indexOf(item) === index;
    });
  };
  ```

- 优点：便于查找：可以通过下标随机访问数组中的任意位置上的数据

  - 根据下标随机访问的时间复杂度是 O(1)

- 缺点：对数据的删除和插入不是很友好

  - 插入或删除的时间复杂度是 O(n);

- **栈**
- **队列**

- 数组、栈、队列相关经典例子：

```js
// 1. 数组扁平化、去重、排序
const arr = [[1, 2, 2], [3, 3, 4, 5, 6], [11, 12, 1, [12, 3, 12]], 10];

const flattenDeep = (arrry) => arrry.flat(Infinity);

const unique = (arrry) => Array.from(new Set(arrry));

const sort = (arrry) => arrry.sort((a, b) => a - b);

// 函数组合
const compose =
  (...fns) =>
  (initValue) =>
    fns.reduceRight((y, fn) => fn(y), initValue);

const flatten_unique_sort = compose(sort, unique, flattenDeep);

console.log(flatten_unique_sort(arr));
```

... 未完待续

### 链表

### 位运算
