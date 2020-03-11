const Order = require('../models/Order')
const OrdersDetails = require('../models/OrdersDetails')

module.exports = {
  async create(req, res) {
    const { id_user } = req.headers
    const { dt_order_issue, products } = req.body

    order = await Order.create({ id_user, dt_order_issue })
      .catch((error) => { return res.status(500).json(error) })

    async function roolback() {
      await OrdersDetails.destroy({ where: { id_order: order.id } })
      await Order.destroy({ where: { id: order.id } })
      return res.status(500).json('Order registration failed')
    }

    var ordersDetails = []

    if (order) {
      products.forEach(async product => {
        await OrdersDetails.create({
          id_order: order.id,
          id_product: product.id_product,
          name_product: product.name_product,
          price_product: product.price_product,
          subtotal: product.subtotal,
          quantity: product.quantity
        })
          .then((result) => {
            ordersDetails.push(result)
            if (ordersDetails.length === products.length) {
              return res.status(200).json('Order successfully registered')
            }
          })
          .catch(() => { return roolback() })
      })
    }

  },

  async getAll(req, res) {

    Order.belongsTo(OrdersDetails, { targetKey: 'id_order', foreignKey: 'id' });

    orders = await Order.findAll({
      include: [{
        model: OrdersDetails,
        required: true
      }],
      order: [
        ['id', 'ASC']
      ]
    })

    return res.status(200).json([{ orders }])

  },

  async getById(req, res) {
    const { id } = req.params

    Order.belongsTo(OrdersDetails, { targetKey: 'id_order', foreignKey: 'id' });

    orders = await Order.findAll({
      include: [{
        model: OrdersDetails,
        required: true,
        where: { id_order: id }
      }]
    })
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json(result)
        } else {
          res.status(400).json({ error: 'Order not found' })
        }
      })

  },

  async deleteById(req, res) {
    const { id } = req.params

    await OrdersDetails.destroy({ where: { id_order: id } })

    await Order.destroy({ where: { id } })
      .then(function (deletedRecord) {
        if (deletedRecord === 1) {
          res.status(200).json({ message: "Deleted successfully" });
        }
        else {
          res.status(404).json({ message: "record not found" })
        }
      })
      .catch(function (error) { res.status(500).json(error) })

  },

}