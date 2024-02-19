import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/User.model';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-nastavnik-preview',
  templateUrl: './nastavnik-preview.component.html',
  styleUrls: ['./nastavnik-preview.component.css']
})
export class NastavnikPreviewComponent {
  user:User
  nastavnik:any
  godina:number
  razred:string
  datetime:Date
  IzabranPredmet:any
  opis:string
  dupli:boolean
  constructor(private servis :UserService, private fileUploadService:FileUploadService){}
  slika:string='C:\Users\Urke\Desktop\New folder (5)\PIA2023Proj\bekend'
  ngOnInit(): void {
    let a= localStorage.getItem('login')
    let b= JSON.parse(a)
    this.user=b
    this.godina=this.user.currentGrade
    
    this.razred=this.user.schoolType
     a= localStorage.getItem('nastavnikPregled')
     b= JSON.parse(a)
    this.nastavnik=b
    this.IzabranPredmet=this.nastavnik.wantedSubjects[0]
    this.slika=this.servis.getImgUrl(this.nastavnik.profileImage) 
//alert(this.slika)
}
nesto(){
  this.servis.ZahtevajCas(this.user,this.nastavnik,this.datetime,this.dupli,this.opis,this.IzabranPredmet).subscribe(data=>
  alert(data.message)  
  )
  
}

}
