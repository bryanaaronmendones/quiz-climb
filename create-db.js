"db:create"; "node -e \"const {Sequelize}=require('sequelize'); require('dotenv').config(); const sequelize=new Sequelize('postgres', process.env.DB_USER, process.env.DB_PASSWORD, {host: process.env.DB_HOST, port: process.env.DB_PORT || 5432, dialect: 'postgres'}); sequelize.query('CREATE DATABASE \"' + process.env.DB_NAME + '\";').then(() => { console.log('Database ' + process.env.DB_NAME + ' created.'); process.exit(0); }).catch(err => { console.log('Note: ' + err.message); process.exit(0); });\""

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('postgres', process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
  logging: false
});

async function createDb() {
  try {
    const dbName = process.env.DB_NAME;
    await sequelize.query(`CREATE DATABASE "${dbName}";`);
    console.log(`Database ${dbName} created.`);
  } catch (err) {
    if (err.original && err.original.code === '42P04') {
      console.log('Database already exists.');
    } else {
      console.error('Error creating database:', err.message);
    }
  } finally {
    process.exit(0);
  }
}

createDb();