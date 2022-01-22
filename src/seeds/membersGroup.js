exports.seed = (knex) => {
  return knex('membrosGrupo').del()
    .then(() => knex('amigos').del())
    .then(() => knex('grupo').del())
    .then(() => knex('membrosDespesa'))
    .then(() => knex('despesa').del())
    .then(() => knex('users').del())
    .then(() => knex('users').insert([
      {
        id: 10000, name: 'User IPCA #1', email: 'user1@ipca.pt', password: '56789',
      },
      {
        id: 10001, name: 'User IPCA #2', email: 'user2@ipca.pt', password: '56789',
      },
      {
        id: 10003, name: 'Vitor Silva', email: 'vitor@gmail.com', password: '12345',
      },
    ]))
    .then(() => knex('grupo').insert([
      {
        id: 10000, nome: 'Grupo1', desc: 'descricao', data: new Date(), admin: 10000,
      },
      {
        id: 10001, nome: 'Grupo2', desc: 'descricao', data: new Date(), admin: 10001,
      },
    ]))
    .then(() => knex('membrosGrupo').insert([
      { user_id: 10000, grupo_id: 10000 },
      { user_id: 10001, grupo_id: 10000 },
      { user_id: 10000, grupo_id: 10001 },
      { user_id: 10001, grupo_id: 10001 },
    ]))
    .then(() => knex('amigos').insert([
      { user_id1: 10000, user_id2: 10001 },
    ]))
    .then(() => knex('despesa').insert([
      {
        id: 10000, nome: 'Despesa1', quanti: 50, tipo: 1, pago: 10000,
      },
      {
        id: 10001, nome: 'Despesa2', quanti: 100, tipo: 1, grupo_id: 10001, pago: 10001,
      },
    ]))
    .then(() => knex('membrosDespesa').insert([
      { user_id: 10001, deve: 25, desp_id: 10000 },
      { user_id: 10000, deve: 50, desp_id: 10001 },
    ]));
};
