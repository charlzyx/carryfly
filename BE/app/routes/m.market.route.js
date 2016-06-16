var SellerController = require('../controllers/s.seller.controller');
var GoodsController = require('../controllers/g.goods.controller');
var UserController = require('../controllers/u.user.controller');
var OrderController = require('../controllers/o.order.controller');


module.exports = function(app) {
    // 商家操作模块
    app.route('/m/s/addgoods')
        .get(SellerController.auther)
        .get(function(req, res) {
            res.render('Goods/addgoods/addgoods.html', { seller: req.seller });
        })
        .post(GoodsController.create);
        


    app.route('/m/s/listgoods')
        .get(SellerController.auther)
        .get(GoodsController.getMyList)
        .get(function(req, res) {
            // console.log(req.goodslist);
            res.render('Goods/listgoods/listgoods.html', { goodslist: req.goodslist, seller: req.seller });
        });


    app.param('goods_id', GoodsController.findBy_id);
    app.route('/m/s/modifygoods/:goods_id')
        .get(SellerController.auther)
        .get(function(req, res) {
            res.render('Goods/modifygoods/modifygoods.html', { goods: req.goods, seller: req.seller });
        });
    app.route('/m/g/modgoods')
        .post(GoodsController.modify);

    app.route('/m/g/switchstate')
        .post(GoodsController.switchState);

    app.route('/m/g/mulswitch')
        .post(GoodsController.mulswitch);

    app.route('/m/g/muldel')
        .post(GoodsController.muldel);    



    //  用户浏览模块
    app.route('/wx/m/listshop')
        .get(SellerController.list)
        .get(function(req, res) {
            if (req.user === 0) {
                res.render('Market/listseller/listsellers.html', { sellers: req.sellers });
            } else {
                // console.log(req.user);
                res.render('Market/listseller/listsellers.html', { sellers: req.sellers, user: req.user });
            }
        });
    app.param('owerid', GoodsController.findByOwerId);
    app.param('owerid', SellerController.findById);
    app.route('/wx/m/market/:owerid')
        .get(function(req, res) {
            res.render('Market/market/market.html', { list: req.docs, user: req.user, seller: req.seller });
        });


    // 订单模块
    app.post('/o/create', OrderController.create);

}
