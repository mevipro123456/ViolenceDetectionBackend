const pool =  require('../config')

//List all working cameras in table, sort by id
const getWorkingCameras = (request, response) => {
    pool.query('SELECT * FROM working_camera ORDER BY working_camera_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      else {
        response.status(200).json({
          message: `OK`, 
          status: `200`, 
          body: results.rows})
      }
    })
  }

//Find working camera using id
const getWorkingCameraById = (request, response) => {
    const { working_camera_id }= request.body
      pool.query('SELECT * FROM working_camera WHERE working_camera_id = $1', [working_camera_id], (error, results) => {
        if (error) {
          throw error
        }
        else if (results.rowCount == 0) {
          response.status(400).json({
            message: `Can't find camera ID: ${working_camera_id}`,
            status: `400`,
          })
        }
        else {
          response.status(200).json({
            message: `Camera found with ID: ${working_camera_id}`, 
            status: `200`, 
            body: results.rows})
        }
      })
    }

//Add working camera
const createWorkingCamera = (request, response) => {
    const { camera_id, subcription_id } = request.body
    pool.query('INSERT INTO working_account (camera_id, subcription_id) VALUES ($1, $2) RETURNING *', [camera_id, subcription_id], (error, results) => {
      if (error) {
        throw error
      }
      else {
        response.status(200).json({
          message: `Camera created with ID: ${results.rows[0].working_camera_id}`,
          status: `200`})
      } 
    })
  }

//Delete working camera (update is_deleted flag to true)
const deleteWorkingCamera = (request, response) => {
    const { working_camera_id }= request.body
    pool.query('UPDATE working_camera SET is_deleted = TRUE WHERE working_camera_id = $1', [working_camera_id], (error, results) => {
      if (error) {
        throw error
      }
      else {
        response.status(200).json({
          message: `Camera with ID: ${working_camera_id} deleted`,
          status: `200`})
      } 
    })
  }

module.exports = {
    getWorkingCameras,
    getWorkingCameraById,
    createWorkingCamera,
    deleteWorkingCamera
}