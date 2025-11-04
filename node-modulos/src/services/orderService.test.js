const { processOrderAnalysis } = require('./orderService');


jest.mock('../repositories/analysisRepository', () => ({
    createAnalysis: jest.fn(), 
}));
jest.mock('./logService', () => ({
    logEvent: jest.fn(), 
}));


const analysisRepository = require('../repositories/analysisRepository');
const logService = require('./logService');


describe('OrderService - Lógica de Análise de Pedido', () => {

  
    beforeEach(() => {
        analysisRepository.createAnalysis.mockClear();
        logService.logEvent.mockClear();
        
      
    });




    it('deve APROVAR um pedido normal', async () => {
     
        const pedido = { customerId: 'cliente-bom-123', orderValue: 500 };

        const resultado = await processOrderAnalysis(pedido);

       
        expect(resultado.status).toBe('APPROVED');
        expect(resultado.antiFraud.status).toBe('APPROVED');
        expect(resultado.credit.status).toBe('APPROVED');

       
        expect(analysisRepository.createAnalysis).toHaveBeenCalledTimes(1);
        expect(logService.logEvent).toHaveBeenCalledTimes(4);  
    });

    it('deve REPROVAR um pedido com valor muito alto (Anti-Fraude)', async () => {
    
        const pedido = { customerId: 'cliente-bom-123', orderValue: 2000 };


        const resultado = await processOrderAnalysis(pedido);


        expect(resultado.status).toBe('REPROVED');
        expect(resultado.antiFraud.status).toBe('REPROVED');
        expect(resultado.credit.status).toBe('APPROVED');


        expect(analysisRepository.createAnalysis).toHaveBeenCalledTimes(1);
    });

    it('deve REPROVAR um pedido de um cliente bloqueado (Crédito)', async () => {
       
        const pedido = { customerId: 'cliente-bloqueado-999', orderValue: 100 };

 
        const resultado = await processOrderAnalysis(pedido);

   
        expect(resultado.status).toBe('REPROVED');
        expect(resultado.antiFraud.status).toBe('APPROVED');
        expect(resultado.credit.status).toBe('REPROVED');

      
        expect(logService.logEvent).toHaveBeenCalled();
    });

});