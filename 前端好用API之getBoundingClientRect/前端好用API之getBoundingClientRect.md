# 前端好用API之getBoundingClientRect

### **前情**

在前端开发需求中，经常需要获取元素的尺寸位置相关的属性，以往的做法是调用不同api获取相关属性的。

### getBoundingClientRect****介绍****

getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。

标准盒子模型：元素的尺寸等于width/height + padding + border-width的总和。如果box-sizing: border-box，则元素的的尺寸等于 width/height。

`top`, `left`, `right`, `bottom`属性是使用对象的其他属性的值来计算获得的，Object.keys（）查找时将失败，Object.assign（）无法复制返回的属性

**调用方式：**

```jsx
domRect = element.getBoundingClientRect();
```

domRect对象介绍

| domRect | 这个对象是由该元素的 getClientRects()方法返回的一组矩形的集合 |
| --- | --- |
| left | 元素左边距离浏览器可视窗左边的距离 |
| right | 元素右边距离浏览器视可视窗左边的距离 |
| top | 元素顶边距离浏览器视可视窗顶边的距离 |
| bottom | 元素底边距离浏览器视可视窗顶边的距离 |
| width | 元素自身的宽 |
| height | 元素自身的高 |
| x | 元素左边距离浏览器可视窗左边的距离 |
| y | 元素顶边距离浏览器可视窗顶边的距离 |

> 考虑到兼容性问题，尽量仅使用 `left`, `top`, `right`, 和 `bottom`属性是最安全的
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
		  width: 300px;
		  height: 300px;
		  overflow:auto;
		}
		.item{
		  width: 600px;
		  height: 60px;
		  text-align: left;
		  line-height: 60px;
		  margin: 60px 0 0 60px;
		  color: white;
		  background-color: blue;
		}
		.tips{
		  padding: 10px;
		}
		.rect_detail{
		  padding: 10px;
		  color: green;
		}
	</style>
</head>
<body>
	<div class="container">
    <div class="item">DOM0</div>
    <div class="item">DOM1</div>
    <div class="item">DOM2</div>
    <div class="item">DOM3</div>
  </div>
  <p class="tips">拖动滚动条查看值变化：</p>
  <div class="rect_detail">
    DOM2元素：
  </div>
	<script>
		var doms = document.querySelectorAll('.item');
		var container = document.querySelector('.container');
		var result = document.querySelector('.rect_detail');
		
		container.addEventListener('scroll', function() {
		  var donRect = doms[2].getBoundingClientRect();
		  result.innerHTML = "DOM2元素:<br />" +
		  "left:"+donRect.left + "<br />" +
		  "right:"+donRect.right + "<br />" +
		  "top:"+donRect.top + "<br />" +
		  "bottom:"+donRect.bottom + "<br />" +
		  "width:"+donRect.width + "<br />" +
		  "height:"+donRect.height + "<br />" +
		  "x:"+donRect.x + "<br />" +
		  "y:"+donRect.y;
		}, false);
	</script>
</body>
</html>
```

演示地址：[https://jsbin.com/wozabey/1/edit?html,css,js,output](https://jsbin.com/wozabey/1/edit?html,css,js,output)