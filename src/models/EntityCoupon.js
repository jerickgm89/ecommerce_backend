const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Coupon', {
        idCoupon: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        discountPercentage: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        validFrom: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        validUntil: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        brandId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });
};
