const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'VD',
  password: 'vOphuc20751',
  port: 5432,
})

///List all orders in table, sort by id
const getOrders = (request, response) => {
    pool.query('SELECT * FROM "order" ORDER BY order_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  ///Add a new order
  const createOrder = (request, response) => {
    const { order_service_id, account_id, order_date, total_price } = request.body
  
    pool.query('INSERT INTO "order" (order_service_id, account_id, order_date, total_price) VALUES ($1, $2, $3, $4) RETURNING *', [order_service_id, account_id, order_date, total_price], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Order created with ID: ${results.rows[0].order_id}`)
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
        response.status(200).send(`Order prize updated for ID: ${order_id}`)
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
      response.status(200).send(`Delete flag updated for ID: ${order_id}`)
    })
  }

module.exports = {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
}