import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { UserService } from '../user.service';
import { User } from '../models/User.model';

@Component({
  selector: 'app-cvpage',
  templateUrl: './cvpage.component.html',
  styleUrls: ['./cvpage.component.css']
})
export class CVpageComponent implements OnInit {
  fileName: string
  matematika: boolean;
  fizika: boolean;
  hemija: boolean;
  informatika: boolean;
  programiranje: boolean;
  srpski: boolean;
  engleski: boolean;
  nemacki: boolean;
  italijanski: boolean;
  francuski: boolean;
  spanski: boolean;
  latinski: boolean;
  biologija: boolean;
  istorija: boolean;
  geografija: boolean;
  svet: boolean;
  os14: boolean;
  os58: boolean;
  ss: boolean;
  drugi: string;
  tekst: string;
  sviPredmeti=[]
  constructor(private fileUploadService: FileUploadService, private servis:UserService) { }
  ngOnInit(): void {
    this.servis.sviPredmeti().subscribe(data=>{
      data.forEach(element => {
        let a=false
        this.sviPredmeti.push([element,a])
      });
    })
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;
      const formData = new FormData();

      formData.append("file", file);

      this.fileUploadService.uploadFile(file).subscribe(data => alert(data))
    }
  }
  klik() {
    let uslov = this.matematika || this.fizika || this.hemija || this.informatika ||
      this.programiranje || this.srpski || this.engleski || this.nemacki ||
      this.italijanski || this.francuski || this.spanski || this.latinski ||
      this.biologija || this.istorija || this.geografija || this.svet || this.drugi != undefined;

    let uslov1 = this.os14 || this.os58 || this.ss
    if (!uslov) { alert("nesto morate stiklirati od predmeta"); return }
    if (!uslov1) { alert("nesto morate stiklirati od uzrasta"); return }
    if (this.tekst == undefined) { alert("Obavezno je uneti informacije o preporuci"); return }
    let selectedSubjects: string[] = [];
    let selectedYear: string[] = [];
    if (this.ss) {
      selectedYear.push('Srednja Skola')
    }

    if (this.os14) {
      selectedYear.push('Osnovna Skola 1-4')
    }

    if (this.os58) {
      selectedYear.push('Osnovna Skola 5-8')
    }
    if (this.drugi != undefined) {
      selectedSubjects.push(this.drugi);
    }
    if (this.matematika) {
      selectedSubjects.push("Matematika");
    }
    if (this.fizika) {
      selectedSubjects.push("Fizika");
    }
    if (this.hemija) {
      selectedSubjects.push("Hemija");
    }
    if (this.informatika) {
      selectedSubjects.push("Informatika");
    }
    if (this.programiranje) {
      selectedSubjects.push("Programiranje");
    }
    if (this.srpski) {
      selectedSubjects.push("Srpski jezik i književnost");
    }
    if (this.engleski) {
      selectedSubjects.push("Engleski jezik");
    }
    if (this.nemacki) {
      selectedSubjects.push("Nemački jezik");
    }
    if (this.italijanski) {
      selectedSubjects.push("Italijanski jezik");
    }
    if (this.francuski) {
      selectedSubjects.push("Francuski jezik");
    }
    if (this.spanski) {
      selectedSubjects.push("Španski jezik");
    }
    if (this.latinski) {
      selectedSubjects.push("Latinski jezik");
    }
    if (this.biologija) {
      selectedSubjects.push("Biologija");
    }
    if (this.istorija) {
      selectedSubjects.push("Istorija");
    }
    if (this.geografija) {
      selectedSubjects.push("Geografija");
    }
    if (this.svet) {
      selectedSubjects.push("Svet oko nas");
    }
    this.sviPredmeti.forEach(data=>{
      if(data[1]==true){
        selectedSubjects.push(data[0].name)
      }
    })
    let a = localStorage.getItem('poluinfo')
    let b:User=JSON.parse(a)
    alert(b.password)
    b.currentGrade=1
    b.schoolType="s";
    let data = { user: b, selectedSubjects: selectedSubjects, selectedYear: selectedYear, tekst: this.tekst, file: this.fileName }
    this.servis.registerTeacher(data).subscribe(data=>alert(data.lozinka))
  }
}
