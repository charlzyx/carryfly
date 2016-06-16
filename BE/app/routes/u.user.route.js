var UserController = require('../controllers/u.user.controller');

module.exports = function(app) {
	app.route('/u/create')
		.get(function(req,res,next){
			var openid = req.cookies.openid;
			if(openid){
				var opath = req.cookies.opath;
				opath = opath ? opath:'/wx/u/home';
				res.render('User/regist/regist.html',{openid:openid,opath:opath});
			}else{
				next();
			}
		})
		.post(UserController.create);
}
