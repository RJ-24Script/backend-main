import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Dokumen = sequelize.define('Dokumen', {
  judul: { type: DataTypes.STRING, allowNull: false },
  deskripsi: { type: DataTypes.TEXT, allowNull: true },
  fileUrl: { type: DataTypes.STRING, allowNull: false }, // link download file
  kategori: { type: DataTypes.STRING, allowNull: true },
  isPublished: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'dokumen', timestamps: true })

export default Dokumen
