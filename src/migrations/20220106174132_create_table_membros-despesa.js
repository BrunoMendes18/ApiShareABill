exports.up = (knex) => {
    return knex.schema.createTable('membrosDespesa', (t) => {
        t.integer('user_id')
            .references('id')
            .inTable('users')
            .notNull();
        t.integer('desp_id')
            .references('id')
            .inTable('despesa')
            .notNull();
    });
};

exports.down = (knex) => {
  return knex.schema.dropTable('membrosDespesa');
};
