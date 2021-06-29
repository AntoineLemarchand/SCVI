const express = require("express");
var router = express.Router();
var db = require('./database');

router.get('/', function(req, res, next) {

  db.query('SELECT * FROM blog.POST', function(err,results) {

    if(err){
      console.log("not connected")
      res.send('')
    } else {
      res.send(results)
    }
  });
});

module.exports = router;
