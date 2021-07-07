const express = require("express");
var router = express.Router();
var db = require('./database');

router.get('/', function(req, res, next) {

  db.query('SELECT PostID, Commenter.Uname as Commenter, Cbody, CDate FROM blog.POST JOIN blog.USER AS Writer ON `PAuthorID#` = Writer.UserID LEFT JOIN blog.COMMENT ON PostID = `CPostID#` LEFT JOIN blog.USER AS Commenter ON `CWriterID#` = Commenter.UserID WHERE Cbody IS NOT NULL', function(err,results) {

    if(err){
      console.log("not connected")
      res.send('')
    } else {
      res.send(results)
    }
  });
});

module.exports = router;
