'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'Photos',
      [
        {
          title: 'John Doe',
          caption:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque voluptatem doloremque doloribus dolorem harum amet laudantium ratione vero eius exercitationem? Fuga distinctio voluptas blanditiis iusto ut non iste optio obcaecati.',
          image_url: 'TBD',
          UserId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Rooney',
          caption:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque voluptatem doloremque doloribus dolorem harum amet laudantium ratione vero eius exercitationem? Fuga distinctio voluptas blanditiis iusto ut non iste optio obcaecati.',
          image_url: 'TBD',
          UserId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Giggs',
          caption:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque voluptatem doloremque doloribus dolorem harum amet laudantium ratione vero eius exercitationem? Fuga distinctio voluptas blanditiis iusto ut non iste optio obcaecati.',
          image_url: 'TBD',
          UserId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Foto Emyu',
          caption:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque voluptatem doloremque doloribus dolorem harum amet laudantium ratione vero eius exercitationem? Fuga distinctio voluptas blanditiis iusto ut non iste optio obcaecati.',
          image_url: 'TBD',
          UserId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Photos', null, {});
  },
};
