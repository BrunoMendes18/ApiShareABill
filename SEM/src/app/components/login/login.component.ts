import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = "";
  password = ""
  router: Router;

  resultado : any;

  constructor(private pedir : MainService, router : Router) { this.router = router; }

  logIn() {
    this.pedir.doLogIn(this.email, this.password)
    .subscribe(arg => {
      this.resultado = arg;
      console.log(this.resultado);
      this.pedir.userToken = this.resultado.token;
      console.log('User Token: ',this.pedir.userToken);
      this.saveToken(this.pedir.userToken);
    })
  }

  saveToken(token:any)
  {
    localStorage.setItem("user-token",token);
    console.log('salvei cookie');
  }

  ngOnInit(): void {
  }

}
