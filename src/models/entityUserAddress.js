const { DataTypes, DATE } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('entityUserAddress', {
        idUserAddress: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },

        postalCode: {
            type: DataTypes.STRING,
            allowNull: false
        },

        telephoneAddress:{
            type: DataTypes.STRING,
            allowNull: false
        },

        provinceAddress:{
            type: DataTypes.STRING,
            allowNull: false
        },

        cityAddress:{
            type: DataTypes.STRING,
            allowNull: false
        }

        
    });
};