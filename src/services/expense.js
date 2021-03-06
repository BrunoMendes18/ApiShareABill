const validationError = require('../errors/validationError');

module.exports = (app) => {
  const validate = async (data) => {
    if (!data.nome) throw new validationError('O NOME é um atributo obrigatório');
    if (!data.quanti) throw new validationError('O VALOR da DESPESA é um atributo obrigatório');
    if (!data.tipo) throw new validationError('A maneira como DISTRIBUI a despesa é um atributo obrigatório');
    if (!data.pago) throw new validationError('A PESSOA que PAGOU é um atributo obrigatório');
  };

  const findAll = (dados) => {
    return app.db('despesa').join('membrosDespesa', 'id', '=', 'desp_id')
      .where({ user_id: dados })
      .orWhere({ pago: dados });
    /* return app.db('despesa').select('*'); */
  };

  const find = (filter = {}) => {
    return app.db('despesa').where(filter).first();
  };

  const grupo = (id) => {
    if (id == -1) {
      return app.db('despesa').groupBy('id').havingNull('grupo_id');
    } else {
      return app.db('despesa').where({ grupo_id: id });
    }
  };

  const save = async (expense) => {
    return await app.db('despesa').insert(expense, ['id', 'nome', 'quanti', 'tipo', 'grupo_id', 'pago']);
  };

  const update = async (id, despesa) => {
    return app.db('despesa')
      .where({ id })
      .update(despesa, '*');
  };

  const remove = async (id) => {
    await app.db('membrosDespesa').where({ desp_id: id });
    return await app.db('despesa')
      .where({ id })
      .del();
  };

  return {
    save, findAll, validate, update, find, remove, grupo,
  };
};
