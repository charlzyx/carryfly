var https = require('https');

var token = '';
https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxade0b81767937053&secret=be6a08cd8558ce2566a6ade4f9bbf4fa ', function(_res) {
    // 这个异步回调里可以获取access_token
    token = _res;
    console.log(_res);
})
https.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + token + '&type=jsapi', function(_res) {
    // 这个异步回调里可以获取ticket
    console.log('ticket:', ticket);
});
