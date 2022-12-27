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
  const findContactsByConnectionString = (request, response) => {
    const { connection_string }= request.body
    const result = pool.query('SELECT acc.phone, acc.email, acc.name, acc.address FROM working_camera as wc INNER JOIN subcription as sub ON wc.subcription_id = sub.subcription_id INNER JOIN account as acc ON sub.account_id = acc.account_id INNER JOIN contact as c ON c.account_id = acc.account_id WHERE wc.connection_string = $1',
        [connection_string],
        async (error, results) => {
          if (error) {
            response.status(400).json({
              message: "Error, " + error,
              status: `400`}
            )
          }
          else {
            
            var name = await selectFrom('acc.name', 'account as acc', 'WHERE acc.account_id = ' + connection_string)
            var score = await selectFrom('evn.rate','camera_event as evn INNER JOIN working_camera as wc ON evn.working_camera_id = wc.working_camera_id INNER JOIN subcription as sub ON wc.subcription_id = sub.subcription_id INNER JOIN account as acc ON sub.account_id = acc.account_id ', 'WHERE acc.account_id = ' + connection_string)
            let time = new Date().toLocaleString()
            const nodemailer = require("nodemailer")
            for (const item in results.rows) {
              console.log(`${item}: ${results.rows[item].email}`);
            }
            let transporter = nodemailer.createTransport({
              service: "yahoo",
              auth: {
                user: "tantythienbinh@yahoo.com",
                pass: "nhskrxpwjqeovmwi"
              },
              tls: {
                rejectUnauthorized: false,
              }
            })
            
            let mailOption = {
              from: "tantythienbinh@yahoo.com",
              to: 'nhanbuiduc.work@gmail.com',
              subject: "Anomoly Event Detected",
              html: `<!DOCTYPE html>
              <html>
                <body>
                  <p>Hello  + name +  </p>
                  <p style="color:red; font-size:50px"><b>Warining!!!</b></p>
                  <p>Violence Detected at: <b>` + time + `</b></p>
                  <p>Violence score:  + score +  </p> 
                </body>
              </html>`
            }
            
            transporter.sendMail(mailOption, function(err, success) {
              if (err) {
                console.log(err)
              } else {
                console.log("Email sent successfully!")
              }
            });
            response.status(200).json({
              message: `Contact found with ID: ${connection_string}`, 
              status: 200, 
              body: results.rows})
          }
        });
  }

  const findContactsByWorkingCameraId = async (working_camera_id) => {
    const result = pool.query('SELECT acc.phone, acc.email, acc.name, acc.address FROM working_camera as wc INNER JOIN subcription as sub ON wc.subcription_id = sub.subcription_id INNER JOIN account as acc ON sub.account_id = acc.account_id INNER JOIN contact as c ON c.account_id = acc.account_id WHERE wc.working_camera_id = $1',
    [working_camera_id])
    return ( await res).row
  }
  const sendEmail = async (working_camera, start, score) => {
    const contacts = await findContactsByWorkingCameraId(working_camera.working_camera_id)
    const nodemailer = require("nodemailer")
    for (const contact of contacts) {
      let time = new Date().toLocaleString()
            
            for (const item in results.rows) {
              console.log(`${item}: ${results.rows[item].email}`);
            }
            let transporter = nodemailer.createTransport({
              service: "yahoo",
              auth: {
                user: "tantythienbinh@yahoo.com",
                pass: "nhskrxpwjqeovmwi"
              },
              tls: {
                rejectUnauthorized: false,
              }
            })
            
            let mailOption = {
              from: "tantythienbinh@yahoo.com",
              to: contact.email,
              subject: "Anomoly Event Detected",
              html: `<!DOCTYPE html>
              <html>
                <body>
                  <p>Hello  + ${contact.name} +  </p>
                  <p style="color:red; font-size:50px"><b>Warining!!!</b></p>
                  <p>Violence Detected at: <b>` + start + `</b></p>
                  <p>Violence score:  + ${score} +  </p> 
                </body>
              </html>`
            }
            
            transporter.sendMail(mailOption, function(err, success) {
              if (err) {
                console.log(err)
              } else {
                console.log("Email sent successfully!")
              }
            });
    }
  }
  const updateLastNotification = async (working_camera, dateTime) => {
      if(dateTime != null || dateTime != undefined){
        const result = pool.query(
          "UPDATE working_camera SET last_notification = $1 WHERE working_camera_id = $2", [dateTime, working_camera[0].working_camera_id])
      }
  }
  // Neu nhu thoi gian hien tai lon hon thoi gian trong db tra ve true, ko tra ve false
  const checkLastNotification = async (working_camera) => {

    const currentTime = new Date().toISOString();

    if(currentTime > working_camera.last_notification ){
      return true
    }
    return false
  }
  const notify = async (working_camera, start, score) => {
    const currentTime = new Date().toISOString();

    if(working_camera.last_notification != null || working_camera.last_notification != undefined){
      
      updateLastNotification(working_camera, currentTime)
      sendEmail(working_camera, start, score)
    }
    else{
      if(checkLastNotification(working_camera) != true){
        updateLastNotification(working_camera, currentTime)
        sendEmail(working_camera, start, score)
      }
      
    }

  }


//Find working camera using id
const getWorkingCameraById = async (working_camera_id) => {

    const result = await pool.query('SELECT * FROM working_camera WHERE working_camera_id = $1', [working_camera_id])
    return (await result).rows
  }
//Find event using working_camera_id
const insertEventWithConnectionString = async (request, response) => {
  const { start, end, score, prediction, connection_string } = request.body
  let working_camera = await getWorkingCameraByConnectionString(connection_string)

  console.log("working camera", working_camera[0].working_camera_id)
  notify(working_camera, start, score)
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