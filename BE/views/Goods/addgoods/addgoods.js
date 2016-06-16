$('#imgUper').change(function(){
	var fm = new FormData();
	fm.append("file",this.files[0]);
	$.ajax({
		url:'/apis/upload/',
		type:'POST',
		data:fm,
		success:function(data){
			goodInfo.imgurl = data.url;
			console.log(data.url);
			$('#prevImg').css('backgroundImage','url('+data.url+')');
		},
		contentType:false,
		processData:false
	});
});

$('#submit').click(function(){
	goodInfo.name = $('#name').val();
	goodInfo.intro = $('#intro').val();
	goodInfo.price = parseFloat($('#price').val());
	console.log(goodInfo);
	$.ajax({
		url:'/m/s/addgoods',
		type:'POST',
		data:goodInfo,
		success:function(rs){
			if(rs.rs === 1){
				window.location = '/m/s/listgoods'
			}
		}
	});
});

