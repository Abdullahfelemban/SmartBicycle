const mongoose = require('mongoose')



const Rateschma = new mongoose.Schema({

   

  Website: {

        type: Number,
        default:0
    },

      Bicycle: {

      type: Number,
      default:0
  },

  Price: {

    type: Number,
    default:0
},

    user: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
        }
      ]
   
    
})











let Rate = mongoose.model('Rate',Rateschma, 'Rate')

module.exports = Rate