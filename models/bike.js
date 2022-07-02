const mongoose = require('mongoose')
const bikeschema = new mongoose.Schema({

   

    bike_number: {
        type: String,
        required: true,
        unique : true
    },
    xloc: {
        type: Number,
        required: true
    },
    yloc: {
        type: Number,
        required: true
    },

    status: {

        type: Number,
        required: true

    }
    
})

let bike = mongoose.model('bike',bikeschema, 'bicycle')

module.exports = bike