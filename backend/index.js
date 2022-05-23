const express = require('express');
const app = express();

app.listen(3000, ()=> {
  console.warn('server is started');
});

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

const users = [
  {id: 123, name: 'John', age: 25},
  {id: 345, name: 'Bob', age: 26}
];

app.get('/user/:id', (req, res) => {
  addHeader();
  let find = -1;
  for(let i=0; i<users.length; ++i)
    if(users[i].id == req.params.id) {
      find = i;
      break;
    }
  if(find > -1) {
    ans.push(`<h2>Name: ${users[find].name}</h2>`);
    ans.push(`<h3>Age: ${users[find].age}</h3>`);
  } else {
    ans.push(`<h2>User not found</h2>`);
  }
  addFooter();
  if(find > -1) {
    res.status(200).send(ans.join(''));
  } else  {
    res.status(404).send(ans.join(''));
  }
  ans.splice(0);
});

app.get('/user', (req, res) => {
  addHeader();
  if(req.query.name === undefined) {
    addFooter();
    res.send(ans.join(''));
    ans.splice(0);
    return;
  }
  let find = -1;
  for(let i=0; i<users.length; ++i)
    if(users[i].name.toLowerCase() == req.query.name.toLowerCase()) {
      find = i;
      break;
    }
  if(find > -1) {
    ans.push(`<h2>Name: ${users[find].name}</h2>`);
    ans.push(`<h3>Age: ${users[find].age}</h3>`);
  } else {
    ans.push(`<h2>User not found</h2>`);
  }
  addFooter();
  if(find > -1) {
    res.status(200).send(ans.join(''));
  } else  {
    res.status(404).send(ans.join(''));
  }
  ans.splice(0);
});

app.get('/', (req, res) => {
  res.json(users);
});
