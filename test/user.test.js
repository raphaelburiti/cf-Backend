const request = require('supertest')

const app = require('../src/app')

const User = require('../src/models/User')

const email = `1${Date.now()}@mail.com`
const name = `${Date.now()}`

let user

beforeAll(async function createUser() {
  const res = await User.create({
    firstname: name, lastname: 'Buriti', cpf: '2235287436',
    email: email, address: 'rua qualquer', phone: '985875254', password: 'teste123'
  })

  user = res
})

test.skip('Deve inserir usuário com sucesso', () => {
  return request(app).post('/users')
    .send({
      firstname: 'Raphael', lastname: 'Buriti', cpf: '2235287436',
      email: `1${email}`, address: 'rua qualquer', phone: '985875254', password: 'teste123'
    })
    .then((res) => {
      expect(res.status).toBe(201)
      expect(res.body.firstname).toBe('Raphael')
    })
})

test('Deve armazenar senha criptografada', async () => {
  const userDB = await request(app).post('/users')
    .send({
      firstname: 'Raphael', lastname: 'Buriti', cpf: '2235287436',
      email: `2${email}`, address: 'rua qualquer', phone: '985875254', password: 'teste123'
    })

  const result = await request(app).get(`/users/${userDB.body.id}`)

  expect(result.body.password).not.toBeUndefined()
  expect(result.body.password).not.toBe('teste123')
})

test('Não deve inserir usuário com email existente', () => {
  return request(app).post('/users')
    .send({
      address: 'rua qualquer',
      firstname: 'Raphael', lastname: 'Buriti', cpf: '42470191807',
      email: 'rapha@gmail.com', phone: '985875254', password: 'teste123'
    })
    .then((res) => {
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Este email já está cadastrado')
    })
})

test('Deve listar todos os usuários', () => {
  return request(app).get('/users')
    .then((res) => {
      expect(res.status).toBe(200)
      expect(res.body.length).toBeGreaterThan(0)
    })
})

test('Deve retornar uma conta por Id', () => {
  return request(app).get(`/users/${user.id}`)
    .then((res) => {
      expect(res.status).toBe(200)
      expect(res.body.firstname).toBe(name)
    })
})

test('Deve editar uma conta', () => {
  return request(app).put(`/users/${user.id}`)
    .send({ firstname: name })
    .then((res) => {
      expect(res.status).toBe(200)
      expect(res.body.firstname).toBe(name)
    })
})

test('Deve remover uma conta', () => {
  return request(app).delete(`/users/${user.id}`)
    .then((res) => {
      expect(res.status).toBe(200)
    })
})