var request = require('request');
var crypto = require('crypto');
var config = require('../config/config');

module.exports = {
	getAccessToken : function(cb){
		request.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + config.wxappid + '&secret=' + config.wxsecret, 
				function(err,res,body) {
		    		// 这个异步回调里可以获取access_token
		    		if(err){
		    			console.log('[weixin] Err: Get access_token faild:',err);
		    		}else{
		    			return cb(JSON.parse(body).access_token);
		    		}
		    	});
		},
	getTicket : function(access_token, cb){
		request.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' +access_token+ '&type=jsapi', 
			function(err,res,body){
		         // 这个异步回调里可以获取ticket
		         if(err){
		         	console.log('[weixin] Err: Get ticket faild:',err);
		         }else{
		         	return cb(JSON.parse(body).ticket);
		         }
			});
	},
	getSignature : function(ticket, noncestr, timestamp, url){
		var str = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp='+ timestamp +'&url=' + url;
		return crypto.createHash('sha1').update(str).digest('hex');
	},
	getWxAccess : function(path,cb){
		var url = config.host + path;
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
		var _self = this;
		_self.getAccessToken(function(access_token){
			wxcfg.access_token = access_token;
			_self.getTicket(access_token, function(ticket){
				wxcfg.ticket = ticket;
				wxcfg.signature = _self.getSignature(ticket, wxcfg.noncestr, wxcfg.timestamp, url);
				cb(wxcfg);
			})
		});
	}
}