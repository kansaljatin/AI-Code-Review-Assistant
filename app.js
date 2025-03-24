const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(cors())


app.use(express.json())

app.use('/ai', aiRoutes)

app.use(express.static(path.resolve(__dirname, 'frontend', 'dist')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
})
  
app.get('/', (req, res) => {
    res.send('Welcome to ai code assistant app')
})
module.exports = app