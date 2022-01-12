module.exports = (app) => {
    
    const save = async (membrosGrupo) => {

        return await app.db('membrosGrupo').insert(membrosGrupo);
    }

    const remove = (user_id) => {
        return app.db('membrosGrupo')
          .where({ user_id })
          .del();
    };

    return { save, remove };
}