const validationError = require("../errors/validationError");

module.exports = (app) => {

    const addToGroup = async (dados) => {
        return await app.db('membrosGrupo').insert({user_id: dados.user_id, grupo_id: dados.grupo_id});
    };

    const RemoveToGroup = async (dados) => {
        const admin = await app.db('grupo').where({ id: dados.grupo_id })

        if (admin[0].admin == dados.user_id) {
            const eliminado = await app.db('membrosGrupo').where({user_id: dados.user_id, grupo_id: dados.grupo_id}).del();

            const restantes = await app.db('membrosGrupo').where({ grupo_id: dados.grupo_id })
            await app.db('grupo').where({ id: dados.grupo_id }).update({ admin: restantes[0].user_id })

            return eliminado
        }
        else {
            throw new validationError ('Erro: User não removido!');
        }
    };

    return { addToGroup, RemoveToGroup }
}