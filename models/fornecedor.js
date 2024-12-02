module.exports = (sequelize, DataTypes) => {
    const Fornecedor = sequelize.define('Fornecedor', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cnpj: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        endereco: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        produtoFornecido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Fornecedor;
};
