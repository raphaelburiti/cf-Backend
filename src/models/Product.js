const { Model, DataTypes } = require('sequelize')

class Product extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      desc: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2),
      category: DataTypes.STRING,
      image: DataTypes.STRING,
      discount: DataTypes.ENUM('0', '1'),
    }, {
      sequelize
    })
  }
}

module.exports = Product