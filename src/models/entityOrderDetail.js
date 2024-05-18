const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('entityOrderDetail', {
        UUID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },

        totalOrder: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },

        idPayment:{
            type: DataTypes.INTEGER
        },

        idUser:{
            type: DataTypes.INTEGER
        }
    }, {
        paranoid: true,
        createdAt: 'createentityOrderDetail',
        updatedAt: 'modifiedentityOrderDetail',
        deletedAt: 'deleteentityOrderDetail'
    });
};

//UUID(EntityOrderItems) --1.M--UUID(EntityOrderDetails)

//idProduct(EntityOrderItems) --1.1-- idProduct(EntityProduct)

