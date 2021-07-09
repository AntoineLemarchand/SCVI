const express = require('express');
const db = require('../database');
const router = express.Router();

router.post('/', (req,res) => {
  const commenter = req.body.commenter;
  const post = req.body.post;
  const body = req.body.cbody;
  db.query('INSERT INTO blog.COMMENT (`CWriterID#`, `CPostID#`, Cbody) VALUES (?, ?, ?)', [ commenter, post, body ], function(err) {
    if (err) {
      console.log(`${err}`);
      res.end()
    } else {
      console.log(`${req.body.commenter} vient de commenter sur le post ${req.body.post}`);
      res.end()
    }
  })
})

module.exports = router
