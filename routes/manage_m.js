
const { response } = require("express")
const express = require("express")
const { get } = require("mongoose")
const router = express.Router()
const bike = require('../models/bike')
const User = require('../models/user')
const passport = require('passport')





isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/main/main')
}

router.get('/manger',isAuthenticated ,(req,res)=> {
   
    if(req.user.kind==2||1) {
    res.render('manage/manger', {

        message: req.flash('info'),
        message1: req.flash('info1'),
        fullname : req.user.fullname ,
        username : req.user.username
      
          })
        }
        else{
            res.redirect ('/user/login')
         }


})




router.post('/manger', (req,res)=> {
        

    var alert = require('alert');
        let newbike = new bike ({

            bike_number: req.body.no1,   
            xloc: req.body.locx,
            yloc: req.body.locy,
            status: 1
    
          })
        
          newbike.save((err)=>{
             
            if(!err){
      
              
              req.flash('info1','')
              req.flash('info','The bike was added successfully')
              res.render('manage/manger', {

              message: req.flash('info'),
              message1: req.flash('info1') ,
              fullname : req.user.fullname ,
              username : req.user.username
            

                })

              
            }

           else {
            
            
            req.flash('info','')
            req.flash('info1','The bike was not added successfully')
            res.render('manage/manger', {

                message1: req.flash('info1'),
                message: req.flash('info'),
                fullname : req.user.fullname ,
                username : req.user.username
                  })


            alert(err)

            
           }
          
          })
        
})


router.delete ('/delete/:bikenum',isAuthenticated,(req,res)=>{
  
  var alert = require('alert');
let quary = {bike_number: req.params.bikenum}

bike.findOne(quary , (err,findBike)=> {


if(findBike) {
bike.deleteOne(findBike , (err) =>{
  
  if(!err){

   
    res.status(200).json('deleted')
  }else {
   
    res.status(404).json('bike was not deleted')
  }

})
}

if(!findBike){

  alert("wrong bike number")

}
})

})


router.post ('/stop/:bikenum',isAuthenticated,(req,res)=>{
  
  var alert = require('alert');
  let quary = {bike_number: req.params.bikenum  }
  
  bike.findOne(quary , (err,findBike)=> {

    if(findBike) {

  bike.updateOne(findBike ,{status : 1} ,(err) =>{
    
    if(!err){
  
     
      res.status(200).json('updat')
    }else {
     
      res.status(404).json('bike was not updat')
    }
  })
}
if(!findBike){

  alert("wrong bike number")

}
})
  
  })


  router.post ('/maint/:bikenum',isAuthenticated,(req,res)=>{
  
    var alert = require('alert');
    let quary = {bike_number: req.params.bikenum  }
    
    bike.findOne(quary , (err,findBike)=> {
    
      if(findBike) {
    bike.updateOne(findBike ,{status : 3} ,(err) =>{
      
      if(!err){
    
       
        res.status(200).json('updat')
      }else {
       
        res.status(404).json('bike was not updat')
      }
    })
  }
  if(!findBike){

    alert("wrong bike number")
  
  }

  })
    
    })


   

  router.post('/user',

 
  passport.authenticate('update_userPass', {
      successRedirect: '/user/login',
      failureRedirect: '/user/login',
      failureFlash: true })

  
      )


    


  

router.get('/user',isAuthenticated ,(req,res)=> {
    if(req.user.kind==3||1) {
    res.render('manage/user', {
    fullname : req.user.fullname ,
    username : req.user.username
    })
    } else{
        res.redirect ('/user/login')
     }
    
})



module.exports= router