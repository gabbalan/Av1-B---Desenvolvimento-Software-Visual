const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// Importando o Sequelize e os modelos
const { sequelize } = require('./models');

// Importação das rotas
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const paymentRoutes = require('./routes/payments');
const fornecedoresRouter = require('./routes/fornecedores'); // Importando a rota de fornecedores

const app = express();

app.use(cors({ origin: '*' }));

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

// Registro das rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
app.use('/payments', paymentRoutes);
app.use('/fornecedores', fornecedoresRouter); // Adicionando a rota de fornecedores

// Função para sincronizar o banco de dados
async function syncDatabase() {
    try {
        await sequelize.sync({ alter: true });
        console.log('Banco de dados sincronizado');
        console.log('Modelos sincronizados:', Object.keys(sequelize.models));
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
        process.exit(1);
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
