var mongoose = require('mongoose');
var Usequence = require('./usquence');

var UserSchema = new mongoose.Schema({
    id:{
        type:Number,
        index:{unique:true}
    },
    openid:{
        type:String,
        required:true
    },
	name: {
		type:String,
		required:true
	},
    phone: {
    	type:Number,
    	required:true
    },
    addr:{
        type:String,
        required:true
    },
    createTime: { type: Date, default: Date.now }
});
//在创建文档时，获取自增ID值
UserSchema.pre('save', function(next) {
    var self = this;
    if( self.isNew ) {
        Usequence.increment('User',function (err, result) {
            if (err)
              throw err;
            self.id = result.value.next;
            next();
        });
    } else {
        next();
  }
})
var User = mongoose.model('User', UserSchema);
