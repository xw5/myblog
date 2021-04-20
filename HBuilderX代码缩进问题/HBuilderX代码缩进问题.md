# HBuilderX代码缩进问题

### 前情

uni-app是我很喜欢的跨平台框架，它能开发小程序，H5,APP(安卓/iOS),对前端开发很友好，自带的IDE让开发体验也很棒，公司项目就是主推uni-app，自然也是用官方自带的IDE了

### 坑位

最近发现提交的代码在同事做代码审核的时候一直说我代码缩进有问题，但是我在编辑器里看一点问题都没有

### Why?

个人猜测是因为我习惯用tab来做缩进，tab在git里显示的空格数并不是我们定义的规范2个空格，而在编辑器里我是把tab定义成了二个空格的宽

### 解决方案

通过修改HBuilderX配置可以做到把tab自动替换成空格解决上面问题

![HBuilderX%E4%BB%A3%E7%A0%81%E7%BC%A9%E8%BF%9B%E9%97%AE%E9%A2%98%200d4b58daeace4c8aaa59c1d2a4ff1dd4/tab-space.png](HBuilderX%E4%BB%A3%E7%A0%81%E7%BC%A9%E8%BF%9B%E9%97%AE%E9%A2%98%200d4b58daeace4c8aaa59c1d2a4ff1dd4/tab-space.png)