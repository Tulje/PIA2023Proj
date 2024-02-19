import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl:string="http://localhost:4000/users"
  constructor(private http:HttpClient) { }
  sviPredmeti(){
    return this.http.post<any>(`${this.apiUrl}/sviPredmeti`, {});

  }
  getImgUrl(imgPath: string): string {
    return `${this.apiUrl}/uploads/${imgPath}`;
  }
  dodajPredmet(data){
    return this.http.post<any>(`${this.apiUrl}/dodajPredmet`, {});

  }
  login(username:string,password:string){
    //let body={username:username,password:password}
    return this.http.post<any>(`${this.apiUrl}/login`, { username:username, password:password });
  }
  loginA(username:string,password:string){
    //let body={username:username,password:password}
    alert("nesto")
    return this.http.post<any>(`${this.apiUrl}/loginA`, { username:username, password:password });
  }
  loginTeacher(username:string,password:string){
    //let body={username:username,password:password}
    return this.http.post<any>(`${this.apiUrl}/loginTeacher`, { username:username, password:password });
  }
  registerTeacher(data:any){
    return this.http.post<any>(`${this.apiUrl}/registerTeacher`, data);
  }
  teachers(){
    return this.http.post<any>(`${this.apiUrl}/teachers`, {});
  }
  students(){
    return this.http.post<any>(`${this.apiUrl}/students`, {});
  }
  pretragaTeachera(data:any){
    return this.http.post<any>(`${this.apiUrl}/pretragaTeachera`, data);
  }
  update(data:any){
    return this.http.post<any>(`${this.apiUrl}/updateStudent`, data);

  }
  PrihvatiNastavnika(data:any){
    return this.http.post<any>(`${this.apiUrl}/PrihvatiNastavnika`, data);

  }
  OdbijNastavnika(data:any){
    return this.http.post<any>(`${this.apiUrl}/OdbijNastavnika`, data);

  }
  ZahtevajCas(user:User,teacher:any,datetime:any,dupli:boolean,opis:any,IzabranPredmet:any){
    let data={user:user,teacher:teacher,datetime:datetime,dupli:dupli,opis:opis,IzabranPredmet:IzabranPredmet}
    return this.http.post<any>(`${this.apiUrl}/ZahtevajCas`, data);

  }
  azurirajNastavnika(nastavnik:any){
    return this.http.post<any>(`${this.apiUrl}/azurirajNastavnika`, {nastavnik:nastavnik});

  }
  sviCasovi(){
    return this.http.post<any>(`${this.apiUrl}/sviCasovi`, {});

  }
  nadjiKorisnika(username:any,password:any){
    return this.http.post<any>(`${this.apiUrl}/nadjiKorisnika`, {username:username,password:password});

  }
  promeniSifru(username:any,passwordStara:any,password:any){
    return this.http.post<any>(`${this.apiUrl}/promeniSifru`, {username:username,passwordStara:passwordStara,password:password});

  }
  prihvatiCas(data){
    return this.http.post<any>(`${this.apiUrl}/prihvatiCas`, data);

  }
  odbijCas(data){
    return this.http.post<any>(`${this.apiUrl}/odbijCas`, data);

  }
  }

