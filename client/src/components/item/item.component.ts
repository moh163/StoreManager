import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() name: string='TEST';
  @Input() stock: number=20;
  @Input() price: number=180;
  @Input() soldUnit: number=0;
  
   constructor(public  router: Router) { }

}
