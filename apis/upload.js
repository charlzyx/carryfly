var multiparty = require('multiparty');

module.exports = function(app) {
    app.post('/apis/upload',function(req,res,next){
    	var form = new multiparty.Form({uploadDir:'./public/ups/'});
    	form.parse(req,function(err,fields,files){
    		var filesTmp = JSON.stringify(files,null,2);
    		if(err){
    			console.log('Form Parse error:'+err);
    		}else{
    			// console.log(filesTmp);
    			var inpageUrl = files.file[0].path.split('public')[1];
    			res.send({url:inpageUrl});
    		}
    	});
    });
}