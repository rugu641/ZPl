const express = require('express');
const router = express.Router();
const knex = require('../connection');

//add player
router.post('/', (req, res) => {
    const data = req.body;

    knex('zpl.player').insert([data])
    .then(() => {
        res.json({"success":"Player added successfully."});
    })
    .catch((err)=> {console.log(err); throw err});

});

//Returning the info of all players
router.get('/', (req, res) => {

    knex.select('*').from('zpl.player')
    .then((rows) => {
        res.json(rows);
    })
    .catch((err) => { console.log(err); throw err});

});

//Returning the info of given player
router.get('/:playerId', (req, res) => {
    knex.select('*').from('zpl.player').where('id', req.params.playerId)
    .then((rows) => {
        res.json(rows);
    })
    .catch((err) => { console.log(err); throw err});
});

//Transfering or associating a player with a team
router.put('/:playerId', (req, res) => {
    const data = req.body;

    knex('zpl.player').where('id', req.params.playerId).update('team_id', data.teamId)
    .then(() => {
        res.json({"success": true});
    })
    .catch((err) => { console.log(err); throw err});
    
});

module.exports = router;
