const express = require("express");
var router = express.Router();
var db = require('./database')

router.get('/', function(req, res, next) {
  db.query('SELECT * FROM POST', function(err,rows){
    if(err) {
      req.flash('error', err);
      res.render('POST',{data:''});
    } else {
      res.render('POST',{data:rows});
    }
  });
});

module.exports = router;
