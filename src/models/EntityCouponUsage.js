const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('CouponUsage', {
        idCouponUsage: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        couponId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Coupons',
                key: 'idCoupon'
            }
        },
        usedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};
