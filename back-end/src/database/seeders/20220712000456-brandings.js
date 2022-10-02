'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('brandings', [
      {
        name: 'Antarctica',
      },
      {
        name: 'Bohemia',
      },
      {
        name: 'Brahma',
      },
      {
        name: 'Heineken',
      },
      {
        name: 'Stella Artois',
      },
      {
        name: 'Skol',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('brandings', null, {});
  }
};
