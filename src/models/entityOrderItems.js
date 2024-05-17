const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('entityOrderItems', {
        UUID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },

        idOrder: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        quantity:{
            type: DataTypes.INTEGER,
            allowNull: false
        },

        idProduct:{
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

//idUser(EntityOrderDetails) --1.1-- idUser(EntityUser)

//idPayment(EntityOrderDetails) --1.1-- idPayment(EntityPayment)