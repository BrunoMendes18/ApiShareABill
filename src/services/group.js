const groups = require("../routes/groups");

module.exports = (app) => {
    
    const findAll = (/* filter = {} */) => {
        return app.db('grupo')/* .where(filter) */.select('*');
    };

    const save = async (grupo) => {

        return await app.db('grupo').insert(grupo);
    }

    return { findAll, save};
}