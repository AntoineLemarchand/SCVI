var express = require('express');
var router = express.Router();
var db = require('./database');

router.post('/sendcomment', function(req, res) {
  var commenter = req.commenter;
  var post = req.post;
  var cbody = req.cbody;
  var cdate = new Date();

  db.query("INSERT INTO blog.COMMENT (`CWriterID#`,`CPostID#`, Cbody, Cdate) VALUES (?)", [commenter, post, cbody, cdate])
})

module.exports = router;
