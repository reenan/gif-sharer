module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('GIF', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING(1000),
      },
      public: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      password: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      expiresAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('GIF');
  }
};