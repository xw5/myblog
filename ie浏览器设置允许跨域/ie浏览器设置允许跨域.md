# ie浏览器设置允许跨域

### **前情**

在访问测试搭建的测试环境的时候，发现接口因为跨域全部失败了，服务端又没有时间设置允许跨域，又急于使用，于是想到是不是可以使用跨域浏览器，上一次已解决chrome允许跨域，这一次来设置IE允许跨域

### 放开IE的跨域设置步骤

1. 启动IE，点击工具→Internet选项

    ![Untitled](ie%E6%B5%8F%E8%A7%88%E5%99%A8%E8%AE%BE%E7%BD%AE%E5%85%81%E8%AE%B8%E8%B7%A8%E5%9F%9F%20fcc6761fa63e4913a5a7a190f4bcad9d/Untitled.png)

2. 选择安全→自定义级别

    ![Untitled](ie%E6%B5%8F%E8%A7%88%E5%99%A8%E8%AE%BE%E7%BD%AE%E5%85%81%E8%AE%B8%E8%B7%A8%E5%9F%9F%20fcc6761fa63e4913a5a7a190f4bcad9d/Untitled%201.png)

3. 启用【其它】选项下的下面二项

    ![Untitled](ie%E6%B5%8F%E8%A7%88%E5%99%A8%E8%AE%BE%E7%BD%AE%E5%85%81%E8%AE%B8%E8%B7%A8%E5%9F%9F%20fcc6761fa63e4913a5a7a190f4bcad9d/Untitled%202.png)

    至此IE已经可以跨域请求数据了。