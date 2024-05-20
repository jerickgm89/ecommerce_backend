const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('entityBrand', {
        idBrand: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
        },
        nameBrand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        logoBrand: {
            type: DataTypes.STRING,
            allowNull: true,
            // validate:{
            //     isUrl: {
            //         msg: "Debe ser URL"
            //     }
            // }
        }
    }, {
        paranoid: true,
        createdAt: 'createBrand_at',
        updatedAt: 'modifiedBrand_at',
        deletedAt: 'deleteBrand_at'
    });
};
