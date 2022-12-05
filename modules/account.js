const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'VD',
  password: 'vOphuc20751',
  port: 5432,
})

//List all users in table, sort by id
const getUsers = (request, response) => {
    pool.query('SELECT * FROM account ORDER BY account_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//Find a user using id
const getUserById = (request, response) => {
  const id = request.params.id;
    pool.query('SELECT * FROM account WHERE account_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//Find a user using name
const getUserByName = (request, response) => {
  const name = request.params.name;
    pool.query('SELECT * FROM account WHERE name = $1', [name], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//Find a user using email
const getUserByEmail = (request, response) => {
  const email = request.params.email;
    pool.query('SELECT * FROM account WHERE email = $1', [email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//Find a user using phone
const getUserByPhone = (request, response) => {
  const phone = request.params.phone;
    pool.query('SELECT * FROM account WHERE phone = $1', [phone], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//Add a new user
const createUser = (request, response) => {
    const { email, password, role, name, phone, address } = request.body
    pool.query('INSERT INTO account (email, password, role, name, phone, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [email, password, role, name, phone, address], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].account_id}`)
    })
  }

//Update an existing user
const updateUser = (request, response) => {
    const account_id = parseInt(request.params.id)
    const { email, password, role, name, phone, address } = request.body
    pool.query(
      'UPDATE account SET email = $1, password = $2, role = $3, name = $4, phone = $5, address = $6 WHERE account_id = $7',
      [email, password, role, name, phone, address, account_id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${account_id}`)
      }
    )
  }

//Delete a user (update is_deleted flag to true)
const deleteUser = (request, response) => {
    const account_id = parseInt(request.params.id)
    pool.query('UPDATE account SET is_deleted = TRUE WHERE account_id = $1', [account_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Delete flag updated for ID: ${account_id}`)
    })
  }

  module.exports = {
    getUsers,
    getUserById,
    getUserByName,
    getUserByEmail,
    getUserByPhone,
    createUser,
    updateUser,
    deleteUser,
  }
  