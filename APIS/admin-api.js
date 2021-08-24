const exp=require('express')
const adminapi=exp.Router();
adminapi.use(exp.json())
adminapi.post("/login",(req,res)=>{
    let credentials=req.body;
    if(credentials.username=="admin"&&credentials.password=="admin")
    {
        res.send({message:"login success"})
    }
    else{
        res.send({message:"Invalid Credentials"})
    }
})
module.exports=adminapi;