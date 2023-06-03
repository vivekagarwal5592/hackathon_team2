import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ParkingLotComponent } from './parking-lot/parking-lot.component';

const routes: Routes = [{
  path: 'signUp',
  component: SignupComponent,
},
{
  path: 'login',
  component: LoginComponent,
},
{
  path: "parking-lot",
  component: ParkingLotComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
