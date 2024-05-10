
const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('characteristicsProducts', {
        idCharacteristicsProducts: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true          
        },
        idProduct: {    // Agrego esta columna o campo a la db por el motivo de que la tabla caracteristicas es la que debe llevar el id del producto y no vice versa... 
            type: DataTypes.INTEGER,
            allowNull: false,
        },        
        modelProduct: {
            type: DataTypes.STRING,
            allowNull: false
        },
        characteristics: {
            type: DataTypes.JSONB,
            allowNull: false
        },
        idBrand: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    })
}