import app from './app.js'
import { initDb } from './initDb.js'

const PORT = process.env.PORT || 3000

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
  })
})