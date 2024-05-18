const { DataTypes, DATE } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('entityPayment', {
        idPayment: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        paymentType: {
            type: DataTypes.STRING,
            allowNull: false
        },

        CCV:{
            type: DataTypes.INTEGER,
            allowNull: true
        },

        accountNumber:{
            type: DataTypes.INTEGER,
            allowNull: false
        },

        expiry:{
            type: DataTypes.DATE,
            allowNull: false
        },

        idUser:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, 
    );
};