##淮工带飞平台`[CarryFly For HHITer]`

Todo:
- [ ] 将图片从微信服务器转到本地服务器 `权限不足?`
- [ ] `js-sdk`多媒体下载接口,同一个 `access_token`
- [ ] 缓存微信 `access_token`

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
