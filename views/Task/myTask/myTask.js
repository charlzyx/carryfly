$('.yes').click(function(){
	var tid = $(this).attr('data-tid');
	$.post({
		url:'/wx/t/setstate/'+tid,
		data: {state:3},
		success:function(rs){
			if(rs.success){
				window.location = window.location.href;
			}
		}
	})
});

$('.del').click(function(){
	var tid = $(this).attr('data-tid');
	$.post({
		url:'/wx/t/setstate/'+tid,
		data:{state:4},
		success:function(rs){
			if(rs.success){
				window.location = window.location.href;
			}
		}
	})
});

$('.finish').click(function(){
	var tid = $(this).attr('data-tid');
	$.post({
		url:'/wx/t/setstate/'+tid,
		data:{state:2},
		success:function(rs){
			if(rs.success){
				window.location = window.location.href;
			}
		}
	});
});