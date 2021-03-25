import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatServiceService {
  

  constructor(private httpClient: HttpClient) { }

  public getCar(): Observable<any>{
    return this.httpClient.get("http://localhost:8080/car");
  }

  
}
