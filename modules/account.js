const pool =  require('../config')

//Login user
const loginUser = (request, response) => {
  const { email, password } = request.body
  pool.query('SELECT * FROM account WHERE email = $1 AND password = $2', [email, password], (error, results) => {
    if (error) {
      throw error
    }
    else if (results.rowCount == 0) {
      response.status(400).json({
        message: `Incorrect email or password! `,
        status: `400`,
        email: email,
        password: password
      })
    }
    else {
      response.status(200).json({
        message: `OK`, 
        status: `200`, 
        body: results.rows})
    }
  })
}

//List all users in table, sort by id
const getUsers = (request, response) => {
    pool.query('SELECT * FROM account ORDER BY account_id ASC', (error, results) => {
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

//Find a user using id
const getUserById = (request, response) => {
  const { account_id }= request.body
    pool.query('SELECT * FROM account WHERE account_id = $1', [account_id], (error, results) => {
      if (error) {
        throw error
      }
      else if (results.rowCount == 0) {
        response.status(400).json({
          message: `Can't find account ID: ${account_id}`,
          status: `400`,
        })
      }
      else {
        response.status(200).json({
          message: `Account found with ID: ${account_id}`, 
          status: `200`, 
          body: results.rows})
      }
    })
  }

//Find a user using name
const getUserByName = (request, response) => {
  const { name }= request.body
    pool.query('SELECT * FROM account WHERE name = $1', [name], (error, results) => {
      if (error) {
        throw error
      }
      else if (results.rowCount == 0) {
        response.status(400).json({
          message: `Can't find account with name: ${name}`,
          status: `400`,
        })
      }
      else {
        response.status(200).json({
          message: `Account found with name: ${name}`, 
          status: `200`, 
          body: results.rows})
      }
    })
  }

//Find a user using email
const getUserByEmail = (request, response) => {
  const { email }= request.body
    pool.query('SELECT * FROM account WHERE email = $1', [email], (error, results) => {
      if (error) {
        throw error
      }
      else if (results.rowCount == 0) {
        response.status(400).json({
          message: `Can't find account with email: ${email}`,
          status: `400`,
        })
      }
      else{
        response.status(200).json({
          message: `Account found with email: ${email}`, 
          status: `200`, 
          body: results.rows})
      } 
    })
  }

//Find a user using phone
const getUserByPhone = (request, response) => {
  const { phone }= request.body
  pool.query('SELECT * FROM account WHERE phone = $1', [phone], (error, results) => {
      if (error) {
        throw error
      }
      else if (results.rowCount == 0) {
        response.status(400).json({
          message: `Can't find account with phone: ${phone}`,
          status: `400`,
        })
      }
      else {
        response.status(200).json({
          message: `Account found with phone: ${phone}`, 
          status: `200`, 
          body: results.rows})
      }
    })
  }
//Find a user using email
async function isEmailExists(email) {
  try{
    const res = await pool.query('SELECT * FROM account WHERE email = $1', [email]);
    console.log("res ", res.rowCount)
    if(res.rowCount == 0){
      return false
    }
    else {
      return true
    }
  }
  catch(err){
    return err.stack;
  }
}
async function selectFrom(data, table, condition) {
  try {
    const res = await pool.query(
      `SELECT ${data} FROM ${table} ${condition}`
    );
    return res.rows[0][data];
  } catch (err) {
    return err.stack;
  }
}
async function whateverFuncName () {
  var result = await selectFrom('amount','total_nonfarm_monthly_sa', `WHERE month='2019-08-31'`);
  console.log(result);
}
//Add a new user
const createUser = async (request, response) => {
    const { email, password, role, name, phone, address } = request.body
    console.log(email)
    if (email == "" || password == "" || name == "" || phone == "" || address == ""
      || email == undefined || password == undefined || name == undefined || phone == undefined || address == undefined){
      response.status(400).json({
        message: `Fields are empty `,
        status: `400`,
      })
    }
    else if ( await isEmailExists(email)) {
      response.status(200).json({
        message: `Email: ${email} already in use `,
        status: `400`,
      })
    }
    else{
      pool.query('INSERT INTO account (email, password, role, name, phone, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [email, password, 'user', name, phone, address], (error, results) => {
        if (error) {
          throw error
        }
        else if(email == "" || password == "" || name == "" || phone == "" || address == ""){
          response.status(400).json({
            message: `Fields are empty ` + err,
            status: `400`,
          })
        }
        else {
          response.status(200).json({
            message: `Account created with ID: ${results.rows[0].account_id}`,
            status: `200`})
        } 
      })
    }
    
  }

//Update an existing user
const updateUser = (request, response) => {
    const { account_id, email, password, role, name, phone, address }= request.body
    pool.query(
      'UPDATE account SET email = $1, password = $2, role = $3, name = $4, phone = $5, address = $6 WHERE account_id = $7',
      [email, password, 'user', name, phone, address, account_id],
      (error, results) => {
        if (error) {
          throw error
        }
        else {
          response.status(200).json({
            message: `Account information updated for ID: ${account_id}`,
            status: `200`})
        }
      }
    )
  }

//Delete a user (update is_deleted flag to true)
const deleteUser = (request, response) => {
    const { account_id } = request.body
    pool.query('DELETE FROM account WHERE account_id = $1', [account_id], (error, results) => {
      if (error) {
        response.status(400).json({
          message: "Error, " + error,
          status: `400`}
        )
        throw error
      }
      else {
        response.status(200).json({
          message: `Account with ID: ${account_id} deleted`,
          status: `200`})
      } 
    })
  }
//Delete a user (update is_deleted flag to true)
const deleteAllUsers= (request, response) => {
  pool.query('DELETE FROM account', (error, results) => {
    if (error) {
      response.status(400).json({
        message: "Error, " + error,
        status: `400`}
      )
    }
    else {
      response.status(200).json({
        message: `All Account deleted`,
        status: `200`})
    } 
  })
}
  module.exports = {
    loginUser,
    getUsers,
    getUserById,
    getUserByName,
    getUserByEmail,
    getUserByPhone,
    createUser,
    updateUser,
    deleteUser,
    deleteAllUsers
  }
  