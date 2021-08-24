const exp=require('express')
const productapi=exp.Router();
const expressErrorHandler=require("express-async-handler")
productapi.use(exp.json())
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

//adding new product
productapi.post("/add-product",multerObj.single('photo'),expressErrorHandler(async(req,res,next)=>{
    let productcollectionobj=req.app.get("productcollectionobj")
    let newProduct=JSON.parse(req.body.prodObj);
    console.log("new product server",newProduct)
    let product=await productcollectionobj.findOne({model:newProduct.model})
    console.log("product",product)
    
    if(product!=null)
    {
        res.send({message:"Product already existed"})
    }
    else
    {
        newProduct.productImage=req.file.path;
        delete newProduct.photo;
        await productcollectionobj.insertOne(newProduct)
        res.send({message:"New product added"})
        
    }
}))
productapi.get("/view-products",expressErrorHandler(async(req,res,next)=>{
    let productcollectionobj=req.app.get("productcollectionobj")
    let list1=await productcollectionobj.find().toArray()
    res.send({message:list1})
}))
productapi.delete("/deleteuser/:productname",expressErrorHandler( async(req,res)=>{
    let productcollectionobj=req.app.get("productcollectionobj")
    let pn=req.params.productname;
    let product=await productcollectionobj.findOne({productname:pn})
    if(product==null)
    {
        res.send({message:"product not found"})
    }
    else{
        await productcollectionobj.deleteOne({productname:pn})
        res.send({message:"product removed"})
    }
}))
module.exports=productapi;