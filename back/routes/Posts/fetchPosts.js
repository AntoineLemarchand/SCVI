const express = require('express');
const db = require('../database');

const router = express.Router();

router.get('/', (req, res) => {

  db.query('SELECT PostID, PTitle, PBody, PSummary, Uname as Writer, PDate FROM blog.POST JOIN blog.USER as Writer ON `PAuthorID#` = Writer.UserID ORDER BY PDate DESC', function(err,results) {

    if(err){
      res.status(400).send('')
    } else {
      res.send(results)
    }
  });
});

module.exports = router
