const pg = require('pg')

const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'apishareabill',
    password: 'brunojesus18hd',
    port: 5432,
})

module.exports = client