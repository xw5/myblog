# electron项目icon显示异常

### 前情

---

公司有个桌面端项目是基于Electron开发的。

### 坑

---

构建打包好的项目在桌面和任务栏上图标显示正常，但是在任务栏弹框上左上角的图标确不显示

### Why?

---

经过反复搜索，网上有文章说如果ico图标过大会导致这类问题，于是看了下我项目中ico图标大小，吓一跳，竟然有210K，而源png只有20K

### 解决方案

---

重新生成ico图标，在网上尝试了二个网址，20K的png转成ico图标大小都长了十倍左右，最终还是找到满意的在线工具了，生成的ico和PNG大小基本持平，在线转换工具地址如下：[https://convertio.co/zh/image-converter/](https://convertio.co/zh/image-converter/)

在如上地址重样生成新的ico文件，再替换掉旧的ico图标，重新打包，自测完美解决问题。

参考网址：[https://segmentfault.com/q/1010000019780156](https://segmentfault.com/q/1010000019780156)