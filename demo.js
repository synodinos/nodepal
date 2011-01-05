// Get the settings for connecting to the database
var settings = require('./settings').test;

// Create the DB client
var Client = require('mysql').Client,
        client = new Client();

// This is the DB (e.g. MySQL) user
client.user = settings.user;

// The DB user's password
client.password = settings.password;

// Create a connection
client.connect();

// Specify the Drupal database name
client.query('USE ' + settings.db);

// Import the functions you need from nodepal.js
var rolesByUid = require('./nodepal').rolesByUid;
var permissionsByUid = require('./nodepal').permissionsByUid;
var userByUid = require('./nodepal').userByUid;
var sessionByUid = require('./nodepal').sessionByUid;
var uidBySid = require('./nodepal').uidBySid;
var nodeByNid = require('./nodepal').nodeByNid;
var nodeAccess = require('./nodepal').nodeAccess;

// Import http
var http = require('http');

// Create a server to display results in a web page
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});

  // Just a buffer for the HTML we'll print on the page
  var html = "<h1>Nodepal demo page</h1>\
  \n<p>As long as you have entered the correct settings for your DB and your Drupal\
  is up and running, you should get some Drupal data here:</p>";

  // Get the Drupal cookie and use it to get the user's info
  var cookies = {};
  req.headers.cookie.split(';').forEach(function(cookie) {
    var parts = cookie.split('=');
    cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
    if (parts[ 0 ].trim() == settings.session) {
      var sid = parts[ 1 ].trim();
      uidBySid(client, sid, function(uid) {
        html += "<pre>\nYour UID = " + uid[0].uid + "\n</pre>";
        userByUid(client, uid[0].uid, function(user) {
          html += "<pre>\nYour are user: " + user[0].name + "\n</pre>";
          rolesByUid(client, uid[0].uid, function(roles) {
            html += "<pre>\nYour roles are => " + roles + "\n</pre>";
            permissionsByUid(client, uid[0].uid, function(permissions) {
              html += "<pre>\nAnd your permissions => " + JSON.stringify(permissions) + "\n</pre>";
              nodeByNid(client, 1, function(node) {
                html += "<pre>\nContent of node/1  => " + JSON.stringify(node) + "\n</pre>";
                nodeAccess(client, 0, "view", 0, function(access) {
                  html += "<pre>\nNode_access results for nid=0, gid=0, checking grant_view  => " +
                          JSON.stringify(access) + "\n</pre>";
                  res.write(html);
                  res.end();
                });
              });
            });
          });
        });
      });

    }
  });
}).listen(8124, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8124/');
