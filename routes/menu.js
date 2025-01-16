const express = require('express')

const {createMenu, getMenu, updateMenu, deleteMenu}= require('../controllers/menu')

const router= express.Router()

router.post('/', createMenu)
router.get('/:id', getMenu)
router.put('/:id', updateMenu)
router.delete('/:id', deleteMenu )

module.exports= router