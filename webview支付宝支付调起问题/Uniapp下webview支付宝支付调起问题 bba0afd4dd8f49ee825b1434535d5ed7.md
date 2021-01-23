# Uniapp下webview支付宝支付调起问题

### 前情

---

uni-app是我很喜欢的跨平台框架，它能开发小程序，H5,APP(安卓/iOS),对前端开发很友好，自带的IDE让开发体验也很棒，公司项目就是主推uni-app。

因疫情影响，公司不能组织聚餐和其它福利活动，公司决定在公司自己园区app里接入友商的商城，通过商城来发放福利。

### 坑位

---

考虑到开发成本，我们会以webview的方式接入第三方商城，一切都很顺利，但是在IOS下支付无法唤起支付宝，会报错误 Blocked a frame with origin "[https://mclient.alipay.com](https://mclient.alipay.com/)" ，详情见下图：

![Uniapp%E4%B8%8Bwebview%E6%94%AF%E4%BB%98%E5%AE%9D%E6%94%AF%E4%BB%98%E8%B0%83%E8%B5%B7%E9%97%AE%E9%A2%98%20bba0afd4dd8f49ee825b1434535d5ed7.jpg](Uniapp%E4%B8%8Bwebview%E6%94%AF%E4%BB%98%E5%AE%9D%E6%94%AF%E4%BB%98%E8%B0%83%E8%B5%B7%E9%97%AE%E9%A2%98%20bba0afd4dd8f49ee825b1434535d5ed7.jpg)

论坛百度逛了一天，始终没找到解决方法，差点决定走h5支付。

### Why?

---

HBuilderX 2.3.4+版本已将iOS上所有webview的默认内核由UIWebview调整为WKWebview，但是支付宝支付不支持WKWebview下唤起支付宝。

### 解决方案

---

1. 把WKWebview切换成UIWebview,但是你无法过审，显然不行
2. 通过伪造浏览器ua来绕过这个坑，把浏览器ua伪造成UIwebview或者Safari浏览器 [论坛贴地址](https://ask.dcloud.net.cn/question/80031)

### 关键代码

---

uniapp可以通过配置manifest.json文件下useragent/useragent_ios/useragent_android来达到伪造的目地，此处只针对ios,所以选用useragent_ios [官方文挡](https://uniapp.dcloud.io/collocation/manifest)。

```jsx

	"useragent_ios": {
			"value": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
			"concatenate": true
		}
```

考虑到苹果它自身的浏览器应该是在苹果系统下最靠谱了，所以此处是伪造成Safari浏览器,亲测成功调起，爬出一坑。