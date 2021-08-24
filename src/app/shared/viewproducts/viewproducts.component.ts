import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { RegisterService } from 'src/app/register.service';

@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})
export class ViewproductsComponent implements OnInit {
currentUser;
products=[];
productname;
searchItem:string;
  constructor(private AdminService:AdminService,private r:RegisterService) { }

  ngOnInit(): void {
    this.currentUser=localStorage.getItem('username')
    this.AdminService.viewProducts().subscribe(
      res=>{
        console.log(res.message)
        this.products=res.message;
      },
      err=>{
        console.log("err in viewing products",err)
        alert("Something went wrong in viewing products")
      }
    )
  }
  onSelect(prodObj)
  {
    let username=localStorage.getItem('username')
    let newUserProdObj={username,prodObj}
  this.r.sendProductToUserCart(newUserProdObj).subscribe(
    res=>{
alert(res[`message`])
this.r.updateDataObservable(res.latestUserCartObj)
    },
    err=>{
      console.log("error in posting product to cart",err)
      alert("Something went wrong in adding product to cart..")
    }
  )
  }
  onDelete(product){
    this.productname=product.productname;
    console.log(this.productname)
    this.AdminService.onDeletingProduct(this.productname).subscribe(
      res=>{
        if(res.message=="product not found"){
          alert("Product Not Found")
        }
        if(res.message=="product removed"){
          alert("Product Removed from Database")
        }
      },
      err=>{
        console.log("Err in deleting product",err)
        alert("Something went wrong while deleting the product..")
      }
    )
  }
}
