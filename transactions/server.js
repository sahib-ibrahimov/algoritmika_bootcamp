const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const fileName = './transactions.json';
const transactions = new Array();

const saveData = data => {
  fs.writeFile(fileName, JSON.stringify(data), (e) => {
    if(!e) console.log('data saved');
    else console.error(e);
  });
};

const loadData = data => {
  fs.readFile(fileName, 'utf8', (e, d) => {
    if(!e) {
      JSON.parse(d).forEach(item => data.push(item));
      console.log('data loaded');
    } else console.error(e);
  });
}

function loadMonoCounter() {
  fs.readFileSync("monolitic.txt", "binary",
  async function(err, data) {
    return await new Buffer( data);
  });
}

const loadHTML = fileName => {
  return fs.readFileSync(fileName, 'utf8');
}

app.listen(3000, ()=>{
  console.log('server started');
  loadData(transactions);
});

app.get('/', (req, res) => {
  res.status(200).send(loadHTML('./client.html'));
});

app.get('/transaction', (req, res) => {
  if(req.query.from !== undefined) {
    res.json(
      transactions.filter(transaction =>
        req.query.from.toLowerCase() === transaction.from.toLowerCase()
      )
    );
  } else res.json(transactions);
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

app.post('/transaction', (req, res) => {
  const nextId = String(transactions.length + 1);
  transactions.push({id:nextId, ...req.body});
  saveData(transactions);
  res.json(transactions[nextId-1]);
});

app.put('/transaction/:id', (req, res) => {
  const chnId = transactions.findIndex(transaction => transaction.id === req.params.id );
  if(chnId > -1) {
    transactions[chnId] = { ...transactions[chnId], ...req.body };
    saveData(transactions);
    res.json(transactions[chnId]);
  } else res.status(404).send('transaction not found');
});

app.delete('/transaction/:id', (req, res) => {
  const delId = transactions.findIndex(transaction => transaction.id === req.params.id );
  if(delId > -1) {
    transactions.splice(delId,1);
    saveData(transactions);
    res.json(transactions);
  } else res.status(404).send('transaction not found');
});
