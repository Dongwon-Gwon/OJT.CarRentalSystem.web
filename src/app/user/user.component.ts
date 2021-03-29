import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  url: string;
  usableCar: Observable<any>;
  rentedCar: Observable<any>;
  check: Observable<any>;
  rentedInfo: Observable<any>;
  userInfo: Observable<any>;
  state: string;
  
  
  @ViewChild("nameInput") userId: ElementRef;
  
  
  constructor(private httpclient:HttpClient) { 
  }
  
  ngOnInit(): void {
  }

  rentedUser():Observable<any> {
    this.url = "http://localhost:8080/rentalinfo";
    return this.httpclient.get(this.url).pipe();
  }

  enrolledUser():Observable<any> {
    this.url = "http://localhost:8080/user";
    return this.httpclient.get(this.url).pipe();
  }

  checkUser(): void{
    this.rentedUser().subscribe((data) => {this.rentedInfo = data});
    this.enrolledUser().subscribe((data) => {this.userInfo = data});
    console.log(this.userInfo);
    let info;
    let id = this.userId.nativeElement.value;
    setTimeout(() => {
      info = Object.values(this.rentedInfo);

      for(let i=0;i<info.length;i++) {
        if(id == info[i]['id']) {
          this.state = "렌트 중인 회원";
          this.getRentedCar();
          this.usableCar = null;
          return
        }
      }

      info = Object.values(this.userInfo);
      for(let i=0;i<info.length;i++) {
        if(id == info[i]['userId']) {
          this.state = "렌트 가능한 회원";
          this.getUsableCar();
          this.rentedCar = null;
          return
        }
      }

      this.state = "존재하지 않는 회원"
      this.usableCar = null;
      this.rentedCar = null;
      return
    }, 1000);
 
  }

  getUsableCarInfo(): Observable<any> {
    this.url = "http://localhost:8080/user/"+this.userId.nativeElement.value+"/car";
    return this.httpclient.get(this.url).pipe();
  }
  
  getUsableCar(): void {
    this.getUsableCarInfo().subscribe((data) => {this.usableCar = data});
  }

  getRentedCarInfo(): Observable<any>{
    this.url = "http://localhost:8080/user/"+this.userId.nativeElement.value+"/rent";
    return this.httpclient.get(this.url).pipe();
  }

  getRentedCar(): void {
    this.getRentedCarInfo().subscribe((data) => {this.rentedCar = data});
  }
}
