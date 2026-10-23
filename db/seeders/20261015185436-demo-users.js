'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: '2099_alex_test',
        email: '2099_alex_test@example.com',
        password: 'securepassword123',
        password_hash: 'securepassword123',
        role: 'PLAYER',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: '2099_sam_test',
        email: '2099_sam_test@example.com',
        password: 'securepassword123',
        password_hash: 'securepassword123',
        role: 'PLAYER',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: '2099_jordan_test',
        email: '2099_jordan_test@example.com',
        password: 'securepassword123',
        password_hash: 'securepassword123',
        role: 'PLAYER',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
