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

$("#submit").click(function() {
    var user = {
        openid: openid,
        name: $("#name").val(),
        phone: $("#phone").val(),
        addr: $("#addr").val()
    };
    $.ajax({
        url: "/u/create",
        type: "POST",
        data: user,
        success: function(rs) {
            if (rs.rs === 1) {
                document.cookie = 'openid='+user.openid;
                window.location = opath;
            }
        }
    })
});