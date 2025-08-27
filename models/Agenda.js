import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Agenda = sequelize.define('Agenda', {
  judul: { type: DataTypes.STRING, allowNull: false },
  lokasi: { type: DataTypes.STRING, allowNull: true },
  deskripsi: { type: DataTypes.TEXT, allowNull: true },
  mulai: { type: DataTypes.DATE, allowNull: false },
  selesai: { type: DataTypes.DATE, allowNull: true },
  isPublished: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'agenda', timestamps: true })

export default Agenda
