const { Players } = require("../models");

const editPlayerById = async (req, res) => {
  const player = await Players.findOne({
    where: { id: req.params.id },
  });
  const { name, jersey, position, team } = req.body;
  if (player == undefined) {
    res.status(404).send("not found");
  } else {
    player.name = name;
    player.jersey = jersey;
    player.position = position;
    player.team = team;
  }
  await player.save();
  res.json(player);
};

const getAllPlayers = async (req, res) => {
  const playersList = await Players.findAll();
  res.json(playersList);
};

const createPlayer = async (req, res) => {
  await Players.create({
    name: req.body.name,
    jersey: req.body.jersey,
    team: req.body.team,
  });
  const playersList = await Players.findAll();
  res.json(playersList);
};

const deletePlayer = async (req, res) => {
  console.log(req.params.id);
  const player = await Players.findOne({
    where: { id: req.params.id },
  });
  if (player == undefined) {
    res.status(404).send("not found");
  } else {
    await Players.destroy({
      where: { id: req.params.id },
    });
  }
  res.status(204).send("done");
};

module.exports = {
  editPlayerById,
  getAllPlayers,
  createPlayer,
  deletePlayer,
};
