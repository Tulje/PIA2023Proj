import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/User.model';
import { UserService } from '../user.service';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{
  user:User
  godina:number
  razred:string
  constructor(private servis :UserService, private fileUploadService:FileUploadService){}
  slika:string='C:\Users\Urke\Desktop\New folder (5)\PIA2023Proj\bekend'
  ngOnInit(): void {
    let a= localStorage.getItem('login')
    let b= JSON.parse(a)
    this.user=b
    this.godina=this.user.currentGrade
    
    this.razred=this.user.schoolType
this.slika=this.servis.getImgUrl(this.user.profileImage) 

//alert(this.slika)
}
  apdejt(){
    if(this.user.currentGrade==this.godina || this.user.currentGrade-1==this.godina ||
      (this.user.currentGrade==1 && this.godina==8 && (this.user.schoolType=="Srednja-Strucna" || this.user.schoolType=="Srednja-Umetnicka" ||this.user.schoolType=="Gimnazija"))){

        this.servis.update({user:this.user}).subscribe(data=>{
          localStorage.setItem('login',JSON.stringify(data)); this.ngOnInit()
        })
      
      }
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
}


