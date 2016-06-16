var mongoose = require('mongoose');
var Task = mongoose.model('Task');
var Order = mongoose.model('Order');


module.exports = {
    create: function(req, res, next) {
        var task = new Task(req.body);
        task.save(function(err) {
            if (err) {
                return next(err);
            }
            return res.json(task);
        });
    },
    list: function(req, res, next) {
        Task.find({state:0})
            .populate('bid')
            .exec(function(err, docs) {
                if (err) {
                    return next(err);
                }
                req.tasklist = docs;
                return next();
            });
    },
    findById: function(req, res, next, _id) {
        if (!_id) return next(new Error("task Not Found"));
        Task.findById(_id)
            .populate(['bid','order','pid'])
            .exec(function(err, doc) {
                if (err) return next(err);
                var opt1 = {
                    path: 'order.gArr',
                    model:'Goods'
                }
                var opt2 = {
                    path: 'order.sid',
                    model:'Seller'
                }      
                Task.populate(doc,opt1,function(err, mdoc){
                    mdoc.populate(opt2,function(err, popdoc){
                            req.task = popdoc;
                            return  next();
                    });
                });
            })
    },
    findByBid: function(req, res, next) {
        var bid = req.user._id;
        Task.find({ "bid": bid })
            .populate(['bid','pid'])
            .exec(function(err, docs) {
                if (err) {
                    return next(err);
                }
                req.sendtask = docs;
                return next();
            });
    },
    findByPid: function(req, res, next) {
        var pid = req.user._id;
        Task.find({ "pid": pid })
            .populate(['bid','pid'])
            .exec(function(err, docs) {
                if (err) {
                    return next(err);
                }
                req.didtask = docs;
                return next();
            });
    },
    setPid: function(req, res, next) {
        var poster = req.user;
        var _id = req.task;
        Task.findByIdAndUpdate(
            _id, 
            { $set: { pid: poster._id,  state:1 } }, 
            function(err) {
                if (err) return next(err);
                req.success = true;
                return next();
            });
    },
    setState:function(req,res,next){
        var state = req.body.state;
        var _id = req.task._id;

        Task.findByIdAndUpdate( _id, { $set: { state:state } }, 
            function(err) {
                if (err) return next(err);
                if(state == 3){
                    var oid = req.task.order._id;
                    Order.findByIdAndUpdate( _id, { $set: { state:1 } }, 
                    function(err) {
                        if (err) return next(err);
                        return res.send({success:true});
                    });
                }
            });
    }
}
