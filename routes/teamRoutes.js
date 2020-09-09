const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');

//add team
router.post('/', (req, res) => {
    const data = req.body;
    console.log(data);

    // const sql = `INSERT INTO zpl.player (id, name, age, role, country, battingStyle, bowlingStyle, matchesPlayed) VALUES (${data.id}, ${data.name}, ${data.age}, ${data.role} ,${data.country}, ${data.battingStyle}, ${data.bowlingStyle}, ${data.matchesPlayed})`;
    const sql = "INSERT INTO zpl.team (name,owner,coach,homeGround,numberOfStaff) VALUES ('" + data.name + "','"+data.owner+"','"+data.coach+"','"+data.homeGround+"','"+data.numberOfStaff+"')";
    mysqlConnection.query(sql, (err,rows, fields) => {
        if(!err)
            res.json({"success":"Team added successfully."});
        else
            console.log(err);
    });
});

//Return the info of all teams
router.get('/', (req, res) => {
    mysqlConnection.query("SELECT * FROM team", (err, rows, fields) => {
        if(!err)
            res.json(rows);
        else
            console.log(err);
    });
});

// router.put('/:teamId', (req, res) => {
//     const data = req.body;
//     let count;
//     mysqlConnection.query(`SELECT COUNT(name) AS count FROM zpl.player WHERE team_id=${req.params.teamId}`, (err, rows, fields) => {
//         if(!err){
//             count = rows[0].count;
//             console.log(rows[0].count);
//         }
//         else
//             console.log(err);
//     });

//     // console.log(count);

//     mysqlConnection.query(`UPDATE zpl.team SET captain='${data.captainName}', numberOfPlayers='${count}' WHERE id=${req.params.teamId}`, (err, rows, fields) => {
//         if(!err)
//             res.json(rows);
//         else
//             console.log(err);
//     });
// });

//Returning the info of given player
router.get('/:teamId', (req, res) => {
    mysqlConnection.query(`SELECT * FROM team Where id=${req.params.teamId}`, (err, rows, fields) => {
        if(!err)
            res.json(rows);
        else
            console.log(err);
    });
});

//Returning the info of all players for a given team
router.get('/:teamId/players', (req, res) => {
    const data = req.body;
    // console.log(data);
    mysqlConnection.query(`SELECT * FROM player Where team_id=${req.params.teamId}`, (err, rows, fields) => {
        if(!err)
            res.json(rows);
        else
            console.log(err);
    });
});

module.exports = router;
