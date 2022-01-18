import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http : HttpClient) {}

  linkLogin = "/api/auth/signin";

  doLogIn(email: string, password: string){
    return this.http.post(this.linkLogin, ({email: email, password: password}))
  }
}
