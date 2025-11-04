
const orderService = require('../services/orderService'); 


const analyzeOrder = async (req, res) => {
    try {
     
        const orderData = req.body;
        console.log('[Controller] Recebido POST em /order-analysis');

        
        const analysisResult = await orderService.processOrderAnalysis(orderData);

        console.log('[Controller] Análise concluída. Enviando resposta.');
        res.status(200).json(analysisResult);

    } catch (error) {
        console.error('[Controller] Erro:', error.message);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};

module.exports = {
    analyzeOrder
};