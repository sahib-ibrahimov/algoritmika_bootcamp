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
  `UPDATE users SET employee='John' WHERE employee IS NULL;`,
  (e, d) => {
    if(e) console.error(e.code);
    else console.log(d);
  }
);

connection.query(
  `UPDATE users SET due_date='2022-05-26' WHERE fin_date IS NULL;`,
  (e, d) => {
    if(e) console.error(e.code);
    else console.log(d);
  }
);

connection.query(
  `UPDATE users SET due_date='2022-05-27', fin_date='2022-05-28'
  WHERE employee='John';`,
  (e, d) => {
    if(e) console.error(e.code);
    else console.log(d);
  }
);
