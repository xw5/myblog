# JavaScript正则表达式备忘录

## 概念

regular expression，描述了一种字符串匹配的模式(pattern),可以用来检查一个串是否含有某种子串、将匹配的子串替换或者从某个串中取出符合某个条件的子串等。

## 正则表达式的创建

字面量创建

```jsx
let str = "abc1231dfaf123213fda";
let reg = /\d+/g;
let res = str.match(reg);
console.log(res); // ["1231", "123213"]
```

构造函数创建

> 正则支持变量拼接，对于特殊字符需要加\转义
> 

```jsx
let str = "abc1231dfaf123213fda";
let reg = new RegExp("\\d+", "g");
let res = str.match(reg);
console.log(res); // ["1231", "123213"]
```

测试链接：[https://jsbin.com/sivoqayowo/edit?js,console,output](https://jsbin.com/sivoqayowo/edit?js,console,output)

---

## 正则的匹配方法

**正则对象底下的方法：test，exec**

> 注意lastIndex属性，它决定下一次匹配从什么地方开始
> 

```jsx
// test
let str = "abc1231dfaf123213fda";
let reg = /\d+/g;
console.log(reg.test(str) +":"+ reg.lastIndex); // "true:7"
console.log(reg.test(str) +":"+ reg.lastIndex); // "true:17"
console.log(reg.test(str) +":"+ reg.lastIndex); // "false:0"
```

```jsx
// exec
let str0 = "abc1231dfaf123213fda";
let reg0 = /\d+/g;
console.log(reg0.exec(str0) +":"+ reg0.lastIndex); // "1231:7"
console.log(reg0.exec(str0) +":"+ reg0.lastIndex); // "123213:17"
console.log(reg0.exec(str0) +":"+ reg0.lastIndex); // "null:0"
```

测试链接：[https://jsbin.com/taloyiwuba/edit?js,console,output](https://jsbin.com/taloyiwuba/edit?js,console,output)

**字符串底下的方法：split，search，match，replace**

```jsx
// split
let str = "abc1231dfaf123213fda";
let reg = /\d+/g;
let arr = str.split(reg);
console.log(arr); // ["abc", "dfaf", "fda"]
```

```jsx
// search 会忽略全局匹配g
let str0 = "abc1231dfaf123213fda";
let reg0 = /\d+/g;
console.log(str.search(reg0)); // 3
console.log(str.search(reg0)); // 3
```

```jsx
// match
let str1 = "abc1231dfaf123213fda";
let reg1 = /\d+/g;
console.log(str1.match(reg1)); // ["1231", "123213"]
```

```jsx
// replace 第二个参数支持字符串和函数二种方法，函数较灵活，可以实现很多高级功能
let str2 = "abc3dfaf2fda";
let reg2 = /\d/g;
let result20 = str2.replace(reg2,'*');
console.log(result20); // "abc*dfaf*fda"
let result21 = str2.replace(reg2,function(...args) {
  // args是一个数组['匹配到的值','索引','分组','原始字符串']
  console.log(args);
	// ["3", 3, "abc3dfaf2fda"]
	// ["2", 8, "abc3dfaf2fda"]
  return "*";
});
console.log(result21); // "abc*dfaf*fda"
```

测试链接：[https://jsbin.com/pozoxibiwi/edit?js,console,output](https://jsbin.com/pozoxibiwi/edit?js,console,output)

---

## 元字符

正则表达式中有特殊含义的非字母字符

**字符相关：**

- \w：数字 字母 下划线
- \W：非数字 字母 下划线
- \d：数字
- \D：非数字
- \s：匹配一个空白符，包括空格、制表符、换页符、换行符和其他 Unicode 空格
- \S：匹配一个非空白符
- . ：匹配行结束符（\n \r \u2028 或 \u2029）以外的任意单个字符
- \：转义符
    - 表示下一个具有特殊含义的字符为字面值
    - 表示下一个字符具有特殊含义（转义后的结果是元字符内约定的）

```jsx
// \w
let str00 = "1234_abc";
let str01 = "~%$*";
console.log('\\w:0--' + /\w+/g.test(str00)); // "\w:0--true"
console.log('\\w:1--' + /\w+/g.test(str01)); // "\w:1--false"

// \W
let str10 = "1234_abc";
let str11 = "~%$*";
console.log('\\W:0--' + /\W+/g.test(str10)); // "\W:0--false"
console.log('\\W:1--' + /\W+/g.test(str11)); // "\W:1--true"

// \s
let str20 = "1234 abc";
let str21 = "1234abc";
console.log('\\s:0--' + /\s+/g.test(str20)); // "\s:0--true"
console.log('\\s:1--' + /\s+/g.test(str21)); // "\s:1--false"

// \S
let str30 = " ";
let str31 = "1234abc";
console.log('\\S:0--' + /\S/g.test(str30)); // "\S:0--false"
console.log('\\S:1--' + /\S/g.test(str31)); // "\S:1--true"

// \d
let str40 = "1234abc";
let str41 = "abc";
console.log('\\d:0--' + /\d+/g.test(str40)); // "\d:0--true"
console.log('\\d:1--' + /\d+/g.test(str41)); // "\d:1--false"

// \D
let str50 = "1234";
let str51 = "abc";
console.log('\\D:0--' + /\D+/g.test(str50)); // "\D:0--false"
console.log('\\D:1--' + /\D+/g.test(str51)); // "\D:1--true"

// .
let str60 = "1234";
let str61 = "\r\n";
console.log('.:0--' + /.+/g.test(str60)); // "\D:0--true"
console.log('.:1--' + /.+/g.test(str61)); // "\D:1--false"
```

测试链接：[https://jsbin.com/yajepuyeni/edit?js,console,output](https://jsbin.com/yajepuyeni/edit?js,console,output)

**数量相关：**

- {}：出现次数控制
    - {n,m} 出现n次到m次
    - {n} 出现n次
    - {n, } 至少出现n次
- ?： 出现0次或1次，还有另一个用处就是贪婪和惰性匹配
- +：出现1次或多次
- *： 出现0次或多次

```jsx
let str = "aeeef";
let reg = /e{3}/;
let reg0 = /e{1,3}/
let reg1 = /e{4,}/
console.log(reg.test(str)); // true
console.log(reg0.test(str)); // true
console.log(reg1.test(str)); // false

let reg2 = /aa?e/;
console.log(reg2.test(str)); // true

let str0 = "123456789";
let reg3 = /\d{2,4}/g;
let reg4 = /\d{2,4}?/g;
console.log(str0.match(reg3)); // ["1234", "5678"]
console.log(str0.match(reg4)); // ["12", "34", "56", "78"]

let reg5 = /ae+/;
console.log(reg5.test(str)); // true

let reg6 = /ae*f/;
console.log(reg6.test(str)); // true
```

测试链接：[https://jsbin.com/hirobabico/edit?js,console,output](https://jsbin.com/hirobabico/edit?js,console,output)

**位置相关：**

- ^：开始位置，在[]中是取反的意思
- $：结尾置
- \b：边界位置（空格，开头，结尾等非\w的都是边界）
- \B：非边界位置

```jsx
let str = "this is a book";
let reg = /^\w/g;
console.log(str.replace(reg, "*")); // "*his is a book"

let reg3 = /[^is]/g;
console.log(str.replace(reg3, "*")); // "**is*is*******"

let reg0 = /\w$/g;
console.log(str.replace(reg0, "*")); // "this is a boo*"

let reg1 = /\bis\b/g;
console.log(str.replace(reg1, "*")); // "this * a book"

let reg2 = /\Bis\b/g;
console.log(str.replace(reg2, "*")); // "th* is a book"
```

测试地址：[https://jsbin.com/camopiduye/edit?js,console,output](https://jsbin.com/camopiduye/edit?js,console,output)

**括号相关：**

- ()：分组、提取值，替换，反向引用

```jsx
let str = "abababdgdgdg";
// 分组
let reg = /(ab){3}/;
console.log(reg.test(str)); // true

let str0 = "2021-11-24";
let reg0 = /(\d{4})-(\d{2})-(\d{2})/;
// 提取值
console.log(str0.match(reg0)); // ["2021-11-24", "2021", "11", "24"]
console.log(RegExp.$1 +":"+ RegExp.$2 +":"+ RegExp.$3); // "2021:11:24"

// 替换
console.log(str0.replace(reg0, "$2/$3/$1")) // "11/24/2021"

let strReplace = str0.replace(reg0, function(...args) {
  console.log(args); // ["2021-11-24", "2021", "11", "24", 0, "2021-11-24"]
  return args[2] + "/" + args[3]  + "/" + args[1];
})
console.log(strReplace); // "11/24/2021"

// 反向引用
let className = "main-content-left";
let reg1 = /\w+(-|_)\w+(-|_)\w+/;
console.log(reg1.test(className)); // true
let className0 = "main-content_left";
// 只有前后要么都是-要么都是_才符合要求
let reg2 = /\w+(-|_)\w+(\1)\w+/;
console.log(reg2.test(className0)); // false
```

测试链接：[https://jsbin.com/woliqaxoto/edit?js,console,output](https://jsbin.com/woliqaxoto/edit?js,console,output)

- []：字符集合

```jsx
let str = "my name is limili";
let reg = /li[mi]*li/g;
console.log(reg.test(str)); // true

let str0 = "sdf566dfdfdr";
// 支持定义一个范围，按ASCII顺序
let reg0 = /[0-9]/g;
let reg1 = /[a-z]/g;
console.log(reg0.test(str0)); // true
console.log(reg1.test(str0)); // true

// 中括号中的^是取反的意思
let reg2 = /[^a-z]/g;
console.log(str0.replace(reg2, "*")); // "sdf***dfdfdr"
```

测试链接：[https://jsbin.com/gosenezuvo/edit?js,console,output](https://jsbin.com/gosenezuvo/edit?js,console,output)

- {}：出现次数控制，参考前面数量相关

---

## 匹配模式

- g：全局匹配
- i：忽略大小写
- m：多行匹配
- s：让“.”可以匹配换行符
- u：让正则可以匹配unicode编码
- y：粘性匹配模式

```jsx
// g 全局匹配
let str = "15fdfdf2dfd5df2";
let reg = /\d+/;
let reg0 = /\d+/g;
console.log(str.match(reg)); // ["15"]
console.log(str.match(reg0)); // ["15", "2", "5", "2"]

// i 忽略大小写
let str0 = "AbC";
let reg1 = /abc/i;
console.log(reg0.test(str0)); // false

// m 支持多行匹配
let str1 =`abc
def
hij`;

let reg2 = /^\w/g;
console.log(str1.replace(reg2, "*")); 
// "*bc
// def
// hij"

let reg3 = /^\w/gm;
console.log(str1.replace(reg3, "*"));
// "*bc
// *ef
// *ij"

// s 让"."号可以匹配换行符
let reg4 = /a.+j/g;
console.log(reg4.test(str1)); // false
let reg5 = /a.+j/gs;
console.log(reg5.test(str1)); // true

// u 匹配unicode编码
let str2 = "a";
let reg6 = /\u{61}/;
console.log(reg6.test(str2)); // false
let reg7 = /\u{61}/u;
console.log(reg7.test(str2)); // true

// y 粘性匹配
let str3 = "12d3c4";
let reg8 = /\d/g;
console.log(reg8.exec(str3)); // ["1"]
console.log(reg8.exec(str3)); // ["2"]
console.log(reg8.exec(str3)); // ["3"]
let reg9 = /\d/gy;
console.log(reg9.exec(str3)); // ["1"]
console.log(reg9.exec(str3)); // ["2"]
console.log(reg9.exec(str3)); // null
```

测试链接：[https://jsbin.com/lafimibeqi/edit?js,console,output](https://jsbin.com/lafimibeqi/edit?js,console,output)

## 命名分组

通过“?<组名>”定义命名分组

```jsx
let str = "2021-11-24";
let reg = /(\d+)-(\d+)-(\d+)/;
console.log(str.match(reg));
// {
// 	0: "2021-11-24"
// 	1: "2021"
// 	2: "11"
// 	3: "24"
// 	groups: undefined
// 	index: 0
// 	input: "2021-11-24"
// }
let reg0 = /(?<y>\d+)-(?<m>\d+)-(?<d>\d+)/;
console.log(str.match(reg0));
// {
// 	0: "2021-11-24"
// 	1: "2021"
// 	2: "11"
// 	3: "24"
// 	groups: {y: "2021", m: "11", d: "24"}
// 	index: 0
// 	input: "2021-11-24"
// }
```

测试链接：[https://jsbin.com/tosameyadi/edit?js,output](https://jsbin.com/tosameyadi/edit?js,output)，打开控制台看日志

## 零宽断言

- ?=：正向肯定零宽断言
- ?!：正向否定零宽断言
- ?>=：负向零宽肯定断言
- ?<!：负向零宽肯定断言

```jsx
let str = "iphone4iphone5iphonex";
let reg = /iphone\d/g;
console.log(str.replace(reg, "苹果")); // "苹果苹果iphonex"
let reg0 = /iphone(?=\d)/g;
console.log(str.replace(reg0, "苹果")); // "苹果4苹果5iphonex"

let reg1 = /iphone(?!\d)/g;
console.log(str.replace(reg1, "苹果")); // "iphone4iphone5苹果x"

let str0 ="100px200px10rpx";
let reg2 = /(?<=\d+)px/g;
console.log(str0.replace(reg2, "像素")); // "100像素200像素10rpx"
let reg3 = /(?<!\d+)px/g;
console.log(str0.replace(reg3, "像素")); // "100px200px10r像素"
```

测试链接：[https://jsbin.com/nerenuyose/edit?js,console,output](https://jsbin.com/nerenuyose/edit?js,console,output)