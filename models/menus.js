const mongoose= require("mongoose")

const menuSchema= new mongoose.Schema(
   {
     user: {type: mongoose.Schema.Types.ObjectId, ref:'User', require: true},
     foods: [
        {
            food:{type: mongoose.Schema.Types.ObjectId, ref: 'Food', require: true},
            quantity: {type: Number, require: true}
        }
     ],
     totalPriceMenu:{type:Number, require: true},
     status: {type: String, default:'Pending', enum: ['Pending','In cooking','Delivered']}
   },

   {timestamps: true}
)

const Menu = mongoose.model('Menu', menuSchema)

module.exports= Menu