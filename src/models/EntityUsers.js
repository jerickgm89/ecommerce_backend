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
        // sub: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        nameUser: {
            type: DataTypes.STRING,
            // allowNull: false,
            // validate: {
            //     isAlpha: true
            // }
        },
        lastNameUser: {
            type: DataTypes.STRING,
            allowNull: true
        },
        emailUser: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        pictureUser: {
            type: DataTypes.STRING,
            allowNull: true
        },
        numberMobileUser: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        tokenAuth: {
            type: DataTypes.JSONB,
            allowNull: false
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