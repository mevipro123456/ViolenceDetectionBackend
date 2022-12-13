const { json } = require('express')
const pool =  require('../config')

//List all order services in table, sort by id
const getServices = (request, response) => {
    pool.query('SELECT * FROM service ORDER BY service_id ASC', (error, results) => {
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

  
//Find service regisgtered by name
const getServiceByName = (request, response) => {
  const { name } = request.body
      pool.query('SELECT * FROM service WHERE name = $1', [name], (error, results) => {
        if (error) {
          response.status(400).json({
            message: "Error, " + error,
            status: `400`}
          )
        }
        else if (results.rowCount == 0) {
          response.status(400).json({
            message: `Can't find service with name: ${name}`,
            status: `400`,
          })
        }
        else {
          response.status(200).json({
            message: `Service found with name: ${name}`, 
            status: `200`, 
            body: results.rows})
        }
      })
    }
//Find service regisgtered by name
const getServiceById = (request, response) => {
  const { service_id } = request.body
      pool.query('SELECT * FROM service WHERE service_id = $1', [service_id], (error, results) => {
        if (error) {
          response.status(400).json({
            message: "Error, " + error,
            status: `400`}
          )
        }
        else if (results.rowCount == 0) {
          response.status(400).json({
            message: `Can't find service with id: ${service_id}`,
            status: `400`,
          })
        }
        else {
          response.status(200).json({
            message: `Service found with id: ${service_id}`, 
            status: `200`, 
            body: results.rows})
        }
      })
    }
  
//Add a service
const createService = (request, response) => {
    const { name, membership, price, duration } = request.body
    var no_contact = 3
    if(membership == "basic"){
      no_contact = 3
    }
    else if(membership == "premium"){
      no_contact = 5
    }
    else if(membership == "enterprise"){
      no_contact = 10
    }
    pool.query('INSERT INTO service (name, membership, price, duration, no_contact) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, membership, price, duration, no_contact], (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
      }
      else{
        response.status(200).json({
          message: `Service created with ID: ${results.rows[0].service_id}`,
          status: `200`})
      } 
    })
  }
  
//Update service
const updateService = (request, response) => {
    const { name, membership, price, duration, service_id  } = request.body
    pool.query(
      'UPDATE service SET name = $1, membership = $2, price = $3, duration = $4 WHERE service_id = $5',
      [name, membership, price, duration, service_id],
      (error, results) => {
        if (error) {
          response.status(400).json({
            message: "Error, " + error,
            status: `400`}
          )
        }
        else {
          response.status(200).json({
            message: `Service updated for ID: ${service_id}`,
            status: `200`})
        } 
      }
    )
  }
  
//Delete service (update is_deleted flag to true)
const deleteServiceByServiceID = (request, response) => {
  const { service_id } = request.body
    pool.query('DELETE FROM service WHERE service_id = $1', [service_id], (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
      }
      else {
        response.status(200).json({
          message: `Service with ID: ${service_id} deleted`,
          status: `200`})
      }
    })
  }

  const deleteAllServices = (request, response) => {
      pool.query('DELETE FROM service', (error, results) => {
        if (error) {
          response.status(400).json({
            message: "Error, " + error,
            status: `400`}
          )
        }
        else {
          response.status(200).json({
            message: `All services deleted`,
            status: `200`})
        }
      })
    }
      
module.exports = {
    getServices,
    getServiceByName,
    getServiceById,
    createService,
    updateService,
    deleteServiceByServiceID,
    deleteAllServices
}