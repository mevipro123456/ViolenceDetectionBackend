require('dotenv').config()

const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://vercel:nVAWg9huYg3I-2N5TNNlXQ@irate-colt-7175.7tt.cockroachlabs.cloud:26257/VD?sslmode=verify-full`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
})

module.exports =  pool;