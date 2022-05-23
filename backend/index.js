const express = require('express');
const app = express();

app.listen(3000, ()=> {
  console.warn('server is started');
});

const user = {
  name: 'John',
  age: 26
};

const ans = new Array();
const addHeader = () => {
  ans.push(`<!doctype html>
<html>
<head>
  <title>hello</title>
</head>
<body>`);
};

const addFooter = () => {
  ans.push(`
</body>
</html>`);
};

app.get('/user', (req, res) => {
  addHeader();
  ans.push(`<h1>User: ${user.name}</h1>`);
  ans.push(`<h2>Age: ${user.age}</h2>`);
  addFooter();
  res.send(ans.join(''));
  ans.splice(0);
});

app.get('/', (req, res) => {
  addHeader();
  ans.push(`<h1>Welcome</h1>`);
  ans.push(`<a href="/user">User</a>`);
  addFooter();
  res.send(ans.join(''));
  ans.splice(0);
});
