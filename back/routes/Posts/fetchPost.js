const express = require('express');
const db = require('../loginblogdb');
const router = express.Router();

router.post('/', (req, res) => {
  const PostID = req.body.PostID
  db.query('SELECT PostID, PTitle as Title, writer.Uname as Writer, Pdate as Date, Pbody as Body FROM blog.POST join blog.USER as writer ON `PAuthorID#` = UserID WHERE PostID = ?',[PostID], function(err, results) {
    if(err) {
      res.status(400).send('')
    } else {
      res.send(results)
    }
  })
})

module.exports = router
