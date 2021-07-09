const express = require('express');
const db = require('../database');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/', (req, res) => {
  const username = req.body.username;
  bcrypt.hash(req.body.password,15, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query('INSERT INTO blog.USER (Uname, Upass, Urole) VALUES (?, ?, "user")', [username, hash], function (err) {
      if (err) {
        res.status(400).send("Erreur SQL")
      } else {
        console.log(`Compte de ${username} créé !`)
        res.end()
      }
    })
  })
});

module.exports = router
