## 淮工带飞平台 `[CarryFly For HHITer]`

毕设,Node.js实现的简单电商,没有结算,需要公众号(测试号就行)

> **摘要**: 采用B/S架构，在后端部分搭建了以Node.js作为实现框架WEB服务器,为校园师生和校园商家提供多种服务，其中为校园师生提供两类服务：
 - 通过微信内的线上商城来完成商品的选购，并发布对应快递任务，商品由校园内商家来提供。
 - 根据个人方便与否来选择完成买家发布快递任务。
为校园商家用户提供了两种功能：
 - 在线商城中自家商品的上下架、商品信息修改等功能。
 - 已完成订单的查看功能。
 

-  需求分析: 本系统是基于微信公众平台的任务管理设计，针对用户角色，系统可分为商城模块、快递任务模块、系统用户验证模块。商城模块用户主要为商家和用户，快递任务模块用户为买家和快递员。

- 商城模块功能分析：包括商品管理模块，订单管理模块，其中 ①商品管理模块主要用于商家对商品的增、删、改、查，已经上下架管理。②订单管理模块主要用于用户创建订单，商家查看订单操作。
 
- 快递任务模块分析：包括任务管理，订单管理模块。其中①任务管理模块：该模块主要用于买家和快递员用户对任务的创建，任务状态修改等操作。②订单管理模块主要用于用户在完成任务同时对任务内订单状态进行修改。
 
- 账户管理模块分析：包括商家账户管理模块，用户账户管理模块。其中①商家账户管理模块主要用于商家账户的注册，验证等操作。②用户账户管理模块主要用于用户账户的注册和校验等操作



2016/4/10
---
- `/apis/weixin.js`提取微信验证模块
- `/config/env/development.js`中添加 hsot,微信appid,微信srcetc

- 学习swig(1)
swig配置
```javascript
// /config/express.js
app.set('view engine', 'html');
app.set('views','./views');
app.engine('html',swig.renderFile);
```
- `tips:`路径配置
```javascript
// /app/routes/swig.server.route.js
//Errinfo: path must be absolute or specify root to res.sendFile`
// 要求index.html和本文件在同一目录
res.sendFile(__dirname + '/index.html');
// 或者指定一个root目录
res.sendFile('index.html', { root: __dirname });
//应用
res.sendFile('/public/views/index.html',{root:"./"});
```
2016/4/9
---
- 微信JS-SDK图片上传 `jssdk`,`微信`
```javascript
//选择可以多张,上传只能一张,微信是不是脑残....
wx.chooseImage({
    count: 4, // 
    sizeType: ['original', 'compressed'], // 
    sourceType: ['album', 'camera'], // 
    success: function (res) {
        var localIds = res.localIds; //
        syncUpload(localIds);
    }
});

var syncUpload = function(localIds,upIds){
    var localId = localIds.pop();
    upIds = upIds ? upIds : [];
    upIds.push(localId);
    wx.uploadImage({
        localId: localId,
        isShowProgressTips: 1,
        success: function (res) {
            var serverId = res.serverId; // 返回图片的服务器端ID
            if(localIds.length > 0){
                syncUpload(localIds,upIds)	;
            }else{
            	// alert(["upIds======",upIds]);
            	$.ajax({
            	//将serverId发送给后台做处理
            		url: 'apis/wxuploads',
            		type: "POST",
            		data: {"idarr":upIds,"curtoken":'{{wxcfg.access_token}}'},
            		success: function(msg){
            			alert(msg);
            		}
            	});
            }
        }
    });
};
```
- 后台处理,body-parser处理
```javascript
app.post('/apis/wxuploads',function(req,res){
	console.log("body:",req.body);
	console.log('idarr[]:',req.body["idarr[]"]);
	res.end('ok');
});
```
-`tips`: 注意idarr后面方括号`[]`
```js
body: { 'idarr[]': [ 'weixin://resourceid/ed1793475a0a79bb063d755239c3a548','weixin://resourceid/082ab0abb05553829f4682ce08edb30b' ] }     
idarr[]: [ 'weixin://resourceid/ed1793475a0a79bb063d755239c3a548','weixin://resourceid/082ab0abb05553829f4682ce08edb30b' ]
```

#相关技术
 - [Node.js](https://nodejs.org/en/docs/) 
 - [Express](http://expressjs.com/)
 - [微信JS-SDK](https://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html)
 - [swig](http://paularmstrong.github.io/swig/)
