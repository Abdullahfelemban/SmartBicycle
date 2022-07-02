const express = require("express")
const router = express.Router()
const Rate = require('../models/Rate')

isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/main/main')
}


router.get('/manger',isAuthenticated ,(req,res)=> {
   
    
    if(req.user.kind==2||1) {
    res.render('logout/manger')
    }
    else{
        res.redirect ('/user/login')
     }
    
})

router.get('/user',isAuthenticated ,(req,res)=> {
   
    if(req.user.kind==3||1) {
    res.render('logout/user', {


    message: req.flash('info')
    })
}
    else{
        res.redirect ('/user/login')
     }
    
})



router.post('/user', (req,res)=> {
        

   
    let newrate = new Rate ({

        Website: req.body.rate,
        Bicycle: req.body.rate2,
        Price: req.body.rate3,
        user: req.user.id
       
      })
    
      newrate.save((err)=>{
         
        if(!err){
  
          
          req.flash('info1','')
          req.flash('info','Thank you')
          res.render('logout/user', {

          message: req.flash('info')
           
        
        

            })

          
        }

       else {
        
        
       

console.log(err)
      

        
       }
      
      })
    
})
          
        







module.exports= router