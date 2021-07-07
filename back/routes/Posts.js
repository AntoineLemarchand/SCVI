const express = require("express");
var router = express.Router();
var db = require('./database');

router.get('/', function(req, res, next) {

  db.query('SELECT PostID, PTitle, PBody, PSummary, Uname as Writer, PDate FROM blog.POST JOIN blog.USER AS Writer ON `PAuthorID#` = Writer.UserID', function(err,results) {

    if(err){
      console.log("not connected")
      res.send('')
    } else {
      res.send(results)
    }
  });
});

module.exports = router;
