var wechat = require('wechat');



module.exports = function(app) {
    // 微信
    app.use('/wechat', wechat('carryflyer', function(req, res, next) {
        var message = req.weixin;
        // message is located in req.weixin
        var message = req.weixin;
        console.log('message:', message);
        if (message.Content) {
            res.reply([{
                title: '欢迎来到淮工联盟?!!',
                description: 'U Come Form' + req.ip,
                picurl: 'http://www.whalebuy.com/imgs/mario.png',
                url: 'http://www.whalebuy.com/welcome'
            }]);
        }
    }));
}
