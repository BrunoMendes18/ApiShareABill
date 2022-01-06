exports.up = (knex) => {
    return knex.schema.createTable('grupo', (t) => {
        t.increments('id').primary();
        t.string('nome').notNull();
        t.string('desc');
        t.date('data').notNull();
        t.integer('admin')
            .references('id')
            .inTable('users')
    });
};

exports.down = (knex) => {
  return knex.shema.dropTable('grupo');
};
