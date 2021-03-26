import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  car: Observable<any>;
  
  
  constructor(private httpclient:HttpClient) { 
    document.title = "admin"
  } 
 

  ngOnInit(): void {
    
    this.getCar().subscribe((data) => {this.car = data});
  }


  getCar(): Observable<any> {
    return this.httpclient.get("http://localhost:8080/car").pipe();
  }

  click(){
    console.log(this.car);
  }
  

}

