# js修改表单值不会触发input事件

### 前情

最近在做需求开发时候，需要监听表单的input事件

### 坑位

当通过JS动态修改表单的值的发现并不会触发表单的input事件

### Why?

个人猜测是浏览器默认行为，input只会针对用户手动输入做响应

### 解决方案

### 方式1

在JS动态修改表单域值的时候，可以手动触发一下表单input事件

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>input测试</title>
</head>
<body>
  <input type="text" id="inputTest">
  <div contenteditable id="contenteditTest">123456</div>
</body>
</html>
```

```jsx
var inputTest = document.querySelector('#inputTest');
var contenteditTest = document.querySelector('#contenteditTest');

inputTest.addEventListener('input', function(e) {
  console.log('inputTest input')
}, false);

contenteditTest.addEventListener('input', function(e) {
  console.log('contenteditTest input')
}, false);

// 直接修改不会触发表单元素的input事件
inputTest.value ='123456';
contenteditTest.innerHTML = '654321';

// 通过Event对象手动触发input事件
var event = new Event('input');

function setInputTest(val) {
  inputTest.value =val;
  inputTest.dispatchEvent(event);
}

function setContenteditTest(val) {
  contenteditTest.innerHTML = val;
  contenteditTest.dispatchEvent(event);
}

console.log('----分隔线----');
setInputTest(111111);
setContenteditTest(222222);
```

对于以上代码会在控制台输出

```
----分隔线----
inputTest input
contenteditTest input
```

Event MDN：[https://developer.mozilla.org/zh-CN/docs/Web/API/Event/Event](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/Event)

在线测试：

[https://jsbin.com/pijeqezijo/edit?html,js,console,output](https://jsbin.com/pijeqezijo/edit?html,js,console,output)

### 方式2

通过`Mutation Observer API`用来监视 `DOM`变动。`DOM`的任何变动，比如节点的增减、属性的变动、文本内容的变动，这个 `API`都可以得到通知，示例代码如下：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>
<div class="test" id="app">
  <div class="item item-input" contentEditable></div>
</div>
</body>
</html>
```

```jsx
  // Firefox和Chrome早期版本中带有前缀
  var MutationObserver = window.MutationObserver|| 
      window.WebKitMutationObserver || 
      window.MozMutationObserver;
  // 选择元素
  var input = document.querySelector('.item-input');
  // 配置观察选项:
  var inputConfig = {
    childList: true,
    subtree: true,
    characterData: true
  }
  // 创建观察者对象
  var observerInput = new MutationObserver(function(mutations) {
    console.log('--observer item input--');
  });
  // 传入目标节点和观察选项
  observerInput.observe(input, inputConfig);
  // 主动触发一次
  input.innerHTML = '123654';
```

在线测试：[https://jsbin.com/nakobuv/2/edit?html,js,console,output](https://jsbin.com/nakobuv/2/edit?html,js,console,output)

### 注意事项

以上解决方法有一定的兼容性风险，第一种情况ie全废，第二种兼容IE11，如果对IE低版本有兼容要求，可以把input里的处理逻辑抽取成函数，在动态修改表单值的时候，手动调一下上面抽取的函数。