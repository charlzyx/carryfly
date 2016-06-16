$('.weui_switch').click(function(){
	var id = $(this).attr('data-gid');
	$.post({
		url:'/m/g/switchstate',
		data:{_id:id},
		success:function(rs){
			if(rs.rs === 1){
				window.location = window.location.href;
			}else{
				alert('修改失败,请刷新重试');
			}
		}
	});
});

$('.weui_check.sub').click(function(){
	var selected = $(this).attr('selected');
	if(selected){
		$(this).attr('selected',false)
	}else{
		$(this).attr('selected',true)
	}
});

$('#setall').click(function(){
	$('.weui_check.sub').click();
});
$('#downall').click(function(){
	var idarr = [];
	$('.weui_check.sub').each(function(){
		var isSelected = $(this).attr('selected');
		if(isSelected){
			idarr.push($(this).attr('id'));
		}
	});
	$.post({
		url:'/m/g/mulswitch',
		data:{_idlist:idarr,isup:false},
		success:function(rs){
			if(rs.rs === 1){
				window.location = window.location.href;
			}else{
				alert('下架,请刷新重试');
			}
		}
	});
});

$('#upall').click(function(){
	var idarr = [];
	$('.weui_check.sub').each(function(){
		var isSelected = $(this).attr('selected');
		if(isSelected){
			idarr.push($(this).attr('id'));
		}
	});
	$.post({
		url:'/m/g/mulswitch',
		data:{_idlist:idarr,isup:true},
		success:function(rs){
			if(rs.rs === 1){
				window.location = window.location.href;
			}else{
				alert('上架,请刷新重试');
			}
		}
	});
});

$('#delall').click(function(){
	var idarr = [];
	$('.weui_check.sub').each(function(){
		var isSelected = $(this).attr('selected');
		var isUp = $(this).parents('.weui_cell').find('.state').attr('checked');
		console.log()
		if(isSelected && !isUp){
			idarr.push($(this).attr('id'));
		}
	});
	if(idarr.length === 0){
		alert('未选中复合条件商品');
	}else{
		$.post({
			url:'/m/g/muldel',
			data:{_idlist:idarr},
			success:function(rs){
				if(rs.rs === 1){
					window.location = window.location.href;
				}else{
					alert('删除失败,请刷新重试');
				}
			}
		});
	}
	
});