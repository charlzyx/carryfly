var mongoose = require('mongoose');

var GoodsSchema = new mongoose.Schema({
    owerid: {
        type: String,
        required: true
    },
    imgurl: String,
    name: {
        type: String,
        required: true
    },
    intro: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    state: { type: Boolean, default: true },
    createTime: { type: Date, default: Date.now() },
    updateTime: { type: Date, default: Date.now() }
});

var Goods = mongoose.model('Goods', GoodsSchema);
