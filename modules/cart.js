const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'VD',
  password: 'vOphuc20751',
  port: 5432,
})

//List all carts in table, sort by id
const getCarts = (request, response) => {
    pool.query('SELECT * FROM cart ORDER BY order_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  //Add a new cart
  const createCart = (request, response) => {
    const { account_id, total_price } = request.body
  
    pool.query('INSERT INTO cart (account_id, total_price) VALUES ($1, $2) RETURNING *', [account_id, total_price], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Cart added with ID: ${results.rows[0].order_id}`)
    })
  }
  
  //Update cart price
  const updateCart = (request, response) => {
    const order_id = parseInt(request.params.id)
    const { total_price } = request.body
    pool.query(
      'UPDATE cart SET total_price = $1 WHERE order_id = $2',
      [total_price, order_id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Prize updated for ID: ${order_id}`)
      }
    )
  }
  
  //Delete cart (update is_deleted flag to true)
  const deleteCart = (request, response) => {
    const order_id = parseInt(request.params.id)
    pool.query('UPDATE cart SET is_deleted = TRUE WHERE order_id = $1', [order_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Delete flag updated for ID: ${order_id}`)
    })
  }

module.exports = {
    getCarts,
    createCart,
    updateCart,
    deleteCart,
}