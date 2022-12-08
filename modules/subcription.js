const pool =  require('../config')

//List all subcriptions in table, sort by id
const getSubcriptions = (request, response) => {
    pool.query('SELECT * FROM subcription ORDER BY subcription_id ASC', (error, results) => {
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

//Create new subcription
const createSubcription = (request, response) => {
    const { start_date, end_date, prize, duration, account_id, service_id } = request.body
    pool.query('INSERT INTO subcription (start_date, end_date, prize, duration, account_id, service_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [start_date, end_date, prize, duration, account_id, service_id], (error, results) => {
      if (error) {
        throw error
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
    const { subcription_id, start_date, end_date, prize, duration  }= request.body
    pool.query(
      'UPDATE subcription SET start_date = $1, end_date = $2, prize = $3, duration = $4 WHERE subcription_id = $5',
      [start_date, end_date, prize, duration, subcription_id],
      (error, results) => {
        if (error) {
          throw error
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
    pool.query('UPDATE subcription SET is_deleted = TRUE WHERE subcription_id = $1', [subcription_id], (error, results) => {
      if (error) {
        throw error
      }
      else {
        response.status(200).json({
          message: `Subcription with ID: ${subcription_id} deleted`,
          status: `200`})
      } 
    })
  }

  module.exports = {
    getSubcriptions,
    createSubcription,
    updateSubcription,
    deleteSubcription
  }