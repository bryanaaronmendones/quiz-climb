module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        school_id: '2099-0001',
        email: 'mariaOng@gmail.com',
        password: 'sample_password_1',
        username: 'Maria Ong',
        role: 'HOST',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        school_id: '2099-0003',
        email: 'BenCastro@gmail.com',
        password: 'sample_password_2',
        username: 'Ben Castro',
        role: 'HOST', 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        school_id: '2099-1001',
        email: 'DelaCruz@gmail.com',
        password: 'sample_password_3',
        username: 'Rina Dela Cruz',
        role: 'PLAYER', 
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};