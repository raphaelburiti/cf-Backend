const nodemailer = require('nodemailer');
const User = require('../models/User')
const bcrypr = require('bcrypt-nodejs')

module.exports = {
  async recoveryPassword(req, res, next) {
    const { email } = req.body

    const user = await User.findOne({
      where: { email }
    })

    if (!user) {
      return res.status(404).json({ error: 'Este email não está cadastrado' })
    }

    if (user) {
      const { firstname, lastname, cpf, email, address, phone } = user

      const password = Math.floor(Math.random() * 9999 + 1000)

      function getPasswordHash(password) {
        const salt = bcrypr.genSaltSync(10)
        return bcrypr.hashSync(password, salt)
      }

      const passwordHash = getPasswordHash(password)

      user.update({ firstname, lastname, cpf, email, address, phone, password: passwordHash }, { where: { email } })
        .then(() => {

          const transporter = nodemailer.createTransport({
            host: "SMTP.office365.com",
            port: 587,
            secure: false,
            auth: {
              user: "raphael_buriti@outlook.com",
              pass: "Humildade123"
            },
            tls: { rejectUnauthorized: false }
          });

          const mailOptions = {
            from: 'raphael_buriti@outlook.com',
            to: email,
            subject: 'Recuperação de Senha',
            // text: 'Recuperação de Senha',
            html: `<h3>Nova senha</h3><p>${password}</p>`
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              res.status(400).json({ error: error })
            } else {
              res.status(201).json(info.response)
            }
          });
        })
    }

  }

}