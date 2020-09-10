const express = require('express');
const router = express.Router();
const knex = require('../knex-connection');

//add team
router.post('/', (req, res) => {
    const data = req.body;

    knex('zpl.team').insert([data])
    .then(() => {
        res.json({"success":"Team added successfully."});
    })
    .catch((err)=> {console.log(err); throw err});

});

//Returning the info of all teams
router.get('/', (req, res) => {

    knex.select('*').from('zpl.team')
    .then((rows) => {
        res.json(rows);
    })
    .catch((err) => { console.log(err); throw err});

});

//Updating captain and number of players
router.put('/:teamId', (req, res) => {
    const data = req.body;
    let count;

    knex('zpl.player').count('name', {as:'count'}).where('team_id', req.params.teamId)
    .then((rows) => {
        count = rows[0].count;
        // console.log(rows);
        knex('zpl.team').where('id', req.params.teamId).update({captain: data.captainName, numberOfPlayers: count})
        .then(() => {
            res.json({"success": "Succesfully updated the captain and number of players"});
        })
        .catch((err) => { console.log(err); throw err});
    })
    .catch((err) => { console.log(err); throw err});

});

//Returning the info of given team
router.get('/:teamId', (req, res) => {
    knex.select('*').from('zpl.team').where('id', req.params.teamId)
    .then((rows) => {
        res.json(rows);
    })
    .catch((err) => { console.log(err); throw err});
});

//Returning the info of all players for a given team
router.get('/:teamId/players', (req, res) => {
    const data = req.body;
    
    knex.select('*').from('zpl.player').where('team_id', req.params.teamId)
    .then((rows) => {
        res.json(rows);
    })
    .catch((err) => { console.log(err); throw err});
    
});

module.exports = router;
