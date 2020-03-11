const { Model, DataTypes } = require('sequelize')

class Order extends Model {
  static init(sequelize) {
    super.init({
      id_user: DataTypes.INTEGER,
      dt_order_issue: DataTypes.DATE,
      dt_order_delivery: DataTypes.DATE,
      dt_order_delivered: DataTypes.DATE,
      dt_order_finished: DataTypes.DATE,
    }, {
      sequelize
    })
  }
}

module.exports = Order