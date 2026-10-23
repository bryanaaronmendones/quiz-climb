const { sequelize } = require('../src/models');

async function main() {
  console.log('Wiping database...');
  await sequelize.query('DROP SCHEMA public CASCADE;');
  await sequelize.query('CREATE SCHEMA public;');
  console.log('Database wiped successfully.');
  await sequelize.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});