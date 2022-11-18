# Git clone报错“Connection was reset, errno 10054”

### 前情

最近在使用一个UI库的时候，发现其中一个BUG，于是想尝试提一个PR。

### 坑位

我平时习惯用https的方式拉取代码，发现在clone代码的时候一直失败，错误提示：OpenSSL SSL\_read：Connection was reset, errno 10054

### Why?

从错误提示看提示看应该是SSL证书验证有问题。

### 解决办法

#### 方式1

关闭git的https证书验证

```bash
git config --global http.sslVerify false
```

#### 方式2

换成SSH的方式，也就<git@github.com>:.git这样的链接拉取代码
