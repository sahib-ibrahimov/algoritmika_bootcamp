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

fs.readFile('./users.json', 'utf8', (err, data) => {
  if(err) console.error(err);
  else {
    data = JSON.parse(data);
    if(data.length === 0) return;
    const columns = Object.keys(data[0]);
    let values = [];
    data.forEach(user => {
      const row = [];
      columns.forEach((column, i) => {
        if((i===0) || (user[column]===undefined)) row.push('null');
        else row.push(`'${user[column]}'`);
      });
      values.push('('+row.join(',')+')');
    });
    values = values.join(',');
    
    //console.log(values);
    //return;

    connection.query(
      `INSERT INTO users VALUES ${values};`,
      (e, d) => {
        if(e) console.error(e.code);
        else console.log(d);
      }
    )
  }
});
