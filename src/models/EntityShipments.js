const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('entityShipments', {
        idShipments: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        guideNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        }
    },
        {
            createdAt: 'createShipments_at',
            updatedAt: 'modifiedShipments_at',
            deletedAt: 'deleteShipments_at',
        })
};