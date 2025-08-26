// backend-main/models/Pengaduan.js
import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js' // pastikan path sesuai config

const Pengaduan = sequelize.define('Pengaduan', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true }
  },
  pesan: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Diproses', 'Selesai'),
    defaultValue: 'Pending'
  }
}, {
  tableName: 'pengaduan',
  timestamps: true // createdAt, updatedAt
})

export default Pengaduan
