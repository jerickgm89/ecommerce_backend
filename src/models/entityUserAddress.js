const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('entityUserAddress', {
        idUserAddress: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            // allowNull: false,
        },
        identifierName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        numberAddress: {
            type: DataTypes.STRING,
            allowNull: true
        },
        addressName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        postalCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        provinceAddress:{
            type: DataTypes.STRING,
            allowNull: true
        },
        cityAddress:{
            type: DataTypes.STRING,
            allowNull: true
        },
        country:{
            type: DataTypes.STRING,
            defaultValue: "Argentina",
            allowNull: true
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },{
        // paranoid: true,
        createdAt: 'createdUserAddress_at',
        updatedAt: 'modifiedUserAddress_at',
        deletedAt: 'deletedUserAddress_at'
    });
};