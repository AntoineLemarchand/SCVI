const express = require('express');
const db = require('../loginblogdb');
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
            res.send(user);
          } else {
            console.log(`Mauvais mot de passe de ${req.body.username}`)
            res.send({err: "mdp"})
          }
        }
      })
    } else {
      console.log(`no user ${username}`)
      res.send({err: "no user"})   
    }
  })
})

module.exports = router
