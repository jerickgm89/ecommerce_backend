require("dotenv").config();
const {Sequelize} = require('sequelize');
const fs = require('fs');
const path = require('path');
const {DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const entityProductsModels = require('./models/EntityProducts.js')
const entityCategoryModels = require('./models/EntityCategory.js')
const CharacteristicsProductsModels = require('./models/CharacteristicsProducts.js')
const entityBrandModels = require('./models/EntityBrand');
const entityUsersModels = require('./models/EntityUsers.js')
const entityPaymentModels = require('./models/entityPayment.js')
const entityShoppingSessionModels = require('./models/entityShoppingSession.js')
const entityCartItemModels = require('./models/entityCartItem.js')
const entityOrderDetailModels = require("./models/entityOrderDetail.js");
const EntityOrderItemsModels = require('./models/entityCartItem.js')

    const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`, {
        logging: false,
        native: false
    });

    const basename = path.basename(__filename);

    const modelDefiners = [];
    entityProductsModels(sequelize)
    entityCategoryModels(sequelize)
    CharacteristicsProductsModels(sequelize)
    entityBrandModels(sequelize)
    entityUsersModels(sequelize)
    entityPaymentModels(sequelize)
    entityShoppingSessionModels(sequelize)
    entityCartItemModels(sequelize)
    entityOrderDetailModels(sequelize)
    EntityOrderItemsModels(sequelize)

    fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

  modelDefiners.forEach(model => model(sequelize));

  let entries = Object.entries(sequelize.models);
  let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
  sequelize.models = Object.fromEntries(capsEntries);

  const {EntityProducts, EntityCategory, CharacteristicsProducts, EntityBrand, EntityUsers, 
    EntityOrderDetail, EntityOrderItems, EntityPayment, EntityShoppingSession, EntityCartItem} = sequelize.models

//Aqui van las relaciones: ->

/*Relacion Products - Category*/
EntityProducts.belongsTo(EntityCategory, {foreignKey: 'idCategory'});
EntityCategory.hasMany(EntityProducts, {foreignKey: 'idCategory'});

/*Relacion products - CharacteristicsProducts*/
EntityProducts.hasOne(CharacteristicsProducts, { foreignKey: 'idProduct' });
CharacteristicsProducts.belongsTo(EntityProducts, {foreignKey: 'idProduct'});

/*relacion CharacteristicsProducts - entityBrand*/
EntityBrand.hasMany(CharacteristicsProducts, { foreignKey: 'idBrand' });
CharacteristicsProducts.belongsTo(EntityBrand, { foreignKey: 'idBrand' });

EntityOrderDetail.hasMany(EntityOrderItems, { foreignKey: 'UUID', sourceKey: 'UUID' });
EntityOrderItems.belongsTo(EntityOrderDetail, { foreignKey: 'UUID', targetKey: 'UUID' });


EntityPayment.hasOne(EntityOrderDetail, { foreignKey: 'idPayment' });
EntityOrderDetail.belongsTo(EntityPayment, { foreignKey: 'idPayment' });


EntityUsers.hasOne(EntityOrderDetail, {
  foreignKey: 'idUser',
  as: 'orderDetail'
});
EntityOrderDetail.belongsTo(EntityUsers, {
  foreignKey: 'idUser',
  as: 'user'
});


EntityProducts.hasMany(EntityOrderItems, { foreignKey: 'idProduct' });
EntityOrderItems.belongsTo(EntityProducts, { foreignKey: 'idProduct' });


EntityUsers.hasOne(EntityShoppingSession, { foreignKey: 'idUser' });
EntityShoppingSession.belongsTo(EntityUsers, { foreignKey: 'idUser' });


EntityShoppingSession.hasMany(EntityCartItem, { foreignKey: 'idShoppingSession' });
EntityCartItem.belongsTo(EntityShoppingSession, { foreignKey: 'idShoppingSession' });


EntityProducts.belongsToMany(EntityCartItem, { through: 'ProductCartItem', foreignKey: 'idProduct' });
EntityCartItem.belongsToMany(EntityProducts, { through: 'ProductCartItem', foreignKey: 'idCartItem' });

EntityUsers.hasMany(EntityPayment, { foreignKey: 'idUser', sourceKey: 'idUser' });
EntityPayment.belongsTo(EntityUsers, { foreignKey: 'idUser', targetKey: 'idUser' });

  module.exports = {
    ...sequelize.models, 
    conn: sequelize,     
  };