import { Component } from '@angular/core';
import { TransactionService } from 'src/services/transaction.service';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css']
})
export class TransactionPageComponent {

  constructor(public transactionService: TransactionService) { }

  onHover(event: any) {
    const x = document.createElement('span');
    x.innerHTML = 'X';
    x.style.color = 'red';
    x.classList.add('position-absolute');
    x.classList.add('start-50');
    event.target.appendChild(x);
    x.addEventListener('click', () => {
      this.transactionService.deleteTransaction(event.target.id);
    }
    );
  }

  onLeave(event: any) {
    event.target.removeChild(event.target.lastChild);
  }
  

}
