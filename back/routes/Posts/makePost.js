const express = require('express');
const db = require('../database');

const router = express.Router();

router.post('/', (req, res) => {
  const author = req.body.poster;
  const title = req.body.title;
  const summary = req.body.summary;
  const body = req.body.body;
  db.query('INSERT INTO blog.POST (`PAuthorID#`, PTitle, PSummary ,PBody) VALUES (?, ?, ?, ?)',[author, title, summary, body], function(err) {
    if (err) {
      res.status(400).send(err)
    } else {
      console.log(`Post '${title}' écrit par ${author}`)
      res.end()
    }
  })
})

module.exports = router
