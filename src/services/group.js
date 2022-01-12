const groups = require("../routes/groups");

module.exports = (app) => {
    
    const findAll = (/* filter = {} */) => {
        return app.db('grupo')/* .where(filter) */.select('*');
    };

    const save = async (grupo) => {

        return await app.db('grupo').insert(grupo);
    }

    const AddToGroup = async (membroGrupo) => {

        return await app.db('membrosGrupo').insert(membroGrupo);
    }

    const RemoveToGroup = (user_id) => {
        return app.db('membrosGrupo')
          .where({ user_id })
          .del();
    };
    return { findAll, save, AddToGroup, RemoveToGroup};
}