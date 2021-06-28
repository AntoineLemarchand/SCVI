var mysql = require('mysql')

const connection = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: '',
  database: 'blog'
});
connection.connect(function(err){
  if(err) {
    console.log('500 : Server Error');
  } else {
    console.log("Connected");
  }
});

module.exports = connection;
