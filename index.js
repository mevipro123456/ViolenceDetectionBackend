require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT;

//Declare database
const dbAccount = require('./modules/account')
const dbContact = require('./modules/contact')
const dbSubcription = require('./modules/subcription')
const dbService = require('./modules/service')
const dbCameraService = require('./modules/service_camera')
const dbCamera = require('./modules/camera')
const dbWorkingCamera = require('./modules/working_camera')
const dbCameraEvent = require('./modules/camera_event')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
const cors = require('cors');
app.use(cors({ origin: true }));

app.get('/', (request, response) => {
   response.json({ info: 'Node.js, Express, and Postgres API' })
  })

//For account table
app.get('/users/', dbAccount.getUsers)
app.get('/users/id/', dbAccount.getUserById)
app.get('/users/name/', dbAccount.getUserByName)
app.get('/users/email/', dbAccount.getUserByEmail)
app.get('/users/phone/', dbAccount.getUserByPhone)
app.post('/users/register', dbAccount.createUser)
app.put('/users/', dbAccount.updateUser)
app.put('/users/delete/', dbAccount.deleteUser)

///For register
app.post('/register/', dbAccount.createUser)

///For login
app.post('/login/', dbAccount.loginUser)

//For contact table
app.get('/contacts/account_id', dbContact.getContactsByAccountId)
app.get('/contacts/', dbContact.getContacts)
app.get('/contacts/email/', dbContact.getContactByEmail)
app.get('/contacts/phone/', dbContact.getContactByPhone)
app.post('/contacts/', dbContact.createContact)
app.put('/contacts/', dbContact.updateContact)
app.put('/contacts/delete/', dbContact.deleteContact)

//For service table
app.get('/services/', dbService.getServices)
app.get('/services/name/', dbService.getServiceByName)
app.post('/services/', dbService.createService)
app.put('/services/', dbService.updateService)
app.put('/services/delete/', dbService.deleteService)

//For subcription table
app.get('/subcriptions/', dbSubcription.getSubcriptions)
app.get('/subcriptions/id/', dbSubcription.getSubcriptionById)
app.post('/subcriptions/', dbSubcription.createSubcription) 
app.put('/subcriptions/', dbSubcription.updateSubcription)
app.put('/subcriptions/delete/', dbSubcription.deleteSubcription)

//For camera table
app.get('/cameras/', dbCamera.getCamera)
app.post('/cameras/', dbCamera.createCamera)
app.put('/cameras/', dbCamera.updateCamera)
app.put('/cameras/delete/', dbCamera.deleteCamera)

//For service_camera table
app.get('/service_camera/', dbCameraService.getCameraServices)
app.get('/service_camera/service/', dbCameraService.getCameraServiceByServiceId)
app.post('/service_camera/', dbCameraService.createCameraService)
app.put('/service_camera/delete/', dbCameraService.deleteCameraService)

//For working_camera table
app.get('/working_camera/', dbWorkingCamera.getWorkingCameras)
app.get('/working_camera/id/', dbWorkingCamera.getWorkingCameraById)
app.post('/working_camera/', dbWorkingCamera.createWorkingCamera)
app.put('/working_camera/delete/', dbWorkingCamera.deleteWorkingCamera)

//for camera_event table
app.get('/camera_event/', dbCameraEvent.getEvents)
app.get('/camera_event/id/', dbCameraEvent.getEventByWorkingCameraId)
app.post('/camera_event/', dbCameraEvent.createEvent)
app.put('/camera_event/delete/', dbCameraEvent.deleteEvent)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

// Export the Express API
module.exports = app;