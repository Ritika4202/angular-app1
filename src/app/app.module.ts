import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import{FormsModule, ReactiveFormsModule} from '@angular/forms'
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { UserprofileComponent } from './userprofile/userprofile.component'
import { AuthorisationService } from './authorisation.service';
import { SharedModule } from './shared/shared.module';
import { UsercartComponent } from './usercart/usercart.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    UserprofileComponent,
    UsercartComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [{
     provide:HTTP_INTERCEPTORS,
     useClass:AuthorisationService,
     multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
