var mongoose = require('mongoose');

var SellerSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
	username: {
		type:String,
		required:true
	},
	pwd:{
		type:String,
		required:true
	},
    shopname: {
    	type:String,
    	required:true
    },
    phone: {
    	type:Number,
    	required:true
    },
    createTime: { type: Date, default: Date.now }
});

var Seller = mongoose.model('Seller', SellerSchema);
