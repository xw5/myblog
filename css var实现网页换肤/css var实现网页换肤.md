# css var实现网页换肤

### **前情**

最近在做需求开发，要求根据后台传来的配置对网页换肤，按以往的换肤思路应该是写好几套样式做切换达到换肤效果，但是现在想做到能根据后台配置动态修改。

### 原理

通过css3新增变量特性，把颜色定义为变量再全局使用，在想更改颜色的时候，我们只要修改对应变量对应的颜色就能全局换肤，主要原理演示代码如下：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
  <style type="text/css">
		:root {
      --main-bg-color: red;
    }
    .test{
      width: 500px;
      height: 100px;
      background-color: green;
      background-color: var(--main-bg-color);
    }
  </style>
</head>
<body>
  <div class="test"></div>
</body>
</html>
```

演示地址：[https://jsbin.com/lozizajuva/edit?html,output](https://jsbin.com/lozizajuva/edit?html,output)

### 换肤实战

1. 通过颜色配置表生成一个包含所有css变量的style插入到head中
2. 所有css中需要进行颜色替换的都通过css变量来设置
3. 动态更换主题的话只要替换上面生成style里的内容即可

**演示代码**

html结构

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
  <style>
    body{
      --test-var: 'green';
    }
    .test{
      width: 500px;
      height: 100px;
      /* 低版本不兼容的浏览器也有个默认颜色 */
      background-color: blue;
      background-color: var(--main-color)
    }
    .test_in{
      width: 100px;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      background-color: #dddddd;
      /* 低版本不兼容的浏览器也有个默认颜色 */
      color: blue;
      color: var(--main-color);
    }
  </style>
</head>
<body>
  <div class="test">
    <div class="test_in">css var换肤</div>
  </div>
  
  <select id="themeSelect">
    <option value ="deault">默认</option>
    <option value ="red">红色</option>
    <option value="green">绿色</option>
</select>
</body>
</html>
```

javascript

```jsx
// 颜色配置表，测试数据，正常是从服务端过来的
const THEME_CONFIG = {
  "default": {
    "--main-color": "blue"
  },
  "red": {
    "--main-color": "red"
  },
  "green": {
    "--main-color": "green"
  }
}

// 存储当前用的是什么色系
let currentConfig = THEME_CONFIG['default'];
// 备份styles
let stylesBackups = null;

/**
 * 生成主题代码段
 * @param {Object} config 
 * @returns 
 */
function createThemeStyle(config) {
  let result = `
  :root {
    --main-color: ${config['--main-color']};
  }`
  return result;
}

/**
 * 插入主题style段
 * @param {String} styleString
 */
function insertThemeStyle(styleString) {
  let styleTag = document.querySelector('#themeStyleTag');
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'themeStyleTag';
    styleTag.setAttribute('type', 'text/css');
    document.getElementsByTagName('head')[0].insertBefore(styleTag, document.getElementsByTagName('style')[0]);
  }
  styleTag.innerHTML = styleString;
}

/**
 * 判断css变量是否被支持
 */
function cssVarIsSupport() {
  var testVar = getComputedStyle(document.body).getPropertyValue("--test-var");
  return testVar ? true : false;
}

/**
 * 解决兼容，根据主题配置生成正则
 * @returns string
 */
function createStyleRegex() {
  let regexStr = '';
  let varList = Object.keys(currentConfig);
  for(let i=0,len=varList.length; i<len; i++) {
    regexStr += `var\\(${varList[i]}\\)${i<len-1 ? '|' : ''}`;
  };
  return regexStr;
}

/**
 * css变量兼容处理-第一次
 */
function compatibleProcessingCssVar() {
  let styles = document.getElementsByTagName('head')[0].getElementsByTagName('style');
  stylesBackups = {};
  // 生成正则匹配规则字符串
  let regexStr = createStyleRegex();
  // 遍历所有style标签替换
  for(let i=1,len=styles.length; i<len; i++) {
    let item = styles[i];
    let replaceReg = new RegExp(regexStr, 'g');
    let styleStr = item.innerHTML;
    if (!replaceReg.test(styleStr)) {
      continue;
    }
    if (!stylesBackups['theme'+i]) {
      item.setAttribute('id', 'theme'+i);
      stylesBackups['theme'+i] = styleStr;
    }
    styleStr = styleStr.replace(replaceReg, function(mactchStr) {
      return currentConfig[mactchStr.split(/\(|\)/)[1]];
    });
    item.innerHTML = styleStr;
  }
}

/**
 * 解决兼容浏览器的动态换肤问题
 * css变量兼容处理-后面不需再去获取所有style，通过从内存中拿缓存的style来做字符串替换
 */
 function compatibleProcessingCssVarFromCache() {
  // 生成正则匹配规则字符串
  let regexStr = createStyleRegex();
  let styleKeys = Object.keys(stylesBackups);
  // 遍历所有style标签替换
  for(let i=1,len=styleKeys.length; i<len; i++) {
    let key = styleKeys[i];
    let styleStr = stylesBackups[key];
    let replaceReg = new RegExp(regexStr, 'g');
    styleStr = styleStr.replace(replaceReg, function(mactchStr) {
      return currentConfig[mactchStr.split(/\(|\)/)[1]];
    });
    document.getElementById(key).innerHTML = styleStr;
  }
}

/**
 * 适配主题
 * @param {string} theme 
 */
function adaptationTheme(theme) {
  // 获取颜色列表
  currentConfig = THEME_CONFIG[theme];
  // 对于兼容css var的浏览器
  if (cssVarIsSupport()) {
    // 生成style
    let styleString = createThemeStyle(currentConfig);
    // 插入style中
    insertThemeStyle(styleString)
  } else {
    // 对于不兼容css var的浏览器（chrome49、ie15以下）
    if (stylesBackups) {
      compatibleProcessingCssVarFromCache();
      return;
    }
    compatibleProcessingCssVar();
  }
}
window.onload = function(){
  adaptationTheme('default');
  
  // 动态更换主题
  document.querySelector('#themeSelect').addEventListener('change', function() {
    adaptationTheme(this.value)
  }, false)
}
```

注意事项：

如果想兼容低版本浏览器则需要所有样式通过style写入，因为在做兼容处理的时候，是通过js代码替换掉style标签里的css变量来做兼容处理的，上面代码有做低版本兼容，对于不需要兼容低版本浏览器的，上面代码可以删减掉兼容代码。

演示地址：[https://jsbin.com/tetuguxifi/1/edit?html,js,output](https://jsbin.com/tetuguxifi/1/edit?html,js,output)