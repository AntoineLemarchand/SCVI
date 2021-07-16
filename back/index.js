const express = require('express');
const cookieParser = require('cookie-parser');

const fetchComments = require('./routes/Comment/fetchComments');
const makeComment = require('./routes/Comment/makeComment');

const fetchPosts = require('./routes/Posts/fetchPosts');
const fetchPost = require('./routes/Posts/fetchPost');
const makePost = require('./routes/Posts/makePost');

const register = require('./routes/Accounts/CreateAccount');
const login = require('./routes/Accounts/Login')

const app = express();
const PORT = 8080;

const uriWhiteList = ['/','/posts', '/post', '/makePost','/inscription', '/connexion', '/comments', '/makeComment', 'makePost']
const urlWhiteList = [ 'https://blog.antoinelemarchand.xyz' ];
app.all(uriWhiteList, (req, res, next) => {
  res.header("Content-Type", 'application/json; charset=utf-8')
  res.header("Access-Control-Allow-Origin", urlWhiteList);
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type, Accept");
  res.header("Access-Control-Allow-Credentials", "true")
  next();
});

app.use(require('helmet')());

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

app.listen(PORT, () => {
  console.log(`HTTP en ligne sur le PORT ${PORT}`)
})
