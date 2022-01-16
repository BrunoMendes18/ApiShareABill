const validationError = require("../errors/validationError");

module.exports = (app) => {
    
    const findAll = (/* filter = {} */) => {
        return app.db('grupo')/* .where(filter) */.select('*');
    };

    const findOne = async (id) => {
        return await app.db('grupo').where({id: id});
    }

    const validate = async (grupo) => {
        if (!grupo.nome) throw new validationError ('O NOME é um atributo obrigatório!');
        if (!grupo.data) throw new validationError ('A DATA é um atributo obrigatório!');
        if (!grupo.admin) throw new validationError ('ADMIN é um atributo obrigatório!');
    };

    const save = (grupo) => {
        return app.db('grupo').insert(grupo);
    };

    const atualizar = (id, dados) => {
        const resultado = app.db('grupo').where({id: id}).update(dados, '*')
        return resultado;
    }

    const AddToGroup = async (membroGrupo) => {

        return await app.db('membrosGrupo').insert(membroGrupo);
    };

    const RemoveToGroup = (user_id) => {
        return app.db('membrosGrupo')
          .where({ user_id })
          .del();
    };
    return { findAll, validate, save, AddToGroup, RemoveToGroup, findOne, atualizar };
}