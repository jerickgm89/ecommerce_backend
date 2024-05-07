
const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    
    sequelize.define('entityProducts', {
        
        idProduct: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nameProduct: {
            type: DataTypes.STRING,
            allowNull: false
        },
        priceProduct: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        imageProducts: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SKU: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stockProducts: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    
    })
};