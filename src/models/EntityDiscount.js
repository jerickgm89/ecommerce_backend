const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('entityDiscounts', {
        idDiscount: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            unique: true,
        },
        nameDiscount: {
            type: DataTypes.STRING,
            allowNull: true
        },
        descriptionDiscount:{
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        activeDiscount:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        idProduct: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        discountInGroup: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true
        },
        productsInDiscountGroup:{
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true,
            defaultValue: []            
        }
    }, {
        // paranoid: true,
        timestamps:true,
        createdAt: 'createDiscount',
        updatedAt: 'modifiedDiscount',
        // deletedAt: 'deleteDiscount'
    });
};
