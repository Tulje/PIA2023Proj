import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl:string="http://localhost:4000/users"
  constructor(private http:HttpClient) { }
  getImgUrl(imgPath: string): string {
    return `${this.apiUrl}/uploads/${imgPath}`;
  }
  login(username:string,password:string){
    //let body={username:username,password:password}
    return this.http.post<any>(`${this.apiUrl}/login`, { username:username, password:password });
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
  }

