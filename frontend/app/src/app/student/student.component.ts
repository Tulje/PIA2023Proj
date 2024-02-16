import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/User.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{
  user:User
  constructor(private servis :UserService){}
  slika:string='C:\Users\Urke\Desktop\New folder (5)\PIA2023Proj\bekend'
  ngOnInit(): void {
    let a= localStorage.getItem('login')
    let b= JSON.parse(a)
    this.user=b
this.slika=this.servis.getImgUrl(this.user.profileImage) 
alert(this.slika)
}}


