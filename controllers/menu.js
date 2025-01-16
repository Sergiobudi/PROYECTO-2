const Menu = require ('../models/menus')
const Food= require ('../models/food')

const createMenu= async (req,res) => {
    console.log(req)

    try {
        const {foods, user}= req.body

     
       
        let totalPrice=0;

        for(const item of foods){
            const food= await Food.findById(item.food)
            if (!food){
                return res.status(404).json({message: 'Food Not Found'})
            }

            if(item.quantity > food.stock) return res.status(400).json({message: 'Stock of Food no disponible'})
            
            totalPrice += food.price * item.quantity 

            food.stock -= item.quantity    
            

            await food.save()
         }
       
       const menu= await Menu.create({
        user,
        foods,
        totalPrice,
       })

       res.status(201).json(menu)
        
    } catch (error) {
        console.log(error)
        res.status(500)
        
    }
    
}

const updateMenu = async (req,res) => {
    const { foods, user} = req.body
    try {
        const menuOrigen= await Menu.findById(req.params.id)
        const menuUpdate= await Menu.findById(req.params.id)

        const menu= await Menu.findById(req.params.id)
        if(!menu) {
            return res.status(404).json({message: 'Menu not found'})
        }
        for(item of menu.foods) {
            const food = await Food.findById(item.food)
            if(food){
                food.stock += item.quantity
            }

            await food.save()
        }

        let totalPrice= 0;
      for(const item of foods){
        const food = await Food.findById(item.food)
        if (!food){
            return res.status(404).json({message: 'Food not found'})
          }
          if (item.quantity > food.stock) return res.status(400).json({message: 'Stock no disponible'})
          totalPrice += food.price * item.quantity
          food.stock = food.stock - item.quantity
          await food.save()  
      }
        
      menu.foods = foods
      menu.totalPrice = totalPrice
      menu.user = user

      await menu.save()
      res.status(200).json(menu)

    } catch (error) {
      console.log(error)
      res.status(500).json(error)
        
    }

}

const getMenu = async (req,res) => {
    try {
        const menu = await Menu.findById(req.params.id).populate('foods.food')
        res.status(200).json(menu)


    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    
}

const deleteMenu = async (req,res) => {
    try {
      const menuDelete = await Menu.findByIdAndDelete(req.params.id)
      if (!menuDelete) {
        return res.status(400).json({errorMessage: 'Food not found'})
        }
    res.json({message:'Menu delete'})  
   } catch (error) {
        console.log(error)
        res.status(500)
        
    }
}
module.exports = {createMenu, getMenu, updateMenu, deleteMenu}

