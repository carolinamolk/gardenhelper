const express = require('express')
const path = require('path')
const cors = require('cors')
const logger = require('morgan')
const PORT = 3001
const app = express()


//allow express app to use packages and methods
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static("../FrontEnd"));


app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})

//create routes for home and more plant info
app.get('/', (req, res) => {res.sendFile(path.join(__dirname, '../FrontEnd/index.html'))})

// testing **
app.get('/:zone/', (req, res) => {
  zone = req.params.zone
  console.log(zone)
  res.send({msg: `Hey there, zone ${zone}`})})

// error messaging for routes not reached
app.get('*', (req, res) => {
    res.send('404 Not Found')
})


