const pool =  require('../config')

//List all contact in table, sort by id
const getContacts = (request, response) => {
    pool.query('SELECT * FROM contact ORDER BY contact_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({
        message: "OK", 
        status: "200", 
        body: results.rows})
    })
  }
  
  //Find contact by email
  const getContactByEmail = (request, response) => {
    const email = request.params.email
    pool.query('SELECT * FROM contact WHERE email = $1', [email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({
        message: "OK", 
        status: "200", 
        body: results.rows})
    })
  }
  
  //Find contact by phone
  const getContactByPhone = (request, response) => {
    const phone = request.params.phone
    pool.query('SELECT * FROM contact WHERE phone = $1', [phone], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({
        message: "OK", 
        status: "200", 
        body: results.rows})
    })
  }
  
  //Add a new contact (has to have data in account table before adding)
  const createContact = (request, response) => {
    const { account_id, email, phone, address } = request.body
    pool.query('INSERT INTO contact (account_id, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *', [account_id, email, phone, address], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Contact added with ID: ${results.rows[0].contact_id}`)
    })
  }
  
  //Update an existing contact
  const updateContact = (request, response) => {
    const contact_id = parseInt(request.params.id)
    const { email, phone, address } = request.body
    pool.query(
      'UPDATE contact SET email = $1, phone = $2, address = $3 WHERE contact_id = $4',
      [email, phone, address, contact_id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Contact modified with ID: ${contact_id}`)
      }
    )
  }
  
  //Delete a contact (update is_deleted flag to true)
  const deleteContact = (request, response) => {
    const contact_id = parseInt(request.params.id)
    pool.query('UPDATE contact SET is_deleted = TRUE WHERE contact_id = $1', [contact_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Delete flag updated for ID: ${contact_id}`)
    })
  }

module.exports = {
    getContacts,
    getContactByEmail,
    getContactByPhone,
    createContact,
    updateContact,
    deleteContact
}