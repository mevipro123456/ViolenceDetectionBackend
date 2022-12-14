const pool =  require('../config')

//List all camera services in table, sort by id
const getCameraServices = (request, response) => {
    pool.query('SELECT * FROM service_camera', (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
      }
      response.status(200).json({
        message: `OK`, 
        status: `200`, 
        body: results.rows})
    })
  }

//Find camera service using service_id
const getCameraServiceByServiceId = (request, response) => {
  const { service_id }= request.body
    pool.query('SELECT * FROM service_camera WHERE service_id = $1', [service_id], (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
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
  const { service_id, camera_id, no_camera} = request.body
    pool.query('INSERT INTO service_camera (service_id, camera_id, no_camera) VALUES ($1, $2, $3) RETURNING *', [service_id, camera_id, no_camera], (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
      }
      else {
        response.status(200).json({
          message: `New service for camera added with ID: ${camera_id}`,
          status: `200`})
      }
    })
  }
  const getAllCamerasOfService = (request, response) => {
    const { service_id } = request.body
    pool.query('SELECT * FROM service_camera as sc INNER JOIN camera as c ON sc.camera_id = c.camera_id WHERE sc.service_id = $1',
    [service_id], 
    (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
      }
      else {
        response.status(200).json({
          message: `OK`, 
          status: `200`, 
          body: results.rows})
      } 
    })
  }
//Delete camera service (update is_deleted flag to true)
  const deleteCameraServiceByIDs = (request, response) => {
    const { service_id, camera_id } = request.body 
    pool.query('DELETE FROM service_camera WHERE service_id = $1 and camera_id = $2', [service_id, camera_id], (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
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
    getCameraServiceByServiceId,
    createCameraService,
    deleteCameraServiceByIDs,
    getAllCamerasOfService
}