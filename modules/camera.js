const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'VD',
  password: 'vOphuc20751',
  port: 5432,
})

//List all camera  in table, sort by id
const getCamera = (request, response) => {
    pool.query('SELECT * FROM camera ORDER BY camera_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
//Find a camera using name
const getCameraByName = (request, response) => {
    const name = request.params.name;
      pool.query('SELECT * FROM camera WHERE name = $1', [name], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
    }
  
//Find a camera using name
const getCameraByModule = (request, response) => {
    const module = request.params.module;
      pool.query('SELECT * FROM camera WHERE module = $1', [module], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
    }
  
//Add new camera
const createCamera = (request, response) => {
    const { name, module, service_id } = request.body
    pool.query('INSERT INTO camera (name, module, service_id) VALUES ($1, $2, $3) RETURNING *', [name, module, service_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Camera add with ID: ${results.rows[0].camera_id}`)
    })
  }
  
//Update camera service
const updateCamera = (request, response) => {
    const camera_id = parseInt(request.params.id)
    const { name, module } = request.body
    pool.query(
      'UPDATE camera SET name = $1, module = $2 WHERE camera_id = $3',
      [name, module, camera_id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Camera updated for ID: ${camera_id}`)
      }
    )
  }
  
//Delete camera (update is_deleted flag to true)
const deleteCamera = (request, response) => {
    const camera_id = parseInt(request.params.id)
    pool.query('UPDATE camera SET is_deleted = TRUE WHERE camera_id = $1', [camera_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Delete flag updated for ID: ${camera_id}`)
    })
  }
  
module.exports = {
    getCamera,
    getCameraByName,
    getCameraByModule,
    createCamera,
    updateCamera,
    deleteCamera,
}