var mongoose = require('mongoose');

var AdminSchema = new mongoose.Schema({
	username: {
		type:String,
		required:true
	},
	pwd:{
		type:String,
		required:true
	},
    email: {
    	type:Number,
    	required:true
    },
    createTime: { type: Date, default: Date.now }
});

var Admin = mongoose.model('Admin', AdminSchema);
