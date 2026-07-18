
const express=require('express')
const routes=express.Router();
// import Admin model
const Admin = require('../models/Admin');
const jwt=require('jsonwebtoken')
//admin login code
routes.post('/login',async(req,res)=>{

    try{    
        const{email,password}=req.body;
        //check admin exist or not
        if(!email){
            return res.json({msg: 'Email is Entered'})}
            const user=await Admin.findOne({email:email});
            if(!user){return res.json({"msg":"Email Not Found"})
            }
        
        if(user.password==password){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, { expiresIn: "1d" });
            res.json({
                "msg": "success",
                "adminId": user._id,
                "name": user.name,
                "token": token
            })
        }
        else{
            return res.json({"msg":"Password is Incorrect"})
        }
    }catch(er){

        console.log(er);
        res.json({"msg": " Server Error"});
        
    }
})
module.exports=routes;