//create mini express app
const exp=require('express')
const userapi=exp.Router();
const expressErrorHandler=require("express-async-handler")
const bcryptjs=require("bcryptjs")
require("dotenv").config();
const jsonwebtoken=require("jsonwebtoken")
const checkToken=require("./middlewares/verifyToken")
//import cloudinary module
const cloudinary=require("cloudinary").v2
const multer=require("multer")
const {CloudinaryStorage}=require("multer-storage-cloudinary")
//configure cloudinary
cloudinary.config({
    cloud_name:'dyjlcc8uo',
    api_key:'233334543844263',
    api_secret:'RN9qzFdwZv_0dZcUziASLp4LFTg'
})
//configure multer-storage-cloudinary
const clStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(req,file)=>{
        return{
            folder:"webd",
            public_id:file.fieldname+'-'+Date.now()
        }
    }
})
//configure multer
const multerObj=multer({storage:clStorage})
//add body parsing middleware
userapi.use(exp.json())

userapi.get("/getusers",expressErrorHandler(async(req,res)=>{
    //read docs from user collection
    let usercollectionobj=req.app.get("usercollectionobj")
    let list1=await usercollectionobj.find().toArray()
    res.send({message:list1})
}))
userapi.get("/getuser/:username",expressErrorHandler (async(req,res)=>{
    let usercollectionobj=req.app.get("usercollectionobj")
    let un=req.params.username;
    console.log(un);
   let obj=await usercollectionobj.findOne({username:un})
    if(obj==null)
    {
        res.send({message:"User not found"})
    }
    else{
        res.send({message:obj})
    }
}))
userapi.post("/createuser",multerObj.single('photo'),expressErrorHandler(async(req,res)=>{
    let usercollectionobj=req.app.get("usercollectionobj")
    let newuser=JSON.parse(req.body.obj1);
    console.log(newuser)
    let user=await usercollectionobj.findOne({username:newuser.username})
    if(user!=null)
    {
res.send({message:"user exists"})
    }
    else{
        //hash password
        let hashedPassword=await bcryptjs.hash(newuser.password,7)
        //replace password
        newuser.password=hashedPassword
        //add image url
        newuser.profileImage=req.file.path;
        await usercollectionobj.insertOne(newuser)
        res.send({message:"user created"})
    }
}))
userapi.put('/updateuser/:username',expressErrorHandler( async(req,res)=>{
    let usercollectionobj=req.app.get("usercollectionobj")
    let modifieduser=req.body;
    await usercollectionobj.updateOne({username:modifieduser.username},{$set:{email:modifieduser.email}})
    res.send({message:"user modified"})
}))
userapi.delete('/deleteuser/:username',expressErrorHandler( async(req,res)=>{
    let usercollectionobj=req.app.get("usercollectionobj")
    let un=req.params.username;
    let user=await usercollectionobj.findOne({username:un})
    if(user==null)
    {
        res.send({message:"user not found"})
    }
    else{
        await usercollectionobj.deleteOne({username:un})
        res.send({message:"user removed"})
    }
}))
userapi.post("/login",async(req,res)=>{
    let usercollectionobj=req.app.get("usercollectionobj")
    let credentials=req.body;
    let userobj=await usercollectionobj.findOne({username:credentials.username})
    if(userobj==null)
    {
        res.send({message:"Invalid Username"})
    }
    else{
        let result=await bcryptjs.compare(credentials.password,userobj.password)
        if(result==false)
        {
            res.send({message:"Invalid Password"})
        }
        else{
            //create a token
            let signedToken=jsonwebtoken.sign({username:credentials.username},process.env.SECRET,{expiresIn:60})
            //send token to client
            res.send({message:"login success", token:signedToken,username:credentials.username,userobj:userobj})
        }
    }
})  
//add to cart
userapi.post("/add-to-cart",expressErrorHandler(async(req,res,next)=>{
    let newProductObject=req.body;
    let usercartcollectionobj=req.app.get("usercartcollectionobj")
    let userCartObj=await usercartcollectionobj.findOne({username:newProductObject.username})
    if(userCartObj==null)
    {
        //create new object
        let products=[];
        products.push(newProductObject.prodObj)
        let newUserCartObject={username:newProductObject.username,products}
        //insert it
        await usercartcollectionobj.insertOne(newUserCartObject)
        
        let latestUserCartObj=await usercartcollectionobj.findOne({username:newProductObject.username})
        res.send({message:"New product added successfully to cart!",latestUserCartObj:latestUserCartObj})
    }
    else{
        userCartObj.products.push(newProductObject.prodObj)
        await usercartcollectionobj.updateOne({username:newProductObject.username},{$set:{...userCartObj}})
        
        let latestUserCartObj=await usercartcollectionobj.findOne({username:newProductObject.username})
        res.send({message:"New product added successfully to cart!",latestUserCartObj:latestUserCartObj})
    }
}))
userapi.get("/getproducts/:username",expressErrorHandler(async(req,res,next)=>{
    let un=req.params.username;
    let usercartcollectionobj=req.app.get("usercartcollectionobj")
    let userProdObj=await usercartcollectionobj.findOne({username:un})
    if(userProdObj==null)
    {
        res.send({message:"Cart-empty"})
    }
    else{
        res.send({message:userProdObj})
    }
}))
//dummy route to create protected resource
userapi.get("/testing",checkToken,(req,res)=>{
    res.send({message:"This is protected data"})
})
userapi.post("/delete-from-cart",expressErrorHandler(async(req,res,next)=>{
    let newProductObject=req.body;
    let usercartcollectionobj=req.app.get("usercartcollectionobj")
    let userCartObj=await usercartcollectionobj.findOne({username:newProductObject.username})
    newProductObject.arr.forEach(element => {
       const index= userCartObj.products.indexOf(element);
       userCartObj.products.splice(index,1);
        
    });
        //userCartObj.products.push(newProductObject.prodObj)
        await usercartcollectionobj.updateOne({username:newProductObject.username},{$set:{...userCartObj}})
        
        let latestUserCartObj=await usercartcollectionobj.findOne({username:newProductObject.username})
        res.send({message:"New product added successfully to cart!",latestUserCartObj:latestUserCartObj})
    
}))
module.exports=userapi;
