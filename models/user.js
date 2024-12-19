const mongoose= require('mongoose')
const bcrypt= require('bcryptjs')

const userSchema= new mongoose.Schema(
    {
        name: {type: String, required: true },
        surnames: {type: String, required: true},
        foodintolerance:{type: String, required: true},
        email: {type: String, required:true, unique: true},
        password: {type: String, required: true, minLength: [8, 'La contraseña debe tener al menos 8 caracteres']}
        
    }
)

const User= mongoose.model('User', userSchema)

module.exports= User