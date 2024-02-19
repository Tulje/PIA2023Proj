import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private servis:UserService,private http:HttpClient, private ruter:Router){}
  username:string
  password:string
  slika
  reg(){
    this.ruter.navigate(['register'])
  }
  login(){
    alert(this.username)
    this.servis.loginA(this.username,this.password).subscribe(response=>{
      alert(response)
      if(response!=null){
      localStorage.setItem('loginAdmin',JSON.stringify(response))
      this.ruter.navigate(['adminPreview'])

    }
    else alert('greska')
     
     
    })
    
}
 cv(a){
  this.slika=this.servis.getImgUrl(a.CV)
 }
  }
