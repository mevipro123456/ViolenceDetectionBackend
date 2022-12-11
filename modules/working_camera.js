const pool =  require('../config')

//List all working cameras in table, sort by id
const getWorkingCameras = (request, response) => {
    pool.query('SELECT * FROM working_camera ORDER BY working_camera_id ASC', (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
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
          response.status(400).json({
            message: "Error, " + error,
            status: `400`}
          )
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
    pool.query('INSERT INTO working_camera (camera_id, subcription_id) VALUES ($1, $2) RETURNING *', [camera_id, subcription_id], (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
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
    pool.query('DELETE working_camera WHERE working_camera_id = $1', [working_camera_id], (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
        throw error
      }
      else {
        response.status(200).json({
          message: `Camera with ID: ${working_camera_id} deleted`,
          status: `200`})
      } 
    })
  }
//Delete working camera (update is_deleted flag to true)
const deleteAllWorkingCameras = (request, response) => {
  pool.query('DELETE FROM working_camera', [working_camera_id], (error, results) => {
    if (error) {
      response.status(400).json({
        message: "Error, " + error,
        status: `400`}
      )
      throw error
    }
    else {
      response.status(200).json({
        message: `All camera deleted`,
        status: `200`})
    } 
  })
}
module.exports = {
    getWorkingCameras,
    getWorkingCameraById,
    createWorkingCamera,
    deleteWorkingCamera,
    deleteAllWorkingCameras
}