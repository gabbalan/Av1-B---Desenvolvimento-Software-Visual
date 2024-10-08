var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Importando o Sequelize e os modelos
var { sequelize } = require('./models');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const paymentRoutes = require('./routes/payments'); // Note o 's' no final

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (req.method === 'GET') {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      if (data) {
        try {
          req.body = JSON.parse(data);
        } catch (e) {
          console.error('Erro ao analisar o corpo da requisição GET:', e);
        }
      }
      next();
    });
  } else {
    next();
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
app.use('/payments', paymentRoutes); // Note o 's' no final de 'payments'

// Função para sincronizar o banco de dados
async function syncDatabase() {
    try {
        // Use 'alter: true' para fazer alterações nas tabelas existentes
        // Em produção, você deve usar migrações em vez disso
        await sequelize.sync({ alter: true });
        console.log('Banco de dados sincronizado');
        console.log('Modelos sincronizados:', Object.keys(sequelize.models));
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
        process.exit(1); // Encerra o processo se houver um erro na sincronização
    }
}

// Iniciar o servidor após a sincronização do banco de dados
async function startServer() {
    await syncDatabase();
    
    const port = process.env.PORT || 8086;
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
}

startServer();

app.get('/test', (req, res) => {
  res.json({ message: 'Rota de teste funcionando' });
});

module.exports = app;