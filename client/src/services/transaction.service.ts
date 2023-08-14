import { Injectable } from '@angular/core';
import { Item } from '@common/item';
import { CommunicationService } from './communication.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  

  addedItems: Item[] = [];
  total: number = 0;

  constructor(private communicationService: CommunicationService) { }

  addItem(item: Item, quantity: number) {
    if (quantity > 0 && quantity <= item.stock) {
      if (this.addedItems.find(i => i.id === item.id)) {
        let index = this.addedItems.findIndex(i => i.id === item.id);
        this.total = this.total - this.addedItems[index].price * this.addedItems[index].soldUnit;
        this.addedItems[index].soldUnit = quantity;
        this.total = this.total + this.addedItems[index].price * this.addedItems[index].soldUnit;
      } else {
        item.soldUnit = quantity;
        this.addedItems.push(item);
        this.total = this.total + item.price * quantity;
      }
    }else{
      window.alert('Quantité invalide doit être entre 1 et ' + item.stock);
    }
  }
  deleteTransaction(id: string) {
    let index = this.addedItems.findIndex(item => item.id === id);
    this.total = this.total - this.addedItems[index].price * this.addedItems[index].soldUnit;
    this.addedItems.splice(index, 1);
  }
  cancelTransaction() {
    this.addedItems = [];
    this.total = 0;
  }

  confirmTransaction() {
    this.communicationService.confirmTransaction(this.addedItems).subscribe((res) => {
      console.log(res);
    });
    this.addedItems = [];
    this.total = 0;
  }
}
