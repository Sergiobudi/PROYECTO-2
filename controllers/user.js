const User= require('../models/user')


const getUser= async (req,res) => {
    try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({errormessage: 'User not found'})
        }
    res.json(user)

    } catch (error) {
        console.log(error)
       res.status(500) 
    }
}

const updateUser = async (req, res) =>{
  try {
    const user= await User.findByIdAndUpdate(req.params.id, { ...req.body})
    const userUpdate= await User.findById(user._id)

    if(!user) {
        return res.status(404).json('User not found')
        
    }
    res.json(userUpdate)

  } catch (error) {
    console.log(error)
    res.status(500)
    }
}

const deleteUser = async (req, res) => {
    try {
        const userDelete = await User.findByIdAndDelete(req.params.id)
    
     if (!userDelete) {
        return res.status(404).json({errormessage: 'User not found'} )
    }
       res.json({message: 'User deleted'})
        
     } catch (error) {
        console.log (error)
        res.status(500)
    }
}

module.exports= {getUser,updateUser, deleteUser}