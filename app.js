const express = require("express");
const morgan = require("morgan");
const mysqlConnection = require("./connection");
const bodyParser = require("body-parser");
const playerRoutes = require("./routes/playerRoutes");
const teamRoutes = require("./routes/teamRoutes");
const knexPlayerRoutes = require("./knex-routes/playerRoutes");
const knexTeamRoutes = require("./knex-routes/teamRoutes");
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/players", playerRoutes);
app.use("/teams", teamRoutes);
app.use("/knex-players", knexPlayerRoutes);
app.use("/knex-teams", knexTeamRoutes);

app.get("/", (req, res) => {
    res.sendFile("index");
});

// app.get("/about", (req, res) => {
//     res.sendFile("public/about", {root: __dirname});
// });

app.listen(5000, () => {
    console.log(`listening on port ${(port)}`);
});
