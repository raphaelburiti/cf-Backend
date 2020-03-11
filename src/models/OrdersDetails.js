const { Model, DataTypes } = require('sequelize')

class OrdersDetails extends Model {
  static init(sequelize) {
    super.init({
      id_order: DataTypes.INTEGER,
      id_product: DataTypes.INTEGER,
      name_product: DataTypes.STRING,
      price_product: DataTypes.DECIMAL(10, 2),
      subtotal: DataTypes.DECIMAL(10, 2),
      quantity: DataTypes.STRING,
    }, {
      sequelize
    })
  }
}

module.exports = OrdersDetails