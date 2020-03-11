const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const User = require('../models/User')
const Product = require('../models/Product')
const Order = require('../models/Order')
const OrdersDetails = require('../models/OrdersDetails')

const connection = new Sequelize(dbConfig)

User.init(connection)
Product.init(connection)
Order.init(connection)
OrdersDetails.init(connection)

module.exports = connection