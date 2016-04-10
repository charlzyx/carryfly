var mongoose = require('mongoose');

var GoodsSchema = new mongoose.Schema({
    id: {
    	type:String,
    	required:true
    },
    name: {
    	type:String,
    	required:true
    },
    gtype: {
    	type:String,
    	required:true
    },
    tip: {
    	type:Number,
    	required:true
    },
    stock: {
    	type:Number,
    	required:true
    },
    createTime: { type: Date, default: Date.now }
});

var Goods = mongoose.model('Goods', GoodsSchema);
