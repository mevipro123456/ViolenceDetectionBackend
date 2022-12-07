const pool =  require('../config')

//List all camera services in table, sort by id
const getCameraServices = (request, response) => {
    pool.query('SELECT * FROM service_camera_list ORDER BY camera_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({
        message: `OK`, 
        status: `200`, 
        body: results.rows})
    })
  }
  
//Add camera service
const createCameraService = (request, response) => {
  const { service_id, quantity } = request.body
    pool.query('INSERT INTO service_camera_list (service_id, quantity) VALUES ($1, $2) RETURNING *', [service_id, quantity], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).json({
        message: `Service for camera created with ID: ${camera_id}`,
        status: `201`})
    })
  }
  
//Update camera service
const updateCameraService = (request, response) => {
  const camera_id = parseInt(request.params.id)
    const { quantity } = request.body
    pool.query(
      'UPDATE service_camera_list SET quantity = $1 WHERE camera_id = $2',
      [quantity, camera_id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json({
          message: `Service for camera updated for ID: ${camera_id}`,
          status: `200`})
      }
    )
  }
  
//Delete camera service (update is_deleted flag to true)
  const deleteCameraService = (request, response) => {
    const camera_id = parseInt(request.params.id)
    pool.query('UPDATE service_camera_list SET is_deleted = TRUE WHERE camera_id = $1', [camera_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({
        message: `Delete flag updated for ID: ${camera_id}`,
        status: `200`})
    })
  }

module.exports = {
    getCameraServices,
    createCameraService,
    updateCameraService,
    deleteCameraService,
}