const { json } = require('express')
const pool =  require('../config')

//List all subcriptions in table, sort by id
const getSubcriptions = (request, response) => {
    pool.query('SELECT * FROM subcription ORDER BY subcription_id ASC', (error, results) => {
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
//Find a subcription using id
const getSubcriptionBySubcriptionId = (request, response) => {
  const { subcription_id } = request.body
    pool.query('SELECT * FROM subcription WHERE subcription_id = $1', [subcription_id], (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
        
      }
      else if (results.rowCount == 0) {
        response.status(400).json({
          message: `Can't find subcription with account ID: ${subcription_id}`,
          status: `400`,
        })
      }
      else {
        response.status(200).json({
          message: `Subcription found with account ID: ${subcription_id}`, 
          status: `200`, 
          body: results.rows})
      }
    })
  }
//Find a subcription using id
const getSubcriptionByAccountId = (request, response) => {
  const { account_id }= request.body
    pool.query('SELECT * FROM subcription WHERE account_id = $1', [account_id], (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
        
      }
      else if (results.rowCount == 0) {
        response.status(400).json({
          message: `Can't find subcription with account ID: ${account_id}`,
          status: `400`,
        })
      }
      else {
        response.status(200).json({
          message: `Subcription found with account ID: ${account_id}`, 
          status: `200`, 
          body: results.rows})
      }
    })
  }

//Create new subcription
const createSubcription = async (request, response) => {
    const {account_id, service_id } = request.body
    let service = await func_GetServiceById(service_id)
    // camera_serivce
    let camera_service = await func_getCameraServiceByServiceId(service_id)
    console.log(`In createSubcription service: ${service[0]}`)
    var price = service[0].price
    var duration = service[0].duration
    parseInt(duration, duration)
    var start_date = new Date()

    var end_date = new Date()
    let start_date_month = start_date.getMonth() + parseInt(duration, 10)
    console.log("duration", duration)
    console.log("start_date_month", start_date_month)
    end_date.setMonth(start_date_month)
    console.log("Current start_date ", start_date.toISOString())
    console.log("Current end_date ", end_date.toISOString())

    console.log("In createSubcription service", camera_service[0].no_camera)
    pool.query('INSERT INTO subcription (start_date, end_date, price, duration, account_id, service_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [start_date.toISOString(), end_date.toISOString(), price, duration, account_id, service_id], (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
        
      }
      else {
        for (let i = 0; i < camera_service[0].no_camera; i++) {
          insertWorkingCamera(camera_service, results.rows[0].subcription_id)
        }
        
        
        response.status(200).json({
          message: `Subcription added with ID: ${results.rows[0].subcription_id}`,
          status: `200`})
      } 
    })
  }

const insertWorkingCamera = async (camera_service, subcription_id) => {
  for (const item in camera_service) {
    console.log(`${item}: ${camera_service[item].camera_id}`);

    pool.query("INSERT INTO working_camera (subcription_id, camera_id) VALUES ($1, $2)", [ subcription_id, camera_service[item].camera_id])
  }
}

//Update subcription
const updateSubcription = (request, response) => {
    const { subcription_id, start_date, end_date, price, duration  }= request.body
    pool.query(
      'UPDATE subcription SET start_date = $1, end_date = $2, price = $3, duration = $4 WHERE subcription_id = $5',
      [start_date, end_date, price, duration, subcription_id],
      (error, results) => {
        if (error) {
          response.status(400).json({
            message: "Error, " + error,
            status: `400`}
          )
          
        }
        else {
          response.status(200).json({
            message: `Subcription information updated for ID: ${subcription_id}`,
            status: `200`})
        }
      }
    )
  }

//Delete a subcription (update is_deleted flag to true)
const deleteSubcription = (request, response) => {
    const { subcription_id }= request.body
    pool.query('DELETE FROM subcription WHERE subcription_id = $1', [subcription_id], (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
        
      }
      else {
        response.status(200).json({
          message: `Subcription with ID: ${subcription_id} deleted`,
          status: `200`})
      } 
    })
  }
  const deleteAllSubcriptions = (request, response) => {
    pool.query('DELETE FROM subcription', (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
        
      }
      else {
        response.status(200).json({
          message: `All subcription deleted`,
          status: `200`})
      } 
    })
  }
  const func_GetServiceById = async (service_id) => {
    const res = await pool.query('SELECT * FROM service WHERE service_id = $1', [service_id]);
    if(res.rowCount != 0){
      console.log("in function getServiceByID ", res.rows)
      return res.rows
    }
    else{
      return null
    }
  }

  const func_getCameraServiceByServiceId = async (service_id) => {
    const res = await pool.query('SELECT * FROM service_camera WHERE service_id = $1', [service_id])
    if(res.rowCount != 0){
      console.log("in function func_getCameraServiceByServiceId ", res.rows)
      return res.rows
    }
    else{
      return null
    }
  }  
  const getCamerasBySubcriptionId = async(request, response) =>{
    const { subcription_id }= request.body
    pool.query('SELECT c.camera_id, c.color, c.model_number, c.name, c.brand, c.image FROM subcription as sub INNER JOIN service ON sub.service_id = s.service_id INNER JOIN service_camera as sc ON s.service_id = sc.service_id INNER JOIN camera as c ON sc.camera_id = c.camera_id WHERE sub.subcription_id = $1', 
    [subcription_id],
    (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
        
      }
      else {
        response.status(200).json({
          message: `All subcription deleted`,
          status: `200`})
      } 
    })
  }
  module.exports = {
    getSubcriptions,
    getSubcriptionBySubcriptionId,
    getSubcriptionByAccountId,
    createSubcription,
    updateSubcription,
    deleteSubcription,
    deleteAllSubcriptions,
    getCamerasBySubcriptionId
  }