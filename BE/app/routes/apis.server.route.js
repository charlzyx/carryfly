var weixin = require('../../apis/weixin.js');
var request = require('request');

module.exports = function(app){
	app.post('/apis/wxuploads',function(req,res){
		console.log('------------');
		console.log("body:",req.body);
		console.log('arr:',req.body["idarr"]);
		console.log('arr[]:',req.body["idarr[]"]);
		var mediaIdArr = req.body["idarr[]"];
		var access_token = req.body["curtoken"];
		request.get('http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=' +access_token+ '&media_id='+mediaIdArr,
			function(err,res,body){
				console.log('curtoken------:',access_token);

				console.log('body------:',body);
			});
		// weixin.getAccessToken(function(access_token){
		// 	request.get('http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=' +access_token+ '&media_id='+mediaIdArr,
		// 		function(err,res,body){
		// 			console.log('body------:',body);

		// 			console.log('body------:',body);
		// 		});
		// });
		
		res.end('ok');
	});

}