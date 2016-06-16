var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new mongoose.Schema({
    sid:{type: Schema.Types.ObjectId,ref:'Seller'},
    bid:{type: Schema.Types.ObjectId,ref:'User'},
    gArr:[{type: Schema.Types.ObjectId,ref:'Goods'}],
    numInfo:Object,
    count:Number,
    total:Number,
    status: { type: Number, default: true },
    createTime: { type: Date, default: Date.now() }
});

var Order = mongoose.model('Order', OrderSchema);

