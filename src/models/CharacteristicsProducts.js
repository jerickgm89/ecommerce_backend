
const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('characteristicsProducts', {
        idCharacteristicsProducts: {
            type: DataTypes.STRING,
            primaryKey: true,
          allowNull: false
        },
        modelProduct: {
            type: DataTypes.STRING,
            allowNull: false
        },
        characteristicsProducts: {
            type: DataTypes.STRING
        },
        idBrand: {
            type: DataTypes.INTEGER
        }

    })
}