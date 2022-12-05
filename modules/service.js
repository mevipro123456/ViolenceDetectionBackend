const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'VD',
  password: 'vOphuc20751',
  port: 5432,
})

//List all order services in table, sort by id
const getServices = (request, response) => {
    pool.query('SELECT * FROM service ORDER BY service_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({
        message: "OK", 
        status: "200", 
        body: results.rows})
    })
  }
  
//Find service regisgtered by name
const getServiceByName = (request, response) => {
  const name = request.params.name;
      pool.query('SELECT * FROM service WHERE name = $1', [name], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json({
          message: "OK", 
          status: "200", 
          body: results.rows})
      })
    }
  
//Add a service
const createService = (request, response) => {
  const { name, membership, price, duration, order_service_id } = request.body
    pool.query('INSERT INTO service (name, membership, price, duration, order_service_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, membership, price, duration, order_service_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Service created with ID: ${results.rows[0].service_id}`)
    })
  }
  
//Update service
const updateService = (request, response) => {
  const service_id = parseInt(request.params.id)
    const { name, membership, price, duration } = request.body
    pool.query(
      'UPDATE service SET name = $1, membership = $2, price = $3, duration = $4 WHERE service_id = $5',
      [name, membership, price, duration, service_id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Service updated for ID: ${service_id}`)
      }
    )
  }
  
//Delete service (update is_deleted flag to true)
const deleteService = (request, response) => {
  const service_id = parseInt(request.params.id)
    pool.query('UPDATE service SET is_deleted = TRUE WHERE service_id = $1', [service_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Delete flag updated for ID: ${service_id}`)
    })
  }
  
module.exports = {
    getServices,
    getServiceByName,
    createService,
    updateService,
    deleteService,
}