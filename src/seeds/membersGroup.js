exports.seed = (knex) => {
  return knex('membrosGrupo').del()
  .then(() => knex('amigos').del())
    .then(() => knex('grupo').del())
    .then(() => knex('despesa').del())
    .then(() => knex('users').del())
    .then(() => knex('users').insert([
      { id: 10000, name: 'User IPCA #1', email: 'user1@ipca.pt', password: '56789'},
      { id: 10001, name: 'User IPCA #2', email: 'user2@ipca.pt', password: '56789'},
    ]))
    .then(() => knex('grupo').insert([
      { id: 10000, nome: 'Grupo1', desc: 'descricao' , data: new Date(), admin: 10000 },
      { id: 10001, nome: 'Grupo2', desc: 'descricao' , data: new Date(), admin: 10001 },
    ]))
    .then(() => knex('membrosGrupo').insert([
      { user_id:10000, grupo_id:10000 },
      { user_id:10001, grupo_id:10001 },
    ]))
    .then(() => knex('amigos').insert([
      { user_id1: 10000, user_id2: 10001 },
    ]));
};