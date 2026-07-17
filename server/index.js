const express = require('express')
const dotenv = require('dotenv')
dotenv.config();  // .env config
const mongoDB = require('./config/db')
const app = express() //server call
const PORT = process.env.PORT || 3000
app.use(express.json())
mongoDB(); //db call  
//api started
app.use('/api/admin',require('./routes/adminRoute'))
//api ended
app.listen(PORT,()=>{
    console.log('Server id running on http://localhost:5000/api/admin/register');
    
})
 