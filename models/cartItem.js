module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    CartItem.associate = models => {
        CartItem.belongsTo(models.Cart, { foreignKey: 'cartId', as: 'cart' });
        CartItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    };

    return CartItem;
};
