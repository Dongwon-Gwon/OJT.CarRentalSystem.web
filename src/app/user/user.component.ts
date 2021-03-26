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
  @ViewChild("nameInput") userId: ElementRef;
  
  constructor(private httpclient:HttpClient) { 
  }
  
  ngOnInit(): void {
  }

  checkUser(): void{
    this.url = "http://localhost:8080/rentalinfo";
    this.check = this.httpclient.get(this.url).pipe();
    this.check.subscribe((data) => {this.rentedInfo = data});
    
    // console.log(this.rentedInfo)
    // for( value: Object.values(this.rentedInfo)){

    // }
    console.log(Object.values(this.rentedInfo))
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
