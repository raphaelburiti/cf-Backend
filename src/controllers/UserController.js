const User = require('../models/User')
const bcrypr = require('bcrypt-nodejs')

module.exports = {
  async create(req, res) {
    const { firstname, lastname, cpf, email, address, phone, password } = req.body

    const emailExist = await User.findOne({
      where: { email }
    })

    if (emailExist) {
      return res.status(400).json({ error: 'Este email já está cadastrado' })
    }

    function getPasswordHash(password) {
      const salt = bcrypr.genSaltSync(10)
      return bcrypr.hashSync(password, salt)
    }

    const passwordHash = getPasswordHash(password)

    const user = await User.create({ firstname, lastname, cpf, email, address, phone, password: passwordHash })

    return res.status(201).json(user)
  },

  async getAll(req, res) {
    const user = await User.findAll({ attributes: { exclude: ['password'] } })

    if (!user) {
      res.status(404).json({ error: "user not found" })
    }

    res.status(200).json(user)
  },

  async getById(req, res) {
    const { id } = req.params

    User.findOne({ where: { id } })
      .then((result) => {
        result.password = undefined
        res.status(200).json(result)
      })
      .catch(() => {
        res.status(400).json({ error: 'Usuário não encontrado' })
      })
  },

  async updateById(req, res) {
    const { id } = req.params
    const { firstname, lastname, cpf, email, address, phone, password } = req.body

    function getPasswordHash(password) {
      const salt = bcrypr.genSaltSync(10)
      return bcrypr.hashSync(password, salt)
    }

    const passwordHash = getPasswordHash(password)

    const user = await User.findOne({ where: { id } })

    user.update({ firstname, lastname, cpf, email, address, phone, password: passwordHash }, { where: { id } })
      .then((result) => {
        // result.password = undefined
        return res.status(200).json(result)
      })
  },

  async deleteById(req, res) {
    const { id } = req.params

    User.destroy({
      where: { id },
    })
      .then(function (deletedRecord) {
        if (deletedRecord === 1) {
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