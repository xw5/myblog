# Uniapp input的v-model问题

### 前情

uni-app是我很喜欢的跨平台框架，它能开发小程序，H5,APP(安卓/iOS),对前端开发很友好，自带的IDE让开发体验也很棒，公司项目就是主推uni-app。

### 坑位

最近在做一个input字数限制的需求，用v-model+watch实现字数限制的时候发现双向绑定效果失效了。

### Why?

猜测是uniapp的BUG，可能表单的内容自己的输入要晚于你所绑定v-model的值的更新

### 解决方案

在watch中做限制的时候加上一点延时即可解决，参数代码如下：

template代码如下:

```html
...
<input class="uni-input" placeholder="请设置群名称" v-model="newName" />
...
```

- script中代码如下：

```jsx
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