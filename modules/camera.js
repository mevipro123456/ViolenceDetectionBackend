const pool =  require('../config')

//List all camera  in table, sort by id
const getCamera = (request, response) => {
    pool.query('SELECT * FROM camera ORDER BY camera_id ASC', (error, results) => {
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
 //List all camera  in table, sort by id
const getCameraById = (request, response) => {
  const { camera_id } = request.body
  pool.query('SELECT * FROM camera WHERE camera_id = $1', [camera_id], (error, results) => {
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

//Add new camera
const createCamera = (request, response) => {
    const { color, model_number, name, brand, image } = request.body
    pool.query('INSERT INTO camera (color, model_number, name, brand, image) VALUES ($1, $2, $3, $4, $5) RETURNING *', [ color, model_number, name, brand, image ], (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
      }
      else {
        response.status(200).json({
          message: `Camera added with ID: ${results.rows[0].camera_id}`,
          status: "200"})
      }
    })
  }
  
//Update camera service
const updateCamera = (request, response) => {
    const { camera_id, color, model_number, name, brand, image } = request.body
    pool.query(
      'UPDATE camera SET color = $1, model_number = $2, name = $3, brand = $4, image = $5 WHERE camera_id = $6',
      [color, model_number, name, brand, image, camera_id],
      (error, results) => {
        if (error) {
          response.status(400).json({
            message: "Error, " + error,
            status: `400`}
          )
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
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
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
    getCameraById,
    createCamera,
    updateCamera,
    deleteCamera,
}