const express = require('express');
const db = require('./routes/database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const {request, response} = require('express');

const app = express();
const PORT = 9000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

whitelist = ['/','/posts', '/post','/inscription', '/connexion', '/comments', '/postComment', 'makePost']

app.all(whitelist, (req, res, next) => {
  res.header("Access-Control-Allow-origin", 'http://localhost:3000');
  res.header("Access-Control-Allow-Credentials", 'true');
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get('/', function(req, res) {
  if (req.session.loggedin) {
    res.send({username: request.session.username});
  } else {
    res.end();
  }
})

app.post('/post', (req, res) => {
  const PostID = req.body.PostID
  db.query('SELECT PostID, PTitle as Title, writer.Uname as Writer, Pdate as Date, Pbody as Body FROM blog.POST join blog.USER as writer ON `PAuthorID#` = UserID WHERE PostID = ?',[PostID], function(err, results) {
    if(err) {
      console.log('db shat itself');
      res.status(400).send('')
    } else {
      res.send(results)
      console.log(`Post ${PostID} chargé`)
    }
  })
})

app.post('/makePost', (req, res) => {
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

app.get('/posts', (req, res) => {

  db.query('SELECT PostID, PTitle, PBody, PSummary, Uname as Writer, PDate FROM blog.POST JOIN blog.USER AS Writer ON `PAuthorID#` = Writer.UserID', function(err,results) {

    if(err){
      console.log("database not joinable")
      res.status(400).send('')
    } else {
      res.send(results)
    }
  });
});

app.post('/comments', (req, res) => {
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

app.post('/postComment', (req,res) => {
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

app.post('/inscription', (req, res) => {
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

app.post('/connexion', (req, res) => {
  const username = req.body.username;
  db.query('SELECT UserID, Uname, Upass from blog.USER WHERE Uname = ?', [username], (err,rows , fields) => {
    if (rows.length > 0) {
      bcrypt.compare(req.body.password, rows[0].Upass, (error, response) => {
        if (error) {
          console.log(error)
        } else {
          if (response === true) {
            console.log(`connexion de ${req.body.username}`)
            res.send({username: req.body.username, loggedin: true, userID: rows[0].UserID})
          } else {
            console.log(`Mauvais mot de passe de ${req.body.username}`)
            res.end()
          }
        }
      })
    } else {
      res.send("Pas d'utilisateur avec ce nom")
    }
  })
})

app.listen(PORT,
  () => console.log(`Serveur en ligne sur https://localhost:${PORT}`))
