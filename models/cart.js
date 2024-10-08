module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });

    Cart.associate = function(models) {
        Cart.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
            allowNull: true
        });
        Cart.hasMany(models.CartItem, {
            foreignKey: 'cartId',
            as: 'items'
        });
    };

    return Cart;
};