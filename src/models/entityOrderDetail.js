const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('entityOrderDetail', {
        idOrderDetail: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        operation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalOrder: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },

        couponApplied: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        idPayment: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        idUser: {
            type: DataTypes.INTEGER
        },
        idUserAddress: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idShipment: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        paranoid: true,
        createdAt: 'createentityOrderDetail',
        updatedAt: 'modifiedentityOrderDetail',
        deletedAt: 'deleteentityOrderDetail'
    });
};
//UUID(EntityOrderItems) --1.M--UUID(EntityOrderDetails)

//idProduct(EntityOrderItems) --1.1-- idProduct(EntityProduct)

