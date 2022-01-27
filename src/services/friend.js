const validationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = async (filter) => {
    return await app.db('amigos').where({ user_id1: filter }).orWhere({ user_id2: filter });
  };

  const findOne = async (iD, idAmigo) => {
    const priTent = await app.db('amigos').where({ user_id1: iD, user_id2: idAmigo });
    const segTent = await app.db('amigos').where({ user_id1: idAmigo, user_id2: iD });

    if (!priTent && !segTent)throw new validationError('voces não são amigos');
    return await app.db('users').where({ id: idAmigo });
  };

  const findByName = async (iD, nome) => {
    const pesq = await app.db('users').where('name', 'like', `%${nome}%`).orderBy('name', 'asc');
    const resultado = [];
    let j = 0;

    for (i = 0; i < pesq.length; i++) {
      const amigos = await app.db('amigos')
        .where({ user_id1: iD, user_id2: pesq[i].id })
        .orWhere({ user_id1: pesq[i].id, user_id2: iD });

      if (amigos.length > 0) {
        resultado[j] = pesq[i];
        j += 1;
      }
    }

    return resultado;
  };

  const save = async (amigos) => {
    return await app.db('amigos').insert(amigos, '*');
  };

  const remover = async (id, idAmigo) => {
    const priTent = await app.db('amigos').where({ user_id1: id, user_id2: idAmigo }).del();

    if (!priTent) return await app.db('amigos').where({ user_id1: idAmigo, user_id2: id }).del();
    return priTent;
  };

  return {
    findAll, save, remover, findOne, findByName,
  };
};
