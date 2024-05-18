const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('entityShoppingSession', {
        idShoppingSession: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },

        totalSession: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        idUser:{
            type: DataTypes.INTEGER
        }
    }, {
        paranoid: true,
        createdAt: 'createEntityShoppingSession',
        updatedAt: 'modifiedEntityShoppingSession',
        deletedAt: 'deleteEntityShoppingSession'
    });
};

//idShoppingSession -- 1.M -- idShoppingSession(EntityCartItem)

//idUser(EntityShoppingSession) --1.1 -- idUser(EntityUser) 