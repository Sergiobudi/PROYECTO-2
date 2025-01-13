const jwt= require('jsonwebtoken')

const protecter = async (req,res, next) => {
  const token= req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({message: 'Not Authoritation'})
    }

try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decode)
    next()

  } catch (error) {
    console.log(error)
    return res.status(401).json({message: 'Token Invalided'})
    
  }
    
}

module.exports = protecter