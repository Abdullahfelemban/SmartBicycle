const express = require("express")
const router = express.Router()




router.get('/term', (req,res)=> {
   
    res.render('term_privacy/term')
       
    
})

router.get('/privacy', (req,res)=> {
   
    res.render('term_privacy/privacy')
       
    
})




module.exports= router