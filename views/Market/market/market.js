var order = {
    sid: sid,
    bid: bid,
    gArr:[],
    numInfo:{},
    total: 0,
    status: 0
}


$('.addbtn').click(function(){
    $('#addcart').attr('tmp-id',$(this).attr('data-id'));
    $('#addcart').attr('tmp-price',$(this).attr('data-price'));
    $('.weui_dialog_confirm').show();
});

$('#addcart').click(function(){
    var gid = $(this).attr('tmp-id');
    var price = parseFloat($(this).attr('tmp-price'));
    var num = parseInt($('#num').val());
    var hasit = false;
    for(var i=0,l = order.gArr.length; i <= l;i++){
        if(order.gArr[i] == gid){
            order.numInfo["'"+gid+"'"] += num;
            hasit = true;
            break;
        }
    }
    if(!hasit){
        order.gArr.push(gid);
        order.numInfo["'"+gid+"'"] = num;
    }
    order.total += num * price;
    $('#total').html(order.total.toFixed(2));
    $('.weui_dialog_confirm').hide();
});

$('#cancel').click(function(){
    $('.weui_dialog_confirm').hide();
})

$('#submit').click(function(){
    console.log(order);
    $.ajax({
        url:'/o/create',
        type:'POST',
        data:order,
        success:function(rs){
            if(rs.state === 1){
                window.location.href = '/wx/t/create?oid=' + rs.order._id;
            }
        }
    });
});