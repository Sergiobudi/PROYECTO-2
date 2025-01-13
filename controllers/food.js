const Food= require('../models/food')



const createFood = async (req,res) => {

    try {
        const food = await Food.create(req.body)
        res.status(200).json(food)
    } catch (error) {
        console.log(error)
        res.status(500)        
    }
    
}

const getFood= async (req, res) => {

    try {
       const food= await Food.findById(req.params.id)
      if (!food) {
        return res.status(404).json({errorMessage: 'Food not found'})
    }
       res.json(food)
       
    } catch (error) {
        console.log(error)
        res.status(500)
    }
    
}

const updateFood = async (req, res) => {

    try {
        const food = await Food.findByIdAndUpdate(req.params.id, { ...req.body })
        const foodUpdated = await Food.findById(food._id)
        if (!food) {
            return res.status(404).json({ errorMessage: 'Not found food' })
        }
        res.json(foodUpdated)

    } catch (error) {
       console.log(error)
        res.status(500)
    }
}

const deleteFood = async (req,res) => {
    try {
      const foodDelete = await Food.findByIdAndDelete(req.params.id)
      if (!foodDelete) {
        return res.status(400).json({errorMessage: 'Food not found'})
        }
    res.json({message:'Food delete'})  
   } catch (error) {
        console.log(error)
        res.status(500)
        
    }
}


module.exports ={ createFood, updateFood, getFood, deleteFood}