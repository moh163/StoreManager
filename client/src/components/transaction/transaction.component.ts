import { Component, Input } from '@angular/core';
import { transaction } from '@common/transaction';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  @Input() transaction: transaction = {} as transaction;
}
