/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('resep', function(table) {
        table.increments('id').primary();
        table.string('nama');
        table.text('gambar');
        table.string('deskripsi');
        table.string('waktu');
        table.enu('level', ['easy', 'medium', 'hard']);
        table.integer('porsi');
        table.text('bahan');
        table.text('cara');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('resep');
};
