import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {
userCartObj;
products=[];
cartEmpty=true;
  constructor(private r:RegisterService) { }

  ngOnInit(): void {
    
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

}
