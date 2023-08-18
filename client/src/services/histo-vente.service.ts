import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoVenteService {
  venteTotalObs:Subject<number>=new Subject<number>();
  venteTotal:number=0;
  constructor() {
    this.venteTotalObs.subscribe((value) => {
      console.log("venteTotalObs ",value);
      this.venteTotal += value;
    }
    );
   }
}
