const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

const players = [
  {
    id: 1,
    name: 'Peter Forsberg',
    jersey: 21,
    team: 'Colorado',
    position: 'Forward',
    visible: true,
  },
  {
    id: 2,
    name: 'Mats Sundin',
    jersey: 13,
    team: 'Toronto',
    position: 'Forward',
    visible: true,
  },
  {
    id: 3,
    name: 'Niklas Lindsröm',
    jersey: 5,
    team: 'Detroit',
    position: 'Defence',
    visible: true,
  },
  {
    id: 4,
    name: 'Mikke Rantanen',
    jersey: 96,
    team: 'Colorado',
    position: 'Forward',
    visible: true,
  },
  {
    id: 5,
    name: 'jack Johnson',
    jersey: 3,
    team: 'Colorado',
    position: 'Defence',
    visible: true,
  },
];

app.get('/players/:id', (req, res) => {
  let findUser = chat.find((message) => message.id == req.params.id);
  if (findUser == undefined) {
    res.status(404).send('not found');
  } else {
    res.json(findUser);
  }
});

app.get('/players', (req, res) => {
  res.json(players);
});

app.listen(port, () => {
  console.log(`app lyssnar på port ${port}`);
});
