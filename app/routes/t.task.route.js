var TaskController = require('../controllers/t.task.controller');
var OrderController = require('../controllers/o.order.controller');
var UserController = require('../controllers/u.user.controller');

module.exports = function(app) {

    app.route('/wx/t/create')
        .get(OrderController.findById)
        .get(function(req, res) {
            res.render('Task/createTask/createTask.html', { order: req.order, user: req.user });
        })
        .post(TaskController.create);


    app.route('/wx/t/listtask')
        .get(TaskController.list)
        .get(function(req, res) {
            res.render('Task/listTask/listTask.html', { list: req.tasklist, user: req.user });
        });

    app.param('taskid', TaskController.findById);
    app.route('/wx/t/show/:taskid')
        .get(function(req, res) {
            res.render('Task/showTask/showTask.html', { user: req.user, task: req.task});
        })

    app.route('/wx/t/b')
        .get(TaskController.findByBid)
        .get(function(req, res) {
            res.render('Task/myTask/myTask.html', { btasks: req.sendtask, user: req.user })
        }); 
    app.route('/wx/t/p')
        .get(TaskController.findByPid)
        .get(function(req, res) {
            res.render('Task/myTask/myTask.html', { ptasks: req.didtask, user: req.user })
        });


    app.route('/wx/t/get/:taskid')
        .get(TaskController.setPid)
        .get(function(req,res){
            if(req.success){
                res.redirect('/wx/t/p');
            }
        })

    app.route('/wx/t/setstate/:taskid')
        .post(TaskController.setState);



    // 测试接口-------------------------------------------------------------------------
    // 测试接口-------------------------------------------------------------------------
    // 测试接口-------------------------------------------------------------------------
    // 测试接口-------------------------------------------------------------------------
    // 测试接口-------------------------------------------------------------------------
    // 测试接口-------------------------------------------------------------------------
    
    app.route('/t/:taskid')
        .get(function(req, res) {
            res.send(req.task);
        })

}
