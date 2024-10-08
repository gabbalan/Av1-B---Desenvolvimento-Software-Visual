const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');

// Instancie o PaymentService e o PaymentController aqui
const db = require('../models');
const PaymentService = require('../services/paymentService');
const CartService = require('../services/cartService');
const { Transaction, Cart, CartItem, Product, User } = require('../models');

const cartService = new CartService(Cart, CartItem, Product, User);
const paymentService = new PaymentService(Transaction, cartService);
const paymentController = new PaymentController(paymentService);

// Rota para realizar pagamento via cartão de crédito
router.post('/credit-card', (req, res) => paymentController.processCreditCardPayment(req, res));

// Rota para realizar pagamento via PIX
router.post('/pix', (req, res) => paymentController.processPixPayment(req, res));

// Rota para consultar transação pelo ID
router.get('/transaction/:transactionId', (req, res) => paymentController.getTransactionById(req, res));

module.exports = router;