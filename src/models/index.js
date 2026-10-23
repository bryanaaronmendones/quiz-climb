const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config/config.js'); 

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env] || config;

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

// Load models
const User = require('./user')(sequelize, DataTypes);
module.exports = { sequelize, Sequelize, DataTypes, User};
const QuestionSet = require('./question-set')(sequelize, DataTypes);
const GameSession = require('./game-session')(sequelize, DataTypes);
const Player = require('./player')(sequelize, DataTypes);

// Associations (ERD lines)
User.hasMany(QuestionSet, { foreignKey: 'user_id', as: 'questionSets' });
QuestionSet.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

GameSession.hasMany(Player, { foreignKey: 'session_id' });
Player.belongsTo(GameSession, { foreignKey: 'session_id' });

module.exports = {
 
 sequelize,
  DataTypes,
  User,
  QuestionSet,
  GameSession,
  Player,
};