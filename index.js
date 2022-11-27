const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dbAccount = require('./modules/account')
const dbContact = require('./modules/contact')
const dbCart = require('./modules/cart')
const dbOrder = require('./modules/order')
const dbContract = require('./modules/contract')
const port = 3000

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

// //For order_service table
// app.get('/orderservices/', db.getOrderServices)
// app.post('/orderservices/', db.createOrderService)
// app.put('/orderservices/:id', db.updateOrderService)
// app.put('/orderservices/delete/:id', db.deleteOrderService)

// //For contract table
// app.get('/services/', db.getServices)
// app.get('/services/name/:name', db.getServiceByName)
// app.post('/services/', db.createService)
// app.put('/services/:id', db.updateService)
// app.put('/services/delete/:id', db.deleteService)

// //For service_camera_list table
// app.get('/cameraservices/', db.getCameraServices)
// app.post('/cameraservices/', db.createCameraService)
// app.put('/cameraservices/:id', db.updateCameraService)
// app.put('/cameraservices/delete/:id', db.deleteCameraService)

// //For camera table
// app.get('/cameras/', db.getCamera)
// app.get('/cameras/name/:name', db.getCameraByName)
// app.get('/cameras/module/:module', db.getCameraByModule)
// app.post('/cameras/', db.createCamera)
// app.put('/cameras/:id', db.updateCamera)
// app.put('/cameras/delete/:id', db.deleteCamera)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

