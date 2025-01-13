const express = require('express')
const connectDB= require('./configuracion/db')
const authRouter= require('./routes/auth')
const userRouter = require ('./routes/user')
const foodRouter = require ('./routes/food')

require ('dotenv').config()
connectDB()

const server = express()

server.use(express.json())
server.use('/auth', authRouter)
server.use('/user', userRouter)
server.use('/food', foodRouter)

server.listen(3000, ()=>{
    console.log('SERVIDOR INICIADO CORRECTAMENTE')
})

