var wxAccess = require('../controllers/wechat.server.access_token.js')


module.exports = function(app){
	app.get('/apis/getwxaccess',function(req,res){
		wxAccess.getAccess(req,res);
	});


	app.post('/apis/wxuploads',function(req,res){
		console.log('------------');
		console.log("body:",req.body);
		console.log('arr:',req.body["idarr"]);
		console.log('arr[]:',req.body["idarr[]"]);
		res.end('ok');

	});
}