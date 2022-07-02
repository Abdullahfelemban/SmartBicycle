const mongoose = require('mongoose')



const Adsschma = new mongoose.Schema({

   

  number: {

        type: String
    },

   

    user: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
        }
      ]
   
    
})











let Ads = mongoose.model('Ads',Adsschma, 'Ads')

module.exports = Ads