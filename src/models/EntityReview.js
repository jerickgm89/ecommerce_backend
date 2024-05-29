const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('entityReview', {
        idReview: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        descriptionReview: {
            type: DataTypes.STRING,
        },
        scoreReview: {
            type: DataTypes.INTEGER,
        },
        activeReview: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
    paranoid: true,
    createdAt: 'createRew',
    updatedAt: 'modifiedRew',
    deletedAt: 'deleteRew'
})
};