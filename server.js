const express = require('express')
const connectDB= require('./configuracion/db')
require ('dotenv').config()
connectDB()

const server = express()

server.use(express.json())

server.listen(3000, ()=>{
    console.log('SERVIDOR INICIADO CORRECTAMENTE')
})

