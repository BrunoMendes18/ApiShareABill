const { json } = require('body-parser');
const validationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = (id) => {
    const grupos = app.db('grupo').join('membrosGrupo', 'id', '=', 'grupo_id').where({ user_id: id });

    if (!grupos) throw new validationError('Não pertence a grupos');
    else return grupos;
  };

  const findOne = async (ID) => {
    return await app.db('grupo').where({ id: ID });
  };

  const validate = async (grupo) => {
    if (!grupo.nome) throw new validationError('O NOME é um atributo obrigatório!');
    if (!grupo.data) throw new validationError('A DATA é um atributo obrigatório!');
    if (!grupo.admin) throw new validationError('ADMIN é um atributo obrigatório!');
  };

  const save = async (grupo, iD) => {
    const Grupo = await app.db('grupo').insert(grupo, ['id']);
    await app.db('membrosGrupo').insert({ user_id: iD, grupo_id: Grupo[0].id });
    return Grupo;
  };

  const atualizar = (id, dados) => {
    const resultado = app.db('grupo').where({ id }).update(dados, '*');
    return resultado;
  };

  const pesquisar = async (id, nome) => {
    const pesq = await app.db('grupo').where('nome', 'like', `%${nome}%`).orderBy('nome', 'asc');
    const resultado = [];
    let j = 0;

    for (i = 0; pesq.length > i; i++) {
      const pertence = await app.db('membrosGrupo').where({ user_id: id, grupo_id: pesq[i].id });

      if (pertence.length > 0) {
        resultado[j] = pesq[i];
        j++;
      }
    }

    return resultado;
  };

  const deleteGroup = async (idGrupo, idUti) => {
    const resultado = [];
    let j = 0;

    const admin = await app.db('grupo').where({ id: idGrupo });
    if (admin[0].admin === idUti.idUser) {
      const despesa = await app.db('despesa').where({ grupo_id: idGrupo });

      if (despesa.length > 0) {
        for (i = 0; i < despesa.length; i++) {
          const liquidado = await app.db('membrosDespesa').where({ desp_id: despesa[i].id });

          if (liquidado.deve > 0) {
            resultado[j] = liquidado[i];
            j++;
          }
        }

        if (resultado.length > 0) {
          throw new validationError('Ainda há contas por pagar!');
        } else {
          for (i = 0; i < despesa.length; index++) {
            await app.db('membrosDespesa').where({ desp_id: despesa[i].id }).del();
          }
          await app.db('despesa').where({ grupo_id: idGrupo }).del();
          await app.db('membrosGrupo').where({ grupo_id: idGrupo }).del();
          return await app.db('grupo').where({ id: idGrupo }).del();
        }
      } else {
        await app.db('membrosGrupo').where({ grupo_id: idGrupo }).del();
        return await app.db('grupo').where({ id: idGrupo }).del();
      }
    } else {
      throw new validationError('Você não é o administrador do grupo!');
    }
  };

  return {
    findAll, validate, save, findOne, atualizar, pesquisar, deleteGroup,
  };
};
