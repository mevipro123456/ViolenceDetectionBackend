const pool =  require('../config')

//List all order services in table, sort by id
const getOrderServices = (request, response) => {
    pool.query('SELECT * FROM order_service ORDER BY order_service_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({
        message: `OK`, 
        status: `200`, 
        body: results.rows})
    })
  }
  
//Add a new order_service
const createOrderService = (request, response) => {
  const { confirmation_date, order_id, service_id, contract_id } = request.body
    pool.query('INSERT INTO order_service (confirmation_date, order_id, service_id, contract_id) VALUES ($1, $2, $3, $4) RETURNING *', [confirmation_date, order_id, service_id, contract_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).json({
        message: `Service for order created with ID: ${order_service_id}`,
        status: `201`})
    })
  }
  
//Update service order
const updateOrderService = (request, response) => {
  const order_service_id = parseInt(request.params.id)
    const { confirmation_date } = request.body
    pool.query(
      'UPDATE order_service SET confirmation_date = $1 WHERE order_service_id = $2',
      [confirmation_date, order_service_id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json({
          message: `Service prize updated for ID: ${order_service_id}`,
          status: `200`})
      }
    )
  }
  
//Delete service order (update is_deleted flag to true)
  const deleteOrderService = (request, response) => {
    const order_service_id = parseInt(request.params.id)
    pool.query('UPDATE order_service SET is_deleted = TRUE WHERE order_service_id = $1', [order_service_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({
        message: `Service for order ID: ${order_service_id} removed`,
        status: `200`})
    })
  }

module.exports = {
    getOrderServices,
    createOrderService,
    updateOrderService,
    deleteOrderService,
}