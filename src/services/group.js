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

    const addToGroup = async (grupo, membro) => {
        return await app.db('membrosGrupo').insert({user_id: membro.user_id, grupo_id: grupo});
    };

    const RemoveToGroup = async (user_id, grupo) => {
        return await app.db('membrosGrupo')
          .where({user_id: user_id, grupo_id: grupo.id})
          .del();
    };

    const pesquisar = async (dados) => {
        const pesq = await app.db('grupo').where('nome', 'like', `%${dados.nome}%`).orderBy('nome', 'asc');
        let resultado = [];
        let j = 0;

        for(i = 0; pesq.length > i; i++) {
            const pertence = await app.db('membrosGrupo').where({user_id: dados.id, grupo_id: pesq[i].id})

            if(pertence.length > 0) {
                resultado[j] = pesq[i];
                j++;
            }
        }

        return resultado;
    }

    return { findAll, validate, save, addToGroup, RemoveToGroup, findOne, atualizar, pesquisar };
}