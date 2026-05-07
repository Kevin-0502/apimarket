import { pool } from './db.js'

export const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      correo VARCHAR(100) NOT NULL UNIQUE,
      clave VARCHAR(255) NOT NULL,
      fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS productos (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      descripcion TEXT,
      precio_costo DECIMAL(10, 2) NOT NULL,
      precio_venta DECIMAL(10, 2) NOT NULL,
      cantidad INT NOT NULL,
      fotografia VARCHAR(255),
      fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

  console.log('Tablas listas')
}
