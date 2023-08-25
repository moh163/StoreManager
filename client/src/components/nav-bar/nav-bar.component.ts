import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  switchActive(event: Event) {
    const target = event.target as HTMLAnchorElement;
    const active = document.getElementsByClassName("active");
    active[0].classList.remove("active");
    target.classList.add("active");
  }
}
