import { Sequelize } from 'sequelize';

const DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: 'Dinesh@123',
  database: 'node',
};

export const sequelize = new Sequelize(DB_CONFIG.database, DB_CONFIG.user, DB_CONFIG.password, {
  host: DB_CONFIG.host,
  dialect: 'mysql',
});

export default sequelize;
