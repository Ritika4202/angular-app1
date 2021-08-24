import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
obj2={
  username:"",
  password:""
}
  constructor(private r:RegisterService,private router:Router) { }

  ngOnInit(): void {
  }
  loginData(){
    this.r.userLogin(this.obj2).subscribe(
      res=>{
        this.r.loginStatus=true;
        if(this.r.type=="user"){
          if(res.message=="Invalid Username"){
            alert("Invalid Username")
            }
            if(res.message=="Invalid Password"){
              alert("Invalid Password")
              }
              if(res.message=="login success"){
                this.router.navigateByUrl(`userprofile/${res.username}`)
localStorage.setItem("token",res.token)
localStorage.setItem("username",res.username)
localStorage.setItem("details",JSON.stringify(res.userobj))
              } 
        }
        else if(this.r.type=="admin")
{
  if(res.message=="Invalid Credentials"){
    alert("Invalid Credentials")
    }
      else{
        localStorage.setItem("username","admin");
this.router.navigateByUrl("/admin")
      }
}
    },
      err=>{
        console.log(err)
        alert("Something went wrong with the login process")
      }
    )
  }
  onSelect(event:any){
this.r.type=event.target.value;
console.log(this.r.type)
  }
}
