var NewsController = require('../controllers/news.server.controller.js');
var swig = require('swig');

module.exports = function(app){
	app.get('/',function(req, res, next){
		swig.renderFile('swig.html',{
			pagename:'awesome people',
			authors:['paul','Jim','Jane']
		})
		res.sendFile('swig.html');
	});
	app.route('/news')
	   .get(NewsController.list)
	   .post(NewsController.create);
	app.route('/news/:nid')
	   .get(NewsController.get);

   app.param('nid',NewsController.getById)
}