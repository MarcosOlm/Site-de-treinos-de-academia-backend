const port = 8080
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const bd = require('./bd.js')

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.get('/treinos', (req, res) => {
    res.send(bd.getTreinos())
})

app.get('/treinos/:id', (req, res) => {
    const id = req.params.id
    const treino = bd.getTreinoById(id)
    if(!treino) {
        return res.send({erro: 'treino não encontrado!'})
    }

    res.send(treino)
})

app.post('/treinos', (req, res) => {
    const newTreino = {
        id: req.body.id,
        titulo: req.body.titulo,
        tipoTreino: req.body.tipoTreino,
        treinos: req.body.treinos
    }
    const createTreino = bd.createTreino(newTreino)
    if (!createTreino) {
        return res.send({erro: 'não foi possível criar o treino.'})
    }
    res.send(createTreino)
})

app.put('/treinos/:id', (req, res) => {
    const updateTreino = bd.updateTreino(req.params.id, req.body)
    if (!updateTreino) {
        return res.send({erro: 'não foi possível alterar o treino'})
    }
    res.send(updateTreino)
})

app.delete('/treinos/:id', (req, res) => {
    const id = req.params.id
    const deleteTreino = bd.deleteTreino(id)
    if (!deleteTreino) {
        return res.send({erro: 'não foi possível deletar o treino'})
    }
    res.send(deleteTreino)
})

app.listen(port, () => {
    console.log(`executando na porta: ${port}`)
})
