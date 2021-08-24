import { Component } from '@angular/core';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public r:RegisterService){}
  onLogout(){
    localStorage.clear();
    this.r.loginStatus=false;
  }
}
