module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'gif-sharer',
  host: 'localhost',
  dialect: 'mysql',
  define: {
    freezeTableName: true,
    timestamps: false,
  }
}