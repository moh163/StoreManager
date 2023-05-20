import { Component } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  name: string='TEST';
  stock: number=20;
  price: number=180;
  constructor() { }

}
