module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'GameSession',
    {
      session_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      set_id: { type: DataTypes.INTEGER, allowNull: false },
      host_id: { type: DataTypes.INTEGER, allowNull: false },
      join_pin: { type: DataTypes.CHAR(6), allowNull: false, unique: true },
      status: { type: DataTypes.ENUM('LOBBY', 'RUNNING', 'CLOSED'), allowNull: false, defaultValue: 'LOBBY' },
      max_players: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 20 },
      current_position: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      started_at: { type: DataTypes.DATE },
      ended_at: { type: DataTypes.DATE },
    },
    {
      tableName: 'game_sessions',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );