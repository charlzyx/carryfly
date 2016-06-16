$('#finish').click(function(){
    $.post({
        url:'/wx/t/setstate/'+tid,
        data:{state:3},
        success:function(rs){
            if(rs.success){
                window.location = window.location.href;
            }
        }
    });
});
$('#confirm').click(function(){
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