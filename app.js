const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const debug = require('debug')('app');

const app = express();
const port = process.env.PORT || 3000;


app.use(morgan('tiny'));


app.get('/', (req, res) => {
    res.send("Hello from zpm");
});


app.listen(5000, ()=>{
    debug(`listening on port ${chalk.green(port)}`)
});
