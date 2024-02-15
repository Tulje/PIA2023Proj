import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  brn:number=0
  bru:number=0
  ime:string
  prezime:string
  predmet:string
  studenti:any[]
  nastavnici:any[]=[]
  sort:number=1
  sort1:number=1
  sort2:number=1
  pretrazeno:any[]=[]
  predmeti:any[]=[]
  constructor(private servis:UserService){}
  ngOnInit(): void {
    this.servis.teachers().subscribe(data=>{this.brn=data.length,
    data.forEach(element => {
      element.wantedSubjects.forEach(element1 => {
        if(!this.predmeti.includes(element1)){this.predmeti.push(element1)}
        let a={firstName:element.firstName,lastName:element.lastName,wantedSubjects:element1} 
        this.nastavnici.push(a)
      });
    });
    })
    this.servis.students().subscribe(data=>{this.bru=data.length,this.studenti=data})

  }
  search(){
    let data={ime:this.ime,prezime:this.prezime,predmet:this.predmet}
    this.nastavnici.sort((a,b)=>this.sort*a.firstName.localeCompare(b.firstName))
    this.sort=this.sort*-1
    //this.servis.pretragaTeachera(data).subscribe(data=>alert(data))
  }
  search1(){
    let data={ime:this.ime,prezime:this.prezime,predmet:this.predmet}
    this.nastavnici.sort((a,b)=>this.sort1*a.lastName.localeCompare(b.lastName))
    //this.servis.pretragaTeachera(data).subscribe(data=>alert(data))
    this.sort1=this.sort1*-1
  }
  search2(){
    let data={ime:this.ime,prezime:this.prezime,predmet:this.predmet}
    this.nastavnici.sort((a,b)=>this.sort2*a.wantedSubjects.localeCompare(b.wantedSubjects))
    //this.servis.pretragaTeachera(data).subscribe(data=>alert(data))
    this.sort2=this.sort2*-1
  }
  pretraga(){
    let a=this.nastavnici
    let b=[]
    a.forEach(el => {
      // Check if the element should be included based on the flags and values
      if ((this.ime!=undefined && el.firstName.includes(this.ime) || this.ime==undefined) &&
          (this.prezime!=undefined && el.lastName.includes(this.prezime) || this.prezime==undefined) &&
          (this.predmet!=undefined && el.wantedSubjects.includes(this.predmet) || this.predmet==undefined)) {
          b.push(el);
      }
  });
  this.pretrazeno=b;
  }

}
