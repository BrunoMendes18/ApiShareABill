exports.up = (knex) => {
  return knex.schema.createTable('despesa', (t) => {
    t.increments('id').primary();
    t.string('nome').notNull();
    t.decimal('quanti', 15, 2).notNull();
    t.decimal('tipo', 1, 0).notNull();
    t.integer('grupo_id')
      .references('id')
      .inTable('grupo')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    t.integer('pago')
      .references('id')
      .inTable('users')
      .notNull();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('despesa');
};
