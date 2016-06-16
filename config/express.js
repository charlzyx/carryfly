var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var wechat = require('wechat');
var swig = require('swig');

module.exports = function() {
    console.log('express init ...');

    var app = express();
    app.set('view engine', 'html');
    app.set('views','./views');
    app.use(express.static('./public'));
    app.use(express.static('./views'));
    app.use(favicon('./public/favicon.ico'));
    app.use(cookieParser());

    app.engine('html',swig.renderFile);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({"extended":true}));


    app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 600000 }}));
    require('../app/routes/wx.wechat.route.js')(app);
    require('../app/routes/m.market.route.js')(app);
    require('../app/routes/t.task.route.js')(app);
    require('../app/routes/s.seller.routes.js')(app);
    require('../app/routes/u.user.route.js')(app);

    require('../apis/upload.js')(app);


    app.use(function(req, res, next) {
        res.status(404);
        try {
            return res.json('Not Found');
        } catch (e) {
            console.error('404 set header after sent');
        }

    });

    app.use(function(err, req, res, next) {
        if (!err) {
            return next() }
        res.status(500);
        try {
            return res.json(err.message || 'server error');
        } catch (e) {
            console.error('500 set header after sent');
        }

    })
    return app;

}
