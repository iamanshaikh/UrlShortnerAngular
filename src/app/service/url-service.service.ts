import { Injectable } from '@angular/core';
// import {HttpClient, HttpClientModule } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { HttpBackend, HttpClient,HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
// import { map,tap } from 'rxjs/operators';
import { map, mapTo } from 'rxjs/operators';



// import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UrlServiceService {

  apiUrl=environment.baseUrl; 
  public getUrl: string=`${this.apiUrl}/shortner`; 
  public getValidate: string=`${this.apiUrl}/shortner/validateUrl`; 



  serviceUrl : string =''

  constructor(private http:HttpClient) { 
  }
 
  public getShortUrl(url:string) {
    return this.http.post<any>(this.getUrl,url);
 }

 public validateUrl(url: string) {
  return this.http.get<any>(this.getValidate, { params: { url } });
}

}
