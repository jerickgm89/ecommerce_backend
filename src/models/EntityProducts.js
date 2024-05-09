
const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    
    sequelize.define('entityProducts', {
        
        idProduct: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nameProduct: {
            type: DataTypes.STRING,
            allowNull: false
        },
        priceProduct: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        imageProducts: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SKU: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stockProduct: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idReview: {
            type: DataTypes.INTEGER,
        },
        idCategory: {
            type: DataTypes.INTEGER
        },
        idCharacteristicsProducts: {
            type: DataTypes.STRING
        },
        IdDiscount: {
            type: DataTypes.INTEGER
        },
        createPro_at: {
            type: DataTypes.DATE
        },
        modifiedPro_at: {
            type: DataTypes.DATE
        },
        deletePro_at: {
            type: DataTypes.DATE
        },
      
    },
    //Paranoid true se utiliza para el borrado lógico.
    {paranoid: true});
//INFO ADICIONAL: paranoid: true se utiliza para implementar el borrado lógico o suave (soft deletion) en Sequelize. Cuando esta opción está habilitada en un modelo, Sequelize no elimina físicamente las filas de la base de datos cuando se llama al método destroy(), en su lugar, establece un valor en una columna especial (generalmente llamada deletedAt) para indicar que la fila ha sido "eliminada". Esto permite mantener un historial de las acciones de eliminación y facilita la recuperación de datos eliminados accidentalmente.


    
};