var mongoose = require('mongoose');

var SellerSchema = new mongoose.Schema({
    username: {
    	type:String,
    	required:true
    },
    pwd:{
    	type:String,
    	required:true
    },
    addr: {
    	type:String,
    	required:true
    },
    phone: {
    	type:String,
    	required:true
    },
    info: String,
    createTime: { type: Date, default: Date.now }
});

var Seller = mongoose.model('Seller', SellerSchema);
