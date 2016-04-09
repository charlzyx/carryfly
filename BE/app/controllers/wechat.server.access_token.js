var request = require('request');
var crypto = require('crypto');
// 微信access_token验证
module.exports = {
	getAccess : function(req,res){
			var url = req.headers.referer;
			// noncestr
		     var createNonceStr = function() {
		          return Math.random().toString(36).substr(2, 15);
		     };

		      // timestamp
		     var createTimeStamp = function () {
		          return parseInt(new Date().getTime() / 1000) + '';
		     };
			var wxcfg = {
				access_token :'',
				ticket : '',
				noncestr : createNonceStr(),
				timestamp : createTimeStamp(),
				signature : ''
			};

			request.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxade0b81767937053&secret=be6a08cd8558ce2566a6ade4f9bbf4fa', 
						function(err,response,body) {
			    // 这个异步回调里可以获取access_token
			    	wxcfg.access_token = JSON.parse(body).access_token;
			    	request.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+wxcfg.access_token+'&type=jsapi', function(_err,_response,_body){
			    	         // 这个异步回调里可以获取ticket
			    	         	wxcfg.ticket = JSON.parse(_body).ticket;
			    	         	var str = 'jsapi_ticket=' + wxcfg.ticket + '&noncestr=' + wxcfg.noncestr + '&timestamp='+ wxcfg.timestamp +'&url=' + url;
			    	         	wxcfg.signature = crypto.createHash('sha1').update(str).digest('hex');
			    	         	// 对页面请求作出回应
			    	         	res.send(wxcfg);
			    	});
			});
	}
}