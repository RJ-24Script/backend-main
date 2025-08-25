import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';


dotenv.config();


const dialect = process.env.DB_DIALECT || 'sqlite';


let sequelize;
if (dialect === 'sqlite') {
sequelize = new Sequelize({
dialect: 'sqlite',
storage: process.env.SQLITE_STORAGE || './data.sqlite',
logging: false,
});
} else {
sequelize = new Sequelize(
process.env.DB_NAME,
process.env.DB_USER,
process.env.DB_PASS,
{
host: process.env.DB_HOST,
port: process.env.DB_PORT || 3306,
dialect: 'mysql',
logging: false,
}
);
}


export default sequelize;