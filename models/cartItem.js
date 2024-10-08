module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        precoTotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    });

    CartItem.associate = function(models) {
        CartItem.belongsTo(models.Cart, {
            foreignKey: 'cartId',
            as: 'cart'
        });
        CartItem.belongsTo(models.Product, {
            foreignKey: 'productId',
            as: 'product'
        });
    };

    return CartItem;
};