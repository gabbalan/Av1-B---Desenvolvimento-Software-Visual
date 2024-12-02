var express = require('express');
var router = express.Router();

// Carregar o banco de dados e dependências
const db = require('../models'); // Banco de dados
const ProductService = require('../services/productService');
const ProductController = require('../controllers/productController');

// Instanciar os serviços e controladores
const productService = new ProductService(db.Product);
const productController = new ProductController(productService);

/* Rota base para verificar o módulo de produtos */
router.get('/', (req, res) => {
    res.send('Módulo de produtos rodando.');
});

// Rota para criar um novo produto
router.post('/newProduct', async (req, res) => {
    try {
        await productController.createProduct(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar o produto.' });
    }
});

// Rota para retornar todos os produtos ou buscar por ID/Nome
router.get('/allProducts', async (req, res) => {
    try {
        await productController.findAllProducts(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos.' });
    }
});

// Rota para atualizar um produto existente
router.put('/updateProduct', async (req, res) => {
    try {
        await productController.updateProduct(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o produto.' });
    }
});

// Rota para deletar um produto por ID
router.delete('/deleteProduct', async (req, res) => {
    try {
        await productController.deleteProduct(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o produto.' });
    }
});

module.exports = router;
