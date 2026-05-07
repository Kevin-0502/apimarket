import { pool } from '../db.js'

export const getUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios')
    res.json(result.rows)
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal" })
  }
}

export const getUsuario = async (req, res) => {
  try {
    const { username, password } = req.body
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE nombre = $1 AND clave = $2",
      [username, password]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no Encontrado" })
    }
    res.json({ message: "Encontrado" })
  } catch (error) {
    return res.status(500).json({ message: 'Algo salio mal' })
  }
}

export const getProductos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM productos")
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No hay productos registrados" })
    }
    res.json({ productos: result.rows })
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal" })
  }
}

export const getProductosId = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query("SELECT * FROM productos WHERE id = $1", [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No hay productos registrados" })
    }
    res.json({ productos: result.rows })
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal" })
  }
}

export const postProductos = async (req, res) => {
  try {
    const { name, description, price_cost, price_sale, quantity, image } = req.body
    const result = await pool.query(
      "INSERT INTO productos (nombre, descripcion, precio_costo, precio_venta, cantidad, fotografia) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      [name, description, price_cost, price_sale, quantity, image]
    )
    res.json({ message: "Producto Agregado", id: result.rows[0].id })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Algo salió mal' })
  }
}

export const putProductos = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, price_cost, price_sale, quantity, image } = req.body
    const result = await pool.query(
      "UPDATE productos SET nombre = $1, descripcion = $2, precio_costo = $3, precio_venta = $4, cantidad = $5, fotografia = $6 WHERE id = $7",
      [name, description, price_cost, price_sale, quantity, image, id]
    )
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Producto no encontrado" })
    }
    res.json({ message: "Producto actualizado" })
  } catch (error) {
    return res.status(500).json({ message: 'Algo salió mal' })
  }
}

export const deleteProductos = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query("DELETE FROM productos WHERE id = $1", [id])
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Producto no encontrado" })
    }
    res.json({ message: "Producto eliminado" })
  } catch (error) {
    return res.status(500).json({ message: 'Algo salió mal' })
  }
}
