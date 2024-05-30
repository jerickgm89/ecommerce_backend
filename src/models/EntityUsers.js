const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    
    sequelize.define('entityUsers', {
        idUser: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        DNI: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
        },
        nameUser: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastNameUser: {
            type: DataTypes.STRING,
            allowNull: true
        },
        emailUser: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        pictureUser: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phoneArea:{
            type: DataTypes.STRING,
            allowNull: true
        },
        numberMobileUser: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        tokenAuth: {
            type: DataTypes.STRING(300),
            allowNull: true,
            defaultValue: null
        },
        activeUser: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
    },{
        paranoid: true,
        createdAt: 'createdUser_at',
        updatedAt: 'modifiedUser_at',
        deletedAt: 'deletedUser_at'
    })
};