# 前端好用API之MutationObserver

### **前情**

一直以来都没有好的方式可以监听元素变化，Mutation events虽然可以监听DOM树结构变化，但是因性能问题和差的兼容问题（Webkit内核不支持）并不推荐使用。

### MutationObserver****介绍****

`MutationObserver`接口提供了监视对DOM树所做更改的能力。它被设计为旧的Mutation Events功能的替代品，该功能是DOM3 Events规范的一部分，兼容IE11+

**调用方式：**

```jsx
// 创建一个观察器实例并传入回调函数，它会在指定的DOM发生变化时被调用回调函数
const observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(element, config);
```

**observer实例方法：**

| disconnect | 阻止MutationObserver实例继续接收通知，直到再次调用其observe()方法，该观察者对象包含的回调函数都不会再被调用 |
| --- | --- |
| observe | 启动监听，observe(target, config)：
target：要监听的元素，config：监听配置，指定监听哪些变化 |
| takeRecords | 从MutationObserver的通知队列中删除所有待处理的通知，并将它们返回到MutationRecord对象的新Array中 |

****MutationObserver监听配置，observe的第二个参数：****

| 属性 | 说明 |
| --- | --- |
| attributes | 设为 true 以观察受监视元素的属性值变更，默认值false |
| attributeFilter | 要监视的特定属性名称的数组。如果未包含此属性，则对所有属性的更改都会触发变动通知 |
| characterData | 设为 true ，以监视指定目标节点或子节点树中节点所包含的字符数据的变化 |
| childList | 设为 true ，以监视目标节点及其子节点，默认值为 false |
| subtree | 设为 true，以监视目标节点及其子孙节点，默认值为 false |

### 使用示例

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
	<style>
		*{
		  padding: 0;
		  margin: 0;
		}
		.item{
		  width: 100%;
		  min-height: 40px;
		  overflow: hidden;
		  resize: both;
		  margin-bottom: 5px;
		  color: #fff;
		  background-color: red;
		}
	</style>
</head>
<body>
	<div class="test">
	  <div class="item">item0</div>
	  <div class="item item-input" contentEditable></div>
	  <p>拖动右下角resize手柄或者输入文本，都能监听到变化</p>
	</div>
	<script>
		window.onload = function() {
		  // Firefox和Chrome早期版本中带有前缀
		  var MutationObserver = window.MutationObserver|| window.WebKitMutationObserver || window.MozMutationObserver
		  // 选择目标节点
		  var target = document.querySelector('.test');
		  // 创建观察者对象
		  var observer = new MutationObserver(function(mutations) {
		    console.log('--observer test--');
		  });
		  // 配置观察选项:
		  var config = {
		    childList: true,
		    attributes: true,
		    characterData: true,
		    subtree: true
		  }
		  // 传入目标节点和观察选项
		  observer.observe(target, config);
		
		  var input = document.querySelector('.item-input');
		  
		  input.innerHTML = '123654';
		}
	</script>
</body>
</html>
```

演示地址：[https://jsbin.com/nakobuv/edit?html,css,js,console,output](https://jsbin.com/nakobuv/edit?html,css,js,console,output)