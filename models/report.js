const mongoose = require('mongoose')



const reportschma = new mongoose.Schema({

   

    amount: {

        type: Number
    },
    time: {
        type: Number
    },
    Date: {
        type: String
    },
 
    payment_type: {

        type : Number
    },

    user: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
        }
      ]
   
    
})











let reports = mongoose.model('reports',reportschma, 'report')

module.exports = reports