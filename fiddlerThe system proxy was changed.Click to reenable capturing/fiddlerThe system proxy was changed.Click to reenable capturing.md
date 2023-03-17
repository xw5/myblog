# fiddler:The system proxy was changed.Click to reenable capturing

### 前情

---

最近在开发一个老旧项目，由于本地环境已难跑起，于是想通过代理线上代码进行功能开发。

### 坑位

---

启动fiddler后，fiddler菜单栏会警告，大概意思是代理被更改了，点击重启fillder代理，但是点击后用一会又会出现重复警告。

### **Why?**

---

应该是个别软件在后台一直修改代理设置导致fiddler失效

### 解决方案

---

百度搜索解决方案，网上也有很多人说跟EasyConent有关，一回想我确实前段时间安装了它，于是删掉它，重启fiddler，一切恢复正常