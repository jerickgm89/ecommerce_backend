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

    fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

  modelDefiners.forEach(model => model(sequelize));

  let entries = Object.entries(sequelize.models);
  let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
  sequelize.models = Object.fromEntries(capsEntries);

  const {EntityProducts, EntityCategory, CharacteristicsProducts, EntityBrand, EntityUsers} = sequelize.models

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

  module.exports = {
    ...sequelize.models, 
    conn: sequelize,     
  };

