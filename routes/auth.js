const express = require('express')
const router = express.Router()


const { registerUser }= require ('../controllers/auth')

router.post('/', registerUser)

module.exports= router