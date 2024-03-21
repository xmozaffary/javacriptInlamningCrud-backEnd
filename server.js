const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const migrationhelper = require("./migrationhelper");
const playerController = require("./controllers/playerController");
const { validateCreatePlayer } = require("./validators/playerValidators");

app.use(express.json());
app.use(cors());

app.get("/players", playerController.getAllPlayers);
app.put(
  "/editPlayers/:id",
  validateCreatePlayer,
  playerController.editPlayerById
);
app.post("/addPlayers", validateCreatePlayer, playerController.createPlayer);
app.delete("/deletePlayer/:id", playerController.deletePlayer);

app.listen(port, async () => {
  await migrationhelper.migrate();
  console.log(`app lyssnar på port ${port}`);
});
