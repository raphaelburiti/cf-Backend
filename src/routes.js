const express = require('express');
const multer = require('multer')
const uploadConfig = require('./config/upload')

const routes = express.Router();
const upload = multer(uploadConfig)

const authMiddleware = require('./middleware/auth')

const UserController = require('./controllers/UserController')
const ProductController = require('./controllers/ProductController')
const OrderController = require('./controllers/OrderController')
const AuthController = require('./controllers/AuthController')
const PasswordController = require('./controllers/PasswordController')

routes.get('/')

//Rotas para Usuários
routes.post('/users', UserController.create)
routes.get('/users', UserController.getAll)
routes.get('/users/:id', authMiddleware, UserController.getById)
routes.put('/users/:id', UserController.updateById)
routes.delete('/users/:id', UserController.deleteById)

//Rota para Autenticação
routes.get('/auth/signin', AuthController.signin)

//Rota para Reset Password
routes.post('/auth/forgot_password', PasswordController.recoveryPassword)

//Rotas para Produtos
routes.post('/products', upload.single('image'), ProductController.create)
routes.get('/products', ProductController.getAll)
routes.get('/products/:id', ProductController.getById)
routes.put('/products/:id', upload.single('image'), ProductController.updateById)
routes.delete('/products/:id', ProductController.deleteById)

//Rotas para Pedidos
routes.post('/orders', OrderController.create)
routes.get('/orders', OrderController.getAll)
routes.get('/orders/:id', OrderController.getById)
// routes.put('/orders/:id', OrderController.updateById)
routes.delete('/orders/:id', OrderController.deleteById)

module.exports = routes;