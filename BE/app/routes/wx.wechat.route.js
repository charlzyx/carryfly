var wechat = require('wechat');
// var wxOAuth = require('../controllers/wxOAuth');
var UserController = require('../controllers/u.user.controller');

var config = {
	token: 'carryflyer',
	appid: 'wxc1e1536c70bd4ecf'
}

var wxcfg = require('weixin-node-jssdk');
var getWxcfg = function(path, cb) {
    options.url = 'http://www.whalebuy.com' + path;
    wxcfg(options, function(err, config) {
        cb(config);
    });
}

    
module.exports = function(app) {
	app.get('/wechat',wechat(config,function(req,res,next){
		console.log('微信token验证');
	}));
	app.get(/wx/,UserController.findByOpenId);
}

// {
//     "button": [
//         {
//             "name": "我是货主", 
//             "sub_button": [
//                 {
//                     "type": "view", 
//                     "name": "商城购物", 
//                     "url": "http://www.whalebuy.com/wx/m/listshop"
//                 }, 
//                 {
//                     "type": "view", 
//                     "name": "直接发布任务", 
//                     "url": "http://www.whalebuy.com/wx/t/create"
//                 },
//                 {
//                     "type": "view", 
//                     "name": "我发布的任务", 
//                     "url": "http://www.whalebuy.com/wx/t/b"
//                 }
//             ]
//         }, 
//         {
//             "name": "我是快递员", 
//             "sub_button": [
//                 {
//                     "type": "view", 
//                     "name": "查看任务列表", 
//                     "url": "http://www.whalebuy.com/wx/t/listtask"
//                 }, 
//                 {
//                     "type": "view", 
//                     "name": "我接收的任务", 
//                     "url": "http://www.whalebuy.com/wx/t/p"
//                 }
//             ]
//         }, 
//         {
//             "type": "click", 
//             "name": "关于", 
//             "key": "help"
//         }
//     ]
// }