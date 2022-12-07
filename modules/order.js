const pool =  require('../config')

///List all orders in table, sort by id
const getOrders = (request, response) => {
    pool.query('SELECT * FROM "order" ORDER BY order_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({
        message: `OK`, 
        status: `200`, 
        body: results.rows})
    })
  }

///Find order by account id
const getOrderByAccount = (request, response) => {
  const id = request.params.id;
  pool.query('SELECT * FROM "order" WHERE account_id = $1',[id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json({
      message: `OK`, 
      status: `200`, 
      body: results.rows})
  })
}  
  
  ///Add a new order
  const createOrder = (request, response) => {
    const { order_service_id, account_id, order_date, total_price } = request.body
  
    pool.query('INSERT INTO "order" (order_service_id, account_id, order_date, total_price) VALUES ($1, $2, $3, $4) RETURNING *', [order_service_id, account_id, order_date, total_price], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).json({
        message: `Order created with ID: ${order_id}`,
        status: `201`})
    })
  }
  
  ///Update order
  const updateOrder = (request, response) => {
    const order_id = parseInt(request.params.id)
    const { order_date, total_price } = request.body
    pool.query(
      'UPDATE "order" SET order_date = $1, total_price = $2 WHERE order_id = $3',
      [order_date, total_price, order_id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json({
          message: `Order prize updated for ID: ${order_id}`,
          status: `200`})
      }
    )
  }
  
  ///Delete order (update is_deleted flag to true)
  const deleteOrder = (request, response) => {
    const order_id = parseInt(request.params.id)
    pool.query('UPDATE "order" SET is_deleted = TRUE WHERE order_id = $1', [order_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({
        message: `Order ID: ${order_id} removed`,
        status: `200`})
    })
  }

module.exports = {
    getOrders,
    getOrderByAccount,
    createOrder,
    updateOrder,
    deleteOrder,
}