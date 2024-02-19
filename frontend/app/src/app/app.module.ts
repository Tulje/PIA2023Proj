import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import{ HttpClientModule} from '@angular/common/http';
import { TeacherRegisterComponent } from './teacher-register/teacher-register.component';
import { CVpageComponent } from './cvpage/cvpage.component';
import { IndexComponent } from './index/index.component';
import { StudentComponent } from './student/student.component';
import { DrugiStudentComponent } from './drugi-student/drugi-student.component';
import { NastavnikPreviewComponent } from './nastavnik-preview/nastavnik-preview.component';
import { AdminComponent } from './admin/admin.component';
import { AdminPreviewComponent } from './admin-preview/admin-preview.component';
import { StranicaNastavnikaComponent } from './stranica-nastavnika/stranica-nastavnika.component'
import { CommonModule } from '@angular/common';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ZaboravljenaSifraComponent } from './zaboravljena-sifra/zaboravljena-sifra.component';
import { DosijeComponent } from './dosije/dosije.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TeacherRegisterComponent,
    CVpageComponent,
    IndexComponent,
    StudentComponent,
    DrugiStudentComponent,
    NastavnikPreviewComponent,
    AdminComponent,
    AdminPreviewComponent,
    StranicaNastavnikaComponent,
    ZaboravljenaSifraComponent,
    DosijeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    CanvasJSAngularChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
