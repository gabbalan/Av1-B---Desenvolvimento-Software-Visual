var express = require('express');
var router = express.Router();
const auth = require('../auth'); // Carregar os objetos do auth.js

// Implementar as dependências para o funcionamento da classe Product
const db = require('../models'); // carregando o banco de dados

// Carregando as classes service e controller do product
const ProductService = require('../services/productService');
const ProductController = require('../controllers/productController');

// Construir os objetos a partir das classes
const productService = new ProductService(db.Product);
const productController = new ProductController(productService);

/* GET products listing. */
router.get('/', function(req, res, next) {
  res.send('Módulo de produtos rodando.');
});

// Rota para criar um novo produto
router.post('/newProduct', async (req, res) => {
  productController.createProduct(req, res);
});

// Rota para retornar todos os produtos
router.get('/allProducts', async (req, res) => {
    await productController.findAllProducts(req, res);
  });

// Rota para atualizar um produto
router.put('/updateProduct', async (req, res) => {
  productController.updateProduct(req, res);
});

// Rota para deletar um produto
router.delete('/deleteProduct', async (req, res) => {
  productController.deleteProduct(req, res);
});

module.exports = router;