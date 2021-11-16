import { Component, OnInit, ɵɵpureFunction1 } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {
userCartObj;
products=[];
statusAlert=false;
statusPayment=false;
sum=0;
obj="";
username="";
arr=[];
proceedToBuyStatus=false;
cartEmpty=true;
  constructor(private r:RegisterService,private router:Router) { }

  ngOnInit(): void {
    this.username=localStorage.getItem('username')
    this.r.dataObservable.subscribe(
      res=>{
        if(res.message=="Cart-empty"){
          this.cartEmpty=true;
          alert("Cart Empty :(")
        }
        else{
          this.cartEmpty=false;
          this.products=res["products"];
        }
      },
      err=>{
        console.log("err in reading cart",err)
        alert("Something went worng in fetching cart items..")
      }
    )
  }
  onSaveUsernameChanged(value,product)
  {
console.log("value",value)
console.log("product",product)
if(value==true)
{
  let a=parseInt(product.price)
this.sum=this.sum+a;
this.arr.push(product)
}
if(value==false)
{
  let a=parseInt(product.price)
  this.sum=this.sum-a;
  const index=this.arr.indexOf(product)
  this.arr.splice(index,1)
}
  }
  total()
  {
    this.statusPayment=true;
  }
  proceedToBuy()
  {
    this.proceedToBuyStatus=true;
    
  }
  placeOrder()
  {
    console.log("final arr",this.arr)
    let obj1={username:this.username,arr:this.arr}
    this.r.deleteProductFromUserCart(obj1).subscribe((result:any)=>
    {
      console.log("result del",result)
      this.qwe();
     
         // alert("Order successfully placed!")
          
          if(this.statusAlert==true)
         {
            console.log("hey1")
            this.router.navigateByUrl("/userprofile/"+this.username+"/viewproducts")
          }
        },
        err=>{
          console.log("err in reading cart",err)
          alert("Something went worng in fetching cart items..")
        }
        
      )
 }
 qwe()
 {
  this.r.dataObservable.subscribe(
    res=>{
      console.log("hey")
      this.statusAlert=true;
      if(res.message=="Cart-empty"){
        this.cartEmpty=true;
        alert("Cart Empty :(")
      }
      else{
        this.cartEmpty=false;
        this.products=res["products"];
      }
    })
  
 }
 
}
