const express= require ('express')
const router= express.Router()
const protecter= require('../middleware/auth')

const { getUser, updateUser, deleteUser}= require ('../controllers/user')


router.get('/:id', getUser)
router.put('/:id',protecter, updateUser)
router.delete('/:id',protecter, deleteUser)


module.exports = router

