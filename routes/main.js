const express = require("express")
const router = express.Router()





router.get('/main',(req,res)=> {
   

    res.render('main/main')

  
       
    
})





module.exports= router