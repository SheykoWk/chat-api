//? Dependencies
const express = require('express')
const cors = require('cors')

//? Files
const config = require('../config')

//? Initial Configs

const app = express()
//? Enable incoming JSON data
app.use(express.json())
//? Enable CORS 
app.use(cors())

//? Routes v1
app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Ok!',
        routes: {
            users: ""
        }
    })
})


app.listen(config.api.port, () => {
    console.log(`Server started on ${config.api.host}`)
})
