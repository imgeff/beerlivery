'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('brandings', [
      {
        name: 'Skol',
      },
      {
        name: 'Heineken',
      },
      {
        name: 'Antarctica',
      },
      {
        name: 'Brahma',
      },
      {
        name: 'Becks',
      },
      {
        name: 'Stella',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('brandings', null, {});
  }
};
