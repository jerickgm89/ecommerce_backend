
const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('entityCategory', {
        idCategory: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nameCategory: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descriptionCategory: {
            type: DataTypes.STRING,
            allowNull: false

        },
        createdCat_at: {
            type: DataTypes.DATE,
        }, 
        modifiedCat_at: {

          type: DataTypes.DATE,
        },
        deletedCat_at: {
            
            type: DataTypes.DATE
        }
    })
}