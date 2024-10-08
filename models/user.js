const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
            // Remova a linha 'unique: true,'
        },
        data_nasc: {
            type: Sequelize.DATE,
            allowNull: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    User.associate = function(models) {
        User.hasOne(models.Cart, {
            foreignKey: {
                name: 'userId',
                allowNull: true
            },
            onDelete: 'SET NULL',
            as: 'cart'
        });
    };

    return User;
};