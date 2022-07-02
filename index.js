const express = require("express")
const app = express()
const db = require('./config/database')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const passportsetup = require('./config/passport_setup')


app.use(express.json());
app.use(express.urlencoded());

app.use(express.static('public'))
app.use(express.static('node_modules'))

app.use(session({
  secret: 'smart session',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60000 * 30}
}))


app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

app.get('*',(req,res,next)=>{

  res.locals.user = req.user || null 
  next()


})

app.set('view engine', 'ejs')




app.get('/', (req,res)=> {

    res.redirect('/main/main')
     
 })

 const main = require('./routes/main')

 app.use('/main', main)

 const user = require('./routes/user_routes')

  app.use('/user', user)

  const home = require('./routes/home_routes')

  app.use('/home', home)

  const search = require('./routes/search_m')

  app.use('/search', search)

  const manage = require('./routes/manage_m')

  app.use('/manage', manage)

  const logout = require('./routes/logout_m')

  app.use('/logout', logout)


  const term = require('./routes/term_p')

  app.use('/term_privacy', term)

  const pay = require('./routes/pay')


  app.use('/pay', pay)


  
  

  

 app.listen(1500, ()=> {

    console.log(' app is wokring on port 1500')
})



   