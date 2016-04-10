var weixin = require('../../apis/weixin');



module.exports = function(app){
	app.get('/',function(req,res){
		weixin.getWxAccess("/",function(wxcfg){
			res.render('index',{wxcfg:wxcfg});	
		});
	});

	app.get('/welcome',function(req,res){
		res.render('welcome',{form:req.ip});
	});
}