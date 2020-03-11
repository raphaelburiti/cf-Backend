const jwt = require('jwt-simple')
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
  const { token } = req.headers

  if (!token) return res.status(401).json({ error: 'Token não foi providenciado' })

  const decode = jwt.decode(token, authConfig.secret)

  if (decode) return next();
}