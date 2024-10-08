module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      valorTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      metodoPagamento: {
        type: DataTypes.ENUM('cartao_credito', 'pix'),
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('pendente', 'concluido', 'falhado'),
        allowNull: false,
        defaultValue: 'pendente'
      }
    });
  
    Transaction.associate = function(models) {
      Transaction.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false
        },
        as: 'user'
      });
    };
  
    return Transaction;
  };