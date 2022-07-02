const { Router } = require("express")
const express = require("express")
const router = express.Router()
const bike = require('../models/bike')
const reports = require('../models/report')
const Rate = require('../models/Rate')
const Ads = require('../models/Ads')
const user = require('../models/user')



isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/main/main')
}


router.route('/main2').get(function (req, res) {

    
    bike.find({})
      .exec(function (err, bike) {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
       
        res.json(bike);
      }

      
    });

    

  });
 
  router.route('/main3').get(function (req, res) {

    
    bike.find({status:1})
      .exec(function (err, bike) {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
       
        res.json(bike);
      }

      
    });

    

  });
 

router.get('/main', isAuthenticated ,(req,res)=> {
    
   
        if(req.user.kind==2||1) {

       res.render('home/main')
         

        }

        else{
            res.redirect ('/user/login')
         }


})



router.get('/chatbot', isAuthenticated,(req,res)=> {
   
    res.render('home/chatbot')
       
    
})

router.get('/user_main',isAuthenticated ,(req,res)=> {

    if(req.user.kind==3||1) {
    res.render('home/user_main')
    }
    else{
        res.redirect ('/user/login')
     }
    
})

router.get('/user_main2',isAuthenticated ,(req,res)=> {
   
    if(req.user.kind==3||1) {
    res.render('home/user_main2')
    }
    else{
        res.redirect ('/user/login')
     }
    
})

router.get('/admin',isAuthenticated ,(req,res)=> {
   

    if(req.user.kind==1) {
    res.render('home/user_main')
    }
   else{
      res.redirect ('/home/main')
   }
    
})

router.get('/admin2',isAuthenticated ,(req,res)=> {
   

    if(req.user.kind==1) {
    res.render('home/main')
    }
   else{
       res.redirect ('/home/user_main')
   }
    
})


router.route('/reports').get(function (req, res) {

    
  reports.find({})
    .exec(function (err, report) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
     
      res.json(report);
    }

    
  });

  

});

router.route('/Rate').get(function (req, res) {

  Rate.find( {})

  .exec(function (err, Rate) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
     
      res.json(Rate);
    }

    
  });
  
  

});


router.post ('/finsh/:bikenum',isAuthenticated,(req,res)=>{
  

  let quary = {bike_number: req.params.bikenum  }
  
  
  
  bike.updateOne(quary ,{status : 1} ,(err) =>{
    
    if(!err){
  
     
      res.status(200).json('updat')
    }else {
     
      res.status(404).json('bike was not updat')
    }
  })
  
  
  
  })


  router.post ('/Ads/:number',isAuthenticated,(req,res)=>{
  

    let newAds = new Ads ({

      number: req.params.number,
      user: req.user.id
     
    })
  
    newAds.save()
       
    
    
    })
    router.route('/Ads').get(function (req, res) {

      Ads.find( {  })
    
      .exec(function (err, Ads) {
        if (err) {
          console.log(err);
          res.json(err);
        } else {
         
          res.json(Ads);
        }
    
        
      });
      
      
    
    });

    router.route('/point').get(function (req, res) {

      user.find( {_id: req.user.id})
    
      .exec(function (err, point) {
        if (err) {
          console.log(err);
          res.json(err);
        } else {
         
          res.json(point);
        }
    
        
      });
      
      
    
    });

module.exports= router