var SellerController = require('../controllers/s.seller.controller');
var OrderController = require('../controllers/o.order.controller');

module.exports = function(app) {
    // 注册
    app.route('/s/regist')
        .get(function(req, res) {
            res.render('Seller/regist/regist.html');
        })
        .post(SellerController.create);
    // 登录
    app.route('/s/login')
        .get(function(req, res) {
            res.render('Seller/login/login.html');
        })
        .post(SellerController.loginChecker);
    // 主页
    app.route('/s/home')
        .get(SellerController.auther)
        .get(OrderController.findBySid)
        .get(function(req, res) {
            res.render('Seller/home/home.html', { seller: req.seller ,orders: req.orders});
        });
}
