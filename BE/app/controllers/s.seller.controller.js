var mongoose = require('mongoose');
var Seller = mongoose.model('Seller');


module.exports = {
    create: function(req, res, next) {
        var seller = new Seller(req.body);
        var username = req.body.username;
        seller.save(function(err) {
            if (err) {
                return next(err);
            }
            req.session.username = username;
            req.session._id = seller._id.toString();
            req.session.save();
            return res.json(seller);
        });
    },
    loginChecker: function(req, res, next) {
        var username = req.body.username;
        var pwd = req.body.pwd;

        Seller.findOne({ username: username })
            .exec(function(err, doc) {
                if (err) {
                    return next(err);
                }
                if (!doc) {
                    return next(new Error('Seller Not Found'));
                }
                if (doc.pwd === pwd) {
                    res.send({ rs: 1 });
                    req.session.username = username;
                    req.session._id = doc._id.toString();
                    req.session.save();
                    return next();
                } else {
                    res.send({ rs: 0 });
                    return next();
                }
            });
    },
    auther: function(req, res, next) {
        var id = req.session._id;
        // console.log(['id',id]);
        if (id) {
            Seller.findById(id, function(err, doc) {
                if (err || !doc) {
                    return next(new Error('Seller not Found'));
                } else {
                    req.seller = doc;
                    return next();
                }
            });
        } else {
            res.redirect('/s/login');
        }
    },
    findById: function(req, res, next, id) {
        if (!id) return next(new Error("Seller Not Found"));
        Seller.findOne({ id: id })
            .exec(function(err, doc) {
                if (err) {
                    return next(err);
                }
                req.seller = doc;
                return next();
            });
    },
    findByUserName: function(req, res, next, username) {
        if (!username) return next(new Error("Seller Not Found"));
        Seller.findOne({ username: username })
            .exec(function(err, doc) {
                if (err) {
                    return next(err);
                }
                if (!doc) {
                    return next(new Error("Seller Not Found"));
                }
                req.seller = doc;
                return next();
            });
    },
    list: function(req, res, next) {
        Seller.find()
            .exec(function(err, docs) {
                if (err) {
                    return next(err);
                }
                if (!docs) {
                    return next(new Error("Seller Not Found"));
                }
                req.sellers = docs;
                return next();
            })
    }
}
