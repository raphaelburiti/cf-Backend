const User = require('../models/User')
const bcrypr = require('bcrypt-nodejs')
const jwt = require('jwt-simple')
const authConfig = require('../config/auth.json')

module.exports = {
  async signin(req, res, next) {
    const { email, password } = req.headers

    await User.findOne({ where: { email } })
      .then((user) => {

        if (!user) res.status(400).json({ error: 'Usuário ou senha inválido' })

        if (bcrypr.compareSync(password, user.password)) {

          const payload = {
            id: user.id,
            firstname: user.firstname,
            email: user.email,
          }
          const token = jwt.encode(payload, authConfig.secret)
          res.status(200).json({ payload, token })
        } else {
          res.status(400).json({ error: 'Usuário ou senha inválido' })
        }

      })
      .catch(err => next(err))
  }
}