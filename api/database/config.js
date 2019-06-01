module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'gif-sharer',
  host: process.env.CLEARDB_DATABASE_URL,
  dialect: 'mysql',
  define: {
    freezeTableName: true,
    timestamps: false,
  }
}