exports.up = (knex) => {
  return knex.schema.createTable('membrosGrupo', (t) => {
    t.integer('user_id')
      .references('id')
      .inTable('users')
      .notNull();
    t.integer('grupo_id')
      .references('id')
      .inTable('grupo')
      .notNull()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('membrosGrupo');
};
