
const Analysis = require('../models/Analysis');

/**
 * Essa Função vai criar um novo registro de análise no banco de dados.
 * @param {object} analysisData - Os dados da análise que vão ser salvos.
 */
const createAnalysis = async (analysisData) => {
    try {
        
        const newAnalysis = await Analysis.create({
            orderId: analysisData.orderId,
            status: analysisData.status,
            antiFraudResponse: analysisData.antiFraud, 
            creditResponse: analysisData.credit       
        });

        console.log(`[Repository] Análise ${newAnalysis.id} salva no banco.`);
        return newAnalysis;

    } catch (error) {
        console.error('[Repository] Erro ao salvar análise:', error.message);
        
        throw new Error('Falha ao salvar dados no repositório.');
    }
};


module.exports = {
    createAnalysis
};