const express = require('express');
const db = require('../loginblogdb');
const router = express.Router();

router.post('/', (req, res) => {
  const postId = req.body.PostID;
  db.query('SELECT comments.Cbody as Body, comments.CDate as Date, commenter.Uname as name FROM blog.COMMENT as comments JOIN blog.USER as commenter ON `CWriterID#` = commenter.UserID WHERE `CPostID#` = ? ORDER BY comments.CDate DESC',[postId],  (err, rows) => {
    if (err) {
      console.log(`${err}`)
      res.end();
    } else {
      res.send(rows)
    }
  })
});

module.exports = router
