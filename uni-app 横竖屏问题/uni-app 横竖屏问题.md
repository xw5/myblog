# uni-app 横竖屏问题

### 前情

uni-app是我很喜欢的跨平台框架，它能开发小程序，H5,APP(安卓/iOS),对前端开发很友好，自带的IDE让开发体验也很棒，公司项目就是主推uni-app

### 坑位

最近有用户反馈闪屏页也叫启动页会出现横屏，收到反馈后自测发现确实是有横屏问题，而且横屏进入页面会乱，即使已切到竖屏。

### Why?

因为页面内主要使用rpx单位布局，横屏进入的时候rpx以宽的一边来做转换了，导致页面布局乱。

### 解决方案

在page.json页添加如下配置

```json
"globalStyle": {
    ...
    "pageOrientation": "portrait"
  }
```

同时去掉manifest.json下如下这些配置

```json
// 屏幕方向
    "screenOrientation": [
      "portrait-primary",
      "landscape-primary",
      "portrait-secondary",
      "landscape-secondary"
    ],
		...
		"distribute": {
			"orientation":[
	      "portrait-primary",
	      "landscape-primary",
	      "portrait-secondary",
	      "landscape-secondary"
	    ]
		}
```

注：在开发中发现，按如上配置，闪屏页确实不会出现横屏，但是还是会出现错乱问题，多翻测试发现是因为uni-app自身的BUG，新版已做修复，更新到新版即可。

### 其它点：单页更换横竖屏怎么做？

在需要切换横竖屏的页面添加如下代码

```jsx
onLoad(){
	// #ifdef APP-PLUS
	   plus.screen.lockOrientation('default'); 
	// #endif
	...
}
...
onUnload(){
	// #ifdef APP-PLUS
	   plus.screen.lockOrientation('portrait-primary'); 
	// #endif
}
```

在不需要横竖屏切换的页面添加如下代码

```jsx
onLoad(){
	// #ifdef APP-PLUS
	   plus.screen.lockOrientation('portrait-primary'); 
	// #endif
	...
}
...
onUnload(){
	// #ifdef APP-PLUS
	   plus.screen.lockOrientation('portrait-primary'); 
	// #endif
	...
}
```