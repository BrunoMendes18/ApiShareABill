exports.up = (knex) => {
  return knex.schema.createTable('membrosDespesa', (t) => {
    t.integer('user_id')
      .references('id')
      .inTable('users')
      .notNull();
    t.integer('desp_id')
      .references('id')
      .inTable('despesa')
      .notNull()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    t.decimal('deve', 15, 2).notNull();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('membrosDespesa');
};
