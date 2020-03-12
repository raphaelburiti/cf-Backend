const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const User = require('../models/User')
const Product = require('../models/Product')
const Order = require('../models/Order')
const OrdersDetails = require('../models/OrdersDetails')

const connection = new Sequelize(dbConfig)
// const connection = new Sequelize('postgres://zyslsdneqbtsdv:cac39e3ab8043f888196bb6d7c9a0375afff59b94637dca000a394178dd7c45a@ec2-54-197-48-79.compute-1.amazonaws.com:5432/d9ist28r89ua9q', {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     define: {
//     timestamps: true,
//     underscored: true,
//     logging:  true
//   }
// })

User.init(connection)
Product.init(connection)
Order.init(connection)
OrdersDetails.init(connection)

module.exports = connection