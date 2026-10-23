module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'Player',
    {
      player_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      session_id: { type: DataTypes.INTEGER, allowNull: false },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      nickname: { type: DataTypes.STRING(24), allowNull: false },
      score: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      completed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      rank: { type: DataTypes.INTEGER },
      last_seen_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      tableName: 'players',
      timestamps: true,
      createdAt: 'joined_at',
      updatedAt: false,
    }
  );