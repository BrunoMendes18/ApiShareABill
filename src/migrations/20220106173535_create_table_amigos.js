exports.up = (knex) => {
  return knex.schema.createTable('amigos', (t) => {
    t.integer('user_id1')
      .references('id')
      .inTable('users')
      .notNull();
    t.integer('user_id2')
      .references('id')
      .inTable('users')
      .notNull();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('amigos');
};
