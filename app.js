const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const debug = require("debug")("app");
const mysqlConnection = require("./connection");
const bodyParser = require("body-parser");
const playerRoutes = require("./routes/player");

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use("/player", playerRoutes);

app.get("/", (req, res) => {
    res.send("Hello from zpm");
});
app.get("/home", (req, res) => {
    res.send("Hello AMan");
});

app.listen(5000, () => {
    debug(`listening on port ${chalk.green(port)}`);
});