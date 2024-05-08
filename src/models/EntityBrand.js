const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('entityBrand', {
        idBrand : {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        nameBrand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createBrand_at : {
            type: DataTypes.DATE,
        },
        modifiedBrand_at: {
            type: DataTypes.DATE
        },
        deleteBrand_at: {
            type: DataTypes.DATE
        }
    })
}