import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TeacherRegisterComponent } from './teacher-register/teacher-register.component';
import { CVpageComponent } from './cvpage/cvpage.component';
import { IndexComponent } from './index/index.component';
import { StudentComponent } from './student/student.component';
import { DrugiStudentComponent } from './drugi-student/drugi-student.component';
import { NastavnikPreviewComponent } from './nastavnik-preview/nastavnik-preview.component';
import { AdminComponent } from './admin/admin.component';
import { AdminPreviewComponent } from './admin-preview/admin-preview.component';
import { StranicaNastavnikaComponent } from './stranica-nastavnika/stranica-nastavnika.component';
import { ZaboravljenaSifraComponent } from './zaboravljena-sifra/zaboravljena-sifra.component';
import { DosijeComponent } from './dosije/dosije.component';

const routes: Routes = [{path:"",component:IndexComponent},{path:"login",component:LoginComponent},{path:"register",component:RegisterComponent},
{path:"teacherReg",component:TeacherRegisterComponent},
{path:"teacherReg2",component:CVpageComponent},
{path:"student",component:StudentComponent},
{path:'drugiStudent',component:DrugiStudentComponent},
{path:'NastavnikPreview',component:NastavnikPreviewComponent},
{path:'admin',component:AdminComponent},
{path:'adminPreview',component:AdminPreviewComponent},
{path:'stranicaNastavnika',component:StranicaNastavnikaComponent},
{path:'Zab',component:ZaboravljenaSifraComponent},
{path:'dosije',component:DosijeComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
