import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private servis:UserService,private http:HttpClient, private ruter:Router){}
  username:string
  password:string
  
  reg(){
    this.ruter.navigate(['register'])
  }
  zaboravio(){
    this.ruter.navigate(['Zab'])
  }
  login(){
    this.servis.login(this.username,this.password).subscribe(response=>{if(response!=null){
      localStorage.setItem('login',JSON.stringify(response))
      this.ruter.navigate(['student'])

    }
     
      else{
        this.servis.loginTeacher(this.username,this.password).subscribe(response=>{if(response!=null){
          localStorage.setItem('login',JSON.stringify(response))
          this.ruter.navigate(['stranicaNastavnika'])
        }else{ alert("Greska : ne postoji")}})
      }
    })
    
  }
    
    
 }

