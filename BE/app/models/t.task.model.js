var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new mongoose.Schema({
    title: String,
    intro: String,
    order: {type: Schema.Types.ObjectId,ref:'Order'},
    bid:{type: Schema.Types.ObjectId,ref:'User'},
    baddr:String,
    pid:{type: Schema.Types.ObjectId,ref:'User'},
    state: Number,
    createTime: { type: Date, default: Date.now() },
    updateTime: { type: Date, default: Date.now() }
});

var Task = mongoose.model('Task', TaskSchema);
