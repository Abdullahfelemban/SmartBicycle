const express = require("express")
const router = express.Router()



isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/main/main')
}


router.get('/manger', isAuthenticated ,(req,res)=> {
    if(req.user.kind==2||1) {
    res.render('search/manger')

    }
    else{
        res.redirect ('/user/login')
     }
       
    
})


router.get('/user', isAuthenticated,(req,res)=> {
    if(req.user.kind==3||1) {
    res.render('search/user')
    }else{
        res.redirect ('/user/login')
     }
    
})


module.exports= router