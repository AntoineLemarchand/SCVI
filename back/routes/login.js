const express = require("express");
const bodyparser = require("body-parser");
const router = express.Router();
const db = require('./database');

router.post("/auth", function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    db.query('SELECT * FROM USER WHERE Uname = ? AND Upass = ?', [username, password], function(error, results, fields) {
      if (results.length > 0) {
        request.session.loggedin = true;
        request.session.username = username;
        response.redirect('/home')
      } else {
        response.send("Non d'utilisateur ou mot de passe incorrect !");
      }
      response.end();
    });
  } else {
    response.send('Un des champs est vide !');
    response.end()
  }
})

module.exports = router
