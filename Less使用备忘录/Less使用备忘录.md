# Less使用备忘录

## 定义

Less （Leaner Style Sheets 的缩写） 是一门向后兼容的 CSS 扩展语言，动态样式语言。

## 使用方式

### 直接引入less.js文件

好处：能获取客户端的数据，从而进行进一步的计算

坏处：在客户端解析Less,造成性能的浪费，不利于维护

![Untitled](Less%E4%BD%BF%E7%94%A8%E5%A4%87%E5%BF%98%E5%BD%95%203f2a1893738348daaab528c26eb064c2/Untitled.png)

### Koala编译器

每次都需要启运软件，并配置编译配置，初学者推荐使用

Koala下载链接：[http://koala-app.com/](http://koala-app.com/)

### 在编辑器中实时编译

不同的编辑器需要进行不同的配置，不够灵活，而且并不是所有编辑器都支持，不想多安装别的软件且项目较简单可以使用

### 通过node等前端工程化工具(webpack,gulp)

目前主流的使用方式，特别是在vue，reaact项目中使用

## 特性

### 嵌套**（Nesting）**

Less 提供了使用嵌套（nesting）代替层叠或与层叠结合使用的能力

```less
// 编译前
#header {
  color: black;
  .logo {
    width: 300px;
  }
	&:hover{
		background-color:#666;
	}
}
// 编译后
#header {
  color: black;
}
#header .logo {
  width: 300px;
}
#header:hover{
	background-color:#666;
}
```

> `&` 表示当前选择器的父级
> 

@规则嵌套和冒泡

```less
// 编译前
.component {
  width: 300px;
  @media (min-width: 768px) {
    width: 600px;
    @media  (min-resolution: 192dpi) {
      background-image: url(/img/retina2x.png);
    }
  }
  @media (min-width: 1280px) {
    width: 800px;
  }
}

// 编译后
.component {
  width: 300px;
}
@media (min-width: 768px) {
  .component {
    width: 600px;
  }
}
@media (min-width: 768px) and (min-resolution: 192dpi) {
  .component {
    background-image: url(/img/retina2x.png);
  }
}
@media (min-width: 1280px) {
  .component {
    width: 800px;
  }
}
```

## 变量**（Variables）**

less可以像js一样支持变量定义，对于一些公共的值可以定义为变量，全局统一管理，项目中用的比较多的就是全局颜色值管理

```less
// 编译前
@width: 10px;
@height: @width + 10px;
@bgColor: #fff;

#header {
  width: @width;
  height: @height;
	background-color:@bgColor;
	@bdColor: #ccc;
	#logo{
		border: 1px solid @bdColor;	
	}
}

// 编译后
#header {
  width: 10px;
  height: 20px;
	background-color: #fff;
}
#header #logo{
	border: 1px solid #ccc;
}
```

> 变量有作用域特性,上面示例中@bdcolor属于局部作用域,其它变量是全局的
> 

**变量的一些进阶用法**

```less
// 编译前
@my-selector: banner;
.@{my-selector} {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}

// 编译后
.banner {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}

--------------------------------------------------
// 编译前
@images: "../img";
body {
  color: #444;
  background: url("@{images}/white-sand.png");
}

// 编译后
body {
  color: #444;
  background: url("../img/white-sand.png");
}

--------------------------------------------------
// 编译前
@property: color;
.widget {
  @{property}: #0ee;
  background-@{property}: #999;
}

// 编译后
.widget {
  color: #0ee;
  background-color: #999;
}

--------------------------------------------------
// 编译前
@primary:  green;
@secondary: blue;
.section {
  @color: primary;
  .element {
    color: @@color;
  }
}

// 编译后
.section .element {
  color: green;
}

--------------------------------------------------
// 编译前
.block {
  color: red; 
  .inner {
    background-color: $color; 
  }
  color: blue;  
}

// 编译后
.block {
  color: red; 
  color: blue;  
} 
.block .inner {
  background-color: blue; 
}
```

## 混合**（Mixins）**

将一组属性从一个规则集包含（或混入）到另一个规则集的方法

### 最简单的混合方式

```less
// 编译前
.clearFix {
  *zoom:1;
	&:after{
		content: '';
		display: block;
		clear: both;
	}
}
#menu {
	.clearFix();
}

// 编译后
#menu{
  *zoom:1;
}
#menu:after{
  	content: '';
		display: block;
		clear: both;
}
```

### 带参数的混合方式：

参数可以有多个，也支持设置默认值，可以精简css的写法

```less
// 编译前
.bdmix(@width, @style:solid, @color:#00f){
	border: @width @style @color;
}
.box0{
	.bdmix(1px);
}
.box1{
	.bdmix(2px, dotted, #f00);
}

// 编译后
.box0{
	border: 1px solid #00f;
}
.box1{
	border: 2px dotted #f00;
}
```

混合传参支持arguments变量，适用于对参数无顺序要求的场景

```less
// 编译前
.bdmix(@width, @style:solid, @color:#00f){
	border: @agruments;
}
.box0{
	.bdmix(1px);
}

// 编译后
.box0{
	border: 1px solid #00f;
}
```

模式匹配

```less
// 编译前
.bdmix(top, @width:1px){
	border-top: @width solid red;
}
.bdmix(left, @width:1px){
	border-left: @width solid red;
}
.bdmix(right, @width:1px){
	border-right: @width solid red;
}
.bdmix(bottom, @width:1px){
	border-bottom: @width solid red;
}
// 默认匹配值
.bdmix(@_, @width:1px){
	width:100px;
}
.box0{
	.bdmix(top);
}
.box1{
	.bdmix(left, 2px);
}
.box2{
	.bdmix(right, 2px);
}
.box3{
	.bdmix(bottom, 2px);
}

// 编译后
.box0{
	border-top: 1px solid red;
	width:100px;
}
.box1{
	border-left: 2px solid red;
	width:100px;
}
.box2{
	border-right: 1px solid red;
	width:100px;
}
.box3{
	border-bottom: 2px solid red;
	width:100px;
}
```

命名空间

```less
// 编译前
.blue{
	.button{
		background-color: blue;
	}
}
.red{
	.button{
		background-color: red;
	}
}
.box1{
	.red > .button
}

// 编译后
.box1{
	background-color: red;
}
```

**混合的进阶用法**

```less
// 编译前
.foo (@bg: #f5f5f5, @color: #900) {
  background: @bg;
  color: @color;
}
.unimportant {
  .foo();
}
.important {
  .foo() !important;
}

// 编译后
.unimportant {
  background: #f5f5f5;
  color: #900;
}
.important {
  background: #f5f5f5 !important;
  color: #900 !important;
}

--------------------------------------------------
// 编译前
.mixin(@color: black; @margin: 10px; @padding: 20px) {
  color: @color;
  margin: @margin;
  padding: @padding;
}
.class1 {
  .mixin(@margin: 20px; @color: #33acfe);
}
.class2 {
  .mixin(#efca44; @padding: 40px);
}

// 编译后
.class1 {
  color: #33acfe;
  margin: 20px;
  padding: 20px;
}
.class2 {
  color: #efca44;
  margin: 10px;
  padding: 40px;
}
```

## **映射（Maps）**

从 Less 3.5 版本开始，你还可以将混合（mixins）和规则集（rulesets）作为一组值的映射（map）使用

```css
// 编译前
#colors() {
  primary: blue;
  secondary: green;
}

.button {
  color: #colors[primary];
  border: 1px solid #colors[secondary];
}

// 编译后
.button {
  color: blue;
  border: 1px solid green;
}
```

## 继承（Extend）

将它所使用的选择器的样式与它所引用的选择器样式相合并

```less
// 编译前
nav ul {
  &:extend(.inline);
  background: blue;
}
.inline {
  color: red;
}

// 编译后
nav ul {
  background: blue;
}
.inline, nav ul {
  color: red;
}
```

## 注释**（Comments）**

支持通过//和/**/添加注释，//的注释不会带入解析后的css文件中，/**/是css的代码注释，会带入解析后的css文件中

## 其它

### Math函数

```less
// 编译前
.sizemix(@width, @height, @padding){
	width: round(@width)*1px;
	height: ceil(@height)*1px;
	padding: floor(@padding)*1px;
}
.box0{
	.sizemix(100.2, 99.2, 10.2)
}

// 编译后
.box0{
	width: 100px;
	height: 100px;
	padding: 10px;
}
```

### **导入（Importing）**@import

```less
@import "common.less";
@import "lib.css";
```

### 避免编译 ~

```less
// 编译前
@rem: 10rem;
.box{
	width: 100/10rem;
	font: (12/@rem)~"/"(20/@rem) "宋体";
}

// 编译后
.box{
	width: 10rem;
	font: 1.2rem/2rem "宋体";
}

// 编译前,从 Less 3.5 开始 @min768: ~"(min-width: 768px)"; 可以直接写成@min768: (min-width: 768px);
// 在 Less 3.5+ 版本中，许多以前需要“引号转义”的情况就不再需要了
@min768: ~"(min-width: 768px)";
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}

// 编译后
@media (min-width: 768px) {
  .element {
    font-size: 1.2rem;
  }
}
```

### Less插件

通过手less插件，可以在less中实现一些JS才能完成的任务

```less
// 插件代码
module.exports = {
    install: function(less, pluginManager, functions) {
        functions.add('pi', function() {
            return Math.PI;
        });
    }
};

// 解析前
@plugin "my-plugin";
.show-me-pi {
  value: pi();
}

// 解析名
.show-me-pi {
  value: 3.141592653589793;
}
```

官方详细文挡：[https://less.bootcss.com/#概览](https://less.bootcss.com/#%E6%A6%82%E8%A7%88)