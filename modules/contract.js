const pool =  require('../config')

//List all contracts in table, sort by id
const getContracts = (request, response) => {
    pool.query('SELECT * FROM contract ORDER BY contract_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({
        message: `OK`, 
        status: `200`, 
        body: results.rows})
    })
  }
  
  //Add a new contract
  const createContract = (request, response) => {
    const { start_date, end_date, order_service_id, account_id } = request.body
  
    pool.query('INSERT INTO contract (start_date, end_date, order_service_id, account_id) VALUES ($1, $2, $3, $4) RETURNING *', [start_date, end_date, order_service_id, account_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).json({
        message: `Contract created with ID: ${contract_id}`,
        status: `201`})
    })
  }
  
  //Update contract
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
        response.status(200).json({
          message: `Contract details updated for ID: ${contract_id}`,
          status: `200`})
      }
    )
  }
  
  //Delete contract (update is_deleted flag to true)
  const deleteContract = (request, response) => {
    const contract_id = parseInt(request.params.id)
    pool.query('UPDATE contract SET is_deleted = TRUE WHERE contract_id = $1', [contract_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({
        message: `Contract ID: ${contract_id} removed`,
        status: `200`})
    })
  }

module.exports = {
    getContracts,
    createContract,
    updateContract,
    deleteContract,
}