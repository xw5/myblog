# 前端好用API之scrollIntoView

### **前情**

在前端开发需求中，经常需要用到锚点功能，以往都是获取元素在滚动容器中的位置再设置scrollTop来实现的。

### ****scrollIntoView介绍****

`scrollIntoView()`方法将调用它的元素滚动到浏览器窗口的可见区域

**调用方式：**

```jsx
var element = document.getElementById("test");
element.scrollIntoView（）; // 等同于element.scrollIntoView(true)
element.scrollIntoView（alignToTop）; //布尔参数
element.scrollIntoView（scrollIntoViewOptions）; //对象参数
```

alignToTop参数说明：

| alignToTop | [可选]，目前之前这个参数得到了良好的支持 |
| --- | --- |
| true(默认值) | 元素的顶部将对齐到可滚动祖先的可见区域的顶部。对应于scrollIntoViewOptions: {block: "start", inline: "nearest"}。 |
| false | 元素的底部将与可滚动祖先的可见区域的底部对齐。对应于scrollIntoViewOptions: {block: "end", inline: "nearest"}。 |

scrollIntoViewOptions参数说明：

| scrollIntoViewOptions | [可选]，目前这个参数浏览器对它的支持并不好 |
| --- | --- |
| behavior | [可选]定义过渡动画。"auto","instant"或"smooth"。默认为"auto" |
| block | [可选] "start"，"center"，"end"或"nearest"。默认为"center" |
| inline | [可选] "start"，"center"，"end"或"nearest"。默认为"nearest" |

> 元素可能无法完全滚动到顶端或底端，例如滚动区域不够滚的时候则无法滚动到顶端
> 

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
		.container{
		  width: 100%;
		  height: 300px;
		  overflow-x: hidden;
		  overflow-y:auto;
		}
		.item{
		  width：100%;
		  height: 100px;
		  line-height: 100px;
		  margin-bottom: 10px;
		  text-align: center;
		  color: #fff;
		  background-color: green;
		}
		.button{
		  padding: 15px;
		}
	</style>
</head>
<body>
	<div class="container">
	  <div class="item">第1条</div>
	  <div class="item">第2条</div>
	  <div class="item">第3条</div>
	  <div class="item">第4条</div>
	  <div class="item">第5条</div>
	  <div class="item">第6条</div>
	  <div class="item">第7条</div>
	</div>
	<button class="button">跳转到第1条</button>
	<button class="button">跳转到第5条</button>
	<script>
		var items = document.querySelectorAll('.item');
		var button = document.querySelectorAll('.button');
		
		button[0].addEventListener('click', function(){
		  items[0].scrollIntoView();
		}, false);
		
		button[1].addEventListener('click', function(){
		  items[4].scrollIntoView();
		}, false);
	</script>
</body>
</html>
```

演示地址：[https://jsbin.com/sadukatunu/edit?html,css,js,output](https://jsbin.com/sadukatunu/edit?html,css,js,output)