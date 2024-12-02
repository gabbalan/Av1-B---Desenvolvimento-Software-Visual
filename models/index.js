const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Log para verificar inicialização do Sequelize
console.log(`Inicializando Sequelize no ambiente: ${env}`);

// Carregar todos os modelos
fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach(file => {
        console.log(`Carregando modelo: ${file}`);
        const model = require(path.join(__dirname, file));
        if (typeof model === 'function') {
            db[model(sequelize, Sequelize.DataTypes).name] = model(sequelize, Sequelize.DataTypes);
        } else {
            console.warn(`O arquivo ${file} não exporta uma função válida.`);
        }
    });

// Configurar associações entre modelos
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        console.log(`Configurando associações para o modelo: ${modelName}`);
        db[modelName].associate(db);
    }
});

// Log final da configuração dos modelos
console.log(`Modelos carregados: ${Object.keys(db).join(', ')}`);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
