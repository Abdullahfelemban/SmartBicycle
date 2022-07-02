const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/user')


 passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  
 
passport.use('local.signup', new localStrategy({


    username : 'username',
    fullname : 'fullname',
    password : 'password',
    
    passReqToCallback : true

} , (req,username,password,done)=>{

   

    if (req.body.password != req.body.password2) {

        return done (null, false , req.flash ('error','passwords do not match'))

    }else {
        User.findOne({username: username}, (err,user)=> {
            if(err) {
                return done(err)
            }
            if(user) {
                return done(null, false, req.flash('error', 'username already used'))
            }
             
            if (!user) {
                //create user
                let newUser = new User()
                newUser.username = req.body.username,
                newUser.kind = 3 ,
                newUser.point=0,
                newUser.fullname = req.body.fullname,
                newUser.password = newUser.hashPassword(req.body.password),
                newUser.save ((err,user)=> {
                    if(!err) {
                        return done(null, user,req.flash('success', 'successfully registration , you can login now'))
                    } else { alert(err)  }
                })
            }
        })
    }




}))





passport.use( 'local.login_user' , new localStrategy({
    username : 'username',
    fullname : 'fullname',
    password : 'password',
    passReqToCallback : true
}, (req,username,password, done)=> { 

    User.findOne({username: username , $or: [ { kind: 3 } , { kind: 1 } ]  }, (err,user)=> {

        
       
        if (err) {
            return done(null, false, req.flash('error', 'Something wrong happened'))
        } 
        if(!user) {
            
            
            return done(null, false, req.flash('error', 'user was not found'))

          
        }
        if (user) {
            if (user.comparePasswords(password, user.password)) {

                return done(null,user)

            } else {
                return done(null,false, req.flash('error', ' password is wrong'))

            }
        }
    })
}))



passport.use( 'local.login_manger' , new localStrategy({
    username : 'username',
    fullname : 'fullname',
    password : 'password',
    passReqToCallback : true
}, (req,username,password, done)=> { 
   
    User.findOne({username: username , $or: [ { kind: 2 } , { kind: 1 } ] }, (err,user)=> {

       
        if (err) {
            return done(null, false, req.flash('error', 'Something wrong happened'))
        } 
        if(!user) {
            
            
            return done(null, false, req.flash('error', 'user was not found'))

          
        }
        if (user) {
            if (user.comparePasswords(password, user.password)) {

                return done(null,user)

            } else {
                return done(null,false, req.flash('error', ' password is wrong'))

            }
        }
    })
}))


passport.use( 'update_userPass' , new localStrategy({
    username : 'username',
    fullname : 'fullname',
    password : 'password',
    passReqToCallback : true
}, (req,username,password, done)=> { 

  let quary = {username:username  }

    User.findOne(quary , (err,user)=> {

        
       
        if (err) {
            return done(null, false, req.flash('error', 'Something wrong happened'))

        } 
        if(!user) {
            
            req.logOut()
            return done(null, false, req.flash('error', 'user was not found'))
            
          
        }
        if (user) {
            if (user.comparePasswords(password, user.password)) {

              User.updateOne(quary,{fullname : req.body.fullname ,password: user.hashPassword(req.body.password2)} ,(err,user) =>{

                req.logOut()
                return done(null,null,req.flash('success', ' password was update, you can login now'))
              })
            } else {
                req.logOut()
                return done(null,false, req.flash('error', ' password is wrong'))
                
            }
        }
    })
}))


