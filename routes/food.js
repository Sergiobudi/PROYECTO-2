const express= require ('express')
const router = express.Router()

const { createFood, updateFood, getFood, deleteFood }= require('../controllers/food')

router.post('/', createFood )
router.put('/:id', updateFood)
router.get('/:id', getFood)
router.delete('/id:', deleteFood)
module.exports = router
