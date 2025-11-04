const { Sequelize } = require('sequelize');

require('dotenv').config(); 


const DB_NAME = process.env.DB_NAME || 'smart_integrator_db';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASS = process.env.DB_PASS || 'admin';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_DIALECT = process.env.DB_DIALECT || 'sqlite'; 

let sequelize;

if (DB_DIALECT === 'postgres') {
   
    sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
        host: DB_HOST,
        dialect: 'postgres'
    });
    console.log('Conectando ao banco de dados PostgreSQL...');
} else {
  
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'database.sqlite'
    });
    console.log('Usando banco de dados SQLite local...');
}

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log(`Conexão com ${DB_DIALECT} estabelecida com sucesso.`);
    } catch (error) {
        console.error(`Não foi possível conectar ao ${DB_DIALECT}:`, error);
    }
};

module.exports = { sequelize, testConnection };