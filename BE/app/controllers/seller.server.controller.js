var mongoose = require('mongoose');
var Seller = mongoose.model('Seller');

module.exports = {
	create: function(req,res,next){
		var seller = new Seller(req.body);
		seller.save(function(err){
			if(err){return next(err);}
			return res.json(seller);
		});
	},
	// list: function(req,res,next){
	// 	var pagesize = parseInt(req.query.pagesize) || 10;
	// 	var pagestart = parseInt(req.query.pagestart) || 1;

	// 	News.find().skip( (pagestart - 1) * pagesize)
	// 			   .limit(pagesize)
	// 			   .exec(function(err,docs){
	// 			   	if(err){return next(err)};
	// 			   	return res.json(docs);
	// 			   });
	// },
	// getById:function(req,res,next,id){
	// 	if(!id) return next(new Error('News not Found'));

	// 	News.findOne({_id:id})
	// 		.exec(function(err,doc){
	// 			if(err){return next(err);}
	// 			if(!doc){return next(new Error('News not found'));}

	// 			req.news = doc;
	// 			return next();
	// 		});
	// },
	// get:function(req,res,next){
	// 	return res.json(req.news);
	// }
}