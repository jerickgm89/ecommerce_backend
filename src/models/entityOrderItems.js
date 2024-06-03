const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('entityOrderItems', {
        
        idOrder: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        idOrderDetail: {
            type: DataTypes.INTEGER,  // Cambiamos a STRING para que coincida con el tipo de idOrder
            allowNull: false,
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: false
        },

        idProduct:{
            type: DataTypes.INTEGER
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false,
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