import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TeacherRegisterComponent } from './teacher-register/teacher-register.component';
import { CVpageComponent } from './cvpage/cvpage.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [{path:"",component:IndexComponent},{path:"login",component:LoginComponent},{path:"register",component:RegisterComponent},
{path:"teacherReg",component:TeacherRegisterComponent},
{path:"teacherReg2",component:CVpageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
