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

  constructor(private pedir : MainService, router : Router) { this.router = router; }

  logIn() {
    this.pedir.doLogIn(this.email, this.password)
    .subscribe(arg => {
      console.log("entrou" + arg);
      console.log(arg);
    })
  }

  ngOnInit(): void {
  }

}
