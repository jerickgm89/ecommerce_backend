
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    return sequelize.define('entityCategory', {
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
            // allowNull: false

        },
    }, {
        paranoid: true,
        createdAt: 'createCat_at',
        updatedAt: 'modifiedCat_at',
        deletedAt: 'deleteCat_at'
    });
}