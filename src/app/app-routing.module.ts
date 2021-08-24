import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewproductsComponent } from './shared/viewproducts/viewproducts.component';
import { UsercartComponent } from './usercart/usercart.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [{path:"home",component:HomeComponent},{path:"register",component:RegisterComponent},
{path:"login",component:LoginComponent},{path:"userprofile/:username",component:UserprofileComponent,children:[{
  path:"viewproducts",component:ViewproductsComponent
},{path:"usercart",component:UsercartComponent}]},
{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
