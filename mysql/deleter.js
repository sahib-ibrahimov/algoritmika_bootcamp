const mysql = require('mysql');
const fs = require('fs');

const connection = mysql.createConnection({
  host: 'localhost',  //127.0.0.1
  port: 3306,
  user: 'root',
  password: '',
  database: 'test2'
});

connection.connect((err)=>{
  if(!err) {
    console.log('connetced to database');
  } else {
    console.error(err);
    process.exit(err.errno);
  }
});

connection.query(
  `DELETE FROM users WHERE fin_date > due_date;`,
  (e, d) => {
    if(e) console.error(e.code);
    else console.log(d);
  }
);
