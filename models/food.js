const mongoose = require("mongoose")



const foodSchema = new mongoose.Schema(
    {
        name: { type: String, require: true, unique: true },
        ingredients: { type: String },
        description: { type: String},
        price: { type: Number, require: true},
        stock: {type: Number, require: true}
        
    },
    { timestamps: true }
)


const Food = mongoose.model('Food', foodSchema)

module.exports = Food