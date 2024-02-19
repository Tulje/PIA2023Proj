import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FileUploadService } from '../file-upload.service';
import { User } from '../models/User.model';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stranica-nastavnika',
  templateUrl: './stranica-nastavnika.component.html',
  styleUrls: ['./stranica-nastavnika.component.css']
})
export class StranicaNastavnikaComponent implements OnInit {
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
    this.casovi=[]
    let date=new Date()

    this.servis.sviCasovi().subscribe(data=>
      {
        data.forEach(element => {let novidejt=new Date(element.datetime)
          if(element.teacher.username==this.nastavnik.username){
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
pregledaj(a){
  localStorage.setItem("Pregled",JSON.stringify(a))
  this.ruter.navigate(['dosije'])
}
nesto(){
  this.servis.ZahtevajCas(this.user,this.nastavnik,this.datetime,this.dupli,this.opis,this.IzabranPredmet).subscribe(data=>
  alert(data.message)  
  )
  
}
azuriraj(){
  try{
  this.nastavnik.wantedClass=this.nastavnik.wantedClass.split(',')
 
  }
  catch{}
  try{ this.nastavnik.wantedSubjects=this.nastavnik.wantedSubjects.split(',')}
  catch{}
  this.servis.azurirajNastavnika(this.nastavnik).subscribe(data=>this.ngOnInit())
}
onFileSelected(event: any): void {
  const file:File = event.target.files[0];

  if (file) {

      
      this.user.profileImage=file.name
      const formData = new FormData();

      formData.append("file", file);

      this.fileUploadService.uploadFile(file).subscribe(data=>alert(data))
  }
}
prihvati(a){
  this.servis.prihvatiCas({cas:a}).subscribe(data=>{this.ngOnInit()})
}
odbij(a){
  this.servis.odbijCas({cas:a,razlog:this.razlog}).subscribe(data=>{this.ngOnInit()})
}

}