const mongoose= require('mongoose')
const bcrypt = require ('bcryptjs')

const userSchema= new mongoose.Schema(
    {
        name: {type: String, required: true },
        surnames: {type: String, required: true},
        foodintolerance:{type: String, required: true},
        email: {type: String, required:true, unique: true},
        password: {type: String, required: true, minLength: [8, 'La contraseña debe tener al menos 8 caracteres']}
        
    }
)

userSchema.pre('save', async function name(next){
    if (!this.isModified('password')) return next()
      const salt= await bcrypt.genSalt(10)
      this.password= await bcrypt.hash(this.password, salt)
      next()
  })
  
userSchema.pre('findOneAndUpdate', async function(next) {
    const update= this.getUpdate()
    if (update.password) {
        const salt= await bcrypt.genSalt(10)
        update.password= await bcrypt.hash(update.password, salt)
        
    }
    next()
    
})


  userSchema.methods.matchPassword= async(password)=>{
      return await bcrypt.compare(password, this.password)
      
  }

const User= mongoose.model('User', userSchema)

module.exports= User