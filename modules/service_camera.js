const pool =  require('../config')

//List all camera services in table, sort by id
const getCameraServices = (request, response) => {
    pool.query('SELECT * FROM service_camera ORDER BY camera_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({
        message: `OK`, 
        status: `200`, 
        body: results.rows})
    })
  }

//Find camera service using service_id
const getCameraServiceByService = (request, response) => {
  const { service_id }= request.body
    pool.query('SELECT * FROM service_camera WHERE service_id = $1', [service_id], (error, results) => {
      if (error) {
        throw error
      }
      else if (results.rowCount == 0) {
        response.status(400).json({
          message: `Can't find camera service with service ID: ${service_id}`,
          status: `400`,
        })
      }
      else {
        response.status(200).json({
          message: `Camera service found with service ID: ${service_id}`, 
          status: `200`, 
          body: results.rows})
      }
    })
  }  

//Add camera service
const createCameraService = (request, response) => {
  const { service_id, camera_id } = request.body
    pool.query('INSERT INTO service_camera (service_id, camera_id) VALUES ($1, $2) RETURNING *', [service_id, camera_id], (error, results) => {
      if (error) {
        throw error
      }
      else {
        response.status(200).json({
          message: `New service for camera added with ID: ${camera_id}`,
          status: `200`})
      }
    })
  }
  
//Delete camera service (update is_deleted flag to true)
  const deleteCameraService = (request, response) => {
    const { camera_id } = request.body 
    pool.query('UPDATE service_camera SET is_deleted = TRUE WHERE camera_id = $1', [camera_id], (error, results) => {
      if (error) {
        throw error
      }
      else {
        response.status(200).json({
          message: `Camera service ID: ${camera_id} removed`,
          status: `200`})
      }
    })
  }

module.exports = {
    getCameraServices,
    getCameraServiceByService,
    createCameraService,
    deleteCameraService,
}