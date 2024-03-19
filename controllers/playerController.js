const { Players } = require("../models");
const { Op } = require("sequelize");

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
  let sortCol = req.query.sortCol || "name";
  let sortOrder = req.query.sortOrder || "asc";
  let limit = Number(req.query.limit || 20);
  let offset = Number(req.query.offset || 0);
  let q = req.query.q || "";
  console.log("!!", sortCol, sortOrder, q, limit, offset);
  const playersList = await Players.findAndCountAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: "%" + q + "%" } },
        { team: { [Op.like]: "%" + q + "%" } },
        { position: { [Op.like]: "%" + q + "%" } },
      ],
    },
    order: [[sortCol, sortOrder]],
    limit,
    offset,
  });
  const total = playersList.count;
  const result = playersList.rows.map((player) => {
    return {
      id: player.id,
      name: player.name,
      jersey: player.jersey,
      position: player.position,
      team: player.team,
    };
  });
  res.json({ result, total });
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
