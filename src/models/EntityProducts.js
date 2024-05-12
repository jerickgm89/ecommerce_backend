const { DataTypes } = require('sequelize');
const CharacteristicsProducts = require('./CharacteristicsProducts');

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
            allowNull: false
        },
        yearProduct: {
            type: DataTypes.INTEGER,
            // allowNull: false
        },
        imageProducts: {
            type: DataTypes.JSONB,
            allowNull: false
        },
        descriptionProduct: {
            type: DataTypes.STRING,
            allowNull: false
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
        },
        idCategory: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        IdDiscount: {
            type: DataTypes.INTEGER
        },
    },{
        paranoid: true,
        createdAt: 'createdProd_at',
        updatedAt: 'modifiedProd_at',
        deletedAt: 'deletedProd_at'
    });
};
