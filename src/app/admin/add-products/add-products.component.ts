import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

 
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
file:File;

  constructor(private a:AdminService,private router:Router) { }

  ngOnInit(): void {
  }
  selectFile(event){
this.file=event.target.files[0]
  }
  onAddProduct(prodObj){
    console.log(prodObj)
   let formData=new FormData();
   formData.append("photo",this.file,this.file.name)
   formData.append("prodObj",JSON.stringify(prodObj))
   console.log("form data",formData)
   this.a.addNewProduct(formData).subscribe(
res=>{
 if(res.message=="New product added")
 {
  console.log("working1")
  alert("New product added")
  
 }

 if(res.message=="Product already existed") 
 {
   console.log("working")
  alert("Product already existed")
 }

},
err=>{
  console.log("err in adding product",err)
  alert("Something went wrong in adding  product")
}
   )
  }
}
