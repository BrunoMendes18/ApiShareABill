module.exports = (app) => {
    
    const findAll = (/* filter = {} */) => {
        return app.db('amigos')/* .where(filter) */.select('*');
    };

    const save = async (amigos) => {

        console.log('oi -- ', amigos.user_id1, ' --- ', amigos.user_id2, ' -- oi');
        return await app.db('amigos').insert(amigos);
    }

    return { findAll, save };
}