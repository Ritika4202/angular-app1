import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
userObj;
count;
  constructor(private hc:HttpClient,private r:RegisterService) { }

  ngOnInit(): void {
    //get data from localStorage
    this.userObj=JSON.parse(localStorage.getItem('details'))
     this.r.getProductFromCart(this.userObj.username).subscribe(
       res=>{
if(res.message=="Cart-empty"){
  this.r.updateDataObservable(0)
}
else{
  this.r.updateDataObservable(res.message)
}
this.r.dataObservable.subscribe(userProdObj=>{
  if(userProdObj==0)
  {
this.count=0;
  }
 else{
   this.count=userProdObj.products.length;
 }
})
       },
       err=>{
console.log(err)
       }
     ) 
  }
  protectedData(){
this.hc.get('/user/testing').subscribe(
  res=>{
    alert(res['message'])
  },
  err=>{
    console.log(err)
    alert(err.message)
  }
)
  }
}
