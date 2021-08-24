import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private hc:HttpClient) { }
  addNewProduct(newProduct):Observable<any>{
    return this.hc.post("/product/add-product",newProduct)
  }
  viewProducts():Observable<any>{
     return this.hc.get("/product/view-products")
  }
  onDeletingProduct(productname):Observable<any>{
    return this.hc.delete(`/product/deleteuser/${productname}`)
  }
  
}
