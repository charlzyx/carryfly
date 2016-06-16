var swig = require('swig');

module.exports = function(app){
	app.get('/',function(req,res){
		res.sendFile('/views/index.html');
	});

	app.get('/',function(req,res){
		res.sendFile('/views/about.html');
	})
}