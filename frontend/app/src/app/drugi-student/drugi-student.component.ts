import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/User.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drugi-student',
  templateUrl: './drugi-student.component.html',
  styleUrls: ['./drugi-student.component.css']
})
export class DrugiStudentComponent {
  brn:number=0
  bru:number=0
  brc7:number=0
  brc30:number=0
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
  user:User
  svinastavnici:any[]=[]
  datetime:any
  casovi:any[]=[]
  gotoviCasovi:any[]=[]
  binding:boolean=false
  constructor(private servis:UserService,private ruter:Router){}
  ngOnInit(): void {
    let a=localStorage.getItem('login')
    this.user=JSON.parse(a)
    let datum7=new Date()
    let datum30= new Date()
    datum7.setDate(datum7.getDate()-7)
    
    datum30.setDate(datum7.getDate()-30)
    this.servis.sviCasovi().subscribe(data=>
      {
        let novidejt=new Date(data.datetime)
        let danas= new Date()
        if(datum30<novidejt && novidejt<danas){
          this.brc30++
        }
        if(datum7<novidejt && novidejt<danas){
          this.brc7++
        }
      })
    
    this.servis.teachers().subscribe(data=>{
      
    data.forEach(element => {
      if(element.status==1){this.brn++
      element.wantedSubjects.forEach(element1 => {this.svinastavnici.push(element)
        if((((this.user.schoolType==='Srednja-Strucna' || this.user.schoolType==='Srednja-Umetnicka' || this.user.schoolType==='Gimnazija') && element.wantedClass.includes('Srednja Skola')))
        ||
        (this.user.schoolType==='Osnovna' && this.user.currentGrade<5 && element.wantedClass.includes("Osnovna Skola 1-4"))
        ||
        (this.user.schoolType==='Osnovna' && this.user.currentGrade>=5 && element.wantedClass.includes("Osnovna Skola 5-8"))
        ){
        if(!this.predmeti.includes(element1)){this.predmeti.push(element1)}
        let a={firstName:element.firstName,lastName:element.lastName,wantedSubjects:element1,username:element.username} 
        this.nastavnici.push(a)
      }});}
    });
    
    })
    this.servis.students().subscribe(data=>{this.bru=data.length,this.studenti=data})
    let date=new Date()
    let date1= new Date()
    date1.setDate(date1.getDate()+3)
   // alert(date.toDateString())
    //alert(date1)
    this.servis.sviCasovi().subscribe(data=>
      { 
        data.forEach(element => {let novidejt=new Date(element.datetime)
          if(element.user.username==this.user.username){
              this.casovi.push(element)
              console.log(element.status)
              
              if(element.status == 'Prihvacen' && novidejt>date && novidejt<date1){
                this.gotoviCasovi.push(element)
              }
          }
        });
        this.gotoviCasovi.forEach(data=>{
          data.datetime= new Date(data.datetime)
          

        })
        this.casovi.forEach(data=>{
          data.datetime= new Date(data.datetime)
          data.end= new Date(data.end)
        })
      }
      )
    
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
          b.push({firsName:el.firsName,lastName:el.lastName,wantedSubjects:el.wantedSubjects, ocena:0,username:el.username});
      }
  });
  this.pretrazeno=b;
  }
  nastavnik(a:any){
    //alert(a.username)
    this.svinastavnici.forEach(el=>{
      if(el.username==a.username){
        localStorage.setItem('nastavnikPregled',JSON.stringify(el))
      }
    })
    this.ruter.navigate(['NastavnikPreview'])
  }
  
}
