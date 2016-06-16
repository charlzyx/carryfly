
$('#submit').click(function(){
	task.title = $('#title').val();
	task.intro = $('#intro').val();
	if($('#taddr').val() !== ""){
		task.baddr = $('#taddr').val();
	}
	$.ajax({
		url:'/wx/t/create',
		type:'POST',
		data:task,
		success:function(data){
			console.log(data);
			window.location = '/wx/t/listtask';
		}
	});
});

