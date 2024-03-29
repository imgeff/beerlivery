'use strict';

const API = process.env.API_HOST;

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('products', [
       {
         branding_id: 1,
         name: 'Antarctica Pilsen 600ml',
         price: 5.54,
         url_image: `http://${API}/images/products/antarctica_pilsen_600ml.png`,
       },
      {
        branding_id: 1,
        name: 'Antarctica Subzero 600ml',
        price: 6.19,
        url_image: `http://${API}/images/products/antarctica_600ml.png`,
      },
      {
        branding_id: 1,
        name: 'Antarctica Pilsen 269ml',
        price: 2.29,
        url_image: `http://${API}/images/products/antarctica_pilsen_269ml.png`,
      },
      {
        branding_id: 2,
        name: 'Bohemia Puro Malte 600ml',
        price: 6.37,
        url_image: `http://${API}/images/products/bohemia_puro_malte_600ml.png`,
      },
      {
        branding_id: 2,
        name: 'Bohemia Puro Malte 473ml',
        price: 3.99,
        url_image: `http://${API}/images/products/bohemia_puro_malte_473ml.png`,
      },
      {
        branding_id: 3,
        name: 'Brahma Chopp 600ml',
        price: 7.50,
        url_image: `http://${API}/images/products/brahma_600ml.png`,
      },
      {
        branding_id: 3,
        name: 'Brahma Zero 355ml',
        price: 4.49,
        url_image: `http://${API}/images/products/brahma_zero_355ml.png`,
      },
      {
        branding_id: 3,
        name: 'Brahma Duplo Malte 350ml',
        price: 2.79,
        url_image: `http://${API}/images/products/brahma_duplo_malte_350ml.png`,
      },
      {
        branding_id: 3,
        name: 'Brahma Chopp 269ml',
        price: 2.59,
        url_image: `http://${API}/images/products/brahma_chopp_269ml.png`,
      },
      {
        branding_id: 4,
        name: 'Heineken 600ml',
        price: 7.50,
        url_image: `http://${API}/images/products/heineken_600ml.png`,
      },
      {
        branding_id: 4,
        name: 'Heineken 350ml',
        price: 5.50,
        url_image: `http://${API}/images/products/heineken_350ml.png`,
      },
      {
        branding_id: 5,
        name: 'Skol Beats Senses 313ml',
        price: 4.49,
        url_image: `http://${API}/images/products/skol_beats_senses_313ml.png`,
      },
      {
        branding_id: 5,
        name: 'Skol Beats Senses 269ml',
        price: 3.57,
        url_image: `http://${API}/images/products/skol_beats_senses_269ml.png`,
      },
      {
        branding_id: 5,
        name: 'Skol Pilsen 269ml',
        price: 2.19,
        url_image: `http://${API}/images/products/skol_pilsen_269ml.png`,
      },
      {
        branding_id: 6,
        name: 'Stella Artois 350ml',
        price: 4.19,
        url_image: `http://${API}/images/products/stella_artois_350ml.png`,
      },
      {
        branding_id: 6,
        name: 'Stella Artois 330ml',
        price: 5.49,
        url_image: `http://${API}/images/products/stella_artois_330ml.png`,
      },
      {
        branding_id: 6,
        name: 'Stella Artois Sem Glúten 330ml',
        price: 5.79,
        url_image: `http://${API}/images/products/stella_artois_sem_gluten_330ml.png`,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
