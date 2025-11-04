const express = require('express');
const router = express.Router();

// Aqui eu importo o controller, e defino a rota 
const orderController = require('../controllers/orderController');


router.post('/order-analysis', orderController.analyzeOrder);


router.get('/health', (req, res) => {
    res.status(200).json({ status: 'Rotas de Pedido (Order) OK' });
});


module.exports = router;