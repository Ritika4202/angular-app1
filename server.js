//create express app
const exp=require('express')
const app=exp();
const path=require("path")
require("dotenv").config();
const userapi=require("./APIS/user-api")
const productapi=require("./APIS/product-api")
const adminapi=require("./APIS/admin-api")

//import mongo client
const mc=require('mongodb').MongoClient;


//connection string
const databaseurl=process.env.DATABASE_URL;
let usercollectionobj;
//connect to db
mc.connect(databaseurl,(err,client)=>{
if(err)
{
    console.log("err in db connection",err);
}
else{
let databaseobj=client.db("myfirstdb")
let usercollectionobj=databaseobj.collection("usercollection")
let productcollectionobj=databaseobj.collection("productcollection")
let usercartcollectionobj=databaseobj.collection("usercartcollection")
app.set("usercollectionobj",usercollectionobj)
app.set("productcollectionobj",productcollectionobj)
app.set("usercartcollectionobj",usercartcollectionobj)
console.log("connected to db")
}
})

//connect angular app with express server
app.use(exp.static(path.join(__dirname,'./dist/angularprac/')))
//execute specific api based on path
//middleware
app.use("/user",userapi)
app.use("/product",productapi)
app.use("/admin",adminapi)

//invalid path
app.use((req,res,next)=>{
    res.send({message:"path invalid"})

})
//error handling
app.use((err,req,res,next)=>{
res.send({message:"error is",err})
})
//assign port
app.listen(process.env.PORT,()=>console.log('server listening '))