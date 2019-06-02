module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'gif-sharer',
  host: process.env.DB_HOST,
  dialect: 'mysql',
  define: {
    freezeTableName: true,
    timestamps: false,
  }
}