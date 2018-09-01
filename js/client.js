(function ($) {
    var socket = io.connect('http://localhost:1337');

    $('#formi1').submit(function (event) {
        event.preventDefault();
        var username = $('#username').val();
        var mail = $('#mail').val();

        if (username != '' && mail != '')
        {
            socket.emit('login',{
                username : username,
                mail : mail
            });
        }else
        {
            alert("l'un ou les deux champs est/sont vide");
        }
    });
    socket.on('logged',function () {
        $('.backblack').fadeOut();
    });
    socket.on('newuser',function (user) {
        $('.bloc0').append(' <div class="online container">'+user.avatar+'<p>'+user.username+'</p></div>');
    });


})(jQuery);