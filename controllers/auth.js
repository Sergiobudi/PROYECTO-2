const {json}= require('express')
const User= require ('../models/user')
const jwt = require ('jsonwebtoken')

const generateToken= (user)=>{
    return jwt.sign({id: user.id, name: user.name},process.env.JWT_SECRET, {expiresIn: '5d'})
}

const registerUser = async (req, res)=>{
    const {email, name, surnames, foodintolerance, password}= req.body
     try {
        const userExits= await User.findOne ({email})
        if(userExits){
           return res.status(400).json({message: 'Este usuario ya existe'})
         }

         const newUser= await User.create ({email, name, surnames, foodintolerance, password})
         const token= generateToken(newUser)
         if (!token) {
            return res.status(400).json({message: 'Error de creación del token'})
        }

        res.status(200).json({
            _id: newUser._id,
            name: newUser.name,
            surnames: newUser.surnames,
            foodintolerance: newUser.foodintolerance,
            email: newUser.email,
            token: token,
        })
         

     } catch (error) {
        console.log(error)
        res.status(500)
        
     }
}


module.exports = {registerUser}

