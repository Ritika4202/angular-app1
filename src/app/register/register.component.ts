import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { register1 } from '../models/register.model';
import { RegisterService } from '../register.service';
import { NgForm } from '@angular/forms'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  file:File;
  constructor(private r:RegisterService,private router:Router) { }

  ngOnInit(): void {
  }
  selectFile(event){
   this.file=event.target.files[0];
   console.log(this.file)
  }
  formData(obj1){
    let formData=new FormData();
    formData.append("photo",this.file,this.file.name)
    formData.append("obj1",JSON.stringify(obj1))
    console.log(formData)
    this.r.createuser(formData).subscribe(
      res=>{
        if(res.message=="user exists"){
          alert("USER already exists")
        }
       else if(res.message=="user created")
        {
          alert("User created succesfully")
          //navigate to login component 
          this.router.navigateByUrl("/login")
        }
      },
      err=>{
      console.log(err);
      alert("Something went wrong with user creation")
      }
    )
  }
  
}
