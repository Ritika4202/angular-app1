import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorisationService implements HttpInterceptor{
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token=localStorage.getItem('token');
    //if token exits
    if(token){
       const clonedReqObj= httpRequest.clone({headers:httpRequest.headers.set("Authorization",`Bearer ${token}`)})
       return next.handle(clonedReqObj);
    }
    else{
      return next.handle(httpRequest);
    }
  }

}
