module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      password_hash: { type: DataTypes.STRING(255), allowNull: false },
      role: { type: DataTypes.ENUM('HOST', 'PLAYER'), allowNull: false, defaultValue: 'PLAYER' },
    },
    {
      tableName: 'users',
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );