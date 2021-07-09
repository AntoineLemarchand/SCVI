const express = require('express');
const db = require('../database');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/', (req, res) => {
  const username = req.body.username;
  db.query('SELECT UserID, Uname, Upass, Urole from blog.USER WHERE Uname = ?', [username], (err, rows, fields) => {
    if (rows.length > 0) {
      bcrypt.compare(req.body.password, rows[0].Upass, (error, response) => {
        if (error) {
          console.log(error)
        } else {
          if (response === true) {
            console.log(`connexion de ${req.body.username}`);
            const user = {
              username: req.body.username,
              loggedin: true,
              userID: rows[0].UserID,
              role: rows[0].Urole,
            }
            const cookieConfig = {
              maxAge: 60*60*1000,
              sameSite: true,
            }
            res.cookie('userData', user, cookieConfig)
            res.end()
          } else {
            console.log(`Mauvais mot de passe de ${req.body.username}`)
            res.send({err: "mdp"})
          }
        }
      })
    } else {
      console.log("ag")
      res.end()   
    }
  })
})

module.exports = router
