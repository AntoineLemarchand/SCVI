const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('./database');

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/registration', function(req, res) {
  console.log('posted')
  res.end(req.body.username)
});

module.exports = router;
