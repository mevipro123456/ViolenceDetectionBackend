const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./models/queries')
const port = 3000
const root = "./server"
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
   response.json({ info: 'Node.js, Express, and Postgres API' })
  })

///For video streaming
app.get("/stream/", function (req, res) {
  res.sendFile('index.html', {root: 'server'});
});

app.get("/stream/:videoid", function (req, res) {
  res.sendFile('webcam.html', {root: 'server'});
});

app.get("/test/", function (req, res) {
  res.sendFile('test.html', {root: root});
});

//app.get("/video/:videoid", db.getVideo) 
app.get("/video/:videoid", db.getTest)

//For account table
app.get('/users/', db.getUsers)
app.get('/users/name/:name', db.getUserByName)
app.get('/users/email/:email', db.getUserByEmail)
app.get('/users/phone/:phone', db.getUserByPhone)
app.post('/users/', db.createUser)
app.put('/users/:id', db.updateUser)
app.put('/users/delete/:id', db.deleteUser)

//For contact table
app.get('/contacts/', db.getContacts)
app.get('/contacts/email/:email', db.getContactByEmail)
app.get('/contacts/phone/:phone', db.getContactByPhone)
app.post('/contacts/', db.createContact)
app.put('/contacts/:id', db.updateContact)
app.put('/contacts/delete/:id', db.deleteContact)

//For cart table
app.get('/carts/', db.getCarts)
app.post('/carts/', db.createCart)
app.put('/carts/:id', db.updateCart)
app.put('/carts/delete/:id', db.deleteCart)

//For order table
app.get('/orders/', db.getOrders)
app.post('/orders/', db.createOrder)
app.put('/orders/:id', db.updateOrder)
app.put('/orders/delete/:id', db.deleteOrder)

//For contract table
app.get('/contracts/', db.getContracts)
app.post('/contracts/', db.createContract)
app.put('/contracts/:id', db.updateContract)
app.put('/contracts/delete/:id', db.deleteContract)

//For order_service table
app.get('/orderservices/', db.getOrderServices)
app.post('/orderservices/', db.createOrderService)
app.put('/orderservices/:id', db.updateOrderService)
app.put('/orderservices/delete/:id', db.deleteOrderService)

//For contract table
app.get('/services/', db.getServices)
app.get('/services/name/:name', db.getServiceByName)
app.post('/services/', db.createService)
app.put('/services/:id', db.updateService)
app.put('/services/delete/:id', db.deleteService)

//For service_camera_list table
app.get('/cameraservices/', db.getCameraServices)
app.post('/cameraservices/', db.createCameraService)
app.put('/cameraservices/:id', db.updateCameraService)
app.put('/cameraservices/delete/:id', db.deleteCameraService)

//For camera table
app.get('/cameras/', db.getCamera)
app.get('/cameras/name/:name', db.getCameraByName)
app.get('/cameras/module/:module', db.getCameraByModule)
app.post('/cameras/', db.createCamera)
app.put('/cameras/:id', db.updateCamera)
app.put('/cameras/delete/:id', db.deleteCamera)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

