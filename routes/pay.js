const express = require("express")
const router = express.Router()
const reports = require('../models/report')
const  get  = require("mongoose")
const bike = require('../models/bike')
const user = require('../models/user')


isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/main/main')
}

router.get('/user_pay',isAuthenticated ,(req,res)=> {
    if(req.user.kind==3||1) {
    res.render('pay/user_pay')
    }
    else{
        res.redirect ('/user/login')
     }
    
})


router.post('/user_pay', (req,res)=> {
        
    var today = new Date();
    var year = today.getFullYear();
    var mes = today.getMonth()+1;
    var dia = today.getDate();
    var fecha =dia+"-"+mes+"-"+year;

    
   
        let newreport = new reports ({

            amount: req.body.Am,   
            time: req.body.Ti,
            Date: fecha ,
            payment_type:1,
            user: req.user.id
    
          })


          if ((req.body.Bn && req.body.Ti) == ""){

            res.render('pay/user_pay') 
          }
        else{
          newreport.save((err)=>{
             
            console.log(err)
          
            res.render('home/user_main2') 

              

          })
        }
})

router.post ('/pay/:bikenum',isAuthenticated,(req,res)=>{
  

    let quary = {bike_number: req.params.bikenum  }
    
    
    
    bike.updateOne(quary ,{status : 2} ,(err) =>{
      
      if(!err){
    
       
        res.status(200).json('updat')
      }else {
       
        res.status(404).json('bike was not updat')
      }
    })
    
    
    
    })


    router.post ('/pay2/:point1',isAuthenticated,(req,res)=>{
  

      let quary = {username: req.user.username  }
      
      let sumpoint = Number(req.user.point)  + Number(req.params.point1) 
      
      user.updateOne(quary ,{ point : sumpoint}  ,(err) =>{
        
        if(!err){
    
       
          res.status(200).json('updat')
        }else {
         
          res.status(404).json('point was not updat')
        }
      

      })
      })
      router.post ('/pay3/:0',isAuthenticated,(req,res)=>{
  

        let quary = {username: req.user.username  }
        
        
        user.updateOne(quary ,{ point : 0}  ,(err) =>{
          
          if(!err){
      
         
            res.status(200).json('updat')
          }else {
           
            res.status(404).json('point was not updat')
          }
        
  
        })
        })

module.exports= router