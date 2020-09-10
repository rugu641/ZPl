const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');

//add player
router.post('/', (req, res) => {
    const data = req.body;
    console.log(data);

    const sql = "INSERT INTO zpl.player (name,age,role,country,battingStyle,bowlingStyle,matchesPlayed) VALUES ('" + data.name + "','"+data.age+"','"+data.role+"','"+data.country+"','"+data.battingStyle+"','"+data.bowlingStyle+"','"+data.matchesPlayed+"')";
    mysqlConnection.query(sql, (err,rows, fields) => {
        if(!err)
            res.json({"success":"Player added successfully."});
        else
            console.log(err);
    });
});

//Returning the info of all players
router.get('/', (req, res) => {
    mysqlConnection.query("SELECT * FROM player", (err, rows, fields) => {
        if(!err)
            res.json(rows);
        else
            console.log(err);
    });
});

//Returning the info of given player
router.get('/:playerId', (req, res) => {
    mysqlConnection.query(`SELECT * FROM player Where id=${req.params.playerId}`, (err, rows, fields) => {
        if(!err)
            res.json(rows);
        else
            console.log(err);
    });
});

//Transfering or associating a player with a team
router.put('/:playerId', (req, res) => {
    const data = req.body;
    
    mysqlConnection.query(`UPDATE zpl.player SET team_id=${data.teamId} WHERE id=${req.params.playerId}`, (err, rows, fields) => {
        if(!err)
            res.json({"success":true});
        else
            console.log(err);
    });
});

module.exports = router;
