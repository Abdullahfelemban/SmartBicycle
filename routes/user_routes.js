const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const user = require('../models/user')



router.get('/login' ,(req,res)=> {
    res.render('user/login', {
        error: req.flash('error'),
        success: req.flash('success')
    })
})

router.get('/signup', (req,res)=> {
   
    res.render('user/signup',{
    error : req.flash('error')


    })
       
    
})



 router.post('/login2', 

 
  passport.authenticate('local.login_manger',  {

      successRedirect: '/home/main',
      failureRedirect: '/user/login2',
      failureFlash: true })

  


    )




      
      router.post('/login',

 
      passport.authenticate('local.login_user', {
          successRedirect: '/home/user_main',
          failureRedirect: '/user/login',
          failureFlash: true })
    
      
          )
      



      router.get('/login2', (req,res)=> {
        res.render('user/login2', {
            error: req.flash('error')
        })
    })
 

     router.post('/signup',
     passport.authenticate('local.signup', {
      successRedirect: '/user/login',
      failureRedirect: '/user/signup',
      failureFlash: true })
      )

      
    router.get('/logoutF',(req,res)=>{

   req.logOut()
   res.redirect('/main/main')

      })
module.exports= router