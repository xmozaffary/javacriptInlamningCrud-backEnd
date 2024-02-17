const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const { sequelize, Players } = require('./models');
const migrationhelper = require('./migrationhelper');

app.use(express.json());
app.use(cors());

app.put('/players/:id', async (req, res) => {
  const player = await Players.findOne({
    where: { id: req.params.id },
  });
  const { name, jersey, position, team } = req.body;
  if (player == undefined) {
    res.status(404).send('not found');
  } else {
    player.name = name;
    player.jersey = jersey;
    player.position = position;
    player.team = team;
  }
  await player.save();
  res.json(player);
});

app.get('/players/:id', async (req, res) => {
  const player = await Players.findOne({
    where: { id: req.params.id },
  });
  if (player == undefined) {
    res.status(404).send('not found');
  } else {
    res.json(player);
  }
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
  const playersList = await Players.findAll();
  res.json(playersList);
});

app.delete('/players/:id', async (req, res) => {
  console.log(req.params.id);
  const player = await Players.findOne({
    where: { id: req.params.id },
  });
  if (player == undefined) {
    res.status(404).send('not found');
  } else {
    await Players.destroy({
      where: { id: req.params.id },
    });
  }
  res.status(204).send('done');
});

app.listen(port, async () => {
  await migrationhelper.migrate();
  console.log(`app lyssnar på port ${port}`);
});
