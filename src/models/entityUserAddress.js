const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('entityUserAddress', {
        idUserAddress: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            // allowNull: false,
        },
        numberAddress: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        addressName: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        postalCode: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        provinceAddress:{
            type: DataTypes.STRING,
            // allowNull: false
        },
        cityAddress:{
            type: DataTypes.STRING,
            // allowNull: false
        },
        country:{
            type: DataTypes.STRING,
            defaultValue: "Argentina",
            allowNull: true
        }
    },{
        // paranoid: true,
        createdAt: 'createdUserAddress_at',
        updatedAt: 'modifiedUserAddress_at',
        deletedAt: 'deletedUserAddress_at'
    });
};