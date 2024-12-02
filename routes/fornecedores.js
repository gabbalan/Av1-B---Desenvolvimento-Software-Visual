const express = require('express');
const router = express.Router();

const db = require('../models');
const FornecedorService = require('../services/fornecedorService');
const FornecedorController = require('../controllers/fornecedorController');

const fornecedorService = new FornecedorService(db.Fornecedor);
const fornecedorController = new FornecedorController(fornecedorService);

router.post('/create', (req, res) => fornecedorController.createFornecedor(req, res));
router.get('/all', (req, res) => fornecedorController.getAllFornecedores(req, res));
router.get('/byCnpj', (req, res) => fornecedorController.getFornecedorByCnpj(req, res));

module.exports = router;
