import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/environment/environment';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent extends DataService implements OnInit {

  car: Observable<any>;
  user: Observable<any>;
  rentInfo: Observable<any>;
  admin: Observable<any>;
  adminCheck: Observable<any>;
  adminState: string;
  info:any;
  conif =0;
  con = "";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  @ViewChild("checkAdminId") checkAdminId: ElementRef;
  @ViewChild("carName") carName: ElementRef;
  @ViewChild("company") company: ElementRef;
  @ViewChild("carId") carId: ElementRef;
  @ViewChild("userName") userName: ElementRef;
  @ViewChild("userId") userId: ElementRef;
  @ViewChild("adminName") adminName: ElementRef;
  @ViewChild("adminId") adminId: ElementRef;

  constructor(private httpclient:HttpClient) { 
    super();
    document.title = "admin"
  } 
 
  ngOnInit(): void {

    this.getInfo("admin").subscribe((data) => {this.adminCheck = data});
    
  }
  
  getInfo(obj: string): Observable<any> {
    return this.httpclient.get(`${this.url}${obj}`).pipe();
  }
  
  click(){
    this.info = Object.values(this.adminCheck);
    let id = this.checkAdminId.nativeElement.value;

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
    this.con='car'
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

  saveCarPipe(): Observable<any>{
    let car = {
      "carId": 99999999,
      "carName": this.carName.nativeElement.value,
      "company": this.company.nativeElement.value
    }
    return this.httpclient.put(`${this.url}car`, car, this.httpOptions).pipe();
  }

  saveCar(){
    this.saveCarPipe().subscribe();
    setTimeout(() => {
      this.click();
    },500)
  }
  
  deleteCarPipe(): Observable<any>{
    return this.httpclient.delete(`${this.url}car/${this.carId.nativeElement.value}`).pipe()
  }

  deleteCar(){
    this.deleteCarPipe().subscribe();
    setTimeout(() => {
      this.click();
    },500)
  }

  saveUserPipe(): Observable<any>{
    let user ={
      "userId": 99999999,
      "userName": this.userName.nativeElement.value 
    }
    return this.httpclient.put(`${this.url}user`, user, this.httpOptions).pipe();
  }

  saveUser(){
    this.saveUserPipe().subscribe();
    setTimeout(() => {
      this.click();
    },500)
  }

  deleteUserPipe(): Observable<any>{
    return this.httpclient.delete(`${this.url}user/${this.userId.nativeElement.value}`).pipe();
  }

  deleteUser(){
    this.deleteUserPipe().subscribe();
    setTimeout(() => {
      this.click();
    },500)
  }

  saveAdminPipe(): Observable<any> {
    let admin ={
      "userId": 99999999,
      "adminName": this.adminName.nativeElement.value 
    }
    return this.httpclient.put(`${this.url}admin`, admin, this.httpOptions).pipe();
  }

  saveAdmin(){
    this.saveAdminPipe().subscribe();
    setTimeout(() => {
      this.click();
    },500)
  }

  deleteAdminPipe(): Observable<any> {
    return this.httpclient.delete(`${this.url}admin/${this.adminId.nativeElement.value}`).pipe()
  }

  deleteAdmin(){
    this.deleteAdminPipe().subscribe();
    setTimeout(() => {
      this.click();
    },500)
  }
}