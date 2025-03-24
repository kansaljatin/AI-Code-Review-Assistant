const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(cors())


app.use(express.json())

app.use('/ai', aiRoutes)

app.get('/', (req, res) => {
  app.use(express.static(path.resolve(__dirname, '../frontend/dist')))
  res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'))
})

app.use('*', (req, res) => res.status(404).json({ msg: 'Not found' }));
module.exports = app