import { ApplicationRef, Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { transaction } from '@common/transaction';

@Injectable({
  providedIn: 'root'
})
export class HistoVenteService {

  venteTotal: number = 0;
  transactions: transaction[] = [];
  constructor(private communicationService: CommunicationService, private applicationRef: ApplicationRef) {

  }
  getTransactionByDate(startDate: Date, endDate: Date) {
    console.log(startDate);
    console.log(endDate);
    this.communicationService.getTransactionByDate(startDate, endDate).subscribe((res) => {
      this.transactions = res.body as transaction[];
      this.sumTotal();
    });
  }
  sumTotal() {
    this.venteTotal = this.transactions.reduce((acc, transaction) => acc + transaction.total, 0);
    this.applicationRef.tick();
  }
}
