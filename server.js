const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const { sequelize, Players } = require('./models');
const migrationhelper = require('./migrationhelper');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

async function main() {
  await migrationhelper.migrate();
}

(async () => {
  main();
})();

app.put('/players/:id', async (req, res) => {
  const player = await Players.findOne({
    where: { id: req.params.id },
  });
  console.log(player);
  if (player == undefined) {
    res.status(404).send('not found');
  } else {
    player.name = req.body.name;
    player.jersey = req.body.jersey;
    player.position = req.body.position;
    player.team = req.body.team;
  }
  await player.save();
});

app.delete('/players/:id', async (req, res) => {
  const player = await Players.findOne({
    where: { id: req.params.id },
  });
  console.log(player);
  if (player == undefined) {
    res.status(404).send('not found');
  } else {
    Players.splice(Players.indexOf(player), 1);
  }
  await player.save();
});
app.get('/players', async (req, res) => {
  const playersList = await Players.findAll();
  res.json(playersList);
});

app.post('/players', async (req, res) => {
  await Players.create({
    name: req.body.name,
    jersey: req.body.jersey,
    team: req.body.team,
  });
});

app.listen(port, () => {
  console.log(`app lyssnar på port ${port}`);
});
