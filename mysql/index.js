const express = require('express');
const mysql = require('mysql');

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

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, (err) => {
  if(!err) console.log('server is started');
  else console.error(err);
});

app.get('/', (req, res) => {
  res.send('<p><a href="/task">userlist</a></p><form method="post" action="/form"><input name="login" /><input name="passwd" /><input type="submit"/></form>');
});

app.get('/task', (req, res) => {
  connection.query(
    'SELECT * FROM users;',
    (err, data) => {
      if(err) {
        res.status(500);
        return;
      }
      res.send(createTableFromData(data));
    }
  );
});

app.post('/form', (req, res) => {
  connection.query(
    `SELECT * FROM logins
    WHERE login='${req.body.login}' AND passwd='${req.body.passwd}'`,
    (err, data) => {
      if(err) {
        res.status(500);
        return;
      }
      if(data.length === 0) res.send('error');
      else res.json(data);
    }
  );
});

function createTableFromData(data) {
  if(!Array.isArray(data)) return;
  const table = [];
  table.push('<table border="1" cellpadding="1" cellspacing="0">');
  table.push('<thead>');
  table.push('<tr>');
  const headers = Object.keys(data[0]);
  table.push(headers.map(head => `<th>${head}</th>`).join(''));
  table.push('</tr>');
  table.push('</thead>');
  table.push('<tbody>');
  const tbody = [];
  table.push(data.forEach(d => {
    tbody.push('<tr>');
    headers.forEach(head => {
      let red = '';
      if(d[head] === null) red = 'style="color:red;"';
      tbody.push(`<td ${red}>${d[head]}</td>`);
    });
    tbody.push('</tr>');
  }));
  table.push(tbody.join(''));
  table.push('</tbody>');
  table.push('</table>');
  return table.join('');
}
