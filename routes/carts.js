const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Rota para adicionar item ao carrinho
router.post('/addItem', (req, res) => cartController.addToCart(req, res));

// Rota para remover item do carrinho
router.delete('/removeItem/:userId/:cartItemId', (req, res) => cartController.removeFromCart(req, res)); // Ajustado para `removeFromCart`

// Rota para buscar itens do carrinho por usuário
router.get('/getCart/:userId', (req, res) => cartController.getCart(req, res));

module.exports = router;
