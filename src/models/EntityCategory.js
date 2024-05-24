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
        imageCategory: {
            type: DataTypes.STRING,
            allowNull: true
        },
        descriptionCategory: {
            type: DataTypes.STRING,
            allowNull: true

        },
    }, {
        paranoid: true,
        createdAt: 'createdCategory_at',
        updatedAt: 'modifiedCategory_at',
        deletedAt: 'deletedCategory_at'
    });
}