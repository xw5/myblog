# window下cmd显示乱码

### 前情

---

最近在维护一些老项目，本地开发环境跑不起来，需要根据cmd中的报错来解决一些环境问题

### 坑位

---

在解决环境错误的时候，cmd命令行日志打印出来的是一堆乱码，导致看不清具体是什么错误

### **Why?**

---

cmd行打印的日志乱码，很大可能是因为cmd命令行窗口字符编码不匹配导致

### 解决方案

---

**方式1**：命令行中执行：chcp 65001

chcp是一个计算机指令，能够显示或设置活动代码页编号

| 代码页 | 描述 |
| --- | --- |
| 65001 | UTF-8代码页 |
| 950 | 繁体中文 |
| 936 | 简体中文默认的GBK |
| 437 | MS-DOS 美国英语 |

但是这只是临时方案，chcp只对当前窗体有效，窗体关闭或重开都会失效，每次都要重新切换

**方式2**：修改注册表达到永久生效

window + r打开运行框，输入regedit，进入注册表，找到HKEY_CURRENT_USER\Console\%SystemRoot%_system32_cmd.exe，新建一个 DWORD（32位值）,命名为CodePage，值设为65001，已有CodePage的话，修改它，改为十进制，65001

**方式3**：也是修改注册表的方式，但是相比2要方便一些，新建一个后辍为.reg的文件，通过记事本新建一个.txt文件，再修改后辍为.reg,内容如下：

```bash
Windows Registry Editor Version 5.00 
[HKEY_CURRENT_USER\Console\%SystemRoot%_system32_cmd.exe] 
"CodePage"=dword:0000fde9 
"FontFamily"=dword:00000036 
"FontWeight"=dword:00000190 
"FaceName"="Consolas" 
"ScreenBufferSize"=dword:232900d2 
"WindowSize"=dword:002b00d2
```

保存后，再双击该文件即可