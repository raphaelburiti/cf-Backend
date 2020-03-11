const request = require('supertest')

const app = require('../src/app')

test('Deve receber um token', () => {
  const mail = `${Date.now()}@mail.com`
  return request(app).post('/users')
    .send({
      firstname: 'Raphael', lastname: 'Buriti', cpf: '2235287436',
      email: mail, address: 'rua qualquer', phone: '985875254', password: 'teste123'
    })
    .then(() => request(app).get('/auth/signin')
      .send({ email: mail, password: 'teste123' }))
    .then((res) => {
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('token')
    })
})

test('Não deve autenticar usuário com senha incorreta', () => {
  const mail = `${Date.now()}@mail.com`
  return request(app).post('/users')
    .send({
      firstname: 'Raphael', lastname: 'Buriti', cpf: '2235287436',
      email: mail, address: 'rua qualquer', phone: '985875254', password: 'teste123'
    })
    .then(() => request(app).get('/auth/signin')
      .send({ email: mail, password: 'teste' }))
    .then((res) => {
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Usuário ou senha inválido')
    })
})

test('Não deve autenticar usuário inexistente', () => {
  const mail = `${Date.now()}@mail.com`
  return request(app).get('/auth/signin')
    .send({ email: mail, password: 'teste' })
    .then((res) => {
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Usuário ou senha inválido')
    })
})

test('Não deve acessar uma rota protegida sem token', () => {
  return request(app).get('/users')
    .then((res) => {
      expect(res.status).toBe(401)
    })
})