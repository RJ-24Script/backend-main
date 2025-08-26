// models/Pengumuman.js
import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Pengumuman = sequelize.define('Pengumuman', {
  judul: { type: DataTypes.STRING, allowNull: false },
  isi:   { type: DataTypes.TEXT, allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  startsAt: { type: DataTypes.DATE, allowNull: true },
  endsAt:   { type: DataTypes.DATE, allowNull: true },
}, {
  tableName: 'pengumuman',
  timestamps: true,
})

export default Pengumuman
