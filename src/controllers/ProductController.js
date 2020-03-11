const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const Product = require('../models/Product')

module.exports = {
  async create(req, res) {
    const { filename } = req.file
    const { name, desc, price, category, discount } = req.body

    const productExist = await Product.findOne({
      where: { name }
    })

    if (productExist) {
      return res.status(400).json({ error: 'Este produto já está cadastrado' })
    }

    const product = await Product.create({ name, desc, price, category, discount, image: filename })

    return res.status(201).json(product)
  },

  async getAll(req, res) {
    const products = await Product.findAll()

    res.status(200).json(products)
  },

  async getById(req, res) {
    const { id } = req.params

    Product.findOne({ where: { id } })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch(() => {
        res.status(400).json({ error: 'Produto não encontrado' })
      })
  },

  async updateById(req, res) {
    const { filename } = req.file
    const { id } = req.params
    const { name, desc, price, category, discount } = req.body

    const product = await Product.findOne({ where: { id } })

    if (!product) {
      return res.status(404).json({ error: 'Produto não foi encontrado' })
    }

    const imageName = product.image

    product.update({ name, desc, price, category, discount, image: filename }, { where: { id } })
      .then((result) => {

        promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'uploads', imageName))

        return res.status(200).json(result)
      })
  },

  async deleteById(req, res) {
    const { id } = req.params

    const product = await Product.findOne({ where: { id } })

    const imageName = product.image

    Product.destroy({
      where: { id },
    })
      .then(function (deletedRecord) {
        if (deletedRecord === 1) {

          promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'uploads', imageName))

          res.status(200).json({ message: "Deleted successfully" });
        }
        else {
          res.status(404).json({ message: "record not found" })
        }
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },
}