const express = require('express');


const { sequelize, testConnection } = require('./config/database');
const { connectMongo } = require('./config/mongo'); 

const Analysis = require('./models/Analysis'); 

const app = express();
const PORT = process.env.PORT || 3000;

const orderRoutes = require('./routes/orderRoutes');

app.use(express.json());

app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ status: 'API está rodando!' });
});

app.use('/api/v1', orderRoutes);

const startServer = async () => {
    try {
     
        await testConnection(); 
       
        await sequelize.sync(); 
        console.log('Tabela "Analyses" (Postgres) sincronizada.');

       
        await connectMongo();

        
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });

    } catch (error) {
        console.error('Falha ao iniciar o servidor:', error);
    }
};

startServer();