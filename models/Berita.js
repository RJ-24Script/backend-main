import { DataTypes } from 'sequelize';
import sequelize from '../db.js';


const Berita = sequelize.define('Berita', {
judul: { type: DataTypes.STRING, allowNull: false },
slug: { type: DataTypes.STRING, unique: true },
ringkas: { type: DataTypes.TEXT },
konten: { type: DataTypes.TEXT },
kategori: { type: DataTypes.STRING },
publishedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
thumbnailUrl: { type: DataTypes.STRING },
});


export default Berita;