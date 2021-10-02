//require('dotenv-safe').config();
var db = require('./mygrimorio.json');
const jwt = require('jsonwebtoken');
const http = require('http');
const express = require('express');
const app = express();

const IP = 'https://mygrimoire-api.herokuapp.com/';

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.json({message: 'Tudo ok por aqui!'});
});

app.post('/login', (req, res, next) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and password are required',
    });
  }

  if (
    db.users.find(user => user.email === email && user.password === password)
  ) {
    const user = db.users.filter(user => user.email === email);
    const userId = user[0].id;
    const token = jwt.sign({userId}, 'G4nD@lF');
    return res.status(200).json({auth: true, token});
  } else {
    return res.status(401).json({error: 'Invalid credentials'});
  }
});

app.post('/logout', function (req, res) {
  res.json({auth: false, token: null});
});

function verifyJWT(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({auth: false, message: 'No token provided.'});
  }

  jwt.verify(token, 'G4nD@lF', function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .json({auth: false, message: 'Failed to authenticate token.'});
    }

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

function getIdByToken(req) {
  const token = req.headers['x-access-token'];
  const decoded = jwt.verify(token, 'G4nD@lF');
  let userId = decoded.userId;
  return userId;
}

app.get('/my-persons', verifyJWT, (req, res, next) => {
  let userId = getIdByToken(req);
  let persons = db.persons.filter(person => person.id === userId);

  const total = persons[0].my_persons.length;

  return res.json({
    persons: persons[0].my_persons,
    total,
  });
});

app.get('/person', verifyJWT, (req, res, next) => {
  const userId = getIdByToken(req);
  let persons = db.persons.find(person => person.id === userId);
  let myPerson = persons.my_persons.find(
    person => person.id === req.body.personId,
  );
  if (!myPerson) {
    return res.status(404).json({message: 'Person not found!'});
  }

  return res.json(myPerson);
});

app.get('/magics-person', verifyJWT, (req, res, next) => {
  const userId = getIdByToken(req);
  let persons = db.persons.find(person => person.id === userId);
  let myPerson = persons.my_persons.find(
    person => person.id === req.body.personId,
  );
  if (!myPerson) {
    return res.status(404).json({message: 'Person not found!'});
  }

  const total = myPerson.myMagics.length;

  return res.json({
    myMagic: myPerson.myMagics,
    total,
  });
});

app.get('/specific-magic-person', verifyJWT, (req, res, next) => {
  const userId = getIdByToken(req);
  let persons = db.persons.find(person => person.id === userId);
  let myPerson = persons.my_persons.find(
    person => person.id === req.body.personId,
  );
  if (!myPerson) {
    return res.status(404).json({message: 'Person not found!'});
  }

  let myMagic = myPerson.myMagics.filter(magic =>
    magic.name.toLowerCase().includes(req.body.magicName.toLowerCase()),
  );

  if (!myMagic) {
    return res.status(404).json({message: 'Magic not found!'});
  }

  const total = myMagic.length;

  return res.json({
    myMagic,
    total,
  });
});

const server = http.createServer(app);
server.listen(3000, IP);
console.log('Servidor escutando no IP: ' + IP + ' na porta 3000...');
