var UserController = require('../controllers/u.user.controller');
var OAuth = require('wechat-oauth');
var client = new OAuth('wxc1e1536c70bd4ecf', 'd4624c36b6795d1d99dcf0547af5443d');

var options = {
    appId: 'wxc1e1536c70bd4ecf',
    appSecret: 'd4624c36b6795d1d99dcf0547af5443d',
    url: ''
}

module.exports = function(req, res, next) {
    if(req.cookies.openid){
        console.log('im here');
        UserController.findByOpenId(req, res, next, req.cookies.openid);
        // return 
    }else if (req.originalUrl.indexOf('code') < 0) {
        console.log('to wxOath redirect');
        var url = client.getAuthorizeURL('http://www.whalebuy.com' + req.path, 'state', 'snsapi_base');
        res.redirect(url);
    } else {
        console.log('wxOath to set openid');
        client.getAccessToken(req.query.code, function(err, result) {
            if(result && result.data){
                 var openid = result.data.openid;
                 var opath = req.path;
                 UserController.findByOpenId(req, res, next, openid,function(hasDoc){
                    if(!hasDoc){
                        res.render('User/regist/regist.html',{openid:openid,opath:opath});
                    }else{
                        req.cookies.openid = openid;
                    }
                 });
            }
            // res.cookies('openid', openid, { expires: new Date(Date.now() + 900000), httpOnly: true });
            // UserController.findByOpenId(req, res, next, openid);
        })
    }
}
