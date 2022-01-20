import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  router: Router;

  constructor(private pedir : MainService ,router: Router) { this.router = router }


  ngOnInit(): void {
/*     window.onbeforeunload = () => {
      localStorage.removeItem('user-token');
      return '';
    }; */

    if(!localStorage.getItem("user-token")) {
      this.router.navigate(['/login'])
    }
  }

  verGrupo(id: any) {
    alert('Vai para o grupo'+ id);
  }

}
