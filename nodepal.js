exports.rolesByUid = function(client, uid, callback) {
  var roles = new Array();
  client.query(
          'SELECT rid FROM users_roles WHERE uid="' + uid + '"',
          (function selectCb(err, results, fields) {
            if (err) {
              throw err;
            }
            for (result in results) {
              roles[result] = results[result].rid;
            }
            if (callback) callback(roles);
          })
          );
}

exports.permissionsByUid = function(client, rid, callback) {
  var permissions = new Array();
  client.query(
          'SELECT pid, perm, tid FROM permission WHERE rid="' + rid + '"',
          (function selectCb(err, results, fields) {
            if (err) {
              throw err;
            }
            for (result in results) {
              permissions[result] = {
                "pid":  results[result].pid,
                "perm": results[result].perm,
                "tid":  results[result].tid
              };
            }
            if (callback) callback(permissions);
          })
          );
}

exports.userByUid = function(client, uid, callback) {
  var user = new Array();
  client.query(
          'SELECT * FROM users WHERE uid="' + uid + '"',
          (function selectCb(err, results, fields) {
            if (err) {
              throw err;
            }
            for (result in results) {
              user[result] = {
                "uid":              results[result].uid,
                "name":             results[result].name,
                "pass":             results[result].pass,
                "mail":             results[result].mail,
                "mode":             results[result].mode,
                "sort":             results[result].sort,
                "threshold":        results[result].threshold,
                "theme":            results[result].theme,
                "signature":        results[result].signature,
                "signature_format": results[result].signature_format,
                "created":          results[result].created,
                "access":           results[result].access,
                "login":            results[result].login,
                "status":           results[result].status,
                "timezone":         results[result].timezone,
                "language":         results[result].language,
                "picture":          results[result].picture,
                "init":             results[result].init,
                "data":             results[result].data
              };
            }
            if (callback) callback(user);
          })
          );
}

// nodeByNid returns the contents of the {node} table and at the current time doesn't contain any extra fields that
// other 3rd-party modules might piggy-bag, e.g. CCK. If you need the later, please open a ticket, or even better
// submit a pacth :)
exports.nodeByNid = function(client, nid, callback) {
  var node = new Array();
  client.query(
          'SELECT * FROM node WHERE nid="' + nid + '"',
          (function selectCb(err, results, fields) {
            if (err) {
              throw err;
            }
            for (result in results) {
              node[result] = {
                "nid":              results[result].nid,
                "vid":              results[result].vid,
                "type":             results[result].type,
                "language":         results[result].language,
                "title":            results[result].title,
                "uid":              results[result].uid,
                "status":           results[result].status,
                "created":          results[result].created,
                "changed":          results[result].changed,
                "comment":          results[result].comment,
                "promote":          results[result].promote,
                "moderate":         results[result].moderate,
                "sticky":           results[result].sticky,
                "tnid":             results[result].tnid,
                "translate":        results[result].translate
              };
            }
            if (callback) callback(node);
          })
          );
}

exports.sessionByUid = function(client, uid, callback) {
  var session = new Array();
  client.query(
          'SELECT * FROM sessions WHERE uid="' + uid + '"',
          (function selectCb(err, results, fields) {
            if (err) {
              throw err;
            }
            for (result in results) {
              session[result] = {
                "sid":              results[result].sid,
                "hostname":         results[result].hostname,
                "timestamp":        results[result].timestamp,
                "cache":            results[result].cache,
                "session":          results[result].session
              };
            }
            if (callback) callback(session);
          })
          );
}

exports.uidBySid = function(client, sid, callback) {
  var uid = new Array();
  client.query(
          'SELECT uid FROM sessions WHERE sid="' + sid + '"',
          (function selectCb(err, results, fields) {
            if (err) {
              throw err;
            }
            for (result in results) {
              uid[result] = {
                "uid":              results[result].uid
              };
            }
            if (callback) callback(uid);
          })
          );
}

// nodeAccess checks {node_access} table and returns true/false depending if the grant is available. In the case of
// taxonomy access the gid maps directly to an rid (role id), and is one of the most common groupings. But for something
// like OG, the gid is a nid which points to the organic group node that represents the group. Other modules could have
// other ways to group users together.
exports.nodeAccess = function(client, nid, operation, gid, callback) {
  var access = new Array();

  var grantOperation = "";
  switch (operation) {
    case "view":
      grantOperation = "grant_view";
      break;
    case "update":
      grantOperation = "grant_update";
      break;
    case "delete":
      grantOperation = "grant_delete";
      break;
    default:
      grantOperation = "grant_view";
  }

  client.query(
          'SELECT COUNT(*) FROM node_access WHERE nid="' + nid +
                  '" AND gid="' + gid +
                  '" AND '+ grantOperation +'=1',
          (function selectCb(err, results, fields) {
            if (err) {
              throw err;
            }
            for (result in results) {
              access[result] = results[result];
              if (JSON.stringify(access) == '[{"COUNT(*)":1}]') access = true;
              else access = false;
            }
            if (callback) callback(access);
          })
          );
}
