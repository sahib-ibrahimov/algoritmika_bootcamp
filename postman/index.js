const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = new Array();

app.listen(3000, ()=>{
  console.log('server is started');
  fs.readFile('users.json', 'utf8', (e, data) => {
    if(!e) {
      JSON.parse(data).forEach(user => users.push(user));
      console.log('users loaded');
    } else console.error(e);
  });
});

app.get('/', (req, res) => {
  res.json(users);
});

app.post('/', (req, res) => {
  users.push(req.body);
  fs.writeFile('users.json', JSON.stringify(users), (e) => {
    if(!e) console.log('users saved');
    else console.error(e);
  });
  res.json(users);
});
