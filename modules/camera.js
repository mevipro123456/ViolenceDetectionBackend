const pool =  require('../config')

//List all camera  in table, sort by id
const getCamera = (request, response) => {
    pool.query('SELECT * FROM camera ORDER BY camera_id ASC', (error, results) => {
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
 
//Add new camera
const createCamera = (request, response) => {
    const { info } = request.body
    pool.query('INSERT INTO camera (info) VALUES ($1) RETURNING *', [info], (error, results) => {
      if (error) {
        throw error
      }
      else {
        response.status(200).json({
          message: `Camera added with ID: ${camera_id}`,
          status: "200"})
      }
    })
  }
  
//Update camera service
const updateCamera = (request, response) => {
    const { camera_id, info }= request.body
    pool.query(
      'UPDATE camera SET info = $1 WHERE camera_id = $2',
      [info, camera_id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json({
          message: `Camera information updated for ID: ${camera_id}`,
          status: `200`})
      }
    )
  }
  
//Delete camera (update is_deleted flag to true)
const deleteCamera = (request, response) => {
    const { camera_id }= request.body
    pool.query('UPDATE camera SET is_deleted = TRUE WHERE camera_id = $1', [camera_id], (error, results) => {
      if (error) {
        throw error
      }
      else {
        response.status(200).json({
          message: `Camera ID: ${camera_id} removed`,
          status: `200`})
      }
    })
  }
  
module.exports = {
    getCamera,
    createCamera,
    updateCamera,
    deleteCamera,
}