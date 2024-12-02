module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      nome: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      descricao: {
          type: DataTypes.TEXT,
          allowNull: false,
      },
      preco: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
      },
      estoque: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
  });

  return Product;
};
