module.exports = (sequelize, DataTypes) => {
  const GIFSchema = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    url: DataTypes.STRING,
    public: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    expiresAt: DataTypes.DATE,
  };

  const GIFScopes = {
    defaultScope: {
      attributes: { exclude: ['password'] },
    }
  };

  return sequelize.define('GIF', GIFSchema, GIFScopes);
}