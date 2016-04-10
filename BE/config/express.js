var express = require('express');
var bodyParser = require('body-parser');
var wechat = require('wechat');
var swig = require('swig');

module.exports = function() {
    console.log('express init ......');

    var app = express();
    app.set('view engine', 'html');
    app.set('views','./views');
    app.use(express.static('./public'));
    app.engine('html',swig.renderFile);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({"extended":false}));

    require('../app/routes/swig.server.route.js')(app);
    require('../app/routes/apis.server.route.js')(app);
    // require('../app/routes/news.server.routes.js')(app);
    require('../app/routes/wechat.server.route.js')(app);


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
