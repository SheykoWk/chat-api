//? Dependencies
const express = require('express')
const cors = require('cors')

//? Files
const config = require('../config')
const db = require('./utils/database')
const initModels = require('./models/initModels')

//? Initial Configs

const app = express()
//? Enable incoming JSON data
app.use(express.json())
//? Enable CORS 
app.use(cors())

//? Authenticate DB
db.authenticate()
    .then(() => console.log('Database Authenticated'))
    .catch((err) => console.log(err))
//? Sync DataBase Models
db.sync()
    .then(() => console.log('Database Synced'))
    .catch(err => console.log(err))

//? Initialize my models relations
initModels()

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
