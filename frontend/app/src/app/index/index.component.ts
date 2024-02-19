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
  binding:boolean=true
  svinastavinici=[]
  constructor(private servis:UserService){}
  ngOnInit(): void {
    this.servis.teachers().subscribe(data=>{
    data.forEach(element => {if(element.status==1){this.brn++,this.svinastavinici.push(element)
      element.wantedSubjects.forEach(element1 => {
        if(!this.predmeti.includes(element1)){this.predmeti.push(element1)}
        let a={firstName:element.firstName,lastName:element.lastName,wantedSubjects:element1} 
        this.nastavnici.push(a)
      });
    }})
    let datum7=new Date()
    let datum30= new Date()
    datum7.setDate(datum7.getDate()-7)
   // alert(datum7.getDate())
    datum30.setDate(datum7.getDate()-30)
   // alert(datum30)
    this.servis.sviCasovi().subscribe(data=>
      { 
        data.forEach(data=>{
        let novidejt=new Date(data.datetime)
        let danas= new Date()
        //alert(danas.getTime())
        //alert(novidejt.getTime())
        let razlika= danas.getTime()-novidejt.getTime()

        let razlikaDana=razlika/(1000*3600*24)
      //  alert(razlika)
        if(razlikaDana<30 &&razlikaDana>=0){
          this.brc30++
        }
        if(razlikaDana<7 && razlikaDana>=0){
          this.brc7++
        }
      })
      })
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
