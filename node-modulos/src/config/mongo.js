const { MongoClient } = require('mongodb');

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

const uri = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/?authMechanism=DEFAULT`;

const client = new MongoClient(uri);
let dbInstance;

const connectMongo = async () => {
    try {
        await client.connect();
        console.log('Conexão com o MongoDB estabelecida com sucesso.');
        dbInstance = client.db(MONGO_DB_NAME); 
    } catch (error) {
        console.error('Não foi possível conectar ao MongoDB:', error);
        process.exit(1); 
    }
};


const getDb = () => {
    if (!dbInstance) {
        throw new Error('Banco de dados Mongo não inicializado!');
    }
    return dbInstance;
};

module.exports = { connectMongo, getDb };