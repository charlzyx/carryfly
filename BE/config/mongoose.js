var mongoose = require('mongoose');
var config = require('./config');


module.exports = function(){
	var db = mongoose.connect(config.mongodb);
	require('../app/models/s.seller.model.js');
	require('../app/models/g.goods.model.js');
	require('../app/models/u.user.model.js');
	require('../app/models/o.order.model.js');
	require('../app/models/t.task.model.js');
	return db;
}