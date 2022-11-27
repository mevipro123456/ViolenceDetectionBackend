const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'VD',
  password: 'vOphuc20751',
  port: 5432,
})

///List all contracts in table, sort by id
const getContracts = (request, response) => {
    pool.query('SELECT * FROM contract ORDER BY contract_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  ///Add a new contract
  const createContract = (request, response) => {
    const { start_date, end_date, order_service_id, account_id } = request.body
  
    pool.query('INSERT INTO contract (start_date, end_date, order_service_id, account_id) VALUES ($1, $2, $3, $4) RETURNING *', [start_date, end_date, order_service_id, account_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Contract created with ID: ${results.rows[0].contract_id}`)
    })
  }
  
  ///Update contract
  const updateContract = (request, response) => {
    const contract_id = parseInt(request.params.id)
    const { start_date, end_date } = request.body
    pool.query(
      'UPDATE contract SET start_date = $1, end_date = $2 WHERE contract_id = $3',
      [start_date, end_date, contract_id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Contract updated for ID: ${contract_id}`)
      }
    )
  }
  
  ///Delete contract (update is_deleted flag to true)
  const deleteContract = (request, response) => {
    const contract_id = parseInt(request.params.id)
    pool.query('UPDATE contract SET is_deleted = TRUE WHERE contract_id = $1', [contract_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Delete flag updated for ID: ${contract_id}`)
    })
  }

module.exports = {
    getContracts,
    createContract,
    updateContract,
    deleteContract,
}