import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConnexionService } from 'src/services/connexion.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private connexionService: ConnexionService) {}
  switchActive(event: Event) {
    const target = event.target as HTMLAnchorElement;
    const active = document.getElementsByClassName("active");
    active[0].classList.remove("active");
    target.classList.add("active");
  }

  connexion() {
    const username: String = (document.getElementById("username") as HTMLInputElement).value;
    const password: String = (document.getElementById("mdp") as HTMLInputElement).value;
    if(username == environment.username && password == environment.password) {
      this.connexionService.connected = true;
    }
    else {
      alert("Mauvais identifiants");
    }
  }
}