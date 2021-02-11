require('./config/db')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config');

const auth = require('./routes/auth')
const post = require('./routes/post')
const user = require('./routes/user')
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send("Connected")
})

app.listen(process.env.PORT,()=>console.log(`Server started at port ${process.env.PORT}`))

app.use('/',auth)
app.use('/',post)
app.use('/',user)

