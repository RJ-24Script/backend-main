import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Berita = sequelize.define('Berita', {
  judul: { type: DataTypes.STRING, allowNull: false },
  isi: { type: DataTypes.TEXT, allowNull: false },
  penulis: { type: DataTypes.STRING, allowNull: true },
  thumbnail: { type: DataTypes.STRING, allowNull: true },
  isPublished: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'berita', timestamps: true })

export default Berita
