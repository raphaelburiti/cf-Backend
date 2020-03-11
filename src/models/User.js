const { Model, DataTypes } = require('sequelize')

class User extends Model {
  static init(sequelize) {
    super.init({
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      cpf: DataTypes.STRING(11),
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
    }, {
      sequelize
    })
  }
}

module.exports = User