标签： uni-app 版本更新

---

## 前情
uni-app是我很喜欢的跨平台框架，它能开发小程序，H5,APP(安卓/iOS),对前端开发很友好，自带的IDE让开发体验也很棒，公司项目就是主推uni-app。而是app版本更新是最基本的功能，特记录整个踩坑过程。

## 版本更新
### 更新主逻辑
在每次app启动并登录成功的时候做一个版本检测，如果当前版本小于服务端配置的版本号，服务端会告诉是否有更新数据(此处为res.updateFlag，true为需要更新)，如果有的话会告诉我去哪里（此次为res下的url）拿更新包数据，客户端再请求res.url拿到更新相关数据（更新包的包地址），如果有更新包地址则弹出弹窗提示用户去更新。
安装更新逻辑为当返回数据url是热更新地址时，则执行热更新逻辑，如果不是则直接调用浏览器去下载安装。
### 更新关键代码
``` js
function checkVersion() {
    // #ifdef APP-PLUS
    plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
        let currVersion = widgetInfo.version;
        // 提交版本号和当前appCode,appcode主要是因为我们多个app共用了一套服务端，传此参数是为了告诉服务是哪个app在请求更新
        const params = { "appVersionNo": currVersion, "appCode": APPCODE};
        // 更新判断接口请求，
        uni.request({
            url: "更新判断接口地址",
            data: params,
            success: function(res) {
            // console.log("----更新检测数据----:", res);
            if (res.updateFlag) {
                updateShowModel(res.url, currVersion)
            }
        }
        });
    });
    // #endif
}

/**
 * 更新提示
 * @param {string} url 
 * @param {string} currVersion
 */
function updateShowModel(url, currVersion) {
    uni.request({ url, success: json => {
        //console.log("----当前从服务端拉取的版本信息----:", json);
        if (!json || !json.data || !json.data.versions || !json.data.versions[0]) {
            return;
        }
        const versionData = json.data
        const versionInfo = versionData.versions[0];
        const forcedVersion = versionData.lastForceVersion;
        // 是否强制更新，只有当前版本小于服务端返回的强制更新版本号隐藏处弹窗的取消按钮来达到要求用户强制更新
        const isForcedUpdate = versionCompare(currVersion, forcedVersion) == -1;
        //console.log("----更新相关数据----:",versionData, isForcedUpdate,currVersion,forcedVersion);
        uni.showModal({
                title: `发现新版本v${versionInfo.version}`,
                content: versionInfo.details.join('\n'),
                showCancel: !isForcedUpdate,
                success: function (res) {
                        if (res.confirm) {
                            updateApp(versionData)
                            //console.log('用户点击确定');
                        } else if (res.cancel) {
                            //console.log('用户点击取消');
                        }
                }
        });
    }})
}

/**
 * 执行更新操作
 * @param {Object} versionData
 */
function updateApp(versionData) {
    // 如果有热更新配置文件，则热更
    if (versionData.wgtUrl) {
        startAndroidUpdate(versionData);
        return;
    }
    switch (uni.getSystemInfoSync().platform) {
        case 'android':
        // 安卓安装包的apk地址
        plus.runtime.openURL(versionData.url);
        break
        case 'ios':
          // ios需要特殊处理，需要服务端给一个plist地址
            plus.runtime.openURL(`itms-services://?action=download-manifest&url=${versionData.url}`);
        break
    }
}

/**
 * 自动下载安装更新
 * @param {Object} versionData 安装包地址相关信息
 */
var showLoading;
function startAndroidUpdate(versionData) {
    // 热更新的wgt文件
    let url = versionData.wgtUrl;
    var dtask = plus.downloader.createDownload(
        url, {method:"GET",filename:`_downloads/${APPID}.wgt`},
        function(d, status) {
            // 下载完成
            if (status == 200) {
                //console.log("----安装包文件地址----:",d, plus.io.convertLocalFileSystemURL(d.filename), d.filename);
                //plus.nativeUI.toast("软件开始安装重启");
                showLoading.setTitle("  安装重启中...  ");
                plus.runtime.install(d.filename, {force: true}, e => {
                    plus.nativeUI.closeWaiting();
                    plus.runtime.restart();
                }, function(error) {
                    console.log("----安装失败01----:", error);
                    handleWgtInstallFail(versionData);
                })
            } else {
                console.log("----安装失败02----:", d, status);
                handleWgtInstallFail(versionData);
            }
        });
     try {
        var progress = 0;
        showLoading = plus.nativeUI.showWaiting("  开始下载  ");  //创建一个showWaiting对象 
        dtask.start(); // 开启下载的任务
        dtask.addEventListener('statechanged', function(
            task,
            status
        ) {
            // 给下载任务设置一个监听 并根据状态  做操作
            switch (task.state) {
            case 1:
                showLoading.setTitle("  正在下载 0%  ");
                break;
            case 2:
                showLoading.setTitle("已连接到服务器");
                break;
            case 3:
                progress = parseInt((parseFloat(task.downloadedSize) / parseFloat(task.totalSize)) * 100);
                showLoading.setTitle("  正在下载" + String(progress).padStart(3, " ") + "%  ");
                break;
            case 4:
                 //plus.nativeUI.closeWaiting();
                //下载完成
                break;
            }
        });
        } catch (err) {
            plus.nativeUI.closeWaiting();
            console.log("----安装失败03----:", err);
            handleWgtInstallFail(versionData);
        }
}

/**
 * 热更新失败处理
* 
 */
function handleWgtInstallFail(versionInfo) {
    plus.nativeUI.closeWaiting();
    uni.showModal({
        title: "温馨提示",
        content: "自动更新失败，是否手动更新",
        success: function (res) {
            if (res.confirm) {
                plus.runtime.openURL(versionInfo.url);
            }
        }
    });
}

/**
 * 版本号比较
 * @param {Object} v1 当前版本
 * @param {Object} v2 强制更新版本
 */
function versionCompare(v1, v2) {
    var GTR = 1; //大于
    var LSS = -1; //小于
    var EQU = 0; //等于
    var v1arr = String(v1).split(".").map(function (a) {
        return parseInt(a);
    });
    var v2arr = String(v2).split(".").map(function (a) {
        return parseInt(a);
    });
    var arrLen = Math.max(v1arr.length, v2arr.length);
    var result;

    //排除错误调用
    if (v1 == undefined || v2 == undefined) {
        throw new Error();
    }

    //检查空字符串，任何非空字符串都大于空字符串
    if (v1.length == 0 && v2.length == 0) {
        return EQU;
    } else if (v1.length == 0) {
        return LSS;
    } else if (v2.length == 0) {
        return GTR;
    }

    //循环比较版本号
    for (var i = 0; i < arrLen; i++) {
        result = xxcanghaiComp(v1arr[i], v2arr[i]);
        if (result == EQU) {
            continue;
        } else {
            break;
        }
    }
    return result;

    function xxcanghaiComp(n1, n2) {
        if (typeof n1 != "number") {
            n1 = 0;
        }
        if (typeof n2 != "number") {
            n2 = 0;
        }
        if (n1 > n2) {
            return GTR;
        } else if (n1 < n2) {
            return LSS;
        } else {
            return EQU;
        }
    }
}
```
## 注意事项
开发过程中在ios下热更是可以的，但是在安卓下一直报如下错误：
``` js
{  
    "code": -1201,  
    "message": "WGT/WGTU文件格式错误"  
}
```
官方论坛也有人遇到，试了很多解决方法都不行，通过打日志发现安卓下下载下来的包是.bin文件。而不是热更需要的wgt文件，一开始怀疑是包没下载完，但明显是在下载完的回调里处理的，后面想到能不能手动改成.wgt文件，plus.downloader.createDownload第二个参数可以指定下载包的文件名，就这样解决了这个问题。
其实安卓下拿到apk地址是可以不需要通过调用浏览器去下载的，直接走热更新逻辑也是可以的。