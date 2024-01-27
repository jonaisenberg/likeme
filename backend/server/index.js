const express = require('express')
const cors = require('cors')
const { getPost, obtenerPost } = require('../utils/archivopg.js')

const app = express()

app.use(express.json())
app.use(cors())

app.get("/posts", async (_, res) => {
    const posteos = await obtenerPost()
    res.json(posteos)
})

app.post("/posts", async (req, res) => {
    const { id, titulo, url, descripcion } = req.body
    try {
        await getPost(id, titulo, url, descripcion)
        res.status(201).json({ mensaje: "Publicación agregada con éxito" })
    } catch (error) {
        console.error('Error al agregar la publicación:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

app.listen(3000, console.log("¡Servidor encendido!"))
