import { DataTypes } from 'sequelize';
import sequelize from '../db.js';


const Program = sequelize.define('Program', {
nama: { type: DataTypes.STRING, allowNull: false },
slug: { type: DataTypes.STRING, unique: true },
deskripsi: { type: DataTypes.TEXT },
syarat: { type: DataTypes.TEXT },
alur: { type: DataTypes.TEXT },
faq: { type: DataTypes.TEXT },
});


export default Program;