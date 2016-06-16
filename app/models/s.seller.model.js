var mongoose = require('mongoose');
var Sequence = require('./sequence');

var SellerSchema = new mongoose.Schema({
    id:{
        type:Number,
        index:{unique:true}
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
    intro:String,
    phone: {
    	type:Number,
    	required:true
    },
    createTime: { type: Date, default: Date.now }
});
//在创建文档时，获取自增ID值
SellerSchema.pre('save', function(next) {
    var self = this;
    if( self.isNew ) {
        Sequence.increment('Seller',function (err, result) {
            if (err)
              throw err;
            self.id = result.value.next;
            next();
        });
    } else {
        next();
  }
})
var Seller = mongoose.model('Seller', SellerSchema);
