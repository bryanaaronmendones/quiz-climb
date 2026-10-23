const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config/config.js');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env] || config;

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

// Load models
const User = require('./user')(sequelize, DataTypes);
const QuestionSet = require('./question-set')(sequelize, DataTypes);
const GameSession = require('./game-session')(sequelize, DataTypes);
const Player = require('./player')(sequelize, DataTypes);

// Associations (ERD lines) - Pinalitan ang user_id ng host_id
User.hasMany(QuestionSet, { foreignKey: 'host_id', as: 'questionSets' });
QuestionSet.belongsTo(User, { foreignKey: 'host_id', as: 'host' });

GameSession.hasMany(Player, { foreignKey: 'session_id' });
Player.belongsTo(GameSession, { foreignKey: 'session_id' });

module.exports = {
  sequelize,
  Sequelize,
  DataTypes,
  User,
  QuestionSet,
  GameSession,
  Player
};