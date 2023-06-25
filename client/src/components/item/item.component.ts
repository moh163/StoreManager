import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP_STATUS_CODES } from '@common/const';
import { Item } from '@common/item';
import { CommunicationService } from 'src/services/communication.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() item: Item={name: '', stock: 0, price: 0, soldUnit: 0, categorie: ''};
  
   constructor(public  router: Router, private communication: CommunicationService) { }

   async updateStock(event: Event) {
    const button = event.currentTarget as HTMLButtonElement;
    if (button.classList.contains('btn-success')) {
      console.log('plus');
      this.item.stock++;

    }else if (button.classList.contains('btn-danger')) {
      console.log('minus');
      this.item.stock--;
    }

    const id = this.item.id as string;
    this.communication.updateStock(this.item.stock, id).subscribe((res) => {
      if (res.status === HTTP_STATUS_CODES.OK) {
        console.log('stock updated');
      }
    }
    );
    
  }


}
