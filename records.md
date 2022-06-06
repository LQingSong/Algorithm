# 1. [两数之和](https://leetcode.cn/problems/two-sum/)

**description:** 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target 的那 两个 整数，并返回它们的数组下标。

**思路：** 遍历 nums，找出等于 target 的两个数下标

```Java
class Solution {
    public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap();

        for(int i = 0, len = nums.length; i < len; i++) {
            int num2 = target - nums[i];
            if (map.containsKey(num2)) return new int[]{map.get(num2), i};
            map.put(nums[i], i);
        }
        return new int[]{};
    }

}

```

```JavaScript

var twoSum = function(nums, target) {
    const map = new Map();
    for(let i = 0, len = nums.length; i < len; i++) {
        const num2 = target - nums[i];
        if (map.has(num2)) {
            return [map.get(num2), i];
        }
        map.set(nums[i], i);
    }
    return [];
};
```

> 时间复杂度： O(n)
> 空间复杂度：O(n)

Note:

> 因为我们在循环的过程中会用到之前的数，所以考虑在遍历过程中把之前的数据记录下来，后续过程直接查找 Map， 利用 Map 查找的方式能比直接两层循环的方式更快。

时间：2022-06-04 16:38

# 2. [独特的电子邮件](https://leetcode.cn/problems/unique-email-addresses/)

**description:** 每个 有效电子邮件地址 都由一个 本地名 和一个 域名 组成，以 '@' 符号分隔。除小写字母之外，电子邮件地址还可以含有一个或多个 '.' 或 '+' 。

如果在电子邮件地址的 本地名 部分中的某些字符之间添加句点（'.'），则发往那里的邮件将会转发到本地名中没有点的同一地址。请注意，此规则 不适用于域名。

如果在 本地名 中添加加号（'+'），则会忽略第一个加号后面的所有内容。这允许过滤某些电子邮件。同样，此规则 不适用于域名 。

可以同时使用这两个规则。

给你一个字符串数组 emails，我们会向每个 emails[i] 发送一封电子邮件。返回实际收到邮件的不同地址数目。

**思路：**
（1）运用规则处理数组中每一个字符，忽略@字符之前的所有 "." 和 "+" 后面的
（2）返回字符串数组中去重之后的长度。

```javascript
var numUniqueEmails = function (emails) {
  const collection = new Set();
  for (let i = 0, len = emails.length; i < len; i++) {
    const str = dealWithStr(emails[i]);
    collection.add(str);
  }
  return collection.size;
};

function dealWithStr(str) {
  str = str.split("@");
  str[0] = str[0].replace(/\.|\+(\S*)/g, "");
  return str[0] + "@" + str[1];
}
```

```Java
class Solution {
    public int numUniqueEmails(String[] emails) {
        Set<String> collection = new HashSet<>();
            for (int i = 0, len = emails.length; i < len; i++) {
                String[] str = emails[i].split("@");
                StringBuilder localName = new StringBuilder();
                for(char c : str[0].toCharArray()) {
                if (c == '.') continue;
                if (c == '+') break;
                localName.append(c);
            }
            collection.add((localName.append(' ').append('@' + str[1]).toString()));
        }
        return collection.size();
    }
}
```

> 时间复杂度：O(L)
> 空间复杂度：O(L)
> (L:是字符串数组字符的总和)

**Note:**

> 1. 这道题就是理解题目的两个规则，本地名忽略"."和"+"和"@"之间的字符，域名原封不动，不在那两个规则要求内。
>    Javascript 要求掌握字符串的处理方式： **split、splice、RegExp**...
>    Java 要求掌握字符串的处理方式：**split、StringBuilder、subString**...
> 2. 返回整个数组在经过字符串处理以后不重复的长度，利用 Set 集合的特性，就很容易做到**数组去重**了。

时间：2022-06-06 10:05
