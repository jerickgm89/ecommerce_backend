const { DataTypes, DATE } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('entityPayment', {
        idPayment: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: { // Añadido campo DNI asociado a la tarjeta
            type: DataTypes.STRING,
            allowNull: true
        },
        dni: { // Añadido campo DNI asociado a la tarjeta
            type: DataTypes.STRING,
            allowNull: true
        },
        paymentType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        accountNumber:{
            type: DataTypes.STRING,
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