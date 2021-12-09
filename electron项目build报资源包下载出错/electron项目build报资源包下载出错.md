# electron项目build报资源包下载出错

### 前情

---

公司有个桌面端项目是基于Electron开发的。

### 坑

---

上一次遇到npm install时安装electron无法安装，通过配置.npmrc文件解决了，今天在在执行npm run build的时候一直报如下面的错，npmrc也无效

![electron-builder报错](E:\study\myblog\electron项目build报资源包下载出错\electron-builder报错electron.png)

![electron-builder报错](E:\study\myblog\electron项目build报资源包下载出错\electron-builder报错.png)

[nsis-resources-3.4.1.7z](https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-resources-3.4.1/nsis-resources-3.4.1.7z)下载报错：[https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-resources-3.4.1/nsis-resources-3.4.1.7z](https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-resources-3.4.1/nsis-resources-3.4.1.7z)

winCodeSign-2.6.0 下载失败：[https://github.com/electron-userland/electron-builder-binaries/releases](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Felectron-userland%2Felectron-builder-binaries%2Freleases)

### Why?

---

看提示应该是跟网络有关，有可能是公司网络做了限制了，还有可能是资源在国外，想顺利安装需要科学上网，但是不知道为什么我使用cnpm或者使用淘宝源安装也不行，有可能是淘宝源有部分包并不全吧。

### 解决方案

---

方案1：科学上网搞起，可以解决很多包失败问题

方案2：看提示应该是各资源包下载失败，解决办法是复制对应的错误提示里的地址手动下载安装包，分别复制到对应目录即可解决

![electron放置目录](E:\study\myblog\electron项目build报资源包下载出错\dir_electron.png)

![nsis放置目录](E:\study\myblog\electron项目build报资源包下载出错\dir_nsis.png)

![nsis-resources目录](E:\study\myblog\electron项目build报资源包下载出错\dir_nsis-resources.png)

![winCodeSign目录](E:\study\myblog\electron项目build报资源包下载出错\dir_winCodeSign.png)

上述资源做了整合放在csdn:[https://download.csdn.net/download/u011669024/59493665](https://download.csdn.net/download/u011669024/59493665)

参考链接：[https://www.jianshu.com/p/35abb68d0331](https://www.jianshu.com/p/35abb68d0331)