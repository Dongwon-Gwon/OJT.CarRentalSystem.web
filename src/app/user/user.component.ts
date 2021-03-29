import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  @ViewChild("nameInput") userId: ElementRef;
  @ViewChild("carId") carId: ElementRef;
  
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
    let info;
    let id = this.userId.nativeElement.value;
    setTimeout(() => {
      info = Object.values(this.rentedInfo);

      for(let i=0;i<info.length;i++) {
        if(id == info[i]['userId']) {
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
    }, 500);
 
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

  rentCarPipe(): Observable<any>{
    if(this.state != "렌트 가능한 회원") {
      return
    }

    let posCar = Object.values(this.usableCar);
    for(let i=0;i<posCar.length;i++) {
      let carId = this.carId.nativeElement.value;
      if(carId == posCar[i]["carId"]) {
        let enrollInfo = {
          "id": 99999999999,
          "carId": Number(carId),
          "userId": Number(this.userId.nativeElement.value)
        };
        return this.httpclient.put("http://localhost:8080/rentalinfo", enrollInfo, this.httpOptions).pipe();        
      }
    }
    return 
  }

  rentCar():void{
    this.rentCarPipe().subscribe();
    setTimeout(() => {
      this.checkUser();
    },500)

  }

  returnCarPipe(): Observable<any>{
    if(this.state != "렌트 중인 회원"){
      return 
    }
    return this.httpclient.delete("http://localhost:8080/user/"+this.userId.nativeElement.value+"/rentalinfo").pipe();
  }

  returnCar(): void{
    this.returnCarPipe().subscribe();
    setTimeout(() => {
      this.checkUser();
    },500)
  }

}
