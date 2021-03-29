import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  car: Observable<any>;
  user: Observable<any>;
  rentInfo: Observable<any>;
  admin: Observable<any>;
  adminCheck: Observable<any>;
  adminState: string;
  info:any;
  conif =0;
  con = "";

  @ViewChild("nameInput") adminId: ElementRef;

  constructor(private httpclient:HttpClient) { 
    document.title = "admin"
  } 
 
  ngOnInit(): void {

    this.getInfo("admin").subscribe((data) => {this.adminCheck = data});

  }
  
  getInfo(obj: string): Observable<any> {
    return this.httpclient.get("http://localhost:8080/" + obj).pipe();
  }
  
  click(){
    this.info = Object.values(this.adminCheck);
    let id = this.adminId.nativeElement.value;

    this.car = null;
    this.user = null;
    this.rentInfo = null;
    this.admin = null;

    for (let i=0;i<this.info.length;i++) {
      if (id == this.info[i]["adminId"]){
        this.adminState = null;
        this.getInfo("car").subscribe((data) => {this.car = data});
        this.getInfo("user").subscribe((data) => {this.user = data});
        this.getInfo("rentalinfo").subscribe((data) => {this.rentInfo = data});
        this.getInfo("admin").subscribe((data) => {this.admin = data});
        this.conif =1;
        return
      }
    }
    this.conif=0;
    this.adminState = "관리자 권한이 없습니다";
  
  }

  conCar(){
    this.con="car"
  }
  conUser(){
    this.con="user"
  }
  conAdmin(){
    this.con="admin"
  }
  conRentalInfo() {
    this.con="rentalinfo"
  }
}