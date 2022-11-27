const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

//Declare database
const dbAccount = require('./modules/account')
const dbContact = require('./modules/contact')
const dbCart = require('./modules/cart')
const dbOrder = require('./modules/order')
const dbContract = require('./modules/contract')
const dbOrderService = require('./modules/order_service')
const dbService = require('./modules/service')
const dbCameraService = require('./modules/service_camera_list')
const dbCamera = require('./modules/camera')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
   response.json({ info: 'Node.js, Express, and Postgres API' })
  })

//For account table
app.get('/users/', dbAccount.getUsers)
app.get('/users/name/:name', dbAccount.getUserByName)
app.get('/users/email/:email', dbAccount.getUserByEmail)
app.get('/users/phone/:phone', dbAccount.getUserByPhone)
app.post('/users/', dbAccount.createUser)
app.put('/users/:id', dbAccount.updateUser)
app.put('/users/delete/:id', dbAccount.deleteUser)

//For contact table
app.get('/contacts/', dbContact.getContacts)
app.get('/contacts/email/:email', dbContact.getContactByEmail)
app.get('/contacts/phone/:phone', dbContact.getContactByPhone)
app.post('/contacts/', dbContact.createContact)
app.put('/contacts/:id', dbContact.updateContact)
app.put('/contacts/delete/:id', dbContact.deleteContact)

//For cart table
app.get('/carts/', dbCart.getCarts)
app.post('/carts/', dbCart.createCart)
app.put('/carts/:id', dbCart.updateCart)
app.put('/carts/delete/:id', dbCart.deleteCart)

//For order table
app.get('/orders/', dbOrder.getOrders)
app.post('/orders/', dbOrder.createOrder)
app.put('/orders/:id', dbOrder.updateOrder)
app.put('/orders/delete/:id', dbOrder.deleteOrder)

//For contract table
app.get('/contracts/', dbContract.getContracts)
app.post('/contracts/', dbContract.createContract)
app.put('/contracts/:id', dbContract.updateContract)
app.put('/contracts/delete/:id', dbContract.deleteContract)

//For order_service table
app.get('/orderservices/', dbOrderService.getOrderServices)
app.post('/orderservices/', dbOrderService.createOrderService)
app.put('/orderservices/:id', dbOrderService.updateOrderService)
app.put('/orderservices/delete/:id', dbOrderService.deleteOrderService)

//For service table
app.get('/services/', dbService.getServices)
app.get('/services/name/:name', dbService.getServiceByName)
app.post('/services/', dbService.createService)
app.put('/services/:id', dbService.updateService)
app.put('/services/delete/:id', dbService.deleteService)

//For service_camera_list table
app.get('/cameraservices/', dbCameraService.getCameraServices)
app.post('/cameraservices/', dbCameraService.createCameraService)
app.put('/cameraservices/:id', dbCameraService.updateCameraService)
app.put('/cameraservices/delete/:id', dbCameraService.deleteCameraService)

//For camera table
app.get('/cameras/', dbCamera.getCamera)
app.get('/cameras/name/:name', dbCamera.getCameraByName)
app.get('/cameras/module/:module', dbCamera.getCameraByModule)
app.post('/cameras/', dbCamera.createCamera)
app.put('/cameras/:id', dbCamera.updateCamera)
app.put('/cameras/delete/:id', dbCamera.deleteCamera)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

