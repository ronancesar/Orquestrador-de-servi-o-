const axios = require('axios');
const analysisRepository = require('../repositories/analysisRepository');

const logService = require('./logService');

const processOrderAnalysis = async (orderData) => {
    
    console.log(`[Service] Recebido para análise: Customer ${orderData.customerId}, Valor ${orderData.orderValue}`);
    
    await logService.logEvent('info', 'Análise de pedido iniciada', orderData);

    
    const antiFraudResponse = await simulateAntiFraud(orderData.orderValue);
   
    await logService.logEvent('debug', 'Resposta do Anti-Fraude', antiFraudResponse);

    const creditEngineResponse = await simulateCreditEngine(orderData.customerId);
 
    await logService.logEvent('debug', 'Resposta do Motor de Crédito', creditEngineResponse);



    let analysisStatus = 'PENDING';
    if (antiFraudResponse.status === 'REPROVED' || creditEngineResponse.status === 'REPROVED') {
        analysisStatus = 'REPROVED';
    } else if (antiFraudResponse.status === 'APPROVED' && creditEngineResponse.status === 'APPROVED') {
        analysisStatus = 'APPROVED';
    }

  
    const analysisResult = {
        orderId: orderData.customerId + `_${new Date().getTime()}`, 
        status: analysisStatus,
        antiFraud: antiFraudResponse,
        credit: creditEngineResponse
    };

 
    try {
        await analysisRepository.createAnalysis(analysisResult);
    } catch (dbError) {
        console.error('[Service] Falha ao salvar no Postgres.', dbError.message);
      
        await logService.logEvent('error', 'Falha ao salvar no Postgres', { error: dbError.message, data: analysisResult });
    }
    
   
    await logService.logEvent('info', 'Análise finalizada', analysisResult);

   
    return analysisResult;
};




const simulateAntiFraud = (orderValue) => {
    console.log('[Mock] Verificando anti-fraude...');
  
    return new Promise(resolve => {
        setTimeout(() => {
          
            if (orderValue > 1000) {
                resolve({ status: 'REPROVED', reason: 'Valor muito alto' });
            } else {
                resolve({ status: 'APPROVED' });
            }
        }, 500);
    });
};

const simulateCreditEngine = (customerId) => {
    console.log('[Mock] Verificando motor de crédito...');
  
    return new Promise(resolve => {
        setTimeout(() => {
           
            if (customerId === 'cliente-bloqueado-999') {
                resolve({ status: 'REPROVED', reason: 'Cliente negativado' });
            } else {
                resolve({ status: 'APPROVED', limit: 5000 });
            }
        }, 800);
    });
};



module.exports = {
    processOrderAnalysis
};