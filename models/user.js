module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data_nasc: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    User.associate = (models) => {
        User.hasOne(models.Cart, {
            foreignKey: {
                name: 'userId',
                allowNull: true,
            },
            onDelete: 'SET NULL',
            as: 'cart',
        });
    };

    return User;
};
