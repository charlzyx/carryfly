function checker() {
    var user = $('#username').val();
    var pwd = $('#pwd').val();
    if (user == '') {
        $('.ucell').addClass('weui_cell_warn');
    }
    if (pwd == '') {
        $('.pcell').addClass('weui_cell_warn');
    }
}
$('input').focus(function() {
    $('.ucell').removeClass('weui_cell_warn');
    $('.pcell').removeClass('weui_cell_warn');
});

$('input').blur(checker);


$('#regist').click(function() {
    checker();
    if ($('#pwd').val() === $('#repwd').val()) {
        var data = {
            username: $('#username').val(),
            pwd: $('#pwd').val(),
            shopname: $('#shopname').val(),
            phone: $('#phone').val(),
            intro: $('#intro').val()
        };
        $.ajax({
            url: '/s/regist',
            type: 'POST',
            data: data,
            success: function(data) {
                window.location.href = '/s/home';
            }
        });
    } else {
        alert('两次输入密码不一致!');
    }

});

$('#repwd').blur(function() {
    if ($('#pwd').val() !== $('#repwd').val()) {
        $('#repwd').val('');
        $('#pwd').focus();
        alert('两次输入密码不一致!');
    }
});
