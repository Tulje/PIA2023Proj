import { Component } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';

@Component({
  selector: 'app-teacher-register',
  templateUrl: './teacher-register.component.html',
  styleUrls: ['./teacher-register.component.css']
})
export class TeacherRegisterComponent {
  constructor(private http: HttpClient,private fileUploadService:FileUploadService,private ruter:Router) { }

  formData:User=new User()
  Path:string
  SchoolSelect:number=0
  Razred:number=0
  selectedFile: File;
  Lista:String[]=["1","2","3","4","5","6","7","8"]
    
    
    provera(){
      if(this.formData.schoolType=="Osnovna"){
        this.Lista=["1","2","3","4","5","6","7","8"]
       // this.ngOnInit()
      }
      
      else{
        this.Lista=["1","2","3","4"]



       // this.ngOnInit()
      }
    }
    getUserFieldsAsString(user: User): string {
      const userFields = Object.entries(user).map(([key, value]) => `${key}: ${value}`);
      return userFields.join(', ');
    }
    fileName:string
    onFileSelected(event: any): void {
      const file:File = event.target.files[0];

      if (file) {

          this.fileName = file.name;
          this.formData.profileImage=file.name
          const formData = new FormData();

          formData.append("file", file);

          this.fileUploadService.uploadFile(file).subscribe(data=>alert(data))
      }
    }
    uploadFile(): void {
      if (this.selectedFile) {
        this.fileUploadService.uploadFile(this.selectedFile).subscribe(
          (response) => {
            console.log('File uploaded successfully:', response);
          },
          (error) => {
            console.error('Error uploading file:', error);
          }
        );
      }
    }
    teacher(){
      this.ruter.navigate(['teacherReg'])
    }
    reg() {
      const formData = this.formData
      
      //formData.append('file', this.selectedFile);
      let st=this.getUserFieldsAsString(this.formData)
      const form=new FormData()
      form.append('user',JSON.stringify(this.formData))
      alert(st)
      
      
      this.http.post('http://localhost:4000/users/register', this.formData)
        .subscribe(response => {
          console.log('Image uploaded successfully');
        }, error => {
          console.error('Error uploading image', error);
        });
    }
    next(){
      if (
        this.formData.username &&
        this.formData.password &&
        this.formData.firstName &&
        this.formData.lastName &&
        this.formData.email &&
        this.formData.gender &&
        this.formData.address &&
        this.formData.contactPhone 
        
      )  {
      localStorage.setItem("poluinfo",JSON.stringify(this.formData))
      this.ruter.navigate(['teacherReg2'])}
      else{alert("Niste uneli sva neophodna polja")}
    }
}
