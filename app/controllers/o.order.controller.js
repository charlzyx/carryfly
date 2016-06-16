var mongoose = require('mongoose');
var Order = mongoose.model('Order');


module.exports = {
    create: function(req, res, next) {
        var order = new Order(req.body);
        order.save(function(err) {
            if (err) {
                return next(err);
            }
            if(order.gids){
                for(k in order.gids){
                    // console.log(order.gids[k]);
                order.gids.push(order.gids[k]);
                }
            }
            return res.send({order:order,state:1});
        });
    },
    findById: function(req, res, next) {
        var _id = req.query.oid;
        Order.findById(_id)
            .populate('gArr sid bid')
            .exec(function(err, doc) {
                if (err) {
                    return next(err);
                }
                if (!doc) {
                    return next();
                }
                req.order = doc;
                return next();
            });
    },
    findBySid: function(req,res,next){
        var sid = req.seller._id;
        Order.findOne({sid:sid})
            .populate('gArr')
            .exec(function(err,docs){
                if (err) {
                    return next(err);
                }
                if (!docs) {
                    return next();
                }
                req.orders = docs;
                return next();
            })

    }
}
