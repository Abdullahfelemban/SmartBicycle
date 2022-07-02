const db = require('../config/database')
const User = require('../models/user')

 
let Admin = new User()
Admin.username = "admin",
Admin.kind = 1 ,
Admin.point=0,
Admin.fullname = "Admin",
Admin.password = Admin.hashPassword(12345),


Admin.save( (err)=> {
        if (err) {
            console.log(err)
        }
    })

    let manger = new User()
    manger.username = "manger",
    manger.kind = 2 ,
    manger.point=0,
    manger.fullname = "Manger",
    manger.password = manger.hashPassword(12345),
    
    
    manger.save( (err)=> {
            if (err) {
                console.log(err)
            }
        })
    



