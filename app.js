const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const playerRoutes = require("./routes/playerRoutes");
const teamRoutes = require("./routes/teamRoutes");
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/players", playerRoutes);
app.use("/teams", teamRoutes);

app.get("/", (req, res) => {
    res.sendFile("index");
});

app.listen(5000, () => {
    console.log(`listening on port ${(port)}`);
});
