const validationError = require('../errors/validationError');

module.exports = (app) => {
  const addToGroup = async (dados) => {
    return await app.db('membrosGrupo').insert({ user_id: dados.user_id, grupo_id: dados.grupo_id });
  };

  const RemoveToGroup = async (grupo, user) => {
    const admin = await app.db('grupo').where({ id: grupo });

    if (admin[0].admin == user) {
      const eliminado = await app.db('membrosGrupo').where({ user_id: user, grupo_id: grupo }).del();

      const restantes = await app.db('membrosGrupo').where({ grupo_id: grupo });

      if (restantes.length > 0) {
        await app.db('grupo').where({ id: grupo }).update({ admin: restantes[0].user_id });
      } else {
        await app.db('grupo').where({ id: grupo }).del();
      }

      return eliminado;
    } else {
      const eliminado = await app.db('membrosGrupo').where({ user_id: user, grupo_id: grupo }).del();

      return eliminado;
    }
  };

  return { addToGroup, RemoveToGroup };
};
