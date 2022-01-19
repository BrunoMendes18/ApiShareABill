module.exports = (app) => {
  const save = async (membrosDespesa) => {
    return await app.db('membrosDespesa').insert(membrosDespesa, ['user_id', 'desp_id', 'deve']);
  };

  const find = (filter = {}) => {
    return app.db('membrosDespesa').where(filter).select('*');
  };

  const remove = (user_id) => {
    return app.db('membrosDespesa')
      .where({ user_id })
      .del();
  };

  return { save, remove, find };
};
