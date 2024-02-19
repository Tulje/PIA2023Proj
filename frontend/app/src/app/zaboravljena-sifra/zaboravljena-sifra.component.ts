import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zaboravljena-sifra',
  templateUrl: './zaboravljena-sifra.component.html',
  styleUrls: ['./zaboravljena-sifra.component.css']
})
export class ZaboravljenaSifraComponent {
  constructor(private servis:UserService,private http:HttpClient, private ruter:Router){}
  username:string
  passwordStara:string
  passwordNova:string
  passwordPonovljena:string
  
  reg(){
    this.ruter.navigate(['register'])
  }
  zaboravio(){
    this.ruter.navigate(['Zab'])
  }
  promeni(){
    let regex=/^(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/
      if(!regex.test(this.passwordNova) || this.passwordNova!==this.passwordPonovljena){
        alert("Lozinka nije u ispravnom formatu")
        return
      }
    this.servis.nadjiKorisnika(this.username,this.passwordStara).subscribe(data=>{
      console.log("nesto")
      if(data==null){
        alert("Nema")
      }
      else{
        console.log(data)
        this.servis.promeniSifru(this.username,this.passwordStara,this.passwordNova).subscribe(data=>{
          if(data!=null){
          alert(data.password)
          this.ruter.navigate(['login'])
      }
      else{
        alert("Losa stara sifra")
      }
    })
      }
    })
  }
  promeni1(){

  }
  // login(){
  //   this.servis.login(this.username,this.password).subscribe(response=>{if(response!=null){
  //     localStorage.setItem('login',JSON.stringify(response))
  //     this.ruter.navigate(['student'])

  //   }
     
  //     else{
  //       this.servis.loginTeacher(this.username,this.password).subscribe(response=>{if(response!=null){
  //         localStorage.setItem('login',JSON.stringify(response))
  //         this.ruter.navigate(['stranicaNastavnika'])
  //       }else{ alert("Greska : ne postoji")}})
  //     }
  //   })
    
//  }
    
}
