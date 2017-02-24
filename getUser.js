var GitHub = require('github-api');
var fs = require('fs');

// basic auth
var gh = new GitHub({
   username: USERNAME,
   password: PASSWORD
});

var osearch = gh.search({type: 'user'});
osearch.forUsers({q: 'javascript'}, function(err, usersData) {   
    usersData.forEach(function(user){
        var ouser = gh.getUser(user.login);
        ouser.getProfile(function(err, userDetail){
            if(userDetail.blog && userDetail.blog.match(/linkedin/)){
                 fs.open('logins.txt', 'a', function(err, fd) 
                 {
                     if (err) 
                         throw 'error opening file: ' + err;
                     var buffer = new Buffer(userDetail.login + '\\' + userDetail.blog +"\n");
                     fs.write(fd, buffer, 0, buffer.length, null, function(err) {
                         if (err) throw 'error writing file: ' + err;
                         fs.close(fd, function() {
                             console.log('file written');
                         })
                     });
                 });
            }
        });
    });  
});