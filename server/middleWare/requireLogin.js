const jwt= require('jsonwebtoken');
require('dotenv/config')
const User = require('../model/User')

module.exports=(req,res,next)=>{
    const {authorization} = req.headers
    //authorization = Bearer token
    if(!authorization)
    {
        return res.status(401).json({error:"You must be logged in"})
    }
    const token = authorization.replace("Bearer" , " ")
    jwt.verify(token, process.env.JWT_SECRET,(err,payload)=>{
        if(err)
        {
            return res.status(401).json({error:"You must be logged in"})
        }
        const {id} = payload
        User.findById(id).then(userdata=>{
           const {name,email,_id,followers,following} = userdata
            req.user = {name,email,_id,followers,following}
            next()
        })
      
    })

}