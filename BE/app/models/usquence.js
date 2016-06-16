var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var models = {};
/**
  * 存储ID的序列值
  */
UsequenceSchema = new Schema({
    _id: String,
    next: Number 
});

UsequenceSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
    return this.collection.findAndModify(query, sort, doc, options, callback);
};

UsequenceSchema.statics.increment = function (schemaName, callback) {
    return this.collection.findAndModify({ _id: schemaName }, [], 
            { $inc: { next: 1 } }, {"new":true, upsert:true}, callback);
};

var Usequence = mongoose.model('Usequence', UsequenceSchema);

module.exports = Usequence