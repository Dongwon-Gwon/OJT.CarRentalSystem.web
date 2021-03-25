import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CatServiceService } from '../cat-service.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  carUrl = '/car';
  car: Observable<any>;

  
  constructor(private api:CatServiceService, private httpclient:HttpClient) { 
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

