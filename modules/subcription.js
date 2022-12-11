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
  const { subcription_id }= request.body
    pool.query('SELECT * FROM subcription WHERE subcription_id = $1', [subcription_id], (error, results) => {
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
const createSubcription = (request, response) => {
    const { start_date, end_date, price, duration, account_id, service_id } = request.body
    pool.query('INSERT INTO subcription (start_date, end_date, price, duration, account_id, service_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [start_date, end_date, price, duration, account_id, service_id], (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
        
      }
      else {
        response.status(200).json({
          message: `Subcription added with ID: ${results.rows[0].subcription_id}`,
          status: `200`})
      } 
    })
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

  module.exports = {
    getSubcriptions,
    getSubcriptionBySubcriptionId,
    getSubcriptionByAccountId,
    createSubcription,
    updateSubcription,
    deleteSubcription,
    deleteAllSubcriptions
  }