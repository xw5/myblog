# 前端好用API之Fullscreen

### **前情**

在前端开发需求中，特别网页有视频需求时，需要做视频全屏功能，或者在某些可视化大屏项目也要做全屏。

### Fullscreen****介绍****

 让你可以简单地控制浏览器，使得一个元素与其子元素，如果存在的话，可以占据整个屏幕，并在此期间，从屏幕上隐藏所有的浏览器用户界面以及其他应用

**调用方式：**

```jsx
/**
* 指定元素进入全屏模式
* @param {element} element
*/
function launchFullScreen(element) {
	if(element.requestFullscreen) {
		element.requestFullscreen();
	} else if(element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if(element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	} else if(element.msRequestFullscreen) {
		element.msRequestFullscreen();
	}
}
```

相关API：

| document.exitFullscreen() | 让当前文档退出全屏模式，跟requestFullscreen一样要做好兼容前辍处理 |
| --- | --- |

相关属性：

| document.fullscreenElement | 被展示为全屏模式的element |
| --- | --- |
| document.fullscreenEnabled | 表示全屏模式是否可用 |

相关事件：

| element.onfullscreenchange | 指定元素全屏事件发生时，事件发送到该元素，表明该元素进入或退出全屏模式 |
| --- | --- |
| element.onfullscreenerror | 指定元素变全屏模式时出现错误，该事件将被发送到指定的元素上 |

### 浏览器提供的一些css控制规则

```css
/* element为当前全屏的元素 */
element:-webkit-full-screen {
/* properties */
}

element:-moz-fullscreen {
/* properties */
}

element:-ms-fullscreen {
/* properties */
}

element:fullscreen {
/* properties */
}
```

### 使用示例

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Fullscreen测试</title>
  <style type="text/css">
    *{
      padding:0;
      margin: 0;
    }
    .fullscrenn_element{
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: green;
      color: #fff;
    }
		.fullscrenn_element:-webkit-full-screen{
			background-color: red;
		}
		
		.fullscrenn_element:-moz-fullscreen{
			background-color: red;
		}
		
		.fullscrenn_element:-ms-fullscreen{
			background-color: red;
		}
		
		.fullscrenn_element:fullscreen{
			background-color: red;
		}
  </style>
</head>
<body>
  <div class="fullscrenn_element">全屏</div>
  <script type="text/javascript">
    var elementWrap = document.querySelector('.fullscrenn_element');

    if (fullscreenEnabled()) {
      init();
    } else {
      console.log('全屏模式不可用！');
    }

    function init() {

      addEvent(elementWrap);
  
      elementWrap.addEventListener('click', function() {
        console.log('--当前全屏元素--：', document.fullscreenElement);
        if (document.fullscreenElement) {
          cancelFullScreen(elementWrap);
        } else {
          launchFullScreen(elementWrap)
        }
      }, false);
    }

    /*
    * 检测当前是否支持全屏
    */
    function fullscreenEnabled() {
      return document.fullscreenEnabled || 
      document.webkitFullscreenEnabled || 
      document.mozFullscreenEnabled ||
      document.msFullscreenEnabled
    }

    /**
    * 指定元素进入全屏模式
    * @param {element} element
    */
    function launchFullScreen(element) {
      if(element.requestFullscreen) {
        element.requestFullscreen();
      } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }

    /**
    * 退出全屏模式
    */
    function cancelFullScreen() {
      if(document.exitFullscreen) {
        document.exitFullscreen();
      } else if(document.mozExitFullscreen) {
        document.mozExitFullscreen();
      } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if(document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

    /*
    * 绑定全屏事件
    * param {Element} element
    */
    function addEvent(element) {
      var fullscreenchangeEvt = '';
      if ('onwebkitfullscreenchange' in element) {
        fullscreenchangeEvt = 'webkitfullscreenchange';
      }
      if ('onmozfullscreenchange' in element) {
        fullscreenchangeEvt = 'mozfullscreenchange';
      }
      if ('onmsfullscreenchange' in element) {
        fullscreenchangeEvt = 'msfullscreenchange';
      }
      if ('onfullscreenchange' in element) {
        fullscreenchangeEvt = 'fullscreenchange';
      }
      element.addEventListener(fullscreenchangeEvt, function(e) {
        console.log('--fullscreenchange--:', fullscreenchangeEvt, e);
      }, false);
    }

  </script>
</body>
</html>
```