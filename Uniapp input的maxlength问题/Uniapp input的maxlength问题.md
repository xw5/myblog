# Uniapp input的maxlength问题

### 前情

uni-app是我很喜欢的跨平台框架，它能开发小程序，H5,APP(安卓/iOS),对前端开发很友好，自带的IDE让开发体验也很棒，公司项目就是主推uni-app。

### 坑位

最近在做一个input字数限制的需求，但是对于如果你输入有emoji表情的时候会出现在APP端和h5端表现不一致，app端表情算一个长度，而H5端则算2个。

### Why?

猜测是uniapp的兼容BUG，app端和h5端未处理成一致

### 解决方案

对于有emoji的场景暂时放弃使用 maxlength，通过使用v-model+watch+lodash来实现，lodash字符串转数组的时候会把表情当一位处理，于是有如下代码。

template代码如下:

```html
...
<input class="uni-input" placeholder="请设置群名称" v-model="newName" />
...
```

- script中代码如下，对于为什么要延时100毫秒见的另一篇博文[https://www.cnblogs.com/xwwin/p/16696448.html](https://www.cnblogs.com/xwwin/p/16696448.html)：

```jsx
import { toArray } from 'lodash';
...
watch: {
		newName(newVal) {
			let nameArr = toArray(newVal);
			if (nameArr.length <= 28) {
				return;
			}
			nameArr = nameArr.slice(0, 28);
			setTimeout(() => {
				this.newName = nameArr.join('');
			}, 100);
		}
	}
...
```

至此完成了input字数限制28个的需求，如果你有更好的方式，期待你的分享。