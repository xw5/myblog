# nvm安装node.js无法使用

### 前情

---

最近在使用某此第三方模块需要依赖不同的node版本，于是想通nvm来管理node版本

### 坑

---

网上下载nvm-window的安装包，一步步傻瓜式安装下去，发现nrm无法使用，设置环境变量也没有用，再重启后解决了，但是通过nvm安装的node没法使用，一直报：“node”不是内部或外部命令，也不是可运行的程序或批处理文件。

### 解决方案

---

1. 安装路径最好是直接安装在C盘，目录中不能有中文
2. 第一次弹窗是指定nvm的安装路径，第二次弹窗使用的路径设置为第一次你指定的路径+\nodejs
3. 安装完后再去第一次弹窗指定的nvm的安装路径下新建nodejs文件夹

参考链接：[https://blog.csdn.net/spark333/article/details/103742276](https://blog.csdn.net/spark333/article/details/103742276)