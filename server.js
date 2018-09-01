var http = require('http');


var httpServer = http.createServer(function (req,res) {
    res.end("hello world");
});
httpServer.listen(1337);
var io = require('socket.io').listen(httpServer);

var users = {};

io.sockets.on('connection',function (socket) {
    var me = false;
    console.log('nouveau utilisateur');
    for (var k in users)
    {
        socket.emit('online',users[k]);
    }

    socket.on('login',function (user) {
       me = user;
       me.id = user.mail.replace('@','-').replace('.','-');
       // gravatar
        me.avatar = "<span class=\"fas fa-user fa-2x\"></span>";
        // lorsque on met
        //socket.emit('newuser',me);
        socket.emit('logged');
        users[me.id] = me;
        // veut dire envoyez qu'à l'utilisateur qui l'a lancé
        // si on met
        //socket.broadcast.emit('newuser',me);
        socket.broadcast.emit('newuser',me);
        // ça veut dire tous les utilisateurs courant sauf celui qui l'a lancé
        // et lorsque on met
        //io.sockets.emit('newuser',me);
        // alors la veut dire tt les utilisateurs courants mm celui qui l'a lancé

    });
    socket.on('disconnect',function () {
        if (!me)
        {
            return false;
        }
        delete users[me.id];
        io.sockets.emit('disusr',me);
    });



});