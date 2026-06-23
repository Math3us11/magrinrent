import mysql, { type Pool } from 'mysql2/promise'

let pool: Pool | null = null

export function getPool() {
    const config = useRuntimeConfig()

    if (!pool) {
        pool = mysql.createPool({
            host: config.dbHost,
            port: Number(config.dbPort),
            user: config.dbUser,
            password: config.dbPassword,
            database: config.dbName,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            decimalNumbers: true
        })
    }

    return pool
}