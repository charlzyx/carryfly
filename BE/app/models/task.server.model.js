var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
    id: {
    	type:String,
    	required:true
    },
    carInfo: {
    	type:String,
    	required:true
    },
    tip: {
    	type:Number,
    	required:true
    },
    tip: {
    	type:Number,
    	required:true,
    	defult:1
    },
    maker: {
    	type : Schema.Types.OnjectId,
    	ref : 'User',
    	required: true
    },
    porter: {
    	type : Schema.Types.OnjectId,
    	ref : 'User',
    	required: true
    },
    createTime: { type: Date, default: Date.now }
});

var Task = mongoose.model('Task', TaskSchema);
