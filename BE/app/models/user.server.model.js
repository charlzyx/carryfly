var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
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
    	type:Number,
    	required:true
    },
    createTime: { type: Date, default: Date.now }
});

var User = mongoose.model('User', UserSchema);
