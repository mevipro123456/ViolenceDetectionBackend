require('dotenv').config()

const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

//const connectionString = `postgresql://vercel:nVAWg9huYg3I-2N5TNNlXQ@irate-colt-7175.7tt.cockroachlabs.cloud:26257/VD?sslmode=verify-full`
//const connectionString = `postgresql://BlrKGjdSgtCRozwtxPQBskCjllMARzYg:vbfxgolhcINJUhWniRXfUQBpfVswgETO@db.thin.dev/5cb4f819-a92b-4559-83c5-29f93009a0a3`
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?sslmode=verify-full`
const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
})

module.exports =  pool;