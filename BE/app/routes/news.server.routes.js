var NewsController = require('../controllers/news.server.controller.js');
module.exports = function(app){
	app.get('/',function(req, res, next){
		res.sendFile('index.html');
	});
	app.route('/news')
	   .get(NewsController.list)
	   .post(NewsController.create);
	app.route('/news/:nid')
	   .get(NewsController.get);

   app.param('nid',NewsController.getById)
}