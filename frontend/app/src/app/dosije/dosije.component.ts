import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { FileUploadService } from '../file-upload.service';
import { Router } from '@angular/router';
import { User } from '../models/User.model';

@Component({
  selector: 'app-dosije',
  templateUrl: './dosije.component.html',
  styleUrls: ['./dosije.component.css']
})
export class DosijeComponent {
  user:User
  nastavnik:any
  godina:number
  razred:string
  datetime:Date
  IzabranPredmet:any
  opis:string
  dupli:boolean
  razlog:string
  casovi:any[]=[]
  gotoviCasovi:any[]=[]
  studenti:any[]=[]
  constructor(private servis :UserService, private fileUploadService:FileUploadService,private ruter:Router){}
  slika:string='C:\Users\Urke\Desktop\New folder (5)\PIA2023Proj\bekend'
  ngOnInit(): void {
    let a= localStorage.getItem('login')
    let b= JSON.parse(a)
    this.nastavnik=b
    let user= JSON.parse(localStorage.getItem('Pregled'))
    this.casovi=[]
    let date=new Date()

    this.servis.sviCasovi().subscribe(data=>
      {
        data.forEach(element => {let novidejt=new Date(element.datetime)
          if(element.teacher.username==this.nastavnik.username && element.user.username==user){
              this.casovi.push(element)
              console.log(element.status)
              if(element.status == 'Prihvacen' && novidejt<date){
                this.gotoviCasovi.push(element)
              }
          }
        });
       data.forEach(element => {
        let a=""+element.user.username
        let b=""+element.user.firstName
        let c=""+element.user.lastName
        let fleg=0
        this.studenti.forEach(el=>{
          if(el[0]===a && el[1]===b && el[2]===c)fleg=1
        })
        if(fleg==0){
          this.studenti.push([a,b,c])
        }
       });
        
      }
      )
   
   
    this.slika=this.servis.getImgUrl(this.nastavnik.profileImage) 
//alert(this.slika)
}
}
