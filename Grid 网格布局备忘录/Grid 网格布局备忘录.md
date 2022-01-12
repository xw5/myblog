# Grid 网格布局备忘录

## 概述

网格布局（Grid）是最强大的 CSS 布局方案。

它将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。

Grid 布局与 Flex 布局有一定的相似性，都可以指定容器内部多个项目的位置。但是，它们也存在重大区别。Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。Grid 布局远比 Flex 布局强大。

## 基本概念

### **容器和项目**

采用网格布局的区域，称为"容器"（container）。容器内部采用网格定位的子元素，称为"项目"（item）

```html
<div class="container">
  <div class="item"><p>1</p></div>
  <div class="item"><p>2</p></div>
  <div class="item"><p>3</p></div>
</div>
```

### **行和列**

容器里面的水平区域称为"行"（row），垂直区域称为"列"（column）

### **单元格**

行和列的交叉区域，称为"单元格"（cell）,`n`行和`m`列会产生`n x m`个单元格

### **网格线**

划分网格的线，称为"网格线"（grid line）。水平网格线划分出行，垂直网格线划分出列，正常情况下，`n`行有`n + 1`根水平网格线，`m`列有`m + 1`根垂直网格线

## 容器属性

### **display**

`display: grid`指定一个容器采用网格布局。

```css
.container{
	display: grid; // 容器元素都是块级元素
	// display: inline-grid  // 容器元素是行内元素
}
```

### grid-template-columns，grid-template-rows

容器指定了网格布局以后，接着就要划分行和列。`grid-template-columns`属性定义每一列的列宽，`grid-template-rows`属性定义每一行的行高

```css
// 三行三列的网格，列宽和行高都是100px
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
}

// 三行三列的网格，列宽和行高都是33.33%
.container {
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 33.33% 33.33% 33.33%;
}
```

### repeat()

重复写同样的值非常麻烦，尤其网格很多时。这时，可以使用`repeat()`函数，简化重复的值，接受两个参数，第一个参数是重复的次数（本例值是3），第二个参数是所要重复的值

```css
// 三行三列的网格，列宽和行高都是33.33%
.container {
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  grid-template-rows: repeat(3, 33.33%);
}

// 三行三列的网格，列宽和行高依次是100px 20px 80px
.container {
  display: grid;
  grid-template-columns: repeat(3, 100px 20px 80px);
  grid-template-rows: repeat(3, 100px 20px 80px);
}
```

### **auto-fill 关键字**

单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用`auto-fill`关键字表示自动填充

```css
// 每列宽度100px，然后自动填充，直到容器不能放置更多的列
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
}
```

演示示例：[https://jsbin.com/pexizusude/edit?html,css,output](https://jsbin.com/pexizusude/edit?html,css,output)

### fr关键字

为了方便表示比例关系，网格布局提供了`fr`关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为`1fr`和`2fr`，就表示后者是前者的两倍，使用fr的好像是它会按比例占满容器的宽高

```css
// 两个相同宽度的列 行是第二行是第一行的2位高度
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 2fr;
}
// 第一列的宽度为150像素，第二列的宽度是第三列的一半
.container {
  display: grid;
  grid-template-columns: 150px 1fr 2fr;
}
```

演示示例：[https://jsbin.com/rinaxuyeko/edit?html,css,output](https://jsbin.com/rinaxuyeko/edit?html,css,output)

**minmax()**

产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。

```css
// 3列，最后一行最小100px最大为1fr
.container {
  display: grid;
  grid-template-columns: 1fr 1fr minmax(100px, 1fr);
}
```

演示示例：[https://jsbin.com/vamoqaviyi/edit?html,css,output](https://jsbin.com/vamoqaviyi/edit?html,css,output)

### auto关键字

表示由浏览器自己决定长度

```css
// 3列，最1列和最后1列宽度为100px，中间值占满余下空间
.container {
  display: grid;
  grid-template-columns: 100px auto 100px;
}
```

演示示例：[https://jsbin.com/zanericiwu/edit?html,css,output](https://jsbin.com/zanericiwu/edit?html,css,output)

### 网络线的名称

`grid-template-columns`属性和`grid-template-rows`属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用，网格布局为3行 x 3列，因此有4根垂直网格线和4根水平网格线。方括号里面依次是这八根线的名字。网格布局允许同一根线有多个名字，比如`[fifth-line row-5]`

```css
.container {
  display: grid;
  grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
  grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}
```

### **grid-row-gap，grid-column-gap，grid-gap**

`grid-row-gap`属性设置行与行的间隔（行间距），`grid-column-gap`属性设置列与列的间隔（列间距）,`grid-gap`属性是`grid-column-gap`和`grid-row-gap`的合并简写形式

```css
// 第一种写法
.container {
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}

// 第二种写法
.container {
  grid-gap: 20px 20px;
}
```

> 根据最新标准，上面三个属性名的`grid-`前缀已经删除，`grid-column-gap`和`grid-row-gap`写成`column-gap`和`row-gap`，`grid-gap`写成`gap`
> 

### grid-area，**grid-template-areas**

通过grid-area属性来命名网格元素，命名的网格元素可以通过容器的 grid-template-areas 属性来引用。

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title>grid-area，**grid-template-areas实战**</title>
<style>
	.item1 { grid-area: header; }
	.item2 { grid-area: menu; }
	.item3 { grid-area: main; }
	.item4 { grid-area: right; }
	.item5 { grid-area: footer; }
	
	.grid-container {
	  display: grid;
	  grid-template-areas:
	    'header header header header header header'
	    'menu main main main right right'
	    'menu footer footer footer footer footer';
	  grid-gap: 10px;
	  background-color: #2196F3;
	  padding: 10px;
	}
	
	.grid-container > div {
	  background-color: rgba(255, 255, 255, 0.8);
	  text-align: center;
	  padding: 20px 0;
	  font-size: 30px;
	}
</style>
</head>
<body>
	<h1>grid-area 属性</h1>
	<p>你可以使用 <em>grid-area</em> 属性来命名网格元素。</p>
	<p>命名的网格元素可以通过容器的 grid-template-areas 属性来引用。</p>
	<p>网格布局容器，设置 6 行 3 列。</p>
	<div class="grid-container">
	  <div class="item1">Header</div>
	  <div class="item2">Menu</div>
	  <div class="item3">Main</div>  
	  <div class="item4">Right</div>
	  <div class="item5">Footer</div>
	</div>
</body>
</html>
```

演示地址：[https://jsbin.com/woyihekifi/edit?html,css,output](https://jsbin.com/woyihekifi/edit?html,css,output)

> 注意，区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为`区域名-start`，终止网格线自动命名为`区域名-end`。比如，区域名为`header`，则起始位置的水平网格线和垂直网格线叫做`header-start`，终止位置的水平网格线和垂直网格线叫做`header-end`
> 

`grid-area`属性还可用作`grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end`的合并简写形式，直接指定项目的位置

```css
.item {
	/* grid-area: <row-start> / <column-start> / <row-end> / <column-end>; */
  grid-area: 1 / 1 / 3 / 3;
}
```

演示地址：[https://jsbin.com/yoximaloji/1/edit?html,css,output](https://jsbin.com/yoximaloji/1/edit?html,css,output)

### **grid-auto-flow**

划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行。默认值是`row`，即"先行后列"。也可以将它设成`column`，变成"先列后行"，还可以设成`row dense`（表示"先行后列"，并且尽可能紧密填满，尽量不出现空格）和`column dense`（表示"先列后行"，并且尽量填满空格）。这两个值主要用于，某些项目指定位置以后，剩下的项目怎么自动放置。

```css
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
<style>
	.container{
	  display: grid;
	  margin-bottom: 5px;
	  grid-template-columns: 100px 100px 100px;
	  grid-template-rows: 100px 100px 100px;
	  grid-auto-flow: column;
	  grid-gap: 5px;
	}
	.container div{
	  text-align: center;
	  line-height: 100px;
	  color:#fff;
	  background-color: green;
	}
</style>
</head>
<body>
<div class="container">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
  <div>07</div>
  <div>08</div>
  <div>09</div>
</div>
</body>
</html>
```

演示示例：[https://jsbin.com/cipayifesi/1/edit?html,css,output](https://jsbin.com/cipayifesi/1/edit?html,css,output)

### **justify-items、align-items、place-items**

`justify-items`属性设置单元格内容的水平位置（左中右），`align-items`属性设置单元格内容的垂直位置（上中下），`place-items`属性是`align-items`属性和`justify-items`属性的合并简写形式

```css
/*
start：对齐单元格的起始边缘。
end：对齐单元格的结束边缘。
center：单元格内部居中。
stretch：拉伸，占满单元格的整个宽度（默认值）
*/
.container {
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
}

.container {
/* 如果省略第二个值，则浏览器认为与第一个值相等 */
	place-items: <align-items> <justify-items>;
}
```

演示示例：[https://jsbin.com/lipatuxilu/1/edit?html,css,output](https://jsbin.com/lipatuxilu/1/edit?html,css,output)

### **justify-content 、align-content 、place-content**

`justify-content`属性是整个内容区域在容器里面的水平位置（左中右），`align-content`属性是整个内容区域的垂直位置（上中下）。`place-content`属性是`align-content`属性和`justify-content`属性的合并简写形式。

```css
/*
start - 对齐容器的起始边框
end - 对齐容器的结束边框
center - 容器内部居中
stretch - 项目大小没有指定时，拉伸占据整个网格容器
space-around - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍
space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔
space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔
*/
.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
}

.container {
	/*
	如果省略第二个值，浏览器就会假定第二个值等于第一个值
	*/
  place-content: <align-content> <justify-content>;
}
```

演示示例：[https://jsbin.com/nexolijomi/1/edit?html,css,output](https://jsbin.com/nexolijomi/1/edit?html,css,output)

## 项目属性

### **grid-column-start 、grid-column-end 、grid-row-start 、grid-row-end**

单元格项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线，除了指定为第几个网格线，还可以指定为网格线的名字，使用这四个属性，如果产生了项目的重叠，则使用`z-index`属性指定项目的重叠顺序

- `grid-column-start`属性：左边框所在的垂直网格线
- `grid-column-end`属性：右边框所在的垂直网格线
- `grid-row-start`属性：上边框所在的水平网格线
- `grid-row-end`属性：下边框所在的水平网格线

```css
/* 第1个div的左边框是第1根垂直网格线，右边框是第3根垂直网格线，上边框为第2根水平网格线，下边框为第4根网格线， */
.container div:nth-child(1) {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 4;
}

/* 指定为网格线的名字 */
.container div:nth-child(1) {
  grid-column-start: header-start;
  grid-column-end: header-end;
}

/* span关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格 */
.container div:nth-child(1) {
  grid-column-start: span 2;
}
```

除了1号项目以外，其他项目都没有指定位置，由浏览器自动布局，这时它们的位置由容器的`grid-auto-flow`属性决定

演示示例：[https://jsbin.com/sugixexilo/edit?html,css,output](https://jsbin.com/sugixexilo/edit?html,css,output)

### **grid-column，grid-row**

`grid-column`属性是`grid-column-start`和`grid-column-end`的合并简写形式，`grid-row`属性是`grid-row-start`属性和`grid-row-end`的合并简写形式。

```css
/* 用法 */
.item {
  grid-column: <start-line> / <end-line>;
  grid-row: <start-line> / <end-line>;
}

/* 项目item-1占据第一行，从第一根列线到第三根列线 */
.item-1 {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}
/* 等同于 */
.item-1 {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}

/* 可以使用span关键字，表示跨越多少个网格 */
.item-1 {
  background: #b03532;
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
/* 等同于 */
.item-1 {
  background: #b03532;
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
}
```

演示示例：[https://jsbin.com/vivuheqivi/1/edit?html,css,output](https://jsbin.com/vivuheqivi/1/edit?html,css,output)

### **grid-area**

属性指定项目放在哪一个区域，一般配合容器属性grid-template-areas一起使用，详细说明见上面（**grid-area，grid-template-areas**）讲解说明

### **justify-self，align-self，place-self**

`justify-self`属性设置单元格内容的水平位置（左中右），跟`justify-items`属性的用法完全一致，但只作用于单个项目。

`align-self`属性设置单元格内容的垂直位置（上中下），跟`align-items`属性的用法完全一致，也是只作用于单个项目

`place-self`属性是`align-self`属性和`justify-self`属性的合并简写形式

```css
/*
start：对齐单元格的起始边缘。
end：对齐单元格的结束边缘。
center：单元格内部居中。
stretch：拉伸，占满单元格的整个宽度（默认值）
*/
.item {
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
}

/* 如果省略第二个值，place-self属性会认为这两个值相等 */
.item {
	place-self: <align-self> <justify-self>;
}
```

参考博文：[https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)