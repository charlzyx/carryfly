var mongoose = require('mongoose');
var Goods = mongoose.model('Goods');


module.exports = {
    create: function(req, res, next) {
        var goods = new Goods(req.body);
        goods.save(function(err) {
            if (err) {
                return next(err);
            }
            return res.send({rs:1});
        });
    },
    getMyList: function(req, res, next) {
        // console.log(req.seller);
        Goods.find({ owerid: req.seller.id })
            .exec(function(err, doc) {
                if (err) {
                    return next(err);
                }
                if (!doc) {
                    return next(new Error("goods Not Found"));
                }
                req.goodslist = doc;
                return next();
            });
    },
    findBy_id: function(req, res, next, _id) {
        if (!_id) return next(new Error("goods Not Found"));
        Goods.findById(_id)
            .exec(function(err, doc) {
                if (err) {
                    return next(err);
                }
                if (!doc) {
                    return next(new Error("goods Not Found"));
                }
                req.goods = doc;
                return next();
            });
    },
    modify: function(req, res, next) {
        // console.log(typeof(req.body));
        var goodsInfo = req.body;
        var _id = goodsInfo._id;
        // console.log(["goodsInfo",goodsInfo]);
        Goods.findById(_id, function(err, goods) {
            if (err) {
                return next(err);
            }
            for (key in goodsInfo) {
                goods[key] = goodsInfo[key];
            }
            // console.log(["goods",goods])
            goods.updateTime = Date.now();
            goods.save(function(err) {
                if (err) {
                    console.log("modify err" + err);
                    return next(err);
                }
                res.send({rs:1});
            });
        })
    },
    switchState: function(req, res, next) {
        var _id = req.body._id;
        Goods.findById(_id, function(err, goods) {
            if (err) {
                return next(err);
            }
            if(!goods){
                return next(new Error('switchState not found goods'));
            }
            goods.state = !goods.state;
            goods.save(function(err) {
                if (err) {
                    console.log("switch err" + err);
                    return next(err);
                }
                res.send({rs:1});
            });
        })
    },
    mulswitch: function(req, res, next) {
        var _idlist = req.body._idlist;
        var isup = req.body.isup;
        if (_idlist) {
            for (var i = 0, l = _idlist.length; i < l; i++) {
                Goods.findByIdAndUpdate(_idlist[i], { $set: { state: isup } }, function(err) {
                    if (err) return next(err);
                });
            }
            res.send({rs:1});
        } else {
            res.send({rs:0})
        }
        next();
    },
    muldel: function(req, res, next) {
        var _idlist = req.body._idlist;
        if (_idlist) {
            for (var i = 0, l = _idlist.length; i < l; i++) {
                Goods.findByIdAndRemove(_idlist[i], function(err) {
                    if (err) return next(err);
                });
            }
            res.send({rs:1});
        } else {
            res.send({rs:0})
        }
        next();
    },
    findByOwerId: function(req, res, next ,owerid) {
        // console.log('get');
        Goods.find({owerid:owerid,state:true})
            .exec(function(err, docs) {
                if (err) {
                    return next(err);
                }
                req.docs = docs;
                return next();
            });
        
    }
}
