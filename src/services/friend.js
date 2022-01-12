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

    const save = async (amigos) => {
        return await app.db('amigos').insert(amigos);
    };

    const remover = async (id, idAmigo) => {
        const priTent = await app.db('amigos').where({user_id1: id, user_id2: idAmigo}).del();

        if (!priTent) return  await app.db('amigos').where({user_id1: idAmigo, user_id2: id}).del();
        else return priTent;
    };

    return { findAll, save, remover, findOne };  
}