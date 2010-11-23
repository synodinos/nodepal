exports.rolesByUid = function(client, uid, callback) {
  var roles = new Array();
  client.query(
    'SELECT rid FROM users_roles WHERE uid="'+uid+'"',
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
    'SELECT pid, perm, tid FROM permission WHERE rid="'+rid+'"',
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
    'SELECT * FROM users WHERE uid="'+uid+'"',
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

exports.sessionByUid = function(client, uid, callback) {
  var session = new Array();
  client.query(
    'SELECT * FROM sessions WHERE uid="'+uid+'"',
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
    'SELECT uid FROM sessions WHERE sid="'+sid+'"',
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
