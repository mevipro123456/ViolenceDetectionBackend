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
app.post('/users/cameras', dbAccount.getCamerasByAccountId)
app.post('/users/id/', dbAccount.getUserById)
app.get('/users/name/', dbAccount.getUserByName)
app.get('/users/email/', dbAccount.getUserByEmail)
app.get('/users/phone/', dbAccount.getUserByPhone)
app.post('/users/register', dbAccount.createUser)
app.put('/users/', dbAccount.updateUser)
app.delete('/users/delete/', dbAccount.deleteUser)
app.delete('/users/deleteAll/', dbAccount.deleteAllUsers)
app.post('/users/camerasAndServices', dbAccount.getCamerasAndServicesByAccountId)


///For register
app.post('/register/', dbAccount.createUser)

///For login
app.post('/login/', dbAccount.loginUser)

//For contact table
app.post('/contacts/account_id', dbContact.getContactsByAccountId)
app.get('/contacts/', dbContact.getContacts)
app.get('/contacts/email/', dbContact.getContactByEmail)
app.get('/contacts/phone/', dbContact.getContactByPhone)
app.post('/contacts/', dbContact.createContact)
app.put('/contacts/', dbContact.updateContact)
app.delete('/contacts/delete/contact_id', dbContact.deleteContactByContactID)
app.delete('/contacts/delete/account_id', dbContact.deleteContactByAccountID)
app.delete('/contacts/deleteAll/', dbContact.deleteAllContacts)
app.post('/contacts/connection_string', dbContact.findContactsByConnectionString)
//For service table
app.get('/services/', dbService.getServices)
app.post('/services/service_id', dbService.getServiceById)
app.post('/services/name/', dbService.getServiceByName)
app.post('/services/', dbService.createService)
app.put('/services/', dbService.updateService)
app.delete('/services/delete/', dbService.deleteServiceByServiceID)
app.delete('/services/deleteAll/', dbService.deleteAllServices)

//For subcription table
app.get('/subcriptions/', dbSubcription.getSubcriptions)
app.post('/subcriptions/subcription_id/', dbSubcription.getSubcriptionBySubcriptionId)
app.post('/subcriptions/cameras/', dbSubcription.getCamerasBySubcriptionId)
app.post('/subcriptions/account_id/', dbSubcription.getSubcriptionByAccountId)
app.post('/subcriptions/', dbSubcription.createSubcription) 
app.put('/subcriptions/', dbSubcription.updateSubcription)
app.delete('/subcriptions/delete/', dbSubcription.deleteSubcription)
app.delete('/subcriptions/deleteAll/', dbSubcription.deleteAllSubcriptions)

//For camera table
app.get('/cameras/', dbCamera.getCamera)
app.post('/cameras/id', dbCamera.getCameraById)
app.post('/cameras/', dbCamera.createCamera)
app.put('/cameras/', dbCamera.updateCamera)
app.delete('/cameras/delete/', dbCamera.deleteCamera)

//For service_camera table
app.get('/service_camera/', dbCameraService.getCameraServices)
app.get('/service_camera/service_id/', dbCameraService.getCameraServiceByServiceId)
app.post('/service_camera/', dbCameraService.createCameraService)
app.delete('/service_camera/delete/', dbCameraService.deleteCameraServiceByIDs)
app.post('/service_camera/cameras', dbCameraService.getAllCamerasOfService)

//For working_camera table
app.get('/working_camera/', dbWorkingCamera.getWorkingCameras)
app.post('/working_camera/subcription_id/', dbWorkingCamera.getWorkingCameraBySubcriptionId)
app.put('/working_camera/', dbWorkingCamera.updateWorkingCameras)
app.post('/working_camera/', dbWorkingCamera.createWorkingCamera)
app.delete('/working_camera/delete/', dbWorkingCamera.deleteWorkingCamera)
app.delete('/working_camera/deleteAll/', dbWorkingCamera.deleteAllWorkingCameras)

//for camera_event table
app.get('/camera_event/', dbCameraEvent.getEvents)
app.post('/camera_event/id/', dbCameraEvent.getEventByWorkingCameraId)
app.post('/camera_event/', dbCameraEvent.createEvent)
app.delete('/camera_event/delete/', dbCameraEvent.deleteEvent)
app.delete('/camera_event/deleteAll/', dbCameraEvent.deleteAllEvents)
app.post('/camera_event/connection_string/', dbCameraEvent.insertEventWithConnectionString)
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

// Export the Express API
module.exports = app;