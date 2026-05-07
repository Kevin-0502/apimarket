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

  await pool.query(`
    INSERT INTO usuarios (nombre, correo, clave) VALUES
    ('Ricardo', 'ricardo.andrade@example.com', '123456'),
    ('Juan', 'juan.perez@example.com', '654321')
    ON CONFLICT (correo) DO NOTHING
  `)

  await pool.query(`
    INSERT INTO productos (nombre, descripcion, precio_costo, precio_venta, cantidad, fotografia) VALUES
    ('manzana verde', 'manzana de china', 10.50, 15.00, 100,
    'https://static.vecteezy.com/system/resources/thumbnails/012/086/172/small/green-apple-with-green-leaf-isolated-on-white-background-vector.jpg')
    ON CONFLICT DO NOTHING
  `)

  console.log('Tablas listas')
}
