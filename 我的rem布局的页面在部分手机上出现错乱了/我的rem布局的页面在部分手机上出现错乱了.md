# 我的rem布局的页面在部分手机上出现错乱了

### 前情

最近在开发一个移动端运营活动项目，对于移动端的布局适配方案有很多种，这次项目我选择了 rem布局方案。

### 坑位

我在自测的时候发现在其中一款机型上尺寸偏大，而且有显示的错位。

### Why?

在安卓手机上使用rem布局，如果用户调整当前系统的显示字体大小，会导致页面rem布局出现问题，个人猜测是当调整了系统显示字体大小的时候会等比缩放浏览器html的字体大小。

### 解决方案

把自己计算设置的html的fontsize值和获取到的html真实字体大小做对比，如果不一致就再进行一次缩放，以使真正的html字体大小和rem计算的html字体大小一致。

举个例了：代码rem适配本来想设html字体大小为100px，但是因为系统调整了字体大小，把我的html字体放大到了200px，如果我想当html被放大后的字体大小还是100px，那我们就得设置html的字体大小为50px即可，关键代码如下：

```html
<script>
      (function(doc, win) {
        var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
				// 获取html上字体大小
        getFontSize = function() {
          var fontSize = 0;
          if (document.documentElement.currentStyle) {
            fontSize = document.documentElement.currentStyle.fontSize;
          }
          if (window.getComputedStyle) {
            fontSize = window.getComputedStyle(document.documentElement, false).fontSize;
          }
          return parseFloat(fontSize);
        },
				// 设置html的font-size
        calculateHtmlFontSize = function() {
          var clentWidth = docEl.clientWidth;
          var container = doc.getElementById('app');
          // 最大显示540宽
          if (clentWidth >= 540) {
            docEl.style.fontSize = '50px';
            container.style.width = '540px';
          } else {
						// 这里除以10.8是因为我的设计稿是1080，
						// 如果你的设计稿是750,可以除以7.5，这样保证你当前设计稿下的html字体大小是100，
						// 这样你在换算的时候就能很简单的除以100得到rem值
            var remFontSize = clentWidth / 10.8;
            docEl.style.fontSize = remFontSize + 'px';
            container.style.width = 'auto';
            // 修正系统字体调整造成的布局问题
            var realitySize = getFontSize();
            if (realitySize && parseInt(remFontSize) !== parseInt(realitySize)) {
              remFontSize = remFontSize * remFontSize / realitySize;
              docEl.style.fontSize = remFontSize + 'px';
            }
          }
        };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, calculateHtmlFontSize, false);
        doc.addEventListener('DOMContentLoaded', calculateHtmlFontSize, false);
      })(document, window);
    </script>
```