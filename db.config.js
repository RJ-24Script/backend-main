// db.config.js
import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

// Pilih DB sesuai kebutuhan: MySQL atau SQLite
const sequelize = new Sequelize(
  process.env.DB_NAME || 'dinsos',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql', // bisa: 'mysql' atau 'sqlite'
    storage: process.env.DB_STORAGE || './data/dinsos.sqlite', // kalau pakai sqlite
    logging: false,
  }
)

export default sequelize
