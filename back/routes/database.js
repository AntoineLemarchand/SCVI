var mysql = require('mysql')

const connection = mysql.createConnection({
  host: "localhost",
  user: 'testeur',
  password: 'qwertyuiop',
  database: 'blog'
});

connection.connect(function(err){
  if(err) throw err

    console.log("Connected");
});

module.exports = connection;
