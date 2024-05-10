const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    
    sequelize.define('entityUsers', {
        idUser: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        DNI: {
            type: DataTypes.INTEGER,
            // allowNull: false,
            validate: {
                isInt: true,
                max: 100000000
            }
        },
        nameUser: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true
            }
        },
        lastNameUser: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emailUser: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        numberMobileUser: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     isAlphanumeric: true
            // }
        },
        activeUser: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },{
        paranoid: true,
        createdAt: 'createdUser_at',
        updatedAt: 'modifiedUser_at',
        deletedAt: 'deletedUser_at'
    })
};