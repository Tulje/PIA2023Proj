import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../models/User.model';

@Component({
  selector: 'app-admin-preview',
  templateUrl: './admin-preview.component.html',
  styleUrls: ['./admin-preview.component.css']
})
export class AdminPreviewComponent {
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
  sviCasovi:any[]=[]
  user:User
  svinastavnici=[]
  datetime:any
  PoPolu={}
  PoPoluNastavnici={}
  PoPredmetu={}
  PoRazredu={}
  daniUNedelji={}
  chart={}
  constructor(private servis:UserService,private ruter:Router){}
  async ngOnInit(): Promise<void> {
    let a=localStorage.getItem('login')
    this.user=JSON.parse(a)
    this.svinastavnici=[]
    let sviPredmeti=[]
    let sviRazredi=[]
   this.servis.teachers().subscribe(data=>{this.brn=data.length,
      
     
      data.forEach(el=>{
        this.svinastavnici.push(el)
        el.wantedSubjects.forEach(element => {
          
         // if(sviPredmeti.includes(element)==false)
          sviPredmeti.push(element)
        });
        el.wantedClass.forEach(element => {
         // if(sviRazredi.includes(element)==false)

          sviRazredi.push(element)
        });
      })
      let BrojacPoPredmetu=new Map<string, number>();
      let BrojacPoRazredu=new Map<string, number>();
      console.log(this.svinastavnici)
      sviPredmeti.forEach((el)=>{
        let count = BrojacPoPredmetu.get(el as string) || 0;
        BrojacPoPredmetu.set(el as string, count + 1);
      })
      sviRazredi.forEach((el)=>{
        let count = BrojacPoRazredu.get(el as string) || 0;
        BrojacPoRazredu.set(el as string, count + 1);
      })
      console.log(BrojacPoPredmetu)
      const PoPredmetuNiz = Array.from(BrojacPoPredmetu.entries()).map(([predmet, count]) => ({
        predmet,
        count
      }));
      const PoRazreduNiz = Array.from(BrojacPoRazredu.entries()).map(([razred, count]) => ({
        razred,
        count
      }));
      this.PoRazredu = {
        animationEnabled: true,
        title: {
          text: 'Po Uzrastu'
        },
        axisY2: {
          title: 'Starosne grupe',
          includeZero: true
        },
        axisY: {
          title: 'Uzrast'
        },
        data: [{
          type: 'bar',
          showInLegend: true,
          legendText: 'Starosne grupe',
          dataPoints: PoRazreduNiz.map(item => ({
            y: item.count,
            label: item.razred
          }))
        }
        ]
      };
      this.PoPredmetu = {
        animationEnabled: true,
        title: {
          text: 'Po Predmetu'
        },
        axisY2: {
          title: 'Starosne grupe',
          includeZero: true
        },
        axisY: {
          title: 'Predmeti'
        },
        data: [{
          type: 'bar',
          showInLegend: true,
          legendText: 'Starosne grupe',
          dataPoints: PoPredmetuNiz.map(item => ({
            y: item.count,
            label: item.predmet
          }))
        }
        ]
      };
    data.forEach(element => {
      element.wantedSubjects.forEach(element1 => {
        if((((this.user.schoolType==='Srednja-Strucna' || this.user.schoolType==='Srednja-Umetnicka' || this.user.schoolType==='Gimnazija') && element.wantedClass.includes('Srednja Skola')))
        ||
        (this.user.schoolType==='Osnovna' && this.user.currentGrade<5 && element.wantedClass.includes("Osnovna Skola 1-4"))
        ||
        (this.user.schoolType==='Osnovna' && this.user.currentGrade>=5 && element.wantedClass.includes("Osnovna Skola 5-8"))
        ){
        if(!this.predmeti.includes(element1)){this.predmeti.push(element1)}
        let a={firstName:element.firstName,lastName:element.lastName,wantedSubjects:element1,username:element.username} 
        this.nastavnici.push(a)
      }});
    });
    })
    this.servis.students().subscribe(data=>{this.bru=data.length,this.studenti=data
      let musko=0
      let zensko=0
    data.forEach(element => {
      if(element.gender=="M")musko=musko+1
      else zensko=zensko+1
    });
    this.PoPolu = {
      animationEnabled: false,
      title: {
        text: "Ucenici po polu"
      },
      data: [{
        type: "pie",
       
        dataPoints: [
          { y: musko, name: "Muskarci" },
          { y: zensko, name: "Zene" },
        ]
      }]
    }
    })
   
    this.servis.teachers().subscribe(data=>{this.bru=data.length,this.studenti=data
      let musko=0
      let zensko=0
    data.forEach(element => {
      if(element.gender=="M")musko=musko+1
      else zensko=zensko+1
    });
    this.PoPoluNastavnici = {
      animationEnabled: false,
      title: {
        text: "Nastavnici po polu"
      },
      data: [{
        type: "pie",
        
        
        
        dataPoints: [
          { y: musko, name: "Muskarci" },
          { y: zensko, name: "Zene" },
        ]
      }]
    }
    })
    this.servis.sviCasovi().subscribe(data=>{
      data.forEach(el=>this.sviCasovi.push(el))
      let brojac=[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
      let brojDana=0
      this.sviCasovi.forEach(element => {
        
        let datum=new Date(element.datetime)
        let danUNedelji=datum.getDay()
        brojac[danUNedelji][0]+=1
        brojDana+=1

      });
      brojac.forEach(el=>{
        el[1]=el[0]/brojDana
      })
      let imena=['NED', 'PON', 'UTO', 'SRE', 'CET', 'PET', 'SUB']
      let i=0
      this.daniUNedelji = {
        title: { text: 'Casovi u nedelji' },
        animationEnabled: true,
        axisY: {
          includeZero: true
        },
        data: [{
          type: 'bar',
          indexLabel: "{y}",
          dataPoints:[ 
            {label:imena[0],
            y:brojac[0][1]},
            {label:imena[1],
              y:brojac[1][1]},
              {label:imena[2],
                y:brojac[2][1]},
                {label:imena[3],
                  y:brojac[3][1]},
                  {label:imena[4],
                    y:brojac[4][1]},
                    {label:imena[5],
                      y:brojac[5][1]},
                      {label:imena[6],
                        y:brojac[6][1]},
                       

         ]
        }]
      }
    })
   
      // Dohvatamo podatke o časovima iz baze podataka
    //   this.servis.sviCasovi().subscribe(casovi => {
    //     // Filtriramo časove za 2023. godinu
    //     const casovi2023 = casovi.filter(cas => {
    //         const casDate = new Date(cas.datetime);
    //         return casDate.getFullYear() === 2023;
    //     });
    //     console.log(casovi2023)
    //     // Zatim dohvatamo podatke o nastavnicima iz baze podataka
    //     this.servis.teachers().subscribe(nastavnici => {
    //         // Kreiramo niz objekata koji sadrže imena nastavnika i broj održanih časova
    //         const dataPoints = nastavnici.map(nastavnik => {
    //             // Broj održanih časova za nastavnika se može izračunati na osnovu podataka iz 'casovi' niza
    //             const brojCasova = casovi2023.filter(cas => cas.teacher.username === nastavnik.username).length;
    //             return { label: nastavnik.username, y: brojCasova };
    //         });
    
    //         // Sortiramo nastavnike prema broju održanih časova u opadajućem redosledu
    //         dataPoints.sort((a, b) => b.y - a.y);
    
    //         // Limitiramo broj nastavnika na prvih 10
    //         const top10DataPoints = dataPoints.slice(0, 10);
    
    //         // Kreiramo CanvasJS grafikon
    //         this.chart =  {
                
    //             title: {
    //                 text: 'Engagement of Top 10 Teachers in 2023'
    //             },
    //             axisX: {
    //                 title: 'Teacher'
    //             },
    //             axisY: {
    //                 title: 'Number of Classes Held'
    //             },
    //             data: [{
    //                 type: 'line',
    //                 dataPoints: top10DataPoints
    //             }]
    //         };
    
    //         // Prikazujemo grafikon
    //         // this.chart.render(); // Ovo zavisi od implementacije CanvasJS-a
    //     });
    // });

    // this.servis.sviCasovi().subscribe(casovi => {
    //   this.servis.teachers().subscribe(nastavnici => {
    //     const teachersStats = new Map<string, { totalClasses: number; monthlyStats: Map<string, number> }>();
    
    //     casovi.forEach(cas => {
          
    //       const teacherKey = cas.teacher.username;
    //       const dateStart = new Date(cas.datetime);
    //       if(dateStart.getFullYear()==2023){
    //       const monthYearKey = `${dateStart.getMonth() + 1}-${dateStart.getFullYear()}`;
    
    //       const teacherStats = teachersStats.get(teacherKey) || { totalClasses: 0, monthlyStats: new Map<string, number>() };
    //       teacherStats.totalClasses += 1;
    
    //       const monthlyCount = teacherStats.monthlyStats.get(monthYearKey) || 0;
    //       teacherStats.monthlyStats.set(monthYearKey, monthlyCount + 1);
    
    //       teachersStats.set(teacherKey, teacherStats);}
    //     });
    
    //     const top10Teachers = nastavnici
    //       .map(nastavnik => {
    //         const teacherStats = teachersStats.get(nastavnik.username) || { totalClasses: 0, monthlyStats: new Map<string, number>() };
    //         return { teacherKey: nastavnik.username, totalClasses: teacherStats.totalClasses };
    //       })
    //       .sort((a, b) => b.totalClasses - a.totalClasses)
    //       .slice(0, 10);
    //     console.log(teachersStats)
    //     this.chart = {
    //       title: { text: 'Top 10 nastavnika' },
    //       animationEnabled: true,
    //       axisY: {
    //         includeZero: true
    //       },
    //       data: [
    //         {
    //           type: 'line',
    //           indexLabel: "{teacherKey}",
    //           dataPoints: top10Teachers.flatMap(({ teacherKey }) => {
    //             const teacherStats = teachersStats.get(teacherKey);
    //             if (!teacherStats) return [];
                
    //             return Array.from(teacherStats.monthlyStats.entries()).map(([monthYearKey, monthlyCount]) => {
    //               const [month, year] = monthYearKey.split('-');
    //               const date = new Date(`${year}-${month}`);
    
    //               return {
    //                 x: date,
    //                 y: monthlyCount,
    //                 name: teacherKey
    //               };
    //             });
    //           }).flat()
    //         }
    //       ]
    //     };
    //   });
    // });

    this.servis.sviCasovi().subscribe(casovi => {
      // Filtriramo časove za 2023. godinu
      const casovi2023 = casovi.filter(cas => {
        const casDate = new Date(cas.datetime);
        return casDate.getFullYear() === 2023;
      });
    
      // Mapa za praćenje broja časova po nastavniku i mesecu
      const teacherMonthlyCounts = new Map<string, Map<string, number>>();
    
      // Izračunavanje broja časova po nastavniku i mesecu
      casovi2023.forEach(cas => {
        const casDate = new Date(cas.datetime);
        const monthYearKey = `${casDate.getMonth() + 1}-${casDate.getFullYear()}`;
        const teacherKey = cas.teacher.username; // Pretpostavljamo da je 'username' jedinstveni identifikator za nastavnike
    
        let teacherMonthlyCountMap = teacherMonthlyCounts.get(teacherKey);
        if (!teacherMonthlyCountMap) {
          teacherMonthlyCountMap = new Map<string, number>();
          teacherMonthlyCounts.set(teacherKey, teacherMonthlyCountMap);
        }
    
        const currentCount = teacherMonthlyCountMap.get(monthYearKey) || 0;
        teacherMonthlyCountMap.set(monthYearKey, currentCount + 1);
      });
    
      // Mapa za praćenje ukupnog broja časova po nastavniku
      const teacherTotalCounts = new Map<string, number>();
    
      // Izračunavanje ukupnog broja časova po nastavniku
      teacherMonthlyCounts.forEach((monthlyCountMap, teacherKey) => {
        let totalCount = 0;
        monthlyCountMap.forEach(count => totalCount += count);
        teacherTotalCounts.set(teacherKey, totalCount);
      });
    
      // Sortiranje nastavnika prema ukupnom broju časova
      const sortedTeachers = Array.from(teacherTotalCounts.entries()).sort(([, a], [, b]) => b - a).slice(0, 10);
    
      // Priprema podataka za grafikon
      const dataSeries = sortedTeachers.map(([teacherKey]) => {
        const teacherMonthlyCountMap = teacherMonthlyCounts.get(teacherKey);
        const dataPoints = Array.from(teacherMonthlyCountMap.entries()).map(([monthYearKey, count]) => {
          const [month, year] = monthYearKey.split('-');
          const date = new Date(Number(year), Number(month) - 1);
          return { x: date, y: count ,name:teacherKey};
        });
        return { name: teacherKey, type: 'line', dataPoints };
      });
    
      // Kreiranje CanvasJS grafikona
      this.chart = {
        title: { text: 'Engagement of Top 10 Teachers in 2023' },
        axisX: { title: 'Month', valueFormatString: 'MMM YYYY' },
        axisY: { title: 'Number of Classes Held' },
        data: dataSeries
      };
    });
    }
    slika
    visible=false
    cv(a){
      this.visible=true
      this.slika=this.servis.getImgUrl(a.CV)
      
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
    alert(a.username)
    this.svinastavnici.forEach(el=>{
      if(el.username==a.username){
        localStorage.setItem('nastavnikPregled',JSON.stringify(el))
      }
    })
    this.ruter.navigate(['NastavnikPreview'])
  }
  Prihvati(a)
  {
    this.servis.PrihvatiNastavnika({user:a}).subscribe(data=>{ this.ngOnInit()})
    
  }
  Odbij(a){
    this.servis.OdbijNastavnika({user:a}).subscribe(data=>{ this.ngOnInit()})
   
  }
  binding:any
  dodajPredmet(){
    this.servis.dodajPredmet({name:this.binding}).subscribe(data=>{ this.ngOnInit()})

  }
}
