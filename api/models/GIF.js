module.exports = (sequelize, DataTypes) => {

  // Define model schema
  const GIFSchema = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    url: DataTypes.STRING,
    isPrivate: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    expiresAt: DataTypes.DATE,
  };

  // Define model customization
  const GIFOptions = {
    defaultScope: {
      attributes: { exclude: ['password'] },
    },

    timestamps: true,
    updatedAt: false,
  };

  return sequelize.define('GIF', GIFSchema, GIFOptions);
}
