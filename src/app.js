const app = require('express')();


const knex = require('knex');
const knexfile = require('../knexfile');
app.db = knex(knexfile.test);

app.get('/', (req, res) => {
    res.status(200).send({
        mensagem: 'Ok, deu certo!'
    });
});

module.exports = app;