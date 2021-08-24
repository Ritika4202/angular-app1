import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  dataSource=new BehaviorSubject<any>(0)
  dataObservable=this.dataSource.asObservable();
  updateDataObservable(data){
    this.dataSource.next(data)
  }
  loginStatus=false;
  type;
  constructor(private hc:HttpClient) {
    if(localStorage.getItem('username')!=null){
      this.loginStatus=true;
    }
   }
  createuser(userObj):Observable<any>{
   return this.hc.post("/user/createuser",userObj)
  }
  userLogin(credentials):Observable<any>{
    if(this.type=="user")
    {
      return this.hc.post("/user/login",credentials)
    }
    if(this.type=="admin")
    {
      return this.hc.post("/admin/login",credentials)
    }
  }
  sendProductToUserCart(userProdObj):Observable<any>{
    return this.hc.post("/user/add-to-cart",userProdObj)
 }
 getProductFromCart(username):Observable<any>{
   return this.hc.get(`/user/getproducts/${username}`)
 }
}
