module.exports = (app) => {
    
    const findAll = (filter) => {
        return app.db('amigos').where({user_id1 : filter, user_id2 : filter});
    };

    const findOne = async (id, idAmigo) => {
        const priTent = await app.db('amigos').where({user_id1 : id, user_id2: idAmigo});
        const segTent = await app.db('amigos').where({user_id1 : idAmigo, user_id2: id});

        if (!priTent && !segTent) return { error: 'voces não são amigos' }; 
        else return await app.db('users').where({id: idAmigo});
    }

    const findByName = async (nome) => {
        const pesq = await app.db('users').where('name', 'like', `%${nome.name}%`).orderBy('name', 'asc');
        let resultado = [];
        let j = 0;

        for (i = 0; i < pesq.length; i++) {
            const amigos = await app.db('amigos')
                .where({user_id1: nome.id, user_id2: pesq[i].id})
                .orWhere({user_id1: pesq[i].id, user_id2: nome.id});

            if(amigos.length > 0) {
                resultado[j] = pesq[i];
                j = j + 1;
            }

        }

        return resultado;
    }

    const save = async (amigos) => {
        return await app.db('amigos').insert(amigos);
    };

    const remover = async (id, idAmigo) => {
        const priTent = await app.db('amigos').where({user_id1: id, user_id2: idAmigo}).del();

        if (!priTent) return  await app.db('amigos').where({user_id1: idAmigo, user_id2: id}).del();
        else return priTent;
    };

    return { findAll, save, remover, findOne, findByName };  
} 