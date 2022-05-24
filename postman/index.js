const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = new Array();
const saveUsers = users => {
  fs.writeFile('users.json', JSON.stringify(users), (e) => {
    if(!e) console.log('users saved');
    else console.error(e);
  });
};
const loadUsers = users => {
  fs.readFile('users.json', 'utf8', (e, data) => {
    if(!e) {
      JSON.parse(data).forEach(user => users.push(user));
      console.log('users loaded');
    } else console.error(e);
  });
}

app.listen(3000, ()=>{
  console.log('server is started');
  loadUsers(users);
});

app.get('/', (req, res) => {
  res.status(200).send('userlist');
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/user/show/:name', (req, res) => {
  res.send(
    users.filter(user =>
      req.params.name.toLowerCase() === user.name.toLowerCase()
    ).map(user =>
      `<p>${user.surname} ${user.name}, ${user.age} | ${user.phone}</p>`
    ).join('')
  );
});

app.post('/user/add', (req, res) => {
  const nextId = String(users.length + 1);
  users.push({id:nextId, ...req.body});
  saveUsers(users);
  res.json(users);
});

app.put('/user/edit', (req, res) => {
  const chnId = users.findIndex(user => user.id === req.body.id );
  if(chnId > -1) {
    users[chnId] = { ...users[chnId], ...req.body };
    saveUsers(users);
    res.json(users[chnId]);
  } else res.status(404).send('user not found');
});

app.delete('/user/delete/:id', (req, res) => {
  const delId = users.findIndex(user => user.id === req.params.id );
  if(delId > -1) {
    users.splice(delId,1);
    saveUsers(users);
    res.json(users);
  } else res.status(404).send('user not found');
});

app.get('/phonebook', (req, res) => {
  const ans = new Array();
  ans.push('<ol>');
  users.forEach(user => ans.push(`<li>${user.name}: ${user.phone}</li>`));
  ans.push('</ol>');
  res.send(ans.join(''));
});
