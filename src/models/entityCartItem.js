const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('entityCartItem', {
        idCartItem: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        idShoppingSession:{
            type: DataTypes.INTEGER,

        },

        idProduct:{
            type: DataTypes.INTEGER
        }
    }, {
        paranoid: true,
        createdAt: 'createCartItem',
        updatedAt: 'modifiedCartItem',
        deletedAt: 'deleteCartItem'
    });
};

//idProduct(EntityCartItem) --M.M-- idProduct(EntityProduct)


//idShoppingSession -- 1.M -- idShoppingSession(EntityCartItem)