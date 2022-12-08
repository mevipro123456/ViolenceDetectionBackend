const pool =  require('../config')

//List all events in table, sort by id
const getEvents = (request, response) => {
    pool.query('SELECT * FROM camera_event ORDER BY event_id ASC', (error, results) => {
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

//Find event using working_camera_id
const getEventByWorkingCameraId = (request, response) => {
    const { working_camera_id }= request.body
      pool.query('SELECT * FROM camera_event WHERE working_camera_id = $1', [working_camera_id], (error, results) => {
        if (error) {
          throw error
        }
        else if (results.rowCount == 0) {
          response.status(400).json({
            message: `Can't find event with camera ID: ${working_camera_id}`,
            status: `400`,
          })
        }
        else {
          response.status(200).json({
            message: `Event found with ID: ${working_camera_id}`, 
            status: `200`, 
            body: results.rows})
        }
      })
    }

//Add new event
const createEvent = (request, response) => {
    const { name, rate, start, location, working_camera_id } = request.body
    pool.query('INSERT INTO camera_event (name, rate, start, location, working_camera_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, rate, start, location, working_camera_id], (error, results) => {
      if (error) {
        throw error
      }
      else {
        response.status(200).json({
          message: `Event added with ID: ${event_id}`,
          status: `200`})
      } 
    })
  }

//Delete event (update is_deleted flag to true)
const deleteEvent = (request, response) => {
    const { event_id }= request.body
    pool.query('UPDATE camera_event SET is_deleted = TRUE WHERE event_id = $1', [event_id], (error, results) => {
      if (error) {
        throw error
      }
      else {
        response.status(200).json({
          message: `Event ID: ${event_id} removed`,
          status: `200`})
      } 
    })
  }

module.exports = {
    getEvents,
    getEventByWorkingCameraId,
    createEvent,
    deleteEvent
}