const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('entityProducts', {
        idProduct: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nameProduct: {
            type: DataTypes.STRING,
            allowNull: false
        },
        priceProduct: {
            type: DataTypes.DECIMAL(10,2),
            // allowNull: false
        },
        yearProduct: {
            type: DataTypes.INTEGER,
            // allowNull: false
        },
        imageProducts: {
            type: DataTypes.ARRAY(DataTypes.STRING(1000)),
            // type: DataTypes.STRING,
            // allowNull: false
        },
        descriptionProduct: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        SKU: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stockProduct: {
            type: DataTypes.INTEGER,
        },
        idReview: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        idCategory: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        // idDiscount: {
        //     type: DataTypes.INTEGER,
        //     defaultValue: null,
            
        // },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
    },{
        paranoid: true,
        createdAt: 'createdProd_at',
        updatedAt: 'modifiedProd_at',
        deletedAt: 'deletedProd_at'
    });
};
