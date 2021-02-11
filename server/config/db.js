const mongoose = require('mongoose');
require('dotenv/config');

mongoose.connect(process.env.MONGOOSE_CONNECTING_URL,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(ok=>console.log("Database is connected"))
.catch(err=>console.log(err))

module.exports = mongoose 