const fs = require('fs')
const path = require('path')
const pathFile = path.join(__dirname, 'bd.json')

function readFile() {
    if (!fs.readFileSync(pathFile)){
        fs.writeFileSync(pathFile, '[]')
    }
    const data = fs.readFileSync(pathFile)
    return JSON.parse(data)
}

function saveFile(data) {
    fs.writeFileSync(pathFile, JSON.stringify(data, null, 2))
}

function getTreinos() {
    return readFile()
}

function getTreinoById(id) {
    const listTreino = readFile()
    const index = listTreino.findIndex(t => t.id == id)

    if (index == -1) {
        return null
    }

    return listTreino[index]
}

function createTreino(newTreino) {
    const listTreino = readFile()
    if (newTreino.id > 7 || newTreino.id < 1) {
        return null
    }
    const index = listTreino.findIndex(t => t.id == newTreino.id)
    if (index != -1) {
        return null
    }

    listTreino[newTreino.id - 1] = newTreino
    saveFile(listTreino)
    return listTreino[newTreino.id -1 ]
}

function updateTreino(id, newTreino) {
    const listTreino = readFile()
    const index = listTreino.findIndex(t => t.id == id)
    if (index === -1) {
        return null
    }

    listTreino[index] = {...listTreino[index], ...newTreino}
    saveFile(listTreino)
    return listTreino[index]
}

function deleteTreino(id) {
    const listTreino = readFile()
    const index = listTreino.findIndex(t => t.id == id)

    if (index == -1) {
        return null
    }

    listTreino[index] = {}
    saveFile(listTreino)
    return listTreino[index]
}

module.exports = {getTreinos, getTreinoById, createTreino, updateTreino, deleteTreino}
