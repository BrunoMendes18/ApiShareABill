module.exports = (app) => {
    
    const findAll = (filter = {} ) => {
        return app.db('amigos').where({user_id1 : filter, user_id2 : filter});
    };

    const save = async (amigos) => {
        return await app.db('amigos').insert(amigos);
    };

    const del = async (id, idAmigo) => {
        console.log('----------------------');
        console.log('id -- ', id, ' -- idAmigo -- ', idAmigo);
        console.log('----------------------');
        return await app.db('amigos').delete().where({user_id1: id, user_id2: idAmigo});
    };

    return { findAll, save, del };
}