const express = require('express');
const db = require('./routes/database');
const bcrypt = require('bcrypt');
const cors = require('cors')
const cookieParser = require('cookie-parser');

const fetchComments = require('./routes/Comment/fetchComments');
const makeComment = require('./routes/Comment/makeComment');

const fetchPosts = require('./routes/Posts/fetchPosts');
const fetchPost = require('./routes/Posts/fetchPost');
const makePost = require('./routes/Posts/makePost');

const register = require('./routes/Accounts/CreateAccount');
const login = require('./routes/Accounts/Login')

const app = express();
const PORT = 9000;
app.use(cors(
  {
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200,
    credentials: true,
  }
));

const whitelist = ['/','/posts', '/post', '/makePost','/inscription', '/connexion', '/comments', '/postComment', 'makePost']
app.all(whitelist, (req, res, next) => {
  res.header("Content-Type", 'application/json; charset=utf-8')
  res.header("Access-Control-Allow-origin", 'http://localhost:3000');
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/posts', fetchPosts);
app.use('/post', fetchPost);
app.use('/makePost', makePost);

app.use('/comments', fetchComments);
app.use('/makeComment', makeComment);

app.use('/inscription', register);
app.use('/connexion', login)

app.listen(PORT,
  () => console.log(`Serveur en ligne sur https://localhost:${PORT}`))
