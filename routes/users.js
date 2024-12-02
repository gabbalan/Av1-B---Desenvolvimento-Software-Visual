var express = require('express');
var router = express.Router();
const auth = require('../auth'); //Carregar os objetos do auth.js

// Implementar as dependências para o funcionamento da classe User
const db = require('../models'); // Carregando o banco de dados

// Carregando as classes service e controller da user
const UserService = require('../services/userService');
const UserController = require('../controllers/userController');

// Construir os objetos a partir das classes
const userService = new UserService(db.User);
const userController = new UserController(userService);

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('Módulo de usuários rodando.');
});

// Rota para login
router.post('/login', async (req, res) => {
  userController.login(req, res);
});

// Rota para registrar novo usuário
router.post('/novouser', async (req, res) => {
  try {
    await userController.createUser(req, res); // Delega a lógica para o controlador
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: 'Erro ao criar conta.' });
    }
  }
});

// Rota para retornar todos os usuários
router.get('/allusers', auth.verifyToken, async (req, res) => {
  userController.findAllUsers(req, res);
});

// Rota para retornar um usuário pelo ID
router.get('/getUserById', async (req, res) => {
  userController.findUserById(req, res);
});

module.exports = router;
