const pool =  require('../config')

const getContactsByAccountId = (request, response) => {
  const { account_id }= request.body
  pool.query('SELECT * FROM contact WHERE account_id = $1', [account_id], (error, results) => {
    if (error) {
      response.status(400).json({
        message: "Error, " + error,
        status: `400`}
      )
    }
    else {
      response.status(200).json({
        message: `account_id = ` + account_id, 
        status: `200`, 
        body: results.rows})
    }
  })
}


//List all contact in table, sort by id
const getContacts = (request, response) => {
    pool.query('SELECT * FROM contact ORDER BY contact_id ASC', (error, results) => {
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
  
  //Find contact by email
  const getContactByEmail = (request, response) => {
    const { email }= request.body
    pool.query('SELECT * FROM contact WHERE email = $1', [email], (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
      }
      else if (results.rowCount == 0) {
        response.status(400).json({
          message: `Can't find contact with email: ${email}`,
          status: `400`,
        })
      }
      else {
        response.status(200).json({
          message: `Contact found with email: ${email}`, 
          status: `200`, 
          body: results.rows})
      }
    })
  }
  
  //Find contact by phone
  const getContactByPhone = (request, response) => {
    const { phone } = request.body
    pool.query('SELECT * FROM contact WHERE phone = $1', [phone], (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
      }
      else if (results.rowCount == 0) {
        response.status(400).json({
          message: `Can't find contact with phone: ${phone}`,
          status: `400`,
        })
      }
      else {
        response.status(200).json({
          message: `Contact found with phone: ${phone}`, 
          status: `200`, 
          body: results.rows})
      } 
    })
  }
  
  //Add a new contact
  const createContact = (request, response) => {
    const { account_id, email, phone, address } = request.body
    pool.query('INSERT INTO contact (account_id, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *', [account_id, email, phone, address], (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
      }
      else {
        response.status(200).json({
          message: `Contact added with ID: ${results.rows[0].contact_id}`,
          status: `200`})
      }
    })
  }
  
  //Update an existing contact
  const updateContact = (request, response) => {
    const { contact_id, email, phone, address } = request.body
    pool.query(
      'UPDATE contact SET email = $1, phone = $2, address = $3 WHERE contact_id = $4',
      [email, phone, address, contact_id],
      (error, results) => {
          response.status(200).json({
            message: `Contact information updated for ID: ${contact_id}`,
            status: `200`})
      }
    )
  }
  
  //Delete a contact (update is_deleted flag to true)
  const deleteContactByAccountID = (request, response) => {
    const { account_id }= request.body
    pool.query('DELETE FROM contact WHERE account_id = $1', [account_id], (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
        
      }
      else {
        response.status(200).json({
          message: `Contact ID: ${contact_id} removed`,
          status: `200`})
      }
    })
  }
  //Delete a contact (update is_deleted flag to true)
  const deleteContactByContactID = (request, response) => {
    const { contact_id }= request.body
    pool.query('DELETE FROM contact WHERE contact_id = $1', [contact_id], (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
        
      }
      else {
        response.status(200).json({
          message: `Contact ID: ${contact_id} removed`,
          status: `200`})
      }
    })
  }
  //Delete a contact (update is_deleted flag to true)
  const deleteAllContacts = (request, response) => {
    const { contact_id }= request.body
    pool.query('DELETE FROM contact', (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
        
      }
      else {
        response.status(200).json({
          message: `Contact table deleted`,
          status: `200`})
      }
    })
  }
  const findContactsByConnectionString = (request, response) => {
    const { connection_string }= request.body
        pool.query('SELECT acc.phone, acc.mail, acc.name, acc.address FROM working_camera as wc INNER JOIN subcription as sub ON wc.subcription_id = sub.subcription_id INNER JOIN account as acc ON sub.account_id = acc.account_id INNER JOIN contact as c ON c.account_id = acc.account_id WHERE wc.connection_string = $1',
        [connection_string],
        (error, results) => {
          if (error) {
            response.status(400).json({
              message: "Error, " + error,
              status: `400`}
            )
          }
          else {
            for (const item in results.rows) {
              console.log(`${item}: ${camera_service[item].camera_id}`);
            }
            let transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "nhanbuiduc.work@gmail.com",
                pass: "TtTb2392001"
              },
              tls: {
                rejectUnauthorized: false,
              }
            })
            
            let mailOption = {
              from: "nhanbuiduc.work@gmail.com",
              to: 'tantythienbinh@gmail.com',
              subject: "Anomoly Event Detected",
              text: "Hello 1 2 3"
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
              status: `200`, 
              body: results.rows})
          }
        });
  }
module.exports = {
    getContactsByAccountId,
    getContacts,
    getContactByEmail,
    getContactByPhone,
    createContact,
    updateContact,
    deleteContactByAccountID,
    deleteContactByContactID,
    deleteAllContacts,
    findContactsByConnectionString
}