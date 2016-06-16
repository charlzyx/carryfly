function checker(){
	var user = $('#username').val();
	var pwd = $('#pwd').val();
	if(user == ''){
		$('.ucell').addClass('weui_cell_warn');
	}
	if(pwd == ''){
		$('.pcell').addClass('weui_cell_warn');
	}		
}
$('input').focus(function(){
	$('.ucell').removeClass('weui_cell_warn');
	$('.pcell').removeClass('weui_cell_warn');
});

$('input').blur(checker);

$('#login').click(function(){
	checker();
	var data = {
		username: $('#username').val(),
		pwd: $('#pwd').val()
	}
	$.ajax({
		url:'/s/login',
		type:'POST',
		data:data,
		success:function(rs){
			if(rs.rs === 1){
				window.location.href = 'http://www.whalebuy.com/s/home';
			}else{
				alert('用户名或密码错误！');
			}
		}
	});
});