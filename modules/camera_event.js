const pool =  require('../config')

//List all events in table, sort by id
const getEvents = (request, response) => {
    pool.query('SELECT * FROM camera_event ORDER BY event_id ASC', (error, results) => {
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

//Find event using working_camera_id
const getEventByWorkingCameraId = (request, response) => {
    const { working_camera_id }= request.body
      pool.query('SELECT * FROM camera_event WHERE working_camera_id = $1', [working_camera_id], (error, results) => {
        if (error) {
          response.status(400).json({
            message: "Error, " + error,
            status: `400`}
          )
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
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
      }
      else {
        response.status(200).json({
          message: `Event added with ID: ${results.rows[0].event_id}`,
          status: `200`})
      } 
    })
  }

//Delete event (update is_deleted flag to true)
const deleteEvent = (request, response) => {
    const { event_id }= request.body
    pool.query('DELETE FROM camera_event WHERE event_id = $1', [event_id], (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
      }
      else {
        response.status(200).json({
          message: `Event ID: ${event_id} removed`,
          status: `200`})
      } 
    })
  }
  const deleteAllEvents = (request, response) => {
    pool.query('DELETE FROM camera_event', (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
      }
      else {
        response.status(200).json({
          message: `All event removed`,
          status: `200`})
      } 
    })
  }

  async function getWorkingCameraByConnectionString(connection_string) {
    const res = pool.query('SELECT * FROM working_camera WHERE connection_string = $1', [connection_string]);
    return (await res).rows;
  }

//Find event using working_camera_id
const insertEventWithConnectionString = async (request, response) => {
  const { start, end, score, prediction, connection_string } = request.body
  let working_camera = await getWorkingCameraByConnectionString(connection_string)

  console.log("working camera", working_camera[0].working_camera_id)
  pool.query('INSERT INTO camera_event (name, rate, start, location, working_camera_id) VALUES ($1, $2, $3, $4, $5)', 
    ["Anomaly Action", score, start, "VietNam", working_camera[0].working_camera_id], 
    (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
      }
      else if (results.rowCount == 0) {
        response.status(400).json({
          message: `Event cannot found with connection string: ${connection_string}`,
          status: `400`,
        })
      }
      else {
        response.status(200).json({
          message: `Event found with connection string: ${connection_string}`, 
          status: `200`})
      }
    })
  }
module.exports = {
    getEvents,
    getEventByWorkingCameraId,
    createEvent,
    deleteEvent,
    deleteAllEvents,
    insertEventWithConnectionString
}