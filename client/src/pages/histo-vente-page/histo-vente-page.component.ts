import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CategoryService } from 'src/services/category.service';
import { HistoVenteService } from 'src/services/histo-vente.service';

declare var $: any;
@Component({
  selector: 'app-histo-vente-page',
  templateUrl: './histo-vente-page.component.html',
  styleUrls: ['./histo-vente-page.component.css']
})
export class HistoVentePageComponent implements OnInit {

  venteTotal: number = 0;
  timeRange: string = "dans les dernières 24h";
  constructor(public histoVenteService: HistoVenteService) {
    this.histoVenteService.venteTotalObs = new Subject<number>();
    this.histoVenteService.venteTotalObs.subscribe((value) => {
      console.log("venteTotalObs ", value);
      this.venteTotal += value;
    }
    );
  }
  ngOnInit() {

    $(function () {
      $('input[name="daterange"]').daterangepicker({
        opens: 'left'
      }, function (start: any, end: any, label: any) {
        console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
      });
    });
  }

  switchEnabledDateInput(event: Event) {
   
    const target = event.target as HTMLInputElement
    const dateInput = document.getElementById("dateInput") as HTMLInputElement
    target.id === "radioPersonalised" ? dateInput.disabled = false : dateInput.disabled = true;
    this.switchTimeRange(target);
  }
 
  switchTimeRange(input: HTMLInputElement) {
    switch (input.id) {
      case "radioPersonalised":
        this.timeRange = "Personalised";
        break;
      case "radioAlways":
        this.timeRange = "depuis le débuts";
        break;
      case "radioAnnualy":
        this.timeRange = "depuis un an";
        break;
      case "radioMonthly":
        this.timeRange = "depuis un mois";
        break;
      case "radioWeekly":
        this.timeRange = "depuis une semaine";
        break;
      case "radioDaily":
        this.timeRange = "dans les dernières 24h";
        break;
      default:
        this.timeRange = "";
        break;
    }
  }
  ngOnDestroy(): void {
    this.histoVenteService.venteTotalObs.unsubscribe();
    // this.categoryService.venteTotalObs.complete();
    this.histoVenteService.venteTotal = 0;
    console.log("venteTotalObs unsubscribed");
  }
}
