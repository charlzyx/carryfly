##淮工带飞平台
###CarryFly For HHITer

TODO: 服务器将微信服务器图片转过来



2016/4/10
---
微信JS-SDK图片上传 `jssdk`,`微信`
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
	            //其他对serverId做处理的代码
	            if(localIds.length > 0){
	                syncUpload(localIds,upIds)	;
	            }else{
	            	// alert(["upIds======",upIds]);
	            	$.ajax({
	            	//将serverId发送给后台做处理
	            		url: 'apis/wxuploads',
	            		type: "POST",
	            		data: {"idarr":upIds},
	            		success: function(msg){
	            			alert(msg);
	            		}
	            	});
	            }
	        }
	    });
	};
```
后台处理,body-parder处理
---
```javascript
app.post('/apis/wxuploads',function(req,res){
	console.log('------------');
	console.log("body:",req.body);
	console.log('arr[]:',req.body["idarr[]"]);
	res.end('ok');
});
```
结果有点奇怪  `注意idarr后面方括号"[]"`
```json
body: { 'idarr[]': 
   [ 'weixin://resourceid/ed1793475a0a79bb063d755239c3a548',
     'weixin://resourceid/082ab0abb05553829f4682ce08edb30b' ] }
     arr[]: [ 'weixin://resourceid/ed1793475a0a79bb063d755239c3a548',
       'weixin://resourceid/082ab0abb05553829f4682ce08edb30b' ]
```

#相关技术
 - Node.js
 - Express
 - 微信JS-SDK