# Uniapp onReachBottom钩子触发问题

### 前情

uni-app是我很喜欢的跨平台框架，它能开发小程序，H5,APP(安卓/iOS),对前端开发很友好，自带的IDE让开发体验也很棒，公司项目就是主推uni-app。

最近有多个需求，页面滚动到底的时候应该加载下一页数据，于是通过页面生命周期钩子onReachBottom来实现。

### 坑位

onReachBottom是当页面滚动底一定距离的时候触发，但是滚动到底后，如果没有数据加载出来，想再一次触发那就得手动回滚一点再往上滚才会触发。

### Why?

因为onReachBottom的触发机制就是页面滚动到底一定距离的时候触发，具体多少见pages.json里设置的onReachBottomDistance。

### 解决方案

即然滚动到一定距离才触发，那当我们知道已经滚动到底了的时候，且没有下一页数据的时候，我们代码手动往回滚比onReachBottomDistance设置的多一点点距离就好了。

- 在页面生命周期onPageScroll钩子里做回滚操作

```jsx
...
/**
 * 监听页面滚动
 * @param {Object} detail
 */
onPageScroll(detail) {
	clearTimeout(this.scrollTimer);
	this.scrollTimer = setTimeout(() => {
		if (this.noDateStatus) {
			this.noDateStatus = false;
			uni.pageScrollTo({
				scrollTop: detail.scrollTop - 25,
				duration: 100
			});
		}
	}, 300);
},
...
```

- 在pages.json配置临界距离，此处为滚动到距底部20px的时候触发onReachBottom

```jsx
{
      "path": "页面路径",
      "style": {
        "navigationBarTitleText": "我是页面",
				"onReachBottomDistance": 20
      }
    }
```

至此，已完成了每次滚动到最底的时候都能自动回滚等待下一次的滚动操作，如果你有更好的方式，期待你的分享。