var NewsController = require('../controllers/news.server.controller.js');
var swig = require('swig');

module.exports = function(app){
	app.get('/',function(req, res, next){
		console.log('hahahah l l');
		// swig.renderFile('swig.html',{
		// 	pagename:'awesome people',
		// 	authors:['paul','Jim','Jane']
		// });
		res.sendFile('index.html');
	});
	app.route('/news')
	   .get(NewsController.list)
	   .post(NewsController.create);
	app.route('/news/:nid')
	   .get(NewsController.get);

   app.param('nid',NewsController.getById)
}