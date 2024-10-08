const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');

// Instancie o CartService e o CartController aqui
const db = require('../models');
const CartService = require('../services/cartService');
const cartService = new CartService(db.Cart, db.CartItem, db.Product, db.User);
const cartController = new CartController(cartService);

// Rota para adicionar um produto à cesta
router.post('/addProduct', (req, res) => cartController.addToCart(req, res));

// Rota para visualizar o carrinho de um usuário específico
router.get('/getCart/:userId', (req, res) => cartController.getCart(req, res));

// Rota para remover um produto do carrinho
router.delete('/removeItem/:userId/:cartItemId', (req, res) => cartController.removeFromCart(req, res));

module.exports = router;
