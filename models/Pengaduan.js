// models/pengaduan.js
import { DataTypes } from 'sequelize'
import sequelize from '../db.config.js'

const Pengaduan = sequelize.define('Pengaduan', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nik: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hp: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pesan: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'pengaduan',
  timestamps: true
})

export default Pengaduan
