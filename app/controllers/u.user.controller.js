var mongoose = require('mongoose');
var User = mongoose.model('User');
var OAuth = require('wechat-oauth');
var client = new OAuth('wxc1e1536c70bd4ecf', 'd4624c36b6795d1d99dcf0547af5443d');

var options = {
    appId: 'wxc1e1536c70bd4ecf',
    appSecret: 'd4624c36b6795d1d99dcf0547af5443d',
    url: ''
}


module.exports = {
    create: function(req, res, next) {
        console.log(req.body);
        var user = new User(req.body);
        user.save(function(err) {
            if (err) {
                return next(err);
            }
            res.cookie('openid',  user.openid, { expires: new Date(Date.now() + 900000), httpOnly: true });
            return res.send({rs:1});
        });
    },
    list: function(req, res, next) {
        // console.log(req.seller);
        User.find({ owerid: req.seller.id })
            .exec(function(err, doc) {
                if (err) {
                    return next(err);
                }
                if (!doc) {
                    return next(new Error("user Not Found"));
                }
                req.userlist = doc;
                return next();
            });
    },
    findByOpenId:function(req,res,next){
        var openid = req.cookies.openid;
        var opath = req.path;
        if(openid){
            console.log('cookie has openid');
            User.findOne({"openid":openid})
                .exec(function(err, doc) {
                    if (err) {
                        return next(err);
                    }
                    if (!doc) {
                        res.cookie('opath',req.path);
                        return res.redirect('/u/create');
                    }
                    req.user = doc;
                    return next();
                });
        }else{//cookie中没有openid
            console.log('cookie no openid');
            if (req.originalUrl.indexOf('code') < 0) {
                    console.log('wxOath redirect');
                    var url = client.getAuthorizeURL('http://www.whalebuy.com' + req.path, 'state', 'snsapi_base');
                    res.redirect(url);
                } else {
                    client.getAccessToken(req.query.code, function(err, result) {
                        if(result && result.data){
                            console.log('cb with openid ');
                            console.log(req.path);
                            res.cookie('openid', result.data.openid, { expires: new Date(Date.now() + 900000), httpOnly: true });               
                            res.redirect(req.path);
                        }
                    });
                }
        }
    },
    findById:function(req,res,next,id){
        if (!id) return next(new Error("user Not Found"));
        User.findOne({"id":id})
            .exec(function(err, doc) {
                if (err) {
                    return next(err);
                }
                req.user = doc;
                return next();
            });
    },
}
