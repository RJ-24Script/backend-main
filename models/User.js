import { DataTypes } from 'sequelize';
import sequelize from '../db.js';


const User = sequelize.define('User', {
username: { type: DataTypes.STRING, unique: true },
passwordHash: { type: DataTypes.STRING },
role: { type: DataTypes.ENUM('admin', 'staff'), defaultValue: 'admin' },
});


export default User;