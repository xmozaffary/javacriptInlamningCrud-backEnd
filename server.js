const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { sequelize, Players } = require("./models");
const migrationhelper = require("./migrationhelper");
const playerController = require("./controllers/playerController");

app.use(express.json());
app.use(cors());

app.get("/players/:id", async (req, res) => {
  const player = await Players.findOne({
    where: { id: req.params.id },
  });
  if (player == undefined) {
    res.status(404).send("not found");
  } else {
    res.json(player);
  }
});

app.get("/players", playerController.getAllPlayers);
app.put("/editPlayers/:id", playerController.editPlayerById);
app.post("/addPlayers", playerController.createPlayer);
app.delete("/deletePlayers", playerController.deletePlayer);

app.listen(port, async () => {
  await migrationhelper.migrate();
  console.log(`app lyssnar på port ${port}`);
});
