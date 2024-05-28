const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('entityComments',{
        idComments: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true
        },
        comments: {
            type: DataTypes.STRING,
        
        },
        responseComments: {
            type: DataTypes.STRING
        },
        activeComments: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        paranoid: true,
        createdAt: 'createRew',
        updatedAt: 'modifiedRew',
        deletedAt: 'deleteRew'
    })
};