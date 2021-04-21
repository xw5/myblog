# webpack-devserver配置https

### **前情**

最近在做一个浏览器通知的交互需求，但是查阅官方文挡，浏览器通知需要在https环境下才能工作，于是就研究怎么在开发环境下配置一个https服务器

### **STEP1 安装Chocolatey**

Chocolatey是Windows上的包管理工具，使用它可以使用命令行安装程序，使用管理员权限打开cmd，再运行如下代码，一路确认允许即可安装成功

```bash
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

### **STEP2 安装mkcert**

mkcert是用来生成证书的软件，使用下列命令安装mkcert，同样要用管理员权限运行cmd

```bash
choco install  mkcert -y
```

### **STEP3 生成根证书**

```bash
mkcert -install
```

### **STEP4 生成域名证书**

先要指定生成的域名本地证书的存放目录，此处我以D盘下ca目录，生成test.dev域名证书做演示，详细命令行如下

```bash
D:
mkdir ca
cd ca
mkcert test.dev
```

### **STEP5 拷贝证书目录到项目下**

把上面生成test.dev-key.pem和test.dev.pem拷贝到项目目录下，此处我是在项目根目录下新建https存放

### **STEP6 配置devServer开启https**

```jsx
devServer: {
    host: "jydeng.dev",
    port: 80,
    disableHostCheck: true,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "./https/test.dev-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "./https/test.dev.pem")),
    },
  }
```

### STEP7 修改host

我平时习惯用switchhost来管理电脑的host，也可以手动修改C:\Windows\System32\drivers\etc\hosts

```jsx
127.0.0.1 test.dev
```

### STEP8 启动webpack-devserver

浏览器打开test.dev,就可以看到已经是运行在https环境下了。

![演示图片](./https-cert.png)